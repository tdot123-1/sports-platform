import { FilterOptions } from "@/lib/types";
import ToolbarFilter from "./toolbar-filter";

const Toolbar = ({ filter }: { filter?: FilterOptions }) => {
  return (
    <div>
      <ToolbarFilter filter={filter} />
    </div>
  );
};

export default Toolbar;
