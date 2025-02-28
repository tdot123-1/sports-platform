import { fetchOneEvent } from "@/lib/data/events/data";
import { SportsEvent } from "@/lib/types";
import { convertFetchedEvent } from "@/lib/utils";
import { notFound } from "next/navigation";
import UpdateEvent from "../update-event";
import CreateEvent from "../create-event";
import { countryList } from "@/lib/countries";

// wrapper to fetch all data on server before rendering form
const FormWrapper = async ({ eventId }: { eventId?: string }) => {

  if (eventId) {
    // fetch event
    const fetchedEvent = await fetchOneEvent(eventId);

    if (!fetchedEvent) {
      return notFound();
    }

    // convert to get correct type (incl dates)
    const event: SportsEvent = await convertFetchedEvent(fetchedEvent);

    return (
      <>
        <UpdateEvent countryList={countryList} event={event} />
      </>
    );
  }

  return (
    <>
      <CreateEvent countryList={countryList} />
    </>
  );
};

export default FormWrapper;
