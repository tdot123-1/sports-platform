"use server";

import { validCountryCodes } from "@/lib/countries";
import { createClient } from "@/lib/supabase/server";
import {
  CurrencyCodes,
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

// temporary validation for address format
// const AddressSchema = z.object({
//   address_one: z
//     .string()
//     .min(1, "Address line 1 is required")
//     .trim()
//     .nonempty("Please add an address"),
//   address_two: z.string().trim().optional(),
//   city: z.string().trim().min(1, "City is required"),
//   region: z.string().min(1, "Region is required").trim(),
//   postal: z.string().min(1, "Postal code is required").trim(),
// });

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
  address_line_one: z
    .string({ invalid_type_error: "Please add an address to your event" })
    .trim()
    .min(5, { message: "Address is too short" })
    .max(100, { message: "Maximum characters exceeded" }),
  address_line_two: z
    .string({ invalid_type_error: "Please add an address to your event" })
    .trim()
    .min(1, { message: "Address line 2 is too short" })
    .max(100, { message: "Maximum characters exceeded" })
    .nullable(),
  address_city: z
    .string({ invalid_type_error: "Please add a city" })
    .trim()
    .min(2, { message: "City name is too short" })
    .max(100, { message: "Maximum characters exceeded" }),
  address_region: z
    .string({ invalid_type_error: "Please add a region/state/province" })
    .trim()
    .min(2, { message: "Region/state/province is too short" })
    .max(100, { message: "Maximum characters exceeded" })
    .nullable(),
  address_postal_code: z
    .string({ invalid_type_error: "Please enter a valid postal code" })
    .trim()
    .min(2, { message: "Postal code is too short" })
    .max(15, { message: "Postal code is too long" })
    .regex(/^[A-Za-z0-9\s\-]+$/, {
      message: "Invalid characters in postal code",
    })
    .nullable(),
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
  event_description: z
    .string({
      invalid_type_error: "Please provide a description of your event",
    })
    .trim()
    .max(2000, { message: "Maximum characters exceeded" })
    .nullable(),
  start_date: z
    .date({
      invalid_type_error: "Please provide the starting date of your event",
    })
    .nullable()
    .refine(
      (startDate) => {
        return startDate === null || startDate >= new Date();
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
        return endDate === null || endDate >= new Date();
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
  event_links: z
    .array(
      z
        .string({
          invalid_type_error: "Please provide a link",
        })
        .trim()
        .url({ message: "Please only valid URLs" })
    )
    .max(5, { message: "Max number of links exceeded" })
    .nullable(),
  cost_estimate: z
    .number({
      invalid_type_error: "Cost estimate must be a number",
    })
    .int({ message: "Cost estimate must be whole number" })
    .min(0, { message: "Cost estimate must be a positive amount" }),
  cost_description: z
    .string({
      invalid_type_error: "Please provide a cost description",
    })
    .trim()
    .max(2000, { message: "Maximum characters exceeded" })
    .nullable(),
  cost_currency: z
    .enum(CurrencyCodes, { message: "Please select a valid currency" })
    .default("EUR"),
});

const CreateEventSchema = FormSchema.omit({ id: true })
  .refine(
    (data) => {
      console.log("REFINE 1");
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
      console.log("REFINE 2");
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
    target_age?: string[];
    target_level?: string[];
    target_gender?: string[];
    address_line_one?: string[];
    address_line_two?: string[];
    address_city?: string[];
    address_region?: string[];
    address_postal_code?: string[];
    address_country?: string[];
    event_description?: string[];
    start_date?: string[];
    end_date?: string[];
    contact_email?: string[];
    contact_phone?: string[];
    event_links?: string[];
    cost_estimate?: string[];
    cost_description?: string[];
    cost_currency?: string[];
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
    target_age,
    target_level,
    target_gender,
    address_line_one,
    address_line_two,
    address_city,
    address_region,
    address_postal_code,
    address_country,
    event_description,
    start_date,
    end_date,
    contact_email,
    contact_phone,
    event_links,
    cost_estimate,
    cost_description,
    cost_currency,
  } = validatedFields.data;

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

    const { data, error } = await supabase.from("events").insert([
      {
        event_name,
        event_type,
        target_age,
        target_level,
        target_gender,
        address_line_one,
        address_line_two,
        address_city,
        address_region,
        address_postal_code,
        address_country,
        event_description,
        start_date,
        end_date,
        contact_email,
        contact_phone,
        event_links,
        cost_estimate,
        cost_description,
        cost_currency,
        user_id: user.id,
      },
    ]);

    if (error) {
      console.error("Database error on create event: ", error.message);
      return { message: `Database error: ${error.message}`, success: false };
    }

    console.log("Event added: ", data);
    revalidatePath("/events");
    revalidatePath("/profile/events");
    return { message: "", success: true };
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
    target_age,
    target_level,
    target_gender,
    address_line_one,
    address_line_two,
    address_city,
    address_region,
    address_postal_code,
    address_country,
    event_description,
    start_date,
    end_date,
    contact_email,
    contact_phone,
    event_links,
    cost_estimate,
    cost_description,
    cost_currency,
  } = validatedFields.data;

  try {
    const supabase = await createClient();

    // let supabase RLS handle authenticated user
    // only owner of row should be able to update

    const { data, error } = await supabase
      .from("events")
      .update({
        event_name,
        event_type,
        target_age,
        target_level,
        target_gender,
        address_line_one,
        address_line_two,
        address_city,
        address_region,
        address_postal_code,
        address_country,
        event_description,
        start_date,
        end_date,
        contact_email,
        contact_phone,
        event_links,
        cost_estimate,
        cost_description,
        cost_currency,
      })
      .eq("id", id);

    if (error) {
      console.error("Database error on update event: ", error.message);
      return { message: `Database error: ${error.message}`, success: false };
    }

    console.log("Event updated: ", data);
    revalidatePath("/events");
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

    revalidatePath("/events");
    revalidatePath("/profile/events");

    return { success: true };
  } catch (error) {
    console.error("Unexpected error deleting event: ", error);
    return { success: false, message: "An unexpected error occurred" };
  }
}
