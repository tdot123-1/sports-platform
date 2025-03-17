"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Button } from "../ui/button";
import { ITEMS_ON_MAP } from "@/lib/constants";

interface MapBatchSelectProps {
  currentBatch: number;
  totalEvents: number;
  totalBatches: number;
}

const MapBatchSelect = ({
  currentBatch,
  totalEvents,
  totalBatches,
}: MapBatchSelectProps) => {
  const startIndex = (currentBatch - 1) * ITEMS_ON_MAP + 1;
  const endIndex = Math.min(startIndex + ITEMS_ON_MAP - 1, totalEvents);
  const eventsShowing = totalEvents
    ? `Showing events ${startIndex}-${endIndex} of ${totalEvents}`
    : "No events";

  return (
    <div>
      <div className="ml-auto flex justify-end w-fit">
        <Button disabled={currentBatch <= 1} size={`icon`} variant={`outline`}>
          <p hidden className="hidden">
            Previous batch
          </p>
          <ChevronLeftIcon />
        </Button>
        <Button
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
