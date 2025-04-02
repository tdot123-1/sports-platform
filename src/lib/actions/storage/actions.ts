"use server";

import { IMG_MAX_SIZE } from "@/lib/constants";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

// set bucket names in vars (in case the name changes at some point)
const imagesBucket = "event_images";
const logosBucket = "event_logos";

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

// (!) NOT USED
export type UploadFormState = {
  message: string;
  success: boolean;
};

// (!) NOT USED
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

export const deleteLogoFromStorage = async (
  filePath: string,
  eventId: string
) => {
  // delete file from storage
  try {
    const supabase = await createClient();

    // delete existing logo
    await supabase.storage.from(logosBucket).remove([filePath]);

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

//(!) NOT USED
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

    // delete image from storage
    await supabase.storage.from(imagesBucket).remove([filePath]);

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

// (!) NOT USED
export const deleteAllImages = async (
  eventId: string,
  logo_filepath?: string | null
) => {
  try {
    const supabase = await createClient();

    const folderPath = `events/${eventId}/`;
    const bucket = "event_images";

    // delete event images
    const { data: eventImages, error: eventImagesError } =
      await supabase.storage.from(bucket).list(folderPath);

    if (eventImagesError) {
      console.error("Error listing event images folder: ", eventImagesError);
      return false;
    }

    if (!eventImages || eventImages.length === 0) {
      console.log("No images found for event.");
      return true;
    }

    const filePaths = eventImages.map((file) => `${folderPath}${file.name}`);

    const { error: deleteError } = await supabase.storage
      .from(bucket)
      .remove(filePaths);

    if (deleteError) {
      console.error("error deleting files: ", deleteError);
      return false;
    }

    // delete existing logo
    if (logo_filepath) {
      const { error: logoDeleteError } = await supabase.storage
        .from("event_logos")
        .remove([logo_filepath]);

      if (logoDeleteError) {
        console.error("Error deleting logo from storage: ", logoDeleteError);
      } else {
        console.log("Event logo deleted");
      }
    }

    console.log("All images deleted");

    return true;
  } catch (error) {
    console.error("Unexpected storage error: ", error);
    return false;
  }
};

// delete all storage files when an event is deleted
export const deleteAllImagesForEvent = async (
  eventId: string,
  logo_filepath?: string | null
) => {
  try {
    const supabase = await createClient();

    // query db images table to get all file paths related to event
    const { data: images, error: imagesError } = await supabase
      .from("event_images")
      .select("image_url")
      .eq("event_id", eventId);

    // check for db error
    if (imagesError) {
      console.error("Error getting images from db: ", imagesError);
      return false;
    }

    // check if any images were found
    if (!images || images.length === 0) {
      console.log("No images found for this event");
      return true;
    }

    // get array of filepaths
    const filePaths = images.map((img) => img.image_url);

    // delete files from storage
    const { error: deleteImgError } = await supabase.storage
      .from(imagesBucket)
      .remove(filePaths);

    // check for storage error
    if (deleteImgError) {
      console.error("Error deleting images from storage: ", deleteImgError);
      return false;
    } else {
      console.log("Event images deleted");
    }

    // delete existing logo
    if (logo_filepath) {
      const { error: logoDeleteError } = await supabase.storage
        .from(logosBucket)
        .remove([logo_filepath]);

      if (logoDeleteError) {
        console.error("Error deleting logo from storage: ", logoDeleteError);
        return false;
      } else {
        console.log("Event logo deleted");
      }
    }

    console.log("All storage files for event deleted");

    return true;
  } catch (error) {
    console.error("Unexpected storage error: ", error);
    return false;
  }
};

// delete all storage files uploaded by user when profile is deleted
export const deleteAllImagesForUser = async (userId: string) => {
  try {
    const supabase = await createClient();

    // query db images table to get all file paths uploaded by user
    const { data: images, error: imagesError } = await supabase
      .from("event_images")
      .select("image_url")
      .eq("user_id", userId);

    // check for db error
    if (imagesError) {
      console.error("Error getting images from db: ", imagesError);
      return false;
    }

    // check if any images were found
    if (!images || images.length === 0) {
      console.log("No images found for this user");
    } else {
      // get array of filepaths
      const filePaths = images.map((img) => img.image_url);

      // delete files from storage
      const { error: deleteImgError } = await supabase.storage
        .from(imagesBucket)
        .remove(filePaths);

      // check for storage error
      if (deleteImgError) {
        console.error("Error deleting images from storage: ", deleteImgError);
        return false;
      } else {
        console.log("Event images deleted");
      }
    }

    // query db events table to get all file paths of logos uploaded by user
    const { data: logos, error: logosError } = await supabase
      .from("events")
      .select("event_logo_url")
      .eq("user_id", userId);

    // check for db error
    if (logosError) {
      console.error("Error getting logos from db: ", logosError);
      return false;
    }

    // check if any logos were found
    if (!logos || logos.length === 0) {
      console.log("No logos found for this event");
    } else {
      // get array of filepaths
      const logoFilePaths = logos.map((img) => img.event_logo_url);

      // delete files from storage
      const { error: deleteLogoError } = await supabase.storage
        .from(logosBucket)
        .remove(logoFilePaths);

      // check for storage error
      if (deleteLogoError) {
        console.error("Error deleting logos from storage: ", deleteLogoError);
        return false;
      } else {
        console.log("Event logos deleted");
      }
    }

    console.log("All user uploaded files deleted");
    return true;
  } catch (error) {
    console.error("Unexpected storage error: ", error);
    return false;
  }
};
