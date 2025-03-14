"use server";

import { ITEMS_PER_PAGE } from "@/lib/constants";
import { createClient } from "@/lib/supabase/server";
import { SportsEvent } from "@/lib/types";
import { convertFetchedEvent } from "@/lib/utils";

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

// fetch all events within bounds of visible map
export const fetchEventsInView = async (
  min_lat: number,
  min_lng: number,
  max_lat: number,
  max_lng: number
) => {
  try {
    const supabase = await createClient();

    // call db function
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

// fetch all events in a city
export const fetchEventsInCity = async (
  address_city: string,
  currentPage: number = 1
) => {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const supabase = await createClient();

    const { data: events, error } = await supabase
      .from("events")
      .select("*")
      .eq("address_city", address_city)
      .range(offset, offset + ITEMS_PER_PAGE - 1);

    if (error) {
      console.error("Postgres error: ", error.message);
      throw new Error(`Database error: ${error.code} ${error.message}`);
    }

    // convert data to sportsevent on server (get dates and public url)
    const sportsEvents: SportsEvent[] = await Promise.all(
      events.map(convertFetchedEvent)
    );

    return { success: true, data: sportsEvents };
  } catch (error) {
    console.error("Error fetching events: ", error);
    return { success: false, data: null };
  }
};
