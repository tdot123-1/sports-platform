import { fetchOneEvent } from "@/lib/data/events/data";
import {
  SportsEvent,
  SportsEventTypeMap,
  TargetAgeGroupMap,
  TargetLevelMap,
} from "@/lib/types";
import { convertCurrencyValueToString, convertFetchedEvent } from "@/lib/utils";
import {
  BanknoteIcon,
  BicepsFlexedIcon,
  CalendarCheck,
  CalendarCheck2Icon,
  CalendarX2Icon,
  ExternalLinkIcon,
  HandCoinsIcon,
  LinkIcon,
  MailIcon,
  MapPinIcon,
  PersonStandingIcon,
  PhoneIcon,
  ReceiptTextIcon,
  UsersIcon,
} from "lucide-react";
import { notFound } from "next/navigation";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { countryNameMap } from "@/lib/countries";

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
              <p>{SportsEventTypeMap[event.event_type]}</p>
              <ScrollArea className="h-28">
                {event.event_description ? (
                  <p className="mt-1">{event.event_description}</p>
                ) : (
                  <p className="text-xs text-muted-foreground italic mt-4">
                    No description provided
                  </p>
                )}
              </ScrollArea>
            </div>
          </li>

          <li>
            <h4 className="text-primary italic font-medium">Who is it for</h4>
            <div className="text-sm my-1">
              <div className="flex justify-between">
                <div className="flex justify-start items-center gap-1">
                  <PersonStandingIcon size={18} />
                  <h5>Age:</h5>
                </div>
                <h6 className="text-muted-foreground">Age group (birthyear)</h6>
              </div>
              <ScrollArea className="h-20">
                <div className="text-right">
                  {event.target_age.map((age) => (
                    <p key={age}>{TargetAgeGroupMap[age]}</p>
                  ))}
                </div>
              </ScrollArea>

              <div className="flex justify-between items-start">
                <div className="flex justify-start items-center gap-1">
                  <BicepsFlexedIcon size={18} />
                  <h5>Skill level:</h5>
                </div>
                <ScrollArea className="h-14">
                  <div className="text-right">
                    {event.target_level ? (
                      event.target_level.map((level) => (
                        <p key={level}>{TargetLevelMap[level]}</p>
                      ))
                    ) : (
                      <p>N/A</p>
                    )}
                  </div>
                </ScrollArea>
              </div>
              <div className="flex justify-between">
                <div className="flex justify-start items-center gap-1">
                  <UsersIcon size={18} />
                  <h5>Gender:</h5>
                </div>
                <p>{event.target_gender}</p>
              </div>
            </div>
          </li>

          <li>
            <h4 className="text-primary italic font-medium">When and where</h4>
            <div className="text-sm my-1">
              <div className="flex justify-between">
                <div className="flex justify-start items-center gap-1">
                  <CalendarCheck2Icon size={18} />
                  <h5>Starts on:</h5>
                </div>
                <p>
                  {event.start_date
                    ? event.start_date.toLocaleDateString()
                    : "TBD"}
                </p>
              </div>
              <div className="flex justify-between">
                <div className="flex justify-start items-center gap-1">
                  <CalendarX2Icon size={18} />
                  <h5>Ends on:</h5>
                </div>
                <p>
                  {event.end_date ? event.end_date.toLocaleDateString() : "N/A"}
                </p>
              </div>
              <div className="flex justify-start items-center gap-1">
                <MapPinIcon size={18} />
                <h5>Address:</h5>
              </div>
              <p className="text-right">
                {event.address_line_one} {event.address_line_two}
              </p>

              <p className="text-right">{event.address_postal_code}</p>
              <p className="text-right">{event.address_city}</p>
              <p className="text-right">{event.address_region}</p>

              <p className="text-right">
                {countryNameMap[event.address_country]}
              </p>
            </div>
          </li>

          <li>
            <h4 className="text-primary italic font-medium">Pricing info</h4>
            <div className="text-sm my-1">
              <div className="flex justify-between">
                <div className="flex justify-start items-center gap-1">
                  <HandCoinsIcon size={18} />
                  <p>Price estimate:</p>
                </div>

                <p>
                  {convertCurrencyValueToString(event.cost_estimate)}{" "}
                  {event.cost_currency}
                </p>
              </div>
              {event.cost_description && (
                <div>
                  <div className="flex justify-start items-center gap-1">
                    <ReceiptTextIcon size={18} />
                    <p>Additional pricing info:</p>
                  </div>
                  <ScrollArea className="h-28">
                    <p className="text-right">{event.cost_description}</p>
                  </ScrollArea>
                </div>
              )}
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
              {event.event_links && (
                <>
                  <div className="flex justify-start items-center gap-1">
                    <LinkIcon size={18} />
                    <p>Links:</p>
                  </div>
                  <ScrollArea className="w-full">
                    {event.event_links.map((link) => (
                      <div
                        key={link}
                        className="text-right flex justify-end flex-nowrap overflow-hidden"
                      >
                        <ExternalLinkIcon size={14} />
                        <a
                          target="_blank"
                          className="underline text-xs whitespace-nowrap"
                          href={link}
                        >
                          {link}
                        </a>
                      </div>
                    ))}
                    <ScrollBar orientation={`horizontal`} />
                  </ScrollArea>
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
