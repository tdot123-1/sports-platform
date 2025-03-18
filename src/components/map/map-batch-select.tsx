"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Button } from "../ui/button";
import { ITEMS_ON_MAP } from "@/lib/constants";
import { useMemo } from "react";

interface MapBatchSelectProps {
  currentBatch: number;
  totalEvents: number;
  totalBatches: number;
  handlePagination: (nextBatch: number) => void;
}

const MapBatchSelect = ({
  currentBatch,
  totalEvents,
  totalBatches,
  handlePagination,
}: MapBatchSelectProps) => {
  const startIndex = useMemo(
    () => (currentBatch - 1) * ITEMS_ON_MAP + 1,
    [currentBatch]
  );

  const endIndex = useMemo(
    () => Math.min(startIndex + ITEMS_ON_MAP - 1, totalEvents),
    [startIndex, totalEvents]
  );

  const eventsShowing = totalEvents
    ? `Showing events ${startIndex}-${endIndex} of ${totalEvents}`
    : "No events";

  return (
    <div>
      <div className="ml-auto flex justify-end w-fit">
        <Button
          onClick={() => handlePagination(currentBatch - 1)}
          disabled={currentBatch <= 1}
          size={`icon`}
          variant={`outline`}
        >
          <p hidden className="hidden">
            Previous batch
          </p>
          <ChevronLeftIcon />
        </Button>
        <Button
          onClick={() => handlePagination(currentBatch + 1)}
          disabled={currentBatch >= totalBatches}
          size={`icon`}
          variant={`outline`}
        >
          <p hidden className="hidden">
            Next batch
          </p>
          <ChevronRightIcon />
        </Button>
      </div>
      <p className="text-xs font-semibold text-right">{eventsShowing}</p>
    </div>
  );
};

export default MapBatchSelect;
