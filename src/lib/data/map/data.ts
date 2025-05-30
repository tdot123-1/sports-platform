"use server";

import { MapCoords } from "@/components/events/map/map-wrapper";
import { ITEMS_ON_MAP, ITEMS_PER_PAGE } from "@/lib/constants";
import { applyQueryFilters } from "@/lib/filters";
import { createClient } from "@/lib/supabase/server";
import { FilterOptions, SportsEvent } from "@/lib/types";
import { convertFetchedEvent } from "@/lib/utils";

// fetch unique events within bounds (+ filters, query, pagination)
export const fetchEventsInView = async (
  mapCoords: MapCoords,
  currentBatch: number = 1,
  searchQuery?: string,
  filter?: FilterOptions,
  priceFilter?: number,
  passedEventsFilter: boolean = false
) => {
  // pagination
  const offset_count = (currentBatch - 1) * ITEMS_ON_MAP;
  const limit_count = ITEMS_ON_MAP;

  // extract map coords
  // center
  const { lat: center_lat, lng: center_lng } = mapCoords.center;
  // bounds
  const {
    south: min_lat,
    west: min_lng,
    north: max_lat,
    east: max_lng,
  } = mapCoords.bounds;

  // extract filter values, set value or null, name vars according to sql function
  const event_types = filter?.event_type?.length ? filter.event_type : null;
  const target_genders = filter?.target_gender?.length
    ? filter.target_gender
    : null;
  const target_ages = filter?.target_age?.length ? filter.target_age : null;
  const target_levels = filter?.target_level?.length
    ? filter.target_level
    : null;

  const event_statuses = filter?.event_status?.length
    ? filter.event_status
    : null;

  // special filters (price, passed events)
  const price_filter = priceFilter ?? null;
  const passed_events = passedEventsFilter;

  // search query
  const search_query = searchQuery || null;

  try {
    const supabase = await createClient();

    const { data: events, error } = await supabase.rpc(
      "fetch_event_locations_in_view",
      {
        min_lat,
        min_lng,
        max_lat,
        max_lng,
        center_lat,
        center_lng,
        limit_count,
        offset_count,
        event_types,
        target_genders,
        target_ages,
        target_levels,
        event_statuses,
        price_filter,
        passed_events,
        search_query,
      }
    );

    if (error) {
      console.error("Postgres error: ", error.message);
      throw new Error(`Database error: ${error.code} ${error.message}`);
    }

    // throw new Error("TEST")

    return events || [];
  } catch (error) {
    console.error("Error fetching events: ", error);
    throw new Error(`Error fetching events: ${error}`);
  }
};

export const fetchEventsInViewCount = async (
  mapCoords: MapCoords,
  searchQuery?: string,
  filter?: FilterOptions,
  priceFilter?: number,
  passedEventsFilter: boolean = false
) => {
  // extract map coords
  // bounds
  const {
    south: min_lat,
    west: min_lng,
    north: max_lat,
    east: max_lng,
  } = mapCoords.bounds;

  // extract filter values, set value or null, name vars according to sql function
  const event_types = filter?.event_type?.length ? filter.event_type : null;
  const target_genders = filter?.target_gender?.length
    ? filter.target_gender
    : null;
  const target_ages = filter?.target_age?.length ? filter.target_age : null;
  const target_levels = filter?.target_level?.length
    ? filter.target_level
    : null;

  const event_statuses = filter?.event_status?.length
    ? filter.event_status
    : null;

  // special filters (price, passed events)
  const price_filter = priceFilter ?? null;
  const passed_events = passedEventsFilter;

  // search query
  const search_query = searchQuery || null;

  try {
    const supabase = await createClient();

    const { data, error } = await supabase.rpc(
      "count_event_locations_in_view",
      {
        min_lat,
        min_lng,
        max_lat,
        max_lng,
        event_types,
        target_genders,
        target_ages,
        target_levels,
        event_statuses,
        price_filter,
        passed_events,
        search_query,
      }
    );

    if (error) {
      console.error("Postgres error: ", error.message);
      throw new Error(`Database error: ${error.code} ${error.message}`);
    }

    const totalEvents = data ?? 0;

    const totalBatches = Math.ceil(Number(totalEvents) / ITEMS_ON_MAP);

    return { totalEvents, totalBatches };
  } catch (error) {
    console.error("Error fetching events: ", error);
    throw new Error(`Error fetching events: ${error}`);
  }
};

// (!) NOT USED
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

    // throw new Error("TEST")

    return events || [];
  } catch (error) {
    console.error("Error fetching events: ", error);
    throw new Error(`Error fetching events: ${error}`);
  }
};

// (!) NOT USED
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

    // throw new Error("TEST")

    return { events: data || [], totalCount };
  } catch (error) {
    console.error("Error fetching events: ", error);
    throw new Error(`Error fetching events: ${error}`);
  }
};

// fetch all events in a city (dialog when pin on map is clicked)
export const fetchEventsInCity = async (
  address_city: string,
  currentPage: number = 1,
  searchQuery?: string,
  filter?: FilterOptions,
  priceFilter?: number,
  passedEventsFilter?: boolean
) => {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  const today = new Date().toISOString().split("T")[0];

  try {
    const supabase = await createClient();

    let query = supabase.from("events").select("*");

    query.eq("address_city", address_city);

    if (!passedEventsFilter) {
      query = query.or("start_date.is.null,start_date.gte." + today);
    }

    if (filter) {
      query = applyQueryFilters(query, filter);
    }

    if (priceFilter !== undefined) {
      const maxPrice = priceFilter * 100;
      query = query.or(
        `cost_estimate_eur.lte.${maxPrice},cost_estimate_eur.is.null`
      );
    }

    if (searchQuery) {
      query = query.or(
        `event_name.ilike.%${searchQuery}%,event_type.ilike.%${searchQuery}%,event_description.ilike.%${searchQuery}%,cost_description.ilike.%${searchQuery}%,address_city.ilike.%${searchQuery}%`
      );
    }

    const { data: events, error } = await query.range(
      offset,
      offset + ITEMS_PER_PAGE - 1
    );

    // const { data: events, error } = await supabase
    //   .from("events")
    //   .select("*")
    //   .eq("address_city", address_city)
    //   .range(offset, offset + ITEMS_PER_PAGE - 1);

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
export const fetchTotalPagesInCity = async (
  address_city: string,
  searchQuery?: string,
  filter?: FilterOptions,
  priceFilter?: number,
  passedEventsFilter?: boolean
) => {
  const today = new Date().toISOString().split("T")[0];

  try {
    const supabase = await createClient();

    // const { count, error } = await supabase
    //   .from("events")
    //   .select("id", { count: "exact", head: true })
    //   .eq("address_city", address_city);

    let query = supabase
      .from("events")
      .select("id", { count: "exact", head: true });

    query.eq("address_city", address_city);

    if (!passedEventsFilter) {
      query = query.or("start_date.is.null,start_date.gte." + today);
    }

    if (filter) {
      query = applyQueryFilters(query, filter);
    }

    if (priceFilter !== undefined) {
      const maxPrice = priceFilter * 100;
      query = query.or(
        `cost_estimate_eur.lte.${maxPrice},cost_estimate_eur.is.null`
      );
    }

    if (searchQuery) {
      query = query.or(
        `event_name.ilike.%${searchQuery}%,event_type.ilike.%${searchQuery}%,event_description.ilike.%${searchQuery}%,cost_description.ilike.%${searchQuery}%,address_city.ilike.%${searchQuery}%`
      );
    }

    const { count, error } = await query;

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
