import {
  BicepsFlexedIcon,
  CalendarCheck2Icon,
  CalendarX2Icon,
  HandCoinsIcon,
  LinkIcon,
  MailIcon,
  MapPinIcon,
  PersonStandingIcon,
  PhoneIcon,
  ReceiptTextIcon,
  UsersIcon,
} from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import { Separator } from "../ui/separator";

const EventDetailsSkeleton = () => {
  return (
    <div className="p-6 border rounded-md shadow-md">
      <Skeleton className="w-1/3 h-10 mx-auto" />
      <ul>
        <li className="py-2">
          <h4 className="text-primary italic font-medium ">About the event</h4>
          <div className="my-1">
            <Skeleton className="w-28 h-5" />
            <Skeleton className="w-full h-28 mt-1" />
          </div>
        </li>
        <li className="py-2">
          <div className="flex justify-evenly gap-1">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={`img-${i}`} className="aspect-square w-24" />
            ))}
          </div>
        </li>

        <li className="py-2">
          <h4 className="text-primary italic font-medium">Who is it for</h4>
          <div className="text-sm my-1">
            <div className="flex justify-between">
              <div className="flex justify-start items-center gap-1">
                <PersonStandingIcon size={18} />
                <h5 className="font-semibold">Age(s):</h5>
              </div>
              <h6 className="text-muted-foreground">Age group (birthyear)</h6>
            </div>

            <Skeleton className="ml-auto w-36 h-16" />

            <Separator className="my-2" />
            <div className="flex justify-between items-start">
              <div className="flex justify-start items-center gap-1">
                <BicepsFlexedIcon size={18} />
                <h5 className="font-semibold">Skill level(s):</h5>
              </div>
              <Skeleton className="w-36 h-16" />
            </div>
            <Separator className="my-2" />
            <div className="flex justify-between">
              <div className="flex justify-start items-center gap-1">
                <UsersIcon size={18} />
                <h5 className="font-semibold">Gender:</h5>
              </div>
              <Skeleton className="w-20 h-5" />
            </div>
          </div>
        </li>

        <li className="py-2">
          <h4 className="text-primary italic font-medium">When and where</h4>
          <div className="text-sm my-1">
            <div className="flex justify-between">
              <div className="flex justify-start items-center gap-1">
                <CalendarCheck2Icon size={18} />
                <h5 className="font-semibold">Starts on:</h5>
              </div>
              <Skeleton className="w-20 h-5" />
            </div>
            <div className="flex justify-between">
              <div className="flex justify-start items-center gap-1">
                <CalendarX2Icon size={18} />
                <h5 className="font-semibold">Ends on:</h5>
              </div>
              <Skeleton className="w-20 h-5" />
            </div>
            <div className="flex justify-start items-center gap-1">
              <MapPinIcon size={18} />
              <h5 className="font-semibold">Location:</h5>
            </div>
            <Skeleton className="ml-auto w-48 h-5" />
          </div>
        </li>

        <li className="py-2">
          <h4 className="text-primary italic font-medium">Pricing info</h4>
          <div className="text-sm my-1">
            <div className="flex justify-between">
              <div className="flex justify-start items-center gap-1">
                <HandCoinsIcon size={18} />
                <h5 className="font-semibold">Price estimate:</h5>
              </div>
              <Skeleton className="w-20 h-5" />
            </div>
            <div>
              <Separator className="my-2" />
              <div className="flex justify-start items-center gap-1">
                <ReceiptTextIcon size={18} />
                <h5 className="font-semibold">Additional pricing info:</h5>
              </div>
              <Skeleton className="ml-auto w-8/12 h-20" />
            </div>
          </div>
        </li>

        <li className="py-2">
          <h4 className="text-primary italic font-medium">
            How to get in touch
          </h4>
          <div className="text-sm my-1">
            <div className="flex justify-start items-center gap-1">
              <MailIcon size={18} />
              <h5 className="font-semibold">Email:</h5>
            </div>
            <Skeleton className="ml-auto w-28 h-5" />
            <div className="flex justify-start items-center gap-1">
              <PhoneIcon size={18} />
              <h5 className="font-semibold">Phone:</h5>
            </div>
            <Skeleton className="ml-auto w-28 h-5" />
            <div className="flex justify-start items-center gap-1">
              <LinkIcon size={18} />
              <h5 className="font-semibold">Links:</h5>
            </div>
            <Skeleton className="ml-auto w-8/12 h-5" />
          </div>
        </li>
      </ul>
    </div>
  );
};

export default EventDetailsSkeleton;
