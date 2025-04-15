"use client";

import MapBatchSelect from "./map-batch-select";
import { useEffect, useMemo, useState } from "react";
import { ITEMS_ON_MAP } from "@/lib/constants";
import { MapBounds, MapCenter } from "./events-map";

import ToolbarFilter from "@/components/toolbar/toolbar-filter";

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
  // current batch of visible pins
  const [currentBatch, setCurrentBatch] = useState(1);

  // calculate total batches based on total pins
  const totalBatches = useMemo(
    () => Math.ceil(totalEvents / ITEMS_ON_MAP),
    [totalEvents]
  );

  // navigate batches
  const handlePagination = (nextBatch: number) => {
    // check if next batch is within bounds
    if (nextBatch < 1) return;
    if (nextBatch > totalBatches) return;

    // get current map coords from state var in parent component
    const { lat, lng } = mapCenter;

    const { south, west, north, east } = mapBounds;

    // fetch next batch of pins with map coords and selected batch
    fetchPins(south, west, north, east, lat, lng, nextBatch);

    // update state of current batch
    setCurrentBatch(nextBatch);
  };

  // set current batch to 1 if map center changes
  useEffect(() => {
    setCurrentBatch(1);
  }, [mapBounds, mapCenter]);

  return (
    <div className="flex justify-between mb-1">
      <ToolbarFilter batch maxPrice={1000} />
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
