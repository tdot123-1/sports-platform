"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Button } from "../ui/button";

interface MapDialogPaginationProps {
  currentPage: number;
  totalPages: number;
  handlePageChange: (nextPage: number) => void;
  disabled?: boolean;
}

const MapDialogPagination = ({
  currentPage,
  totalPages,
  handlePageChange,
  disabled,
}: MapDialogPaginationProps) => {
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
    </>
  );
};

export default MapDialogPagination;
