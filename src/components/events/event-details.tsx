import { fetchOneEvent } from "@/lib/data/events/data";
import { SportsEvent } from "@/lib/types";
import { convertFetchedEvent } from "@/lib/utils";
import {
  BicepsFlexedIcon,
  CalendarCheck,
  CalendarCheck2Icon,
  CalendarX2Icon,
  MailIcon,
  MapPinIcon,
  PersonStandingIcon,
  PhoneIcon,
  UsersIcon,
} from "lucide-react";
import { notFound } from "next/navigation";
import { ScrollArea } from "../ui/scroll-area";

interface EventDetailsProps {
  eventId: string;
}

const EventDetails = async ({ eventId }: EventDetailsProps) => {

  // test skeleton
  // await new Promise((resolve) => setTimeout(resolve, 5000));

  // fetch event
  const fetchedEvent = await fetchOneEvent(eventId);

  if (!fetchedEvent) {
    return notFound();
  }

  // convert to get correct type (incl dates)
  const event: SportsEvent = convertFetchedEvent(fetchedEvent);

  return (
    <>
      <div className="p-6 border rounded-md shadow-md">
        <h3 className="text-center text-lg font-semibold font-mono">
          {event.event_name}
        </h3>
        <ul>
          <li>
            <h4 className="text-primary italic font-medium ">
              About the event
            </h4>
            <div className="text-sm my-1">
              <p>{event.event_type}</p>
              <ScrollArea className="h-28">
                {event.description ? (
                  <p className="mt-1">{event.description}</p>
                ) : (
                  <p className="text-xs text-muted-foreground italic mt-4">No description provided</p>
                )}
              </ScrollArea>
            </div>
          </li>

          <li>
            <h4 className="text-primary italic font-medium">
              Who is it for
            </h4>
            <div className="text-sm my-1">
              <div className="flex justify-between">
                <div className="flex justify-start items-center gap-1">
                  <PersonStandingIcon size={18} />
                  <p>Age:</p>
                </div>
                <p>{event.target_age}</p>
              </div>
              <div className="flex justify-between">
                <div className="flex justify-start items-center gap-1">
                  <BicepsFlexedIcon size={18} />
                  <p>Skill level:</p>
                </div>
                <p>{event.target_level ? event.target_level : "N/A"}</p>
              </div>
              <div className="flex justify-between">
                <div className="flex justify-start items-center gap-1">
                  <UsersIcon size={18} />
                  <p>Gender:</p>
                </div>
                <p>{event.target_gender}</p>
              </div>
            </div>
          </li>

          <li>
            <h4 className="text-primary italic font-medium">
              When and where
            </h4>
            <div className="text-sm my-1">
              <div className="flex justify-between">
                <div className="flex justify-start items-center gap-1">
                  <CalendarCheck2Icon size={18} />
                  <p>Starts on:</p>
                </div>
                <p>{event.start_date.toLocaleDateString()}</p>
              </div>
              <div className="flex justify-between">
                <div className="flex justify-start items-center gap-1">
                  <CalendarX2Icon size={18} />
                  <p>Ends on:</p>
                </div>
                <p>
                  {event.end_date ? event.end_date.toLocaleDateString() : "N/A"}
                </p>
              </div>
              <div className="flex justify-start items-center gap-1">
                <MapPinIcon size={18} />
                <p>Address:</p>
              </div>
              <p className="text-right">{event.event_location}</p>
            </div>
          </li>

          <li>
            <h4 className="text-primary italic font-medium">
              How to get in touch
            </h4>
            <div className="text-sm my-1">
              <div className="flex justify-start items-center gap-1">
                <MailIcon size={18} />
                <p>Email:</p>
              </div>
              <p className="text-right">{event.contact_email}</p>
              {event.contact_phone && (
                <>
                  <div className="flex justify-start items-center gap-1">
                    <PhoneIcon size={18} />
                    <p>Phone:</p>
                  </div>
                  <p className="text-right">{event.contact_phone}</p>
                </>
              )}
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};

export default EventDetails;
