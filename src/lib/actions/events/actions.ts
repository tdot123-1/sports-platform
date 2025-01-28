"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

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
