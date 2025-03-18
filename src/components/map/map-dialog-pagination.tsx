"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Button } from "../ui/button";
import { ITEMS_PER_PAGE } from "@/lib/constants";

interface MapDialogPaginationProps {
  currentPage: number;
  totalPages: number;
  totalEvents: number;
  handlePageChange: (nextPage: number) => void;
  disabled?: boolean;
}

const MapDialogPagination = ({
  currentPage,
  totalPages,
  totalEvents,
  handlePageChange,
  disabled,
}: MapDialogPaginationProps) => {
  // show amount of events showing on current page (in stead of page numbers)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE + 1;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE - 1, totalEvents);
  const eventsShowing = `Showing events ${startIndex}-${endIndex} of ${totalEvents}`;

  return (
    <>
      <div className="flex justify-center gap-4">
        <Button
          disabled={disabled || currentPage <= 1}
          size={`icon`}
          variant={`outline`}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          <p hidden className="hidden">
            Previous page
          </p>
          <ChevronLeftIcon />
        </Button>
        <Button
          disabled={disabled || currentPage >= totalPages}
          size={`icon`}
          variant={`outline`}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          <p hidden className="hidden">
            Next page
          </p>
          <ChevronRightIcon />
        </Button>
      </div>
      <p className="text-xs font-semibold text-center mt-1">{eventsShowing}</p>
    </>
  );
};

export default MapDialogPagination;
