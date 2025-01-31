import { fetchOneEvent } from "@/lib/data/events/data";
import { SportsEvent } from "@/lib/types";
import { convertFetchedEvent } from "@/lib/utils";
import { notFound } from "next/navigation";
import UpdateEvent from "./update-event";

interface UpdateEventWrapperProps {
  eventId: string;
}

const UpdateEventWrapper = async ({ eventId }: UpdateEventWrapperProps) => {
  // fetch event
  const fetchedEvent = await fetchOneEvent(eventId);

  if (!fetchedEvent) {
    return notFound();
  }

  const event: SportsEvent = convertFetchedEvent(fetchedEvent);
  // show error
  // not found
  // return form
  return (
    <>
      <UpdateEvent event={event} />
    </>
  );
};

export default UpdateEventWrapper;
