import { fetchAllEventsOnMap } from "@/lib/data/map/data";
import { SportsEvent } from "@/lib/types";
import { convertFetchedEvent } from "@/lib/utils";
import EventsMap from "./events-map";

const EventsMapWrapper = async ({ mapId }: { mapId: string }) => {
  const fetchedEvents = await fetchAllEventsOnMap();

  // convert Dates and get public logo url
  const events: SportsEvent[] = await Promise.all(
    fetchedEvents.map(convertFetchedEvent)
  );
  return (
    <>
      <EventsMap mapId={mapId} eventsInRadius={events} />
    </>
  );
};

export default EventsMapWrapper;
