import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { format } from "date-fns";

import { Card, CardContent } from "@/components/ui/card";
import {  SportsEventCalendar, SportsEventTypeMap } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ViewDetailsButton from "../details-button";
import { formatCityName } from "@/lib/utils";

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
                <Card key={event.id} className="w-full">
                  <CardContent className="flex flex-col gap-2 items-center justify-center">
                    <div className="max-w-full">
                      <h3 className="text-lg font-semibold text-ellipsis overflow-hidden text-nowrap">
                        {event.title}
                      </h3>
                    </div>

                    <p>{SportsEventTypeMap[event.event_type]}</p>
                    <p className="mb-2 text-ellipsis overflow-hidden text-nowrap">
                      {formatCityName(event.address_city)},{" "}
                      {event.address_country}
                    </p>
                    <Avatar className="">
                      {event.event_logo_url && (
                        <AvatarImage src={event.event_logo_url} />
                      )}
                      <AvatarFallback className="bg-primary opacity-55">
                        Sports
                      </AvatarFallback>
                    </Avatar>
                    <ViewDetailsButton
                      nextUrl={`/events/${event.id}`}
                      innerText="Details"
                    />
                  </CardContent>
                </Card>
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
