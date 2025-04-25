import { fetchOneEvent } from "@/lib/data/events/data";
import {
  EventStatusMap,
  SportsEvent,
  SportsEventTypeMap,
  TargetAgeGroupMap,
  TargetLevelMap,
} from "@/lib/types";
import {
  capitalizeString,
  convertFetchedEvent,
  formatCurrencyForDisplay,
} from "@/lib/utils";
import {
  BicepsFlexedIcon,
  CalendarIcon,
  ExternalLinkIcon,
  GlobeIcon,
  HandCoinsIcon,
  InfoIcon,
  LinkIcon,
  MailIcon,
  MapPinIcon,
  PersonStandingIcon,
  PhoneIcon,
  ReceiptTextIcon,
  ThumbsUpIcon,
  TrophyIcon,
  UsersIcon,
} from "lucide-react";
import { notFound } from "next/navigation";
import { Separator } from "../ui/separator";
import { format } from "date-fns";
import { fetchImagePublicUrls } from "@/lib/data/storage/data";
import EventImage from "./event-image";

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
  const event: SportsEvent = await convertFetchedEvent(fetchedEvent);

  const imagePublicUrls =
    event.event_images.length > 0
      ? await fetchImagePublicUrls(event.event_images)
      : [];

  return (
    <>
      <div className="p-6 border rounded-md shadow-md bg-white text-sm">
        <h3 className="text-center text-3xl font-semibold font-mono">
          {event.event_name}
        </h3>
        <ul>
          <li className="py-8">
            <h4 className="text-basket font-medium text-xl font-mono mb-4">
              About the event
            </h4>
            <p className="text-lg flex justify-start items-center gap-1 mb-4">
              <TrophyIcon size={18} />
              {capitalizeString(SportsEventTypeMap[event.event_type])}
            </p>

            <div className="bg-muted max-h-32 overflow-y-auto p-3 rounded-md mb-4">
              {event.event_description ? (
                <p>{event.event_description}</p>
              ) : (
                <p className="text-muted-foreground italic text-center py-4">
                  No description provided
                </p>
              )}
            </div>

            <div className="flex gap-2 items-center">
              <div className="flex justify-start items-center gap-1">
                <InfoIcon size={18} />
                <h5 className="font-semibold text-base">Status:</h5>
              </div>

              <p>{EventStatusMap[event.event_status]}</p>
            </div>
          </li>

          <li className="py-4">
            <div className="flex justify-evenly gap-1">
              {imagePublicUrls.length > 0 &&
                imagePublicUrls.map((img, i) => (
                  <EventImage key={`img-${i}`} src={img.publicUrl} />
                ))}
            </div>
          </li>
          <Separator />
          <li className="py-8">
            <h4 className="text-basket font-medium text-xl font-mono mb-4">
              Who is it for
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-center">
              <div>
                <div className="flex justify-start items-center gap-1">
                  <PersonStandingIcon size={18} />
                  <h5 className="font-semibold text-base">Age(s):</h5>
                </div>
                <h6 className="text-muted-foreground text-xs text-left ml-1">
                  Age group (birthyear)
                </h6>
                <div className="max-h-24 overflow-y-auto my-1 py-1">
                  {event.target_age.map((age) => (
                    <p key={age}>{TargetAgeGroupMap[age]}</p>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-start items-center gap-1">
                  <BicepsFlexedIcon size={18} />
                  <h5 className="font-semibold text-base">Skill level(s):</h5>
                </div>
                <h6 className="opacity-0 text-xs hidden md:block">xxxx</h6>
                <div className="my-1 py-1">
                  {event.target_level ? (
                    event.target_level.map((level) => (
                      <p key={level}>{TargetLevelMap[level]}</p>
                    ))
                  ) : (
                    <p>N/A</p>
                  )}
                </div>
              </div>

              <div>
                <div className="flex justify-start items-center gap-1">
                  <UsersIcon size={18} />
                  <h5 className="font-semibold text-base">Gender:</h5>
                </div>
                <h6 className="opacity-0 text-xs hidden md:block">xxxx</h6>
                <p className="my-1 py-1">{event.target_gender}</p>
              </div>
            </div>
          </li>
          <Separator />
          <li className="py-8">
            <h4 className="text-basket font-medium text-xl font-mono mb-4">
              When and where
            </h4>

            <div className="flex justify-start items-center gap-1 mb-4">
              <CalendarIcon size={18} />
              <p>
                {event.start_date
                  ? format(event.start_date, "LLL dd, y")
                  : "TBD"}
                {event.end_date
                  ? ` - ${format(event.end_date, "LLL dd, y")}`
                  : ""}
              </p>
            </div>

            <div className="flex justify-start items-center gap-1">
              <MapPinIcon size={18} />
              <p>{event.address_city}</p>
            </div>
          </li>
          <Separator />
          <li className="py-8">
            <h4 className="text-basket font-medium text-xl font-mono mb-4">
              Pricing info
            </h4>
            <p className="text-xs text-muted-foreground">
              The provided price is an estimate, and could be subject to change.
            </p>

            <div className="flex justify-start items-center gap-1 my-4">
              <HandCoinsIcon size={18} />
              <p>
                {event.cost_estimate !== null
                  ? formatCurrencyForDisplay(
                      event.cost_estimate,
                      event.cost_currency
                    )
                  : "N/A"}
              </p>
            </div>

            {event.cost_description && (
              <div>
                <div className="flex justify-start items-center gap-1 mb-1">
                  <ReceiptTextIcon size={18} />
                  <h5 className="font-semibold text-base">Price info:</h5>
                </div>
                <p className="bg-muted max-h-32 overflow-y-auto p-3 rounded-md">
                  {event.cost_description}
                </p>
              </div>
            )}
          </li>
          <Separator />
          <li className="py-8">
            <h4 className="text-basket font-medium text-xl font-mono mb-4">
              How to get in touch
            </h4>

            <div className="flex flex-col gap-4 mb-6">
              <h5 className="text-muted-foreground">Point(s) of contact</h5>
              {event.contact_email && (
                <div className="flex justify-start items-center gap-1">
                  <MailIcon size={18} />
                  <p>{event.contact_email}</p>
                </div>
              )}
              {event.contact_url && (
                <div className="flex justify-start items-center gap-1">
                  <LinkIcon size={18} />
                  <div className="flex">
                    <a
                      target="_blank"
                      className="underline line-clamp-1 max-w-52 md:max-w-full"
                      href={event.contact_url}
                    >
                      {event.contact_url}
                    </a>
                    <ExternalLinkIcon size={12} />
                  </div>
                </div>
              )}
              {event.contact_phone && (
                <div className="flex justify-start items-center gap-1">
                  <PhoneIcon size={18} />
                  <p>{event.contact_phone}</p>
                </div>
              )}
            </div>
            {(event.event_link || event.social_links) && (
              <div className="flex flex-col gap-4">
                <h5 className="text-muted-foreground">Event link(s)</h5>
                {event.event_link && (
                  <div className="flex justify-start items-center gap-1">
                    <GlobeIcon size={18} />
                    <div className="flex">
                      <a
                        target="_blank"
                        className="underline line-clamp-1 max-w-52 md:max-w-full"
                        href={event.event_link}
                      >
                        {event.event_link}
                      </a>
                      <ExternalLinkIcon size={12} />
                    </div>
                  </div>
                )}
                {event.social_links && (
                  <div className="flex justify-start items-start gap-1">
                    <ThumbsUpIcon size={18} />
                    <div className="flex flex-col gap-1">
                      {event.social_links.map((link, i) => (
                        <div key={`social-${i}`} className="flex">
                          <a
                            target="_blank"
                            className="underline line-clamp-1 max-w-52 md:max-w-full"
                            href={link}
                          >
                            {link}
                          </a>
                          <ExternalLinkIcon size={12} />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </li>
        </ul>
      </div>
    </>
  );
};

export default EventDetails;
