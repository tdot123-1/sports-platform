"use server";

import { validCountryCodes, validCurrencyCodes } from "@/lib/countries";
import { createClient } from "@/lib/supabase/server";
import {
  SportsEventTypeKeys,
  SportsEventTypeMap,
  TargetAgeGroupKeys,
  TargetAgeGroupMap,
  TargetGenderKeys,
  TargetGenderMap,
  TargetLevelKeys,
  TargetLevelMap,
} from "@/lib/types";
import { formatRawFormData } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { convertCostToEuro } from "../exchange-rate/actions";

// (!) Add phone number validation
const FormSchema = z.object({
  id: z.string().uuid(),
  event_name: z
    .string({
      invalid_type_error: "Please add a name for your event",
    })
    .trim()
    .min(3, { message: "Event name must be at least 3 characters" })
    .max(254, { message: "Maximum characters exceeded" }),
  event_type: z.enum(SportsEventTypeKeys as [keyof typeof SportsEventTypeMap], {
    invalid_type_error: "Please select an event type",
    message: "Please select from the available events",
  }),
  event_description: z
    .string({
      invalid_type_error: "Please provide a description of your event",
    })
    .trim()
    .max(2000, { message: "Maximum characters exceeded" })
    .nullable(),

  target_age: z
    .array(z.enum(TargetAgeGroupKeys as [keyof typeof TargetAgeGroupMap]), {
      invalid_type_error: "Please select from the available age groups",
      message: "Please select from the available age groups",
    })
    .min(1, "Please select at least one age group"),
  target_level: z
    .array(z.enum(TargetLevelKeys as [keyof typeof TargetLevelMap]), {
      invalid_type_error: "Please select a skill level",
      message: "Please select a skill level",
    })
    .nullable(),
  target_gender: z.enum(TargetGenderKeys as [keyof typeof TargetGenderMap], {
    invalid_type_error: "Please select a gender",
    message: "Please select a gender",
  }),

  address_city: z
    .string({ invalid_type_error: "Please add a city" })
    .trim()
    .toLowerCase()
    .min(2, { message: "City name is too short" })
    .max(100, { message: "Maximum characters exceeded" })
    .regex(/^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/, {
      message: "City contains invalid characters",
    }),
  address_country: z
    .string({
      invalid_type_error: "Please add a country for your event",
    })
    .trim()
    .length(2, { message: "Please select from the available countries" })
    .toUpperCase()
    .refine((code) => validCountryCodes.has(code), {
      message: "Invalid country code",
    }),

  start_date: z
    .date({
      invalid_type_error: "Please provide the starting date of your event",
    })
    .nullable()
    .refine(
      (startDate) => {
        return (
          startDate === null ||
          new Date(startDate).setHours(0, 0, 0, 0) >=
            new Date().setHours(0, 0, 0, 0)
        );
      },
      { message: "Start date must be today or in the future" }
    ),
  start_date_tbd: z.coerce.boolean(),
  end_date: z
    .date({
      invalid_type_error: "Please provide the end date of your event",
    })
    .nullable()
    .refine(
      (endDate) => {
        return (
          endDate === null ||
          new Date(endDate).setHours(0, 0, 0, 0) >=
            new Date().setHours(0, 0, 0, 0)
        );
      },
      { message: "End date must be today or in the future" }
    ),

  contact_email: z
    .string({
      invalid_type_error: "Please provide an email address",
    })
    .trim()
    .min(3, { message: "Email must be at least 3 characters" })
    .max(254, { message: "Maximum characters exceeded" })
    .email({ message: "Please provide a valid email address" }),
  contact_phone: z
    .string({
      invalid_type_error: "Please provide a phone number",
    })
    .trim()
    .min(7, { message: "Phone number must be at least 7 digits" })
    .max(15, { message: "Phone number cannot exceed 15 digits" })
    .nullable()
    // basic test for phone number format
    .refine((v) => {
      return v === null || /^\+?[0-9]\d{1,14}$/.test(v);
    }),

  cost_estimate: z
    .number({
      invalid_type_error: "Cost estimate must be a number",
    })
    .int({ message: "Cost estimate must be whole number" })
    .min(0, { message: "Cost estimate must be a positive amount" }),
  cost_currency: z
    .enum(validCurrencyCodes, { message: "Please select a valid currency" })
    .default("EUR"),
  cost_description: z
    .string({
      invalid_type_error: "Please provide a cost description",
    })
    .trim()
    .max(2000, { message: "Maximum characters exceeded" })
    .nullable(),

  event_link: z
    .string({
      invalid_type_error: "Invalid input type",
    })
    .trim()
    .url({ message: "Please only valid URLs" })
    .nullable(),
  social_links: z
    .array(
      z
        .string({
          invalid_type_error: "Please provide a link",
        })
        .trim()
        .url({ message: "Please only valid URLs" })
    )
    .max(4, { message: "Max number of links exceeded" })
    .nullable(),
});

const CreateEventSchema = FormSchema.omit({ id: true })
  .refine(
    (data) => {
      // if start is null, end should be null
      if (data.start_date === null) {
        return data.end_date === null;
      }
      // if start date, end date must be null or >= start date
      return data.end_date === null || data.end_date >= data.start_date;
    },
    {
      message: "End date must be the same as or after the start date",
      path: ["end_date"],
    }
  )
  .refine(
    (data) => {
      // if tbd is checked, start date must be null
      if (data.start_date_tbd && data.start_date !== null) return false;

      // if tbd is not checked, start date must be provided
      if (!data.start_date_tbd && data.start_date === null) return false;

      return true;
    },
    {
      message: "Please provide a start date, or check the TBD option",
      path: ["start_date"],
    }
  );

const UpdateEventSchema = CreateEventSchema;

export type State = {
  errors?: {
    event_name?: string[];
    event_type?: string[];
    event_description?: string[];

    target_age?: string[];
    target_level?: string[];
    target_gender?: string[];

    address_city?: string[];
    address_country?: string[];

    start_date?: string[];
    end_date?: string[];

    contact_email?: string[];
    contact_phone?: string[];

    cost_estimate?: string[];
    cost_currency?: string[];
    cost_description?: string[];

    event_link?: string[];
    social_links?: string[];
  };
  message?: string;
  success: boolean;
};

// CREATE event
export async function createEvent(prevState: State, formData: FormData) {
  // format raw form data
  const formattedFormData = formatRawFormData(formData);

  const validatedFields = CreateEventSchema.safeParse(formattedFormData);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing fields. Failed to create event.",
      success: false,
    };
  }

  const {
    event_name,
    event_type,
    event_description,

    target_age,
    target_level,
    target_gender,

    address_city,
    address_country,

    start_date,
    end_date,

    contact_email,
    contact_phone,

    cost_estimate,
    cost_description,
    cost_currency,

    event_link,
    social_links,
  } = validatedFields.data;

  const cost_estimate_eur = await convertCostToEuro(
    cost_estimate,
    cost_currency
  );

  try {
    const supabase = await createClient();

    // get the current user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError) {
      console.error("Error fetching user: ", userError.message);
      return {
        message: "Failed to fetch user information. Please try again.",
        success: false,
      };
    }

    // check if user exists, redirect to login if not
    if (!user) {
      return redirect("/login");
    }

    const { error, data } = await supabase
      .from("events")
      .insert({
        event_name,
        event_type,
        event_description,

        target_age,
        target_level,
        target_gender,

        address_city,
        address_country,

        start_date,
        end_date,

        contact_email,
        contact_phone,

        cost_estimate,
        cost_description,
        cost_currency,
        cost_estimate_eur,

        event_link,
        social_links,

        user_id: user.id,
      })
      .select("id")
      .single();

    if (error) {
      console.error("Database error on create event: ", error.message);
      return { message: `Database error: ${error.message}`, success: false };
    }

    revalidatePath("/events/grid");
    revalidatePath("/events/table");
    revalidatePath("/events/calendar");
    revalidatePath("/profile/events");

    return { message: `${data.id}`, success: true };
  } catch (error) {
    console.error("Error creating event: ", error);
    return {
      message: "An unexpected error occurred. Please try again.",
      success: false,
    };
  }
}

export async function updateEvent(
  id: string,
  prevState: State,
  formData: FormData
) {
  // format raw form data
  const formattedFormData = formatRawFormData(formData);

  const validatedFields = UpdateEventSchema.safeParse(formattedFormData);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing fields. Failed to create event.",
      success: false,
    };
  }

  const {
    event_name,
    event_type,
    event_description,

    target_age,
    target_level,
    target_gender,

    address_city,
    address_country,

    start_date,
    end_date,

    contact_email,
    contact_phone,

    cost_estimate,
    cost_description,
    cost_currency,

    event_link,
    social_links,
  } = validatedFields.data;

  const cost_estimate_eur = await convertCostToEuro(
    cost_estimate,
    cost_currency
  );

  try {
    const supabase = await createClient();

    // let supabase RLS handle authenticated user
    // only owner of row should be able to update

    const { error } = await supabase
      .from("events")
      .update({
        event_name,
        event_type,
        event_description,

        target_age,
        target_level,
        target_gender,

        address_city,
        address_country,

        start_date,
        end_date,

        contact_email,
        contact_phone,

        cost_estimate,
        cost_description,
        cost_currency,
        cost_estimate_eur,

        event_link,
        social_links,
      })
      .eq("id", id);

    if (error) {
      console.error("Database error on update event: ", error.message);
      return { message: `Database error: ${error.message}`, success: false };
    }

    revalidatePath("/events/grid");
    revalidatePath("/events/table");
    revalidatePath("/events/calendar");

    revalidatePath(`/events/${id}`);
    revalidatePath("/profile/events");
    revalidatePath(`/profile/events/${id}`);
    return { message: "", success: true };
  } catch (error) {
    console.error("Error updating event: ", error);
    return {
      message: "An unexpected error occurred. Please try again.",
      success: false,
    };
  }
}

export async function deleteEvent(eventId: string) {
  try {
    const supabase = await createClient();

    const { error } = await supabase.from("events").delete().eq("id", eventId);

    if (error) {
      console.error("Error deleting event: ", error.message);
      return { success: false, message: `Database error: ${error.message}` };
    }

    revalidatePath("/events/grid");
    revalidatePath("/events/table");
    revalidatePath("/events/calendar");

    revalidatePath(`/events/${eventId}`);
    revalidatePath(`/profile/events/${eventId}`);
    revalidatePath("/profile/events");

    return { success: true };
  } catch (error) {
    console.error("Unexpected error deleting event: ", error);
    return { success: false, message: "An unexpected error occurred" };
  }
}
