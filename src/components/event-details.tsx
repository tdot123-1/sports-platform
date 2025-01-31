import { fetchOneEvent } from "@/lib/data/events/data";
import { SportsEvent } from "@/lib/types";
import { convertFetchedEvent } from "@/lib/utils";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "./ui/button";

interface EventDetailsProps {
  eventId: string;
}

const EventDetails = async ({ eventId }: EventDetailsProps) => {
  // fetch event
  const fetchedEvent = await fetchOneEvent(eventId);

  if (!fetchedEvent) {
    return notFound();
  }

  const event: SportsEvent = convertFetchedEvent(fetchedEvent);

  return (
    <>
      <div>
        <h3>{event.event_name}</h3>
        <ul>
          <li>{event.event_type}</li>
          <li>{event.description}</li>
          <li>{event.start_date.toLocaleDateString()}</li>
          <li>{event.event_location}</li>
        </ul>
        <Link href={`/profile/events/${event.id}/edit`}>
          <Button>Edit</Button>
        </Link>
      </div>
    </>
  );
};

export default EventDetails;
