"use server";

import { createClient } from "@/lib/supabase/server";

const ITEMS_PER_PAGE = 10;

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
      console.error("Postgres error: ", error.message);
      throw new Error(error.message);
    }

    return event;
  } catch (error) {
    console.error("Error fetching event: ", error);
    throw new Error(`Error fetching event: ${error}`);
  }
};
