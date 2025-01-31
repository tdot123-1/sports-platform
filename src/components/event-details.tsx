import { fetchOneEvent } from "@/lib/data/events/data";
import { SportsEvent } from "@/lib/types";
import { convertFetchedEvent } from "@/lib/utils";
import { notFound } from "next/navigation";


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
      </div>
    </>
  );
};

export default EventDetails;
