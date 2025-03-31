import { SportsEvent, SportsEventTypeMap } from "@/lib/types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { Separator } from "../../ui/separator";
import { ScrollArea } from "../../ui/scroll-area";
import { formatCityName, renderArrayField } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import ViewDetailsButton from "../details-button";

interface EventCardProps {
  event: SportsEvent;
  userId?: string;
}

const EventCard = async ({ event, userId }: EventCardProps) => {
  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <ScrollArea className="w-full h-8 text-left">
              <CardTitle>{event.event_name}</CardTitle>
            </ScrollArea>
            <Avatar>
              {event.event_logo_url && (
                <AvatarImage src={event.event_logo_url} />
              )}
              <AvatarFallback className="bg-primary opacity-55">
                Sports
              </AvatarFallback>
            </Avatar>
          </div>
        </CardHeader>
        <CardContent>
          <ul>
            <li>
              <h4 className="text-muted-foreground">What:</h4>
              <p className="text-right text-sm">
                {SportsEventTypeMap[event.event_type]}
              </p>
            </li>
            <Separator className="my-1" />
            <li>
              <h4 className="text-muted-foreground">When:</h4>
              <p className="text-right text-sm">
                {event.start_date
                  ? format(event.start_date, "LLL dd, y")
                  : "TBD"}
              </p>
            </li>
            <Separator className="my-1" />
            <li>
              <h4 className="text-muted-foreground">Where:</h4>
              <div>
                <p className="text-right text-sm">
                  {formatCityName(event.address_city)}, {event.address_country}
                </p>
              </div>
            </li>
            <Separator className="my-1" />
            <li>
              <h4 className="text-muted-foreground">For:</h4>
              <div>
                <div className="flex justify-between">
                  <p className="text-sm">Age(s)</p>

                  <p className="text-right text-sm">
                    {renderArrayField(event.target_age)}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm">Level(s)</p>
                  <p className="text-right text-sm">
                    {event.target_level
                      ? renderArrayField(event.target_level)
                      : "N/A"}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm">Gender</p>
                  <p className="text-sm">{event.target_gender}</p>
                </div>
              </div>
            </li>
            <Separator className="my-1" />
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
