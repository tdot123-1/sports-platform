"use client";

import { ITEMS_ON_MAP } from "@/lib/constants";
import { usePathname, useSearchParams } from "next/navigation";
import { Button } from "../../ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Link from "next/link";

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

  const handlePagination = (nextBatch: number) => {
    const params = new URLSearchParams(searchParams);

    if (nextBatch < 1) {
      params.set("batch", "1");
    } else if (nextBatch > totalBatches) {
      params.set("batch", totalBatches.toString());
    } else {
      params.set("batch", nextBatch.toString());
    }

    return `${pathname}?${params.toString()}`;
  };

  return (
    <div>
      <div className="ml-auto flex justify-end w-fit">
        <Button disabled={currentBatch <= 1} size={`icon`} variant={`outline`}>
          <Link href={handlePagination(currentBatch - 1)}>
            <p hidden className="hidden">
              Previous batch
            </p>
            <ChevronLeftIcon />
          </Link>
        </Button>
        <Button
          disabled={currentBatch >= totalBatches}
          size={`icon`}
          variant={`outline`}
        >
          <Link href={handlePagination(currentBatch + 1)}>
            <p hidden className="hidden">
              Next batch
            </p>
            <ChevronRightIcon />
          </Link>
        </Button>
      </div>
      <p className="text-xs font-semibold text-right">{eventsShowing}</p>
    </div>
  );
};

export default MapPagination;
