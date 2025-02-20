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
    console.error("Error updating event logo url: ", error);
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

export const insertImageUrl = async (filePath: string, eventId: string) => {
  try {
    const supabase = await createClient();

    // get the current user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      console.error("Error fetching user: ", userError?.message);
      return {
        message: "Failed to fetch user information. Please try again.",
        success: false,
      };
    }

    const { error } = await supabase.from("event_images").insert({
      event_id: eventId,
      image_url: filePath,
      user_id: user?.id,
    });

    if (error) {
      console.error("Database error on insert event image: ", error.message);
      return { message: `Database error: ${error.message}`, success: false };
    }

    revalidatePath(`/events/${eventId}`);
    revalidatePath(`/profile/events/${eventId}`);
    revalidatePath(`/profile/events/${eventId}/media`);

    return { message: "", success: true };
  } catch (error) {
    console.error("Error inserting image url into db: ", error);
    return { message: "An unexpected error occurred", success: false };
  }
};

export const uploadImage = async (
  eventId: string,
  prevState: UploadFormState,
  formData: FormData
) => {
  const filePath = `events/${eventId}/image-${Date.now()}`;

  const file = formData.get("event_image");

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

export const deleteImageUrl = async (filePath: string, eventId: string) => {
  try {
    const supabase = await createClient();
    const { error } = await supabase
      .from("event_images")
      .delete()
      .eq("event_id", eventId)
      .eq("image_url", filePath);

    if (error) {
      console.error("Error deleting image url: ", error.message);
      return { success: false, message: `Database error: ${error.message}` };
    }

    revalidatePath(`/events/${eventId}`);
    revalidatePath(`/profile/events/${eventId}`);
    revalidatePath(`/profile/events/${eventId}/media`);

    return { success: true };
  } catch (error) {
    console.error("Error deleting image url: ", error);
    return { message: "An unexpected error occurred", success: false };
  }
};

export const deleteImageFromStorage = async (
  filePath: string,
  eventId: string
) => {
  // delete file from storage
  try {
    const supabase = await createClient();

    // delete existing logo
    await supabase.storage.from("event_images").remove([filePath]);

    const result = await deleteImageUrl(filePath, eventId);

    if (!result.success) {
      console.error("Error updating db column: ", result.message);
      throw new Error(`Error updating logo_url db column: ${result.message}`);
    }

    return { message: "", success: true };
  } catch (error) {
    console.error("Error deleting file: ", error);
    return {
      message: "Failed to delete image, please try again",
      success: false,
    };
  }
};
