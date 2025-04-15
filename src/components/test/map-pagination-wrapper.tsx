import { FilterOptions } from "@/lib/types";
import { MapCoords } from "./map-wrapper-test";

interface MapPaginationWrapperProps {
  query?: string;
  filter?: FilterOptions;
  priceFilter?: number;
  passedEventsFilter?: boolean;
  mapCoords: MapCoords;
}

const MapPaginationWrapper = () => {
  // fetch total events count

  return <></>;
};

export default MapPaginationWrapper;
