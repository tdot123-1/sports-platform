"use client";

import { FilterIcon } from "lucide-react";
import { Button } from "../ui/button";
import MapBatchSelect from "./map-batch-select";
import { useEffect, useMemo, useState } from "react";
import { ITEMS_ON_MAP } from "@/lib/constants";
import { MapBounds, MapCenter } from "./events-map";

interface MapToolbarProps {
  totalEvents: number;
  mapCenter: MapCenter;
  mapBounds: MapBounds;
  fetchPins: (
    south: number,
    west: number,
    north: number,
    east: number,
    center_lat: number,
    center_lng: number,
    batch: number
  ) => Promise<void>;
}

const MapToolbar = ({
  totalEvents,
  mapCenter,
  mapBounds,
  fetchPins,
}: MapToolbarProps) => {
  const [currentBatch, setCurrentBatch] = useState(1);

  const totalBatches = useMemo(
    () => Math.ceil(totalEvents / ITEMS_ON_MAP),
    [totalEvents]
  );

  const handlePagination = (nextBatch: number) => {
    if (nextBatch < 1) return;
    if (nextBatch > totalBatches) return;

    const { lat, lng } = mapCenter;

    const { south, west, north, east } = mapBounds;

    fetchPins(south, west, north, east, lat, lng, nextBatch);
    setCurrentBatch(nextBatch);
  };

  useEffect(() => {
    setCurrentBatch(1);
  }, [mapBounds, mapCenter]);

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
        handlePagination={handlePagination}
      />
    </div>
  );
};

export default MapToolbar;
