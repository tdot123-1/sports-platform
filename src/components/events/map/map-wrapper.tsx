import { FilterOptions, MapEvent } from "@/lib/types";
import EventsMap from "./events-map";
import { fetchEventsInView } from "@/lib/data/map/data";

export interface MapCoords {
  center: {
    lat: number;
    lng: number;
  };
  bounds: {
    south: number;
    west: number;
    north: number;
    east: number;
  };
}

interface EventsMapWrapperProps {
  mapId: string;
  apiKey: string;
  currentBatch?: number;
  searchQuery?: string;
  filter?: FilterOptions;
  priceFilter?: number;
  passedEventsFilter?: boolean;
  mapCoords: MapCoords;
}

const EventsMapWrapper = async ({
  mapId,
  apiKey,
  currentBatch = 1,
  searchQuery,
  filter,
  priceFilter,
  passedEventsFilter,
  mapCoords,
}: EventsMapWrapperProps) => {
  // test skeleton
  // await new Promise((resolve) => setTimeout(resolve, 5000));

  // fetch events
  // pass list of events down to EventsMap
  const fetchedEvents: MapEvent[] = await fetchEventsInView(
    mapCoords,
    currentBatch,
    searchQuery,
    filter,
    priceFilter,
    passedEventsFilter
  );

  // console.log("FETCHED EVENTS: ", fetchedEvents)

  return (
    <>
      <EventsMap mapId={mapId} apiKey={apiKey} events={fetchedEvents} />
    </>
  );
};

export default EventsMapWrapper;
