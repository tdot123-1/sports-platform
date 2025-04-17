import ToolbarFilter from "@/components/toolbar/toolbar-filter";
import ToolbarSearch from "@/components/toolbar/toolbar-search";
import MapPagination from "./map-pagination";
import { FilterOptions } from "@/lib/types";
import { MapCoords } from "./map-wrapper";
import { fetchEventsInViewCount } from "@/lib/data/map/data";
import { fetchMaxCostEstimate } from "@/lib/data/events/data";

interface MapToolbarProps {
  searchQuery?: string;
  filter?: FilterOptions;
  priceFilter?: number;
  passedEventsFilter?: boolean;
  mapCoords: MapCoords;
}

const MapToolbar = async ({
  searchQuery,
  filter,
  priceFilter,
  passedEventsFilter,
  mapCoords,
}: MapToolbarProps) => {
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

  const maxCostEstimate = await fetchMaxCostEstimate();

  return (
    <>
      <div className="flex justify-between mb-1">
        <div className="flex gap-8">
          <ToolbarFilter
            batch
            maxPrice={maxCostEstimate}
            filter={filter}
            priceFilter={priceFilter}
            passedEventsFilter={passedEventsFilter}
          />
          <ToolbarSearch batch />
        </div>

        <MapPagination
          totalBatches={data.totalBatches}
          totalEvents={data.totalEvents}
        />
      </div>
    </>
  );
};

export default MapToolbar;
