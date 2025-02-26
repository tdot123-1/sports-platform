import { FilterOptions, SportsEvent } from "@/lib/types";
import { convertFetchedEvent } from "@/lib/utils";
import EventsCalendar from "./events-calendar";
import {
  fetchEventsBatches,
  fetchEventsPerMonth,
  fetchMaxCostEstimate,
} from "@/lib/data/events/data";

interface EventsCalendarWrapperProps {
  month: number;
  year: number;
  batch: number;
  filter?: FilterOptions;
  priceFilter?: number;
}

const EventsCalendarWrapper = async ({
  month,
  year,
  batch,
  filter,
  priceFilter,
}: EventsCalendarWrapperProps) => {
  const fetchedEvents = await fetchEventsPerMonth(
    month,
    year,
    batch,
    filter,
    priceFilter
  );

  const events: SportsEvent[] = await Promise.all(
    fetchedEvents.map(convertFetchedEvent)
  );

  const filteredEvents = events
    .filter((event) => event.start_date !== null)
    .map((e) => ({
      title: e.event_name,
      start: e.start_date!,
      //   end: e.end_date ? e.end_date : e.start_date,
      end: e.start_date,
      id: e.id,
      event_type: e.event_type,
      address_city: e.address_city,
      address_country: e.address_country,
      event_logo_url: e.event_logo_url,
    }));

  const totalBatches = await fetchEventsBatches(
    month,
    year,
    filter,
    priceFilter
  );

  const maxCostEstimate = await fetchMaxCostEstimate();

  console.log("Events: ", filteredEvents.length);
  return (
    <>
      <EventsCalendar
        month={month}
        year={year}
        eventList={filteredEvents}
        totalBatches={totalBatches}
        maxPrice={maxCostEstimate}
      />
    </>
  );
};

export default EventsCalendarWrapper;
