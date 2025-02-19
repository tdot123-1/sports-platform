import { fetchOneEvent } from "@/lib/data/events/data";
import { SportsEvent } from "@/lib/types";
import { convertFetchedEvent } from "@/lib/utils";
import { notFound } from "next/navigation";
import AddEventLogo from "./add-event-logo";

const EventMediaWrapper = async ({ eventId }: { eventId: string }) => {
  // test skeleton
  // await new Promise((resolve) => setTimeout(resolve, 5000));

  // fetch event
  const fetchedEvent = await fetchOneEvent(eventId);

  if (!fetchedEvent) {
    return notFound();
  }

  // convert to get correct type (incl dates)
  const event: SportsEvent = convertFetchedEvent(fetchedEvent);

  return (
    <>
      <section>
        <AddEventLogo eventId={event.id} event_logo_url={event.event_logo_url} />
      </section>
    </>
  );
};

export default EventMediaWrapper;
