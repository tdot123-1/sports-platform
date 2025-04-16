import { FilterOptions } from "@/lib/types";
import { MapCoords } from "./map-wrapper";
import MapPagination from "./map-pagination";
import { fetchEventsInViewCount } from "@/lib/data/map/data";

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
  const data = await fetchEventsInViewCount(
    mapCoords,
    searchQuery,
    filter,
    priceFilter,
    passedEventsFilter
  );

  return (
    <>
      <MapPagination
        totalBatches={data.totalBatches}
        totalEvents={data.totalEvents}
      />
    </>
  );
};

export default MapPaginationWrapper;
