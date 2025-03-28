"use client";

import { SportsEvent } from "@/lib/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import EventsCardSm from "../events-card-sm";
import { useEffect, useState } from "react";
import { fetchEventsInCity, fetchTotalPagesInCity } from "@/lib/data/map/data";
import { FrownIcon, RotateCcwIcon } from "lucide-react";
import { Skeleton } from "../../ui/skeleton";
import { Button } from "../../ui/button";
import MapDialogPagination from "./map-dialog-pagination";

interface SelectedPinProps {
  selectedPin: string;
  isDialogOpen: boolean;
  handleOpenChange: () => void;
}

const SelectedPinEvents = ({
  selectedPin,
  isDialogOpen,
  handleOpenChange,
}: SelectedPinProps) => {
  // list of events for selecetd pin (city)
  const [eventsInPin, setEventsInPin] = useState<SportsEvent[]>([]);

  // loading, error state for pin
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);

  // states for pagination within pin dialog
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalEvents, setTotalEvents] = useState(1);

  // handle pagination in pin dialog
  const handlePageChange = (nextPage: number) => {
    if (nextPage < 1) {
      return;
    } else if (nextPage > totalPages) {
      return;
    }

    setCurrentPage(nextPage);
  };

  // get total pages and total events
  const fetchTotalPagesForPin = async () => {
    setFetchError(false);
    try {
      // throw new Error("test");

      // call server action to fetch pages and count
      const data = await fetchTotalPagesInCity(selectedPin);

      // update states
      setTotalPages(data.totalPages);
      setTotalEvents(data.count);
    } catch (error) {
      console.error("Error fetching total pages for pin: ", error);
      setFetchError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchEventsForPin = async () => {
    setFetchError(false);
    try {
      // throw new Error("test");

      // fetch events for selected pin (city)
      const data = await fetchEventsInCity(selectedPin, currentPage);

      // check error
      if (!data.success || !data.data) {
        throw new Error("Failed to fetch events");
      }

      setEventsInPin(data.data);
    } catch (error) {
      console.error("Error fetching events for pin: ", error);
      setFetchError(true);
    } finally {
      setIsLoading(false);
    }
  };

  // attempt to refetch on error
  const handleRefetch = () => {
    setIsLoading(true);
    fetchEventsForPin();
  };

  useEffect(() => {
    // fetch events if pin changed or if page changed
    fetchEventsForPin();
  }, [selectedPin, currentPage]);

  // get total pages for pin when pin changes
  useEffect(() => {
    fetchTotalPagesForPin();
  }, [selectedPin]);

  useEffect(() => {
    // reset events and set loading if dialog closes
    if (!isDialogOpen) {
      setEventsInPin([]);
      setIsLoading(true);
    }
  }, [isDialogOpen]);

  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={handleOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedPin}</DialogTitle>
            <DialogDescription hidden className="hidden">
              Events in {selectedPin}
            </DialogDescription>
          </DialogHeader>

          {isLoading ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-60 overflow-hidden overflow-y-auto">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="w-full aspect-square" />
                ))}
              </div>
              <MapDialogPagination
                disabled
                currentPage={1}
                totalPages={1}
                handlePageChange={handlePageChange}
                totalEvents={1}
              />
            </>
          ) : fetchError ? (
            <div className="flex flex-col gap-4 justify-center items-center">
              <h2 className="text-xl font-mono">Something went wrong!</h2>
              <FrownIcon size={40} />
              <p className="text-sm text-muted-foreground italic">
                Failed to fetch events, click to try again
              </p>
              <Button className="" onClick={handleRefetch}>
                <RotateCcwIcon />
                <span>Try again</span>
              </Button>
            </div>
          ) : eventsInPin.length === 0 ? (
            <div>
              <p className="text-center italic text-muted-foreground">
                No events scheduled on this location!
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-60 overflow-hidden overflow-y-auto">
                {eventsInPin.map((event) => (
                  <EventsCardSm key={event.id} event={event} />
                ))}
              </div>
              <MapDialogPagination
                currentPage={currentPage}
                totalPages={totalPages}
                handlePageChange={handlePageChange}
                totalEvents={totalEvents}
              />
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SelectedPinEvents;
