import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SportsEventCalendar, SportsEventTypeMap } from "@/lib/types";
import { getFallbackLogo } from "../fallback-logo";
import { Separator } from "@/components/ui/separator";
import { MapPinIcon, TrophyIcon } from "lucide-react";
import { capitalizeString, formatCityName } from "@/lib/utils";
import ViewDetailsButton from "../details-button";

const EventCardSm = ({ event }: { event: SportsEventCalendar }) => {
  return (
    <>
      <article className="p-6 border border-muted rounded-md shadow-md text-sm">
        <h3 className="text-lg font-semibold text-center line-clamp-2">
          {event.title}
        </h3>

        <Avatar className="mx-auto my-2">
          {event.event_logo_url && <AvatarImage src={event.event_logo_url} />}
          <AvatarFallback className="bg-primary opacity-55">
            {getFallbackLogo(event.event_type)}
          </AvatarFallback>
        </Avatar>
        <Separator />

        <div className="py-6 px-3 flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <TrophyIcon />
            <p> {capitalizeString(SportsEventTypeMap[event.event_type])}</p>
          </div>

          <div className="flex items-center gap-2">
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

export default EventCardSm;
