"use server";

import { createClient } from "@/lib/supabase/server";

export const fetchEventLogo = async (filePath: string) => {
  try {
    const supabase = await createClient();

    const { data } = supabase.storage
      .from("event_logos")
      .getPublicUrl(filePath);

    return data.publicUrl;
  } catch (error) {
    console.error("Error fetching event logo: ", error);
  }
};
