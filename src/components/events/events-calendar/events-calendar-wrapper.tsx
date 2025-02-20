import { fetchAllEvents } from "@/lib/data/events/data";
import { SportsEvent } from "@/lib/types";
import { convertFetchedEvent } from "@/lib/utils";
import EventsCalendar from "./events-calendar";

const EventsCalendarWrapper = async () => {
  const fetchedEvents = await fetchAllEvents();

  const events: SportsEvent[] = fetchedEvents.map((event) =>
    convertFetchedEvent(event)
  );

  const filteredEvents = events
    .filter((event) => event.start_date !== null)
    .map((e) => ({
      title: e.event_name,
      start: e.start_date,
      //   end: e.end_date ? e.end_date : e.start_date,
      end: e.start_date,
    }));
  return (
    <>
      <EventsCalendar eventList={filteredEvents} />
    </>
  );
};

export default EventsCalendarWrapper;
