import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { SportsEvent, SportsEventTypeMap } from "@/lib/types";
import ViewDetailsButton from "../details-button";
import { formatCityName } from "@/lib/utils";
import { format } from "date-fns";

const NewEventCard = ({ event }: { event: SportsEvent }) => {
  return (
    <>
      <Card className="max-w-md">
        <CardContent className="text-sm flex flex-col gap-2 aspect-square items-center justify-center">
          <div className="max-w-full">
            <h3 className="text-xl font-semibold text-ellipsis overflow-hidden text-nowrap mt-4">
              {event.event_name}
            </h3>
          </div>

          <p>{SportsEventTypeMap[event.event_type]}</p>
          <p className="text-ellipsis overflow-hidden text-nowrap">
            {formatCityName(event.address_city)}, {event.address_country}
          </p>
          <p>
            {event.start_date
              ? format(event.start_date, "LLL dd, y")
              : "Date: TBD"}
          </p>
          <Avatar className="">
            {event.event_logo_url && <AvatarImage src={event.event_logo_url} />}
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
    </>
  );
};

export default NewEventCard;
