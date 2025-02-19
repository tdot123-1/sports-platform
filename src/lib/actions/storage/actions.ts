"use server";

import { logoMaxSize } from "@/lib/constants";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export const updateLogoUrl = async (
  eventId: string,
  filePath: string | null
) => {
  try {
    const supabase = await createClient();
    const { error } = await supabase
      .from("events")
      .update({
        event_logo_url: filePath ? filePath : null,
      })
      .eq("id", eventId);

    if (error) {
      console.error("Database error: ", error.code, error.message);
      return { message: `Database error: ${error.message}`, success: false };
    }

    revalidatePath("/events/grid");
    revalidatePath(`/events/${eventId}`);

    revalidatePath("/profile/events");
    revalidatePath(`/profile/events/${eventId}`);
    revalidatePath(`/profile/events/${eventId}/media`);

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
  const filePath = `events/${eventId}/logo-${Date.now()}`;

  const file = formData.get("event_logo");
  const previousFile = formData.get("previous_url");

  if (!(file instanceof File)) {
    return { message: "Incorrect file type", success: false };
  }

  if (!file.size) {
    return { message: "Please select a file to upload", success: false };
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
    if (previousFile) {
      await supabase.storage
        .from("event_logos")
        .remove([previousFile.toString()]);
    }

    const { data, error } = await supabase.storage
      .from("event_logos")
      .upload(filePath, file);

    if (error) {
      console.error("Storage error: ", error.message);
      throw new Error(`Database error: ${error.message}`);
    }

    const result = await updateLogoUrl(eventId, data.path);

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

export const deleteLogoFromStorage = async (
  filePath: string,
  eventId: string
) => {
  // delete file from storage
  try {
    const supabase = await createClient();

    // delete existing logo
    await supabase.storage.from("event_logos").remove([filePath]);

    const result = await updateLogoUrl(eventId, null);

    if (!result.success) {
      console.error("Error updating db column: ", result.message);
      throw new Error(`Error updating logo_url db column: ${result.message}`);
    }

    return { message: "", success: true };
  } catch (error) {
    console.error("Error deleting file: ", error);
    return {
      message: "Failed to delete logo, please try again",
      success: false,
    };
  }
};
