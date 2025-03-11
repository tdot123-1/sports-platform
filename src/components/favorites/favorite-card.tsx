"use client";

import { SportsEvent, SportsEventTypeMap } from "@/lib/types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import { format } from "date-fns";
import { formatCityName, renderArrayField } from "@/lib/utils";
import ViewDetailsButton from "../events/details-button";

const FavoriteCard = ({ event }: { event: SportsEvent }) => {
  return (
    <>
      <Card className="relative">
        <CardHeader className="text-center">
          <Avatar className="absolute top-2 right-2">
            {event.event_logo_url && <AvatarImage src={event.event_logo_url} />}
            <AvatarFallback className="bg-primary opacity-55">
              Sports
            </AvatarFallback>
          </Avatar>
          <ScrollArea className="w-full h-8">
            <CardTitle>{event.event_name}</CardTitle>
          </ScrollArea>
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
            nextUrl={`/events/${event.id}`}
            innerText="View details"
          />
        </CardFooter>
      </Card>
    </>
  );
};

export default FavoriteCard;
