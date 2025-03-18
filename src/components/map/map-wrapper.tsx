import { fetchEventsInView } from "@/lib/data/map/data";
import { SportsEventMap } from "@/lib/types";
import { convertToMapEvent } from "@/lib/utils";
import EventsMap from "./events-map";
import { mapStartCoords } from "@/lib/constants";

const EventsMapWrapper = async ({ mapId }: { mapId: string }) => {
  const { east, north, south, west } = mapStartCoords.bounds;
  const fetchedEvents = await fetchEventsInView(south, west, north, east);

  // convert to get public logo url
  const events: SportsEventMap[] = await Promise.all(
    fetchedEvents.map(convertToMapEvent)
  );
  return (
    <>
      <EventsMap
        mapId={mapId}
        eventsInRadius={events}
        initialMapCenter={mapStartCoords.center}
      />
    </>
  );
};

export default EventsMapWrapper;
