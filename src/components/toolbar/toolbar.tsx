import { FilterOptions, SortOptions } from "@/lib/types";
import ToolbarFilter from "./toolbar-filter";
import ToolbarSort from "./toolbar-sort";

interface ToolbarProps {
  filter?: FilterOptions;
  sort?: SortOptions;
}

const Toolbar = ({ filter, sort }: ToolbarProps) => {
  return (
    <div className="flex justify-evenly p-4 bg-sidebar-accent">
      <ToolbarFilter filter={filter} />
      <ToolbarSort sort={sort} />
    </div>
  );
};

export default Toolbar;
