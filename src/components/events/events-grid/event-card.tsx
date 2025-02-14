import {
  SportsEvent,
  SportsEventTypeMap,
  TargetAgeGroupMap,
  TargetLevelMap,
} from "@/lib/types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import Link from "next/link";
import { Button } from "../../ui/button";
import { Separator } from "../../ui/separator";
import { ScrollArea } from "../../ui/scroll-area";
import { renderArrayField } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface EventCardProps {
  event: SportsEvent;
  userId?: string;
}

const EventCard = ({ event, userId }: EventCardProps) => {
  return (
    <>
      <Card className="relative">
        <CardHeader className="text-center">
          <Avatar className="absolute top-2 right-2">
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
                  ? event.start_date.toLocaleDateString()
                  : "TBD"}
              </p>
            </li>
            <Separator className="my-1" />
            <li>
              <h4 className="text-muted-foreground">Where:</h4>
              <div>
                <p className="text-right text-sm">{event.address_city}</p>
                <p className="text-right text-sm">{event.address_country}</p>
              </div>
            </li>
            <Separator className="my-1" />
            <li>
              <h4 className="text-muted-foreground">For:</h4>
              <div>
                <div className="flex justify-between">
                  <p className="text-sm">Age(s)</p>
                  {/* <ScrollArea className="h-16">
                    {event.target_age.map((age) => (
                      <p className="text-right text-sm" key={age}>
                        {age}
                      </p>
                    ))}
                  </ScrollArea> */}
                  <p className="text-right text-sm">
                    {renderArrayField(event.target_age)}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm">Level(s)</p>
                  <ScrollArea className="h-16">
                    {event.target_level ? (
                      event.target_level.map((level) => (
                        <p className="text-right text-sm" key={level}>
                          {TargetLevelMap[level]}
                        </p>
                      ))
                    ) : (
                      <p>"N/A"</p>
                    )}
                  </ScrollArea>
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
          <Link
            href={
              userId ? `/profile/events/${event.id}` : `/events/${event.id}`
            }
          >
            <Button>View details</Button>
          </Link>
        </CardFooter>
      </Card>
    </>
  );
};

export default EventCard;
