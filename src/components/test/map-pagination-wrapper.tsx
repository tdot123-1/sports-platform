import { FilterOptions } from "@/lib/types";
import { MapCoords } from "./map-wrapper-test";
import MapPagination from "./map-pagination";

interface MapPaginationWrapperProps {
  searchQuery?: string;
  filter?: FilterOptions;
  priceFilter?: number;
  passedEventsFilter?: boolean;
  mapCoords: MapCoords;
}

const MapPaginationWrapper = async ({
  searchQuery,
  filter,
  priceFilter,
  passedEventsFilter,
  mapCoords,
}: MapPaginationWrapperProps) => {
  // test skeleton
  // await new Promise((resolve) => setTimeout(resolve, 5000));

  // fetch total events count
  // use count to calc total batches
  console.log(searchQuery, filter, priceFilter, passedEventsFilter, mapCoords);

  return (
    <>
      <MapPagination totalBatches={3} totalEvents={120} />
    </>
  );
};

export default MapPaginationWrapper;
