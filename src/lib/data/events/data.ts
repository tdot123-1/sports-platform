"use server";

import { createClient } from "@/lib/supabase/server";
import { FilterOptions, SortOptions } from "@/lib/types";
import { applyQueryFilters } from "@/lib/utils";

const ITEMS_PER_PAGE = 10;

export const fetchAllEvents = async (
  currentPage: number = 1,
  userId?: string,
  searchQuery?: string,
  filter?: FilterOptions,
  sort?: SortOptions
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

    if (searchQuery) {
      query = query.or(
        `event_name.ilike.%${searchQuery}%,event_type.ilike.%${searchQuery}%,event_description.ilike.%${searchQuery}%,cost_description.ilike.%${searchQuery}%,address_city.ilike.%${searchQuery}%`
      );
    }

    if (sort?.sort_by) {
      query = query.order(sort.sort_by, { ascending: sort.order === "asc" });
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
      .select("*")
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

export const fetchEventsPages = async (
  userId?: string,
  searchQuery?: string,
  filter?: FilterOptions
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
