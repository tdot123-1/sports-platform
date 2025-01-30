"use server";

import { createClient } from "@/lib/supabase/server";
import { SportsEventTypeArray } from "@/lib/types";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const FormSchema = z.object({
  id: z.string().uuid(),
  event_name: z
    .string({
      invalid_type_error: "Please add a name for your event",
    })
    .min(3, { message: "Event name must be at least 3 characters" })
    .max(254, { message: "Maximum characters exceeded" }),
  event_type: z.enum([...SportsEventTypeArray] as [string, ...string[]], {
    invalid_type_error: "Please select an event type",
  }),
});

// test create function
export async function createEvent(formData: FormData) {
  const rawFormData = Object.fromEntries(formData.entries());

  const {
    name,
    type,
    age,
    level,
    gender,
    location,
    description,
    start,
    end,
    email,
    phone,
  } = rawFormData;

  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from("events").insert([
      {
        event_name: name,
        event_type: type,
        target_age: age,
        target_level: level,
        target_gender: gender,
        event_location: location,
        description: description,
        start_date: start,
        end_date: end,
        contact_email: email,
        contact_phone: phone,
      },
    ]);

    if (error) {
      throw new Error(`Error inserting event: ${error.message}`);
    }

    console.log("Event added: ", data);
    revalidatePath("/events");
    // return { success: true };
  } catch (error) {
    console.error("Error creating event: ", error);
    // return { success: false };
  }
}
