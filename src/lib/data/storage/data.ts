"use server";

import { createClient } from "@/lib/supabase/server";
import { EventImage } from "@/lib/types";

export const fetchEventLogo = async (filePath: string) => {
  try {
    const supabase = await createClient();

    const { data } = supabase.storage
      .from("event_logos")
      .getPublicUrl(filePath);

    return data.publicUrl;
  } catch (error) {
    console.error("Error fetching event logo: ", error);
    return null;
  }
};

export const fetchImagePublicUrls = async (filePaths: EventImage[]) => {
  if (filePaths.length === 0) {
    return [];
  }

  try {
    const supabase = await createClient();

    // map each file path to its public URL
    const urls = filePaths.map((path) => ({
      filePath: path.image_url,
      publicUrl: supabase.storage
        .from("event_images")
        .getPublicUrl(path.image_url).data.publicUrl,
    }));

    // returns an array of { filePath, publicUrl } objects
    return urls;
  } catch (error) {
    console.error("Error fetching event images: ", error);
    return [];
  }
};
