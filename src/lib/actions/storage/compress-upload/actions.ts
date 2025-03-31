"use server";

import { IMG_MAX_SIZE } from "@/lib/constants";
import { createClient } from "@/lib/supabase/server";
import { insertImageUrl, updateLogoUrl } from "../actions";

export const uploadCompressedImage = async (file: File, eventId: string) => {
  const filePath = `events/${eventId}/image-${Date.now()}`;

  if (!(file instanceof File)) {
    return { message: "Incorrect file type", success: false };
  }

  if (!file.size) {
    return { message: "Please select a file to upload", success: false };
  }

  if (file.size > IMG_MAX_SIZE) {
    return {
      message: "File size exceeds 1MB. Please upload a smaller file",
      success: false,
    };
  }
  try {
    const supabase = await createClient();

    const { count } = await supabase
      .from("event_images")
      .select("*", { count: "exact", head: true })
      .eq("event_id", eventId);

    if (count && count >= 3) {
      return {
        message: "You can only upload up to 3 images per event.",
        success: false,
      };
    }

    const { data, error } = await supabase.storage
      .from("event_images")
      .upload(filePath, file);

    if (error) {
      console.error("Storage error: ", error.message);
      throw new Error(`Database error: ${error.message}`);
    }

    const result = await insertImageUrl(data.path, eventId);

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

export const uploadCompressedLogo = async (
  file: File,
  eventId: string,
  previousFile?: string | null
) => {
  const filePath = `events/${eventId}/logo-${Date.now()}`;

  if (!(file instanceof File)) {
    return { message: "Incorrect file type", success: false };
  }

  if (!file.size) {
    return { message: "Please select a file to upload", success: false };
  }

  if (file.size > IMG_MAX_SIZE) {
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
