import { SportsEvent, SportsEventTypeMap } from "@/lib/types";
import { Card, CardContent } from "../ui/card";
import { formatCityName } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import ViewDetailsButton from "./details-button";

const EventsCardSm = ({ event }: { event: SportsEvent }) => {
  return (
    <>
      <Card className="w-full">
        <CardContent className="flex flex-col gap-2 items-center justify-center">
          <div className="max-w-full">
            <h3 className="text-lg font-semibold text-ellipsis overflow-hidden text-nowrap">
              {event.event_name}
            </h3>
          </div>

          <p>{SportsEventTypeMap[event.event_type]}</p>
          <p className="mb-2 text-ellipsis overflow-hidden text-nowrap">
            {formatCityName(event.address_city)}, {event.address_country}
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

export default EventsCardSm;
