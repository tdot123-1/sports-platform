"use server";

import { createClient } from "@/lib/supabase/server";

export const insertLogoUrl = async (eventId: string, filePath: string) => {
  try {
    const supabase = await createClient();
    const { error } = await supabase
      .from("events")
      .update({
        event_logo_url: filePath,
      })
      .eq("id", eventId);

    if (error) {
      console.error("Database error: ", error.code, error.message);
      return { success: false };
    }

    return { success: true };
  } catch (error) {
    console.error("Error updating event: ", error);
    return { success: false };
  }
};

export type FormState = {
  message: string;
  success: boolean;
};

export const uploadLogo = async (
  eventId: string,
  prevState: FormState,
  formData: FormData
) => {
  const filePath = `events/${eventId}/logo`;

  const file = formData.get("file");

  if (!(file instanceof File)) {
    return { message: "Incorrect file type", success: false };
  }
  try {
    const supabase = await createClient();

    // delete existing logo
    await supabase.storage.from("event_logos").remove([filePath]);

    const { data, error } = await supabase.storage
      .from("event_logos")
      .upload(filePath, file);

    if (error) {
        // HERE IS THE ERROR THROWN
      console.error("Database error: ", error.message);
      throw new Error(`Database error: ${error.message}`);
    }

    console.log("path: ", data.path);
    console.log("full path: ", data.fullPath);

    const result = await insertLogoUrl(eventId, data.path);

    if (!result.success) {
      throw new Error("Error updating event in db");
    }

    return { message: "", success: true };
  } catch (error) {
    console.error("Error uploading file: ", error);
    return {
      message: "Error uploading file, please try again.",
      success: false,
    };
  }
};
