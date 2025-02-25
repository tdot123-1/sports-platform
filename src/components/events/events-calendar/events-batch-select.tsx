"use client";

import { Button } from "@/components/ui/button";
import { ITEMS_PER_MONTH } from "@/lib/constants";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

interface EventsBatchSelectProps {
  totalBatches: number;
}

const EventsBatchSelect = ({ totalBatches }: EventsBatchSelectProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentBatch = Number(searchParams.get("batch")) || 1;

  const startIndex = (currentBatch - 1) * ITEMS_PER_MONTH;
  const eventsShowing = `Events ${startIndex}-${startIndex + ITEMS_PER_MONTH}`;

  const createBatchURL = (batchNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("batch", batchNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <>
      <div>
        <div className="ml-auto flex justify-end w-fit">
          <Button
            disabled={currentBatch <= 1}
            size={`icon`}
            variant={`outline`}
          >
            <Link
              href={
                currentBatch > 1
                  ? createBatchURL(currentBatch - 1)
                  : createBatchURL(1)
              }
            >
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
            <Link
              href={
                currentBatch < totalBatches
                  ? createBatchURL(currentBatch + 1)
                  : createBatchURL(currentBatch)
              }
            >
              <p hidden className="hidden">
                Next batch
              </p>
              <ChevronRightIcon />
            </Link>
          </Button>
        </div>
        <p className="text-xs font-semibold">{eventsShowing}</p>
      </div>
    </>
  );
};

export default EventsBatchSelect;
