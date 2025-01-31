import { fetchAllEvents } from "@/lib/data/events/data";
import { SportsEvent } from "@/lib/types";
import { convertFetchedEvent } from "@/lib/utils";
import { Button } from "./ui/button";
import Link from "next/link";

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
      <div>
        <ul>
          {events.map((event) => (
            <li key={event.id} className="border border-zinc-700 p-3 m-2">
              <h2>{event.event_name}</h2>
              <p>{event.description}</p>
              <p>Location: {event.event_location}</p>
              <p>Start date: {event.start_date.toLocaleDateString()}</p>
              <Link
                href={
                  userId ? `/profile/events/${event.id}` : `/events/${event.id}`
                }
              >
                <Button>Details</Button>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default EventsList;
