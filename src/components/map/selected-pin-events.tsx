"use client";

import { SportsEvent, SportsEventMap } from "@/lib/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import EventsCardSm from "../events/events-card-sm";
import { useEffect, useState } from "react";
import { fetchEventsInCity } from "@/lib/data/map/data";
import { FrownIcon, LoaderIcon, RotateCcwIcon } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import { Button } from "../ui/button";

interface SelectedPinProps {
  selectedPin: string;
  isDialogOpen: boolean;
  handleOpenChange: () => void;
  events?: SportsEventMap[];
}

const SelectedPinEvents = ({
  selectedPin,
  isDialogOpen,
  handleOpenChange,
  events,
}: SelectedPinProps) => {
  // maybe fetch events on client, filter by city (?)
  // const eventsInPin = events?.filter((e) => e.address_city === selectedPin);

  const [eventsInPin, setEventsInPin] = useState<SportsEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);

  const fetchEventsForPin = async () => {
    setFetchError(false);
    try {
      // throw new Error("test");
      const data = await fetchEventsInCity(selectedPin);

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

  const handleRefetch = () => {
    setIsLoading(true);
    fetchEventsForPin();
  };

  useEffect(() => {
    // fetch events if pin changed
    fetchEventsForPin();
  }, [selectedPin]);

  useEffect(() => {
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-80 overflow-hidden overflow-y-auto">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="w-full aspect-square" />
              ))}
            </div>
          ) : fetchError ? (
            <div className="flex flex-col gap-4 justify-center items-center">
              <h2 className="text-xl font-mono">Something went wrong!</h2>
              <FrownIcon size={40} />
              <p className="text-sm text-muted-foreground italic">
                Failed to fetch events, click to try again
              </p>
              <Button
                className=""
                onClick={handleRefetch}
              >
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-80 overflow-hidden overflow-y-auto">
              {eventsInPin.map((event) => (
                <EventsCardSm key={event.id} event={event} />
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SelectedPinEvents;
