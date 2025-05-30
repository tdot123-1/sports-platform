import { fetchOneEvent } from "@/lib/data/events/data";
import { SportsEvent } from "@/lib/types";
import { convertFetchedEvent } from "@/lib/utils";
import { notFound } from "next/navigation";
import AddEventLogo from "./logo/add-event-logo";
import AddEventImage from "./images/add-event-image";

const EventMediaWrapper = async ({ eventId }: { eventId: string }) => {
  // test skeleton
  // await new Promise((resolve) => setTimeout(resolve, 5000));

  // fetch event
  const fetchedEvent = await fetchOneEvent(eventId);

  if (!fetchedEvent) {
    return notFound();
  }

  // convert to get correct type (incl dates)
  const event: SportsEvent = await convertFetchedEvent(fetchedEvent);

  return (
    <>
      <section className="h-full">
        <AddEventLogo
          eventId={event.id}
          event_logo_url={event.event_logo_url}
        />
      </section>
      <section className="h-full">
        <AddEventImage eventId={event.id} event_images={event.event_images} />
      </section>
    </>
  );
};

export default EventMediaWrapper;
