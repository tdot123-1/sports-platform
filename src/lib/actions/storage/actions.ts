"use server";

import { logoMaxSize } from "@/lib/constants";
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
      return { message: `Database error: ${error.message}`, success: false };
    }

    return { success: true };
  } catch (error) {
    console.error("Error updating event: ", error);
    return { message: "An unexpected error occurred", success: false };
  }
};

export type UploadFormState = {
  message: string;
  success: boolean;
};

export const uploadLogo = async (
  eventId: string,
  prevState: UploadFormState,
  formData: FormData
) => {
  const filePath = `events/${eventId}/logo`;

  const file = formData.get("event_logo"); // get correct name

  if (!(file instanceof File)) {
    return { message: "Incorrect file type", success: false };
  }

  if (file.size > logoMaxSize) {
    return {
      message: "File size exceeds 2MB. Please upload a smaller file",
      success: false,
    };
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
      console.error("Storage error: ", error.message);
      throw new Error(`Database error: ${error.message}`);
    }

    // console.log("path: ", data.path);
    // console.log("full path: ", data.fullPath);

    const result = await insertLogoUrl(eventId, data.path);

    if (!result.success) {
      return {
        message:
          result.message || "An unexpected error occurred, please try again",
        success: false,
      };
    }

    return { message: "", success: true };
  } catch (error) {
    console.error("Error uploading file: ", error);
    return {
      message: "An unexpected error occurred, please try again",
      success: false,
    };
  }
};
