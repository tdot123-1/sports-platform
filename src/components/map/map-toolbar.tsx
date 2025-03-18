"use client";

import { FilterIcon } from "lucide-react";
import { Button } from "../ui/button";
import MapBatchSelect from "./map-batch-select";

interface MapToolbarProps {
  currentBatch: number;
  totalEvents: number;
  totalBatches: number;
}

const MapToolbar = ({
  currentBatch,
  totalBatches,
  totalEvents,
}: MapToolbarProps) => {
  return (
    <div className="flex justify-between mb-1">
      <Button variant={`outline`}>
        <div className="flex justify-start items-center gap-1">
          <FilterIcon />
          <span className="hidden md:block">Filter</span>
        </div>
      </Button>
      <MapBatchSelect
        currentBatch={currentBatch}
        totalBatches={totalBatches}
        totalEvents={totalEvents}
      />
    </div>
  );
};

export default MapToolbar;
