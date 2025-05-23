import { SportsEvent, SportsEventTypeMap } from "@/lib/types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { Separator } from "../../ui/separator";

import {
  capitalizeString,
  formatCityName,
  renderArrayField,
} from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import ViewDetailsButton from "../details-button";
import { MapPinIcon } from "lucide-react";
import { getFallbackLogo } from "../fallback-logo";

interface EventCardProps {
  event: SportsEvent;
  userId?: string;
}

const EventCard = async ({ event, userId }: EventCardProps) => {
  return (
    <>
      <Card className="py-4 h-full bg-textbox shadow-md">
        <CardHeader>
          <div className="flex items-start justify-between gap-1">
            <CardTitle className="text-xl font-semibold leading-tight line-clamp-2">
              {event.event_name}
            </CardTitle>

            <Avatar>
              {event.event_logo_url && (
                <AvatarImage src={event.event_logo_url} />
              )}
              <AvatarFallback className="bg-primary opacity-55 text-sm">
                {getFallbackLogo(event.event_type)}
              </AvatarFallback>
            </Avatar>
          </div>
          <Separator className="my-1" />
        </CardHeader>
        <CardContent>
          <ul className="text-sm text-muted-foreground">
            <li className="mb-6">
              <p className="text-lg font-medium text-center">
                {capitalizeString(SportsEventTypeMap[event.event_type])} ●{" "}
                {event.start_date
                  ? format(event.start_date, "LLL dd, y")
                  : "Date: TBD"}
              </p>
            </li>
            <li>
              <div className="flex items-center gap-1.5">
                <MapPinIcon />
                <p className="text-base">
                  {formatCityName(event.address_city)}, {event.address_country}
                </p>
              </div>
            </li>
            <Separator className="my-3" />
            <li>
              <div className="grid grid-cols-2 gap-y-1 gap-x-2 p-2.5 bg-muted rounded-md">
                <p>Age(s)</p>
                <p>{renderArrayField(event.target_age)}</p>
                <p>Level(s)</p>
                <p>
                  {event.target_level
                    ? renderArrayField(event.target_level)
                    : "N/A"}
                </p>
                <p>Gender</p>
                <p>{event.target_gender}</p>
              </div>
            </li>

            <Separator className="mt-3" />
          </ul>
        </CardContent>
        <CardFooter className="flex justify-center">
          <ViewDetailsButton
            nextUrl={
              userId ? `/profile/events/${event.id}` : `/events/${event.id}`
            }
            innerText="View details"
          />
        </CardFooter>
      </Card>
    </>
  );
};

export default EventCard;
