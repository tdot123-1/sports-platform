"use client";

import { FilterIcon } from "lucide-react";
import { Button } from "../ui/button";
import MapBatchSelect from "./map-batch-select";

const MapToolbar = () => {
  return (
    <div className="flex justify-between mb-1">
      <Button variant={`outline`}>
        <div className="flex justify-start items-center gap-1">
          <FilterIcon />
          <span className="hidden md:block">Filter</span>
        </div>
      </Button>
      <MapBatchSelect currentBatch={1} totalBatches={1} totalEvents={45} />
    </div>
  );
};

export default MapToolbar;
