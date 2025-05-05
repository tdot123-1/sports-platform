import { FilterOptions, SortOptions } from "@/lib/types";
import ToolbarFilter from "./toolbar-filter";
import ToolbarSearch from "./toolbar-search";
import ToolbarSort from "./toolbar-sort";
import { fetchMaxCostEstimate } from "@/lib/data/events/data";

interface ToolbarProps {
  filter?: FilterOptions;
  sort?: SortOptions;
  priceFilter?: number;
  passedEventsFilter?: boolean;
}

const Toolbar = async ({
  filter,
  sort,
  priceFilter,
  passedEventsFilter,
}: ToolbarProps) => {
  // test skeleton
  // await new Promise((resolve) => setTimeout(resolve, 5000));

  const maxCostEstimate = await fetchMaxCostEstimate();

  return (
    <>
      <div className="flex justify-evenly p-4 bg-muted shadow-md">
        <ToolbarFilter
          filter={filter}
          priceFilter={priceFilter}
          maxPrice={maxCostEstimate}
          passedEventsFilter={passedEventsFilter}
        />

        <ToolbarSearch />
        <ToolbarSort sort={sort} />
      </div>
    </>
  );
};

export default Toolbar;
