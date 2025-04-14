import { FilterOptions } from "@/lib/types";
import EventsMap from "./map-test";

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

const EventsMapWrapperTest = async ({
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
  // toolbar should also be within this component (?)

  return (
    <>
      <EventsMap mapId={mapId} apiKey={apiKey} />
    </>
  );
};

export default EventsMapWrapperTest;
