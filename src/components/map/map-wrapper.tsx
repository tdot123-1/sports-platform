import { fetchEventsInViewAndCount } from "@/lib/data/map/data";
import { SportsEventMap } from "@/lib/types";
import { convertToMapEvent } from "@/lib/utils";
import EventsMap from "./events-map";
import { mapStartCoords } from "@/lib/constants";

const EventsMapWrapper = async ({ mapId }: { mapId: string }) => {
  const { east, north, south, west } = mapStartCoords.bounds;
  const { lat, lng } = mapStartCoords.center;

  // get initial events (+ total count) within bounds
  const fetchedEvents = await fetchEventsInViewAndCount(
    south,
    west,
    north,
    east,
    lat,
    lng
  );

  // convert to get public logo url
  const events: SportsEventMap[] = await Promise.all(
    fetchedEvents.events.map(convertToMapEvent)
  );

  return (
    <>
      <EventsMap
        mapId={mapId}
        eventsInRadius={events}
        totalEventsInRadius={fetchedEvents.totalCount}
        initialMapCenter={mapStartCoords.center}
        initialMapBounds={mapStartCoords.bounds}
      />
    </>
  );
};

export default EventsMapWrapper;
