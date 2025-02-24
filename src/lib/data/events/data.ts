"use server";

import { createClient } from "@/lib/supabase/server";
import { FilterOptions, SortOptions } from "@/lib/types";
import { applyQueryFilters } from "@/lib/utils";

const ITEMS_PER_PAGE = 10;

const ITEMS_PER_MONTH = 25;

export const fetchAllEvents = async (
  currentPage: number = 1,
  userId?: string,
  searchQuery?: string,
  filter?: FilterOptions,
  sort?: SortOptions,
  priceFilter?: number
) => {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  try {
    const supabase = await createClient();

    let query = supabase.from("events").select("*");

    if (userId) {
      query = query.eq("user_id", userId);
    }

    if (filter) {
      query = applyQueryFilters(query, filter);
    }

    if (priceFilter !== undefined) {
      query = query.lte("cost_estimate", priceFilter * 100);
    }

    if (searchQuery) {
      query = query.or(
        `event_name.ilike.%${searchQuery}%,event_type.ilike.%${searchQuery}%,event_description.ilike.%${searchQuery}%,cost_description.ilike.%${searchQuery}%,address_city.ilike.%${searchQuery}%`
      );
    }

    if (sort?.sort_by) {
      query = query.order(sort.sort_by, { ascending: sort.order === "asc" });
    } else {
      query = query.order("inserted_at", { ascending: false });
    }

    const { data: events, error } = await query.range(
      offset,
      offset + ITEMS_PER_PAGE - 1
    );

    if (error) {
      console.error("Postgres error: ", error.message);
      throw new Error(error.message);
    }

    return events;
  } catch (error) {
    console.error("Error fetching events: ", error);
    throw new Error(`Error fetching events: ${error}`);
  }
};

export const fetchOneEvent = async (eventId: string) => {
  try {
    const supabase = await createClient();

    const { data: event, error } = await supabase
      .from("events")
      .select("*, event_images(image_url)")
      .eq("id", eventId)
      .single();

    if (error) {
      console.error("Postgres error: ", error.code);
      if (error.code === "PGRST116") {
        console.error(error.message);
        return null;
      }

      throw new Error(error.message);
    }

    return event;
  } catch (error) {
    console.error("Error fetching event: ", error);
    throw new Error(`Error fetching event: ${error}`);
  }
};

export const fetchNewEvents = async () => {
  try {
    const supabase = await createClient();

    const { data: events, error } = await supabase
      .from("events")
      .select("*")
      .order("updated_at", { ascending: false })
      .range(0, 5);

    if (error) {
      console.error("Postgres error: ", error.message);
      throw new Error(`Database error: ${error.code} ${error.message}`);
    }

    return events;
  } catch (error) {
    console.error("Error fetching newest events: ", error);
    return [];
  }
};

export const fetchEventsPages = async (
  userId?: string,
  searchQuery?: string,
  filter?: FilterOptions,
  priceFilter?: number
) => {
  try {
    const supabase = await createClient();
    let query = supabase
      .from("events")
      .select("*", { count: "exact", head: true });

    if (userId) {
      query = query.eq("user_id", userId);
    }

    if (filter) {
      query = applyQueryFilters(query, filter);
    }

    if (priceFilter !== undefined) {
      query = query.lte("cost_estimate", priceFilter * 100);
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

    return totalPages;
  } catch (error) {
    console.error("Error fetching pages: ", error);
    throw new Error(`Error fetching pages: ${error}`);
  }
};

export const fetchMaxCostEstimate = async () => {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("events")
      .select("cost_estimate")
      .order("cost_estimate", { ascending: false })
      .limit(1);

    if (error) {
      console.error("Error fetching max cost estimate:", error.message);
      return 1000; // default fallback max
    }

    // return actual max or fallback
    return data?.[0]?.cost_estimate
      ? Math.ceil(data[0].cost_estimate / 100)
      : 1000;
  } catch (error) {
    console.error("Unexpected error fetching max cost estimate: ", error);
    return 1000;
  }
};

export const fetchEventsPerMonth = async (
  month: number,
  year: number,
  currentBatch: number = 1
) => {
  const offset = (currentBatch - 1) * ITEMS_PER_MONTH;

  // get first day of month
  const start = new Date(year, month - 1, 1).toISOString().split("T")[0];

  // get last day of month
  const end = new Date(year, month, 0).toISOString().split("T")[0];

  try {
    const supabase = await createClient();

    const { data: events, error } = await supabase
      .from("events")
      .select("*")
      .not("start_date", "is", null)
      .gte("start_date", start)
      .lte("start_date", end)
      .order("start_date")
      .range(offset, offset + ITEMS_PER_MONTH - 1);

    if (error) {
      console.error("Postgres error: ", error.message);
      throw new Error(error.message);
    }

    return events;
  } catch (error) {
    console.error("Error fetching calendar events: ", error);
    throw new Error(`Error fetching calendar events: ${error}`);
  }
};
