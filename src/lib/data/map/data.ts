"use server";

import { createClient } from "@/lib/supabase/server";

// TEST fetch all events on map (need to update to fetch events within radius)
export const fetchAllEventsOnMap = async () => {
  try {
    const supabase = await createClient();

    const { data: events, error } = await supabase
      .from("events")
      .select("*")
      .limit(50);

    if (error) {
      console.error("Postgres error: ", error.message);
      throw new Error(`Database error: ${error.code} ${error.message}`);
    }

    return events;
  } catch (error) {
    console.error("Error fetching events: ", error);
    throw new Error(`Error fetching events: ${error}`);
  }
};

export const fetchEventsInView = async (
  min_lat: number,
  min_lng: number,
  max_lat: number,
  max_lng: number
) => {
  try {
    const supabase = await createClient();

    const { data: events, error } = await supabase
      .rpc("events_in_view", {
        min_lat,
        min_lng,
        max_lat,
        max_lng,
      })
      .limit(50);

    if (error) {
      console.error("Postgres error: ", error.message);
      throw new Error(`Database error: ${error.code} ${error.message}`);
    }

    return events || [];
  } catch (error) {
    console.error("Error fetching events: ", error);
    throw new Error(`Error fetching events: ${error}`);
  }
};
