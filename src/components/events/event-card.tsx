import { SportsEvent, TargetAgeGroupMap, TargetLevelMap } from "@/lib/types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Link from "next/link";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";

interface EventCardProps {
  event: SportsEvent;
  userId?: string;
}

const EventCard = ({ event, userId }: EventCardProps) => {
  return (
    <>
      <Card className="">
        <CardHeader className="text-center">
          <ScrollArea className="w-full h-8">
            <CardTitle>{event.event_name}</CardTitle>
          </ScrollArea>
        </CardHeader>
        <CardContent>
          <ul>
            <li>
              <h4 className="text-muted-foreground">What:</h4>
              <p className="text-right">{event.event_type}</p>
            </li>
            <Separator className="my-1" />
            <li>
              <h4 className="text-muted-foreground">When:</h4>
              <p className="text-right text-sm">
              {event.start_date ? event.start_date.toLocaleDateString() : "N/A"}
              </p>
            </li>
            <Separator className="my-1" />
            <li>
              <h4 className="text-muted-foreground">Where:</h4>
              <ScrollArea className="w-full">
                <p className="text-right text-sm">{event.address_city}</p>
                <p className="text-right text-sm">{event.address_country}</p>
              </ScrollArea>
            </li>
            <Separator className="my-1" />
            <li>
              <h4 className="text-muted-foreground">For:</h4>
              <div>
                <div className="flex justify-between">
                  <p className="text-sm">Age(s)</p>
                  <ScrollArea className="h-20">
                    {event.target_age.map((age) => (
                      <p className="text-right text-sm" key={age}>
                        {TargetAgeGroupMap[age]}
                      </p>
                    ))}
                  </ScrollArea>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm">Level(s)</p>
                  <ScrollArea className="h-20">
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
