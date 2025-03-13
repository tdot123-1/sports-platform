import { SportsEventMap } from "@/lib/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import EventsCardSm from "../events/events-card-sm";

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
  const eventsInPin = events?.filter((e) => e.address_city === selectedPin);

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
          {eventsInPin && eventsInPin.length ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-80 overflow-hidden overflow-y-auto">
              {eventsInPin.map((event) => (
                <EventsCardSm key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <div>
              <p className="text-center italic text-muted-foreground">
                No events scheduled on this location!
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SelectedPinEvents;
