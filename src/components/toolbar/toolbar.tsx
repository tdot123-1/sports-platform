import { FilterOptions, SortOptions } from "@/lib/types";
import ToolbarFilter from "./toolbar-filter";
import ToolbarSort from "./toolbar-sort";
import ToolbarSearch from "./toolbar-search";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { Button } from "../ui/button";
import { SlidersHorizontalIcon } from "lucide-react";

interface ToolbarProps {
  filter?: FilterOptions;
  sort?: SortOptions;
}

const Toolbar = ({ filter, sort }: ToolbarProps) => {
  return (
    <div className="sticky top-14 z-10">
      <Collapsible>
        <div className="bg-sidebar border-b-sidebar-border p-1">
          <CollapsibleTrigger asChild>
            <Button variant={`outline`} size={`icon`}>
              <SlidersHorizontalIcon />
              <p hidden className="hidden">
                Settings
              </p>
            </Button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent>
          <div className="flex justify-evenly p-4 bg-sidebar-accent shadow-md">
            <ToolbarFilter filter={filter} />
            <ToolbarSearch />
            <ToolbarSort sort={sort} />
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default Toolbar;
