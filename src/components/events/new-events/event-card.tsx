import { SportsEvent, SportsEventTypeMap } from "@/lib/types";
import ViewDetailsButton from "../details-button";
import { Separator } from "@/components/ui/separator";
import { CalendarIcon, MapPinIcon, TrophyIcon } from "lucide-react";
import { format } from "date-fns";
import { capitalizeString, formatCityName } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getFallbackLogo } from "../fallback-logo";

const EventCard = ({ event }: { event: SportsEvent }) => {
  return (
    <>
      <article className="p-6 border border-muted rounded-md shadow-md m-3">
        <h3 className="text-xl font-semibold text-center">
          {event.event_name}
        </h3>

        <Avatar className="mx-auto my-2">
          {event.event_logo_url && <AvatarImage src={event.event_logo_url} />}
          <AvatarFallback className="bg-primary opacity-55">
            {getFallbackLogo(event.event_type)}
          </AvatarFallback>
        </Avatar>
        <Separator />

        <div className="py-6 px-3 flex flex-col gap-3">
          <div className="flex items-center gap-2 text-lg">
            <TrophyIcon />
            <p> {capitalizeString(SportsEventTypeMap[event.event_type])}</p>
          </div>
          <div className="flex items-center gap-2 text-base">
            <CalendarIcon />
            <p>
              {event.start_date
                ? format(event.start_date, "LLL dd, y")
                : "Date: TBD"}
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <MapPinIcon />
            <p>
              {formatCityName(event.address_city)}, {event.address_country}
            </p>
          </div>
        </div>
        <div className="w-fit mx-auto">
          <ViewDetailsButton
            nextUrl={`/events/${event.id}`}
            innerText="Details"
          />
        </div>
      </article>
    </>
  );
};

export default EventCard;
