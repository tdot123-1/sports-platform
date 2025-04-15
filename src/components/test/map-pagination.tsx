"use client";

import { ITEMS_ON_MAP } from "@/lib/constants";
import { usePathname, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

const MapPagination = ({
  totalEvents,
  totalBatches,
}: {
  totalEvents: number;
  totalBatches: number;
}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentBatch = Number(searchParams.get("batch")) || 1;

  const startIndex = (currentBatch - 1) * ITEMS_ON_MAP + 1;
  const endIndex = Math.min(startIndex + ITEMS_ON_MAP - 1, totalEvents);

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

export default MapPagination;
