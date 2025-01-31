import { SportsEvent } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
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
              <p className="text-right">
                {event.start_date.toLocaleDateString()}
              </p>
            </li>
            <Separator className="my-1" />
            <li>
              <h4 className="text-muted-foreground">Where:</h4>
              <ScrollArea className="w-full h-16">
                <p className="text-right">{event.event_location}</p>
              </ScrollArea>
            </li>
            <Separator className="my-1" />
            <li>
              <h4 className="text-muted-foreground">For:</h4>
              <div>
                <div className="flex justify-between">
                  <p className="text-sm">Age</p>
                  <p className="overflow-hidden">{event.target_age}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm">Level</p>
                  <p className="overflow-hidden">
                    {event.target_level ? event.target_level : "N/A"}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm">Gender</p>
                  <p className="overflow-hidden">{event.target_gender}</p>
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
