import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { format } from "date-fns";
import { SportsEventCalendar } from "@/lib/types";
import EventCardSm from "./event-card-sm";

interface SelectedDateEventsProps {
  selectedDate: Date;
  isDialogOpen: boolean;
  handleOpenChange: () => void;
  events?: SportsEventCalendar[];
}

const SelectedDateEvents = ({
  selectedDate,
  isDialogOpen,
  handleOpenChange,
  events,
}: SelectedDateEventsProps) => {
  const eventsForSelectedDate = events?.filter(
    (e) => e.start?.toDateString() === selectedDate.toDateString()
  );
  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={handleOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Events on {format(selectedDate, "LLL dd, y")}
            </DialogTitle>
            <DialogDescription hidden className="hidden">
              Events on {format(selectedDate, "LLL dd, y")}
            </DialogDescription>
          </DialogHeader>

          {eventsForSelectedDate && eventsForSelectedDate.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-80 overflow-hidden overflow-y-auto">
              {eventsForSelectedDate.map((event) => (
                <EventCardSm event={event} key={event.id} />
              ))}
            </div>
          ) : (
            <p className="text-center italic text-muted-foreground">
              No events scheduled today!
            </p>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SelectedDateEvents;
