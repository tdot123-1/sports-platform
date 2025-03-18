"use server";

import { ITEMS_ON_MAP, ITEMS_PER_PAGE } from "@/lib/constants";
import { createClient } from "@/lib/supabase/server";
import { SportsEvent } from "@/lib/types";
import { convertFetchedEvent } from "@/lib/utils";

// (TEST) fetch all events on map (need to update to fetch events within radius)
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

// (NOT USED) fetch all events within bounds of visible map
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

// fetch events on unique locations with pagination
export const fetchUniqueEventsInView = async (
  min_lat: number,
  min_lng: number,
  max_lat: number,
  max_lng: number,
  center_lat: number,
  center_lng: number,
  currentBatch: number = 1
) => {
  const offset_count = (currentBatch - 1) * ITEMS_ON_MAP;
  const limit_count = ITEMS_ON_MAP;

  try {
    const supabase = await createClient();

    // call db function
    // handles order and pagination
    const { data: events, error } = await supabase.rpc(
      "paginated_event_locations_in_view",
      {
        min_lat,
        min_lng,
        max_lat,
        max_lng,
        center_lat,
        center_lng,
        limit_count,
        offset_count,
      }
    );

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

// fetch events within view + total count
export const fetchEventsInViewAndCount = async (
  min_lat: number,
  min_lng: number,
  max_lat: number,
  max_lng: number,
  center_lat: number,
  center_lng: number
) => {
  // only fetch initial batch 
  const offset_count = 0;
  const limit_count = ITEMS_ON_MAP;

  try {
    const supabase = await createClient();

    // call db function
    // handles order and pagination
    // pass bounds of map, center point to decide order, limit + offset
    const { data, error } = await supabase.rpc(
      "paginated_event_locations_with_count",
      {
        min_lat,
        min_lng,
        max_lat,
        max_lng,
        center_lat,
        center_lng,
        limit_count,
        offset_count,
      }
    );

    if (error) {
      console.error("Postgres error: ", error.message);
      throw new Error(`Database error: ${error.code} ${error.message}`);
    }

    const totalCount = data.length > 0 ? data[0].total_count : 0;

    return { events: data || [], totalCount };
  } catch (error) {
    console.error("Error fetching events: ", error);
    throw new Error(`Error fetching events: ${error}`);
  }
};

// fetch all events in a city (dialog when pin on map is clicked)
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

// get number of pages for specific city 
export const fetchTotalPagesInCity = async (address_city: string) => {
  try {
    const supabase = await createClient();

    const { count, error } = await supabase
      .from("events")
      .select("id", { count: "exact", head: true })
      .eq("address_city", address_city);

    if (error) {
      console.error("Error fetching event count:", error.message, error.code);
      throw new Error(`Error fetching event count: ${error.message}`);
    }

    const totalPages = Math.ceil(Number(count || 1) / ITEMS_PER_PAGE);

    return { totalPages, count: count || 1 };
  } catch (error) {
    console.error("Error fetching pages: ", error);
    return { totalPages: 1, count: 1 };
  }
};
