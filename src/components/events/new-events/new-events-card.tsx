import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SportsEvent, SportsEventTypeMap } from "@/lib/types";
import Link from "next/link";

const NewEventCard = ({ event }: { event: SportsEvent }) => {
  return (
    <>
      <Card className="max-w-md">
        <CardContent className="flex flex-col gap-2 aspect-square items-center justify-center">
          <div className="max-w-full">
            <h3 className="text-lg font-semibold text-ellipsis overflow-hidden text-nowrap">
              {event.event_name}
            </h3>
          </div>

          <p>{SportsEventTypeMap[event.event_type]}</p>
          <p className="mb-2 text-ellipsis overflow-hidden text-nowrap">
            {event.address_city}, {event.address_country}
          </p>
          <Avatar className="">
            {event.event_logo_url && <AvatarImage src={event.event_logo_url} />}
            <AvatarFallback className="bg-primary opacity-55">
              Sports
            </AvatarFallback>
          </Avatar>
          <Link href={`/events/${event.id}`}>
            <Button>Details</Button>
          </Link>
        </CardContent>
      </Card>
    </>
  );
};

export default NewEventCard;
