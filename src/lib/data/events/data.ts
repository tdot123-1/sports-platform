"use server";

import { createClient } from "@/lib/supabase/server";

const ITEMS_PER_PAGE = 1;

export const fetchAllEvents = async (
  currentPage: number = 1,
  userId?: string
) => {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  try {
    const supabase = await createClient();

    const { data: events, error } = userId
      ? await supabase
          .from("events")
          .select("*")
          .eq("user_id", userId)
          .range(offset, offset + ITEMS_PER_PAGE - 1)
      : await supabase
          .from("events")
          .select("*")
          .range(offset, offset + ITEMS_PER_PAGE - 1);

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
  searchQuery?: string
) => {
  try {
    const supabase = await createClient();
    let query = supabase
      .from("events")
      .select("*", { count: "exact", head: true });

    if (userId) {
      query = query.eq("user_id", userId);
    }

    if (searchQuery) {
      query = query.or(
        `event_name.ilike.%${searchQuery}%,event_type.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%`
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
