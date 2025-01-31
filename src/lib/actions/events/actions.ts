"use server";

import { createClient } from "@/lib/supabase/server";
import {
  SportsEventTypeArray,
  TargetAgeGroupArray,
  TargetGenderArray,
  TargetLevelArray,
} from "@/lib/types";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

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
  event_type: z.enum(SportsEventTypeArray, {
    invalid_type_error: "Please select an event type",
  }),
  target_age: z.enum(TargetAgeGroupArray, {
    invalid_type_error: "Please select from the available age groups",
  }),
  target_level: z
    .enum(TargetLevelArray, {
      invalid_type_error: "Please select a skill level",
    })
    .nullable(),
  target_gender: z.enum(TargetGenderArray, {
    invalid_type_error: "Please select a gender",
  }),
  event_location: z
    .string({
      invalid_type_error: "Please provide the location of your event",
    })
    .trim(),
  description: z
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
    .refine((date) => date >= new Date(), {
      message: "Start date must be today or in the future",
    }),
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
});

const CreateEventSchema = FormSchema.omit({ id: true }).refine(
  (data) => {
    return data.end_date === null || data.end_date >= data.start_date;
  },
  {
    message: "End date must be the same as or after the start date",
    path: ["end_date"],
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
    event_location?: string[];
    description?: string[];
    start_date?: string[];
    end_date?: string[];
    contact_email?: string[];
    contact_phone?: string[];
  };
  message?: string;
  success: boolean;
};

// test create function
export async function createEvent(prevState: State, formData: FormData) {
  const rawFormData = Object.fromEntries(formData.entries());

  // get values for optional fields
  const rawStartDate = formData.get("start_date");
  const rawEndDate = formData.get("end_date");
  const rawTargetLevel = formData.get("target_level");
  const rawDescription = formData.get("description");
  const rawContactPhone = formData.get("contact_phone");

  // transform date input from string to Date object
  const formatStartDate = rawStartDate
    ? new Date(rawStartDate.toString())
    : null;
  const formatEndDate = rawEndDate ? new Date(rawEndDate.toString()) : null;

  // transform undefined values to null before validating
  const formatTargetLevel = rawTargetLevel ? rawTargetLevel : null;
  const formatDescription = rawDescription ? rawDescription : null;
  const formatContactPhone = rawContactPhone ? rawContactPhone : null;

  const formattedFormData = {
    ...rawFormData,
    target_level: formatTargetLevel,
    description: formatDescription,
    start_date: formatStartDate,
    end_date: formatEndDate,
    contact_phone: formatContactPhone,
  };

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
    event_location,
    description,
    start_date,
    end_date,
    contact_email,
    contact_phone,
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
        event_location,
        description,
        start_date,
        end_date,
        contact_email,
        contact_phone,
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
  const rawFormData = Object.fromEntries(formData.entries());

  // get values for optional fields
  const rawStartDate = formData.get("start_date");
  const rawEndDate = formData.get("end_date");
  const rawTargetLevel = formData.get("target_level");
  const rawDescription = formData.get("description");
  const rawContactPhone = formData.get("contact_phone");

  // transform date input from string to Date object
  const formatStartDate = rawStartDate
    ? new Date(rawStartDate.toString())
    : null;
  const formatEndDate = rawEndDate ? new Date(rawEndDate.toString()) : null;

  // transform undefined values to null before validating
  const formatTargetLevel = rawTargetLevel ? rawTargetLevel : null;
  const formatDescription = rawDescription ? rawDescription : null;
  const formatContactPhone = rawContactPhone ? rawContactPhone : null;

  const formattedFormData = {
    ...rawFormData,
    target_level: formatTargetLevel,
    description: formatDescription,
    start_date: formatStartDate,
    end_date: formatEndDate,
    contact_phone: formatContactPhone,
  };

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
    event_location,
    description,
    start_date,
    end_date,
    contact_email,
    contact_phone,
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
        event_location,
        description,
        start_date,
        end_date,
        contact_email,
        contact_phone,
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
