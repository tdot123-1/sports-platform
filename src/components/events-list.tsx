import { fetchAllEvents } from "@/lib/data/events/data";
import { SportsEvent } from "@/lib/types";
import { convertFetchedEvent } from "@/lib/utils";
import { Button } from "./ui/button";
import Link from "next/link";
import EventCard from "./events/event-card";

interface EventsListProps {
  userId?: string;
  currentPage?: number;
}

const EventsList = async ({ userId, currentPage = 1 }: EventsListProps) => {
  const fetchedEvents = userId
    ? await fetchAllEvents(currentPage, userId)
    : await fetchAllEvents(currentPage);

  const events: SportsEvent[] = fetchedEvents.map((event) =>
    convertFetchedEvent(event)
  );

  return (
    <>
      <div className="py-6">
        <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {events.map((event) => (
            <li key={event.id}>
              <EventCard event={event} userId={userId ? userId : undefined} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default EventsList;
