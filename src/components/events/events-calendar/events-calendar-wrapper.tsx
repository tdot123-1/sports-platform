import { SportsEvent } from "@/lib/types";
import { convertFetchedEvent } from "@/lib/utils";
import EventsCalendar from "./events-calendar";
import {
  fetchEventsBatches,
  fetchEventsPerMonth,
} from "@/lib/data/events/data";

interface EventsCalendarWrapperProps {
  month: number;
  year: number;
  batch: number;
}

const EventsCalendarWrapper = async ({
  month,
  year,
  batch,
}: EventsCalendarWrapperProps) => {
  const fetchedEvents = await fetchEventsPerMonth(month, year, batch);

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

  const totalBatches = await fetchEventsBatches(month, year);

  console.log("Events: ", filteredEvents.length);
  return (
    <>
      <EventsCalendar
        month={month}
        year={year}
        eventList={filteredEvents}
        batch={batch}
        totalBatches={totalBatches}
      />
    </>
  );
};

export default EventsCalendarWrapper;
