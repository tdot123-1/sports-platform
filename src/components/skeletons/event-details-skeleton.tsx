import {
  BicepsFlexedIcon,
  CalendarCheck2Icon,
  CalendarX2Icon,
  HandCoinsIcon,
  MailIcon,
  MapPinIcon,
  PersonStandingIcon,
  PhoneIcon,
  ReceiptTextIcon,
  UsersIcon,
} from "lucide-react";
import { Skeleton } from "../ui/skeleton";

const EventDetailsSkeleton = () => {
  return (
    <div className="p-6 border rounded-md shadow-md">
      <Skeleton className="w-1/6 h-10 mx-auto" />
      <ul>
        <li>
          <h4 className="text-orange-600 italic font-medium">
            About the event
          </h4>
          <div className="text-sm my-1">
            <Skeleton className="w-28 h-5" />
            <Skeleton className="w-full h-28 mt-1" />
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
            <div className="flex justify-end">
              <Skeleton className="w-36 h-16" />
            </div>

            <div className="flex justify-between items-start">
              <div className="flex justify-start items-center gap-1">
                <BicepsFlexedIcon size={18} />
                <h5>Skill level:</h5>
              </div>
              <div className="flex justify-end">
                <Skeleton className="w-36 h-16" />
              </div>
            </div>
            <div className="flex justify-between">
              <div className="flex justify-start items-center gap-1">
                <UsersIcon size={18} />
                <h5>Gender:</h5>
              </div>
              <Skeleton className="w-20 h-5" />
            </div>
          </div>
        </li>

        <li>
          <h4 className="text-orange-600 italic font-medium">When and where</h4>
          <div className="text-sm my-1">
            <div className="flex justify-between">
              <div className="flex justify-start items-center gap-1">
                <CalendarCheck2Icon size={18} />
                <p>Starts on:</p>
              </div>
              <Skeleton className="w-20 h-5" />
            </div>
            <div className="flex justify-between">
              <div className="flex justify-start items-center gap-1">
                <CalendarX2Icon size={18} />
                <p>Ends on:</p>
              </div>
              <Skeleton className="w-20 h-5" />
            </div>
            <div className="flex justify-start items-center gap-1">
              <MapPinIcon size={18} />
              <p>Address:</p>
            </div>

            <div className="flex justify-end">
              <Skeleton className="w-36 h-20" />
            </div>
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

              <Skeleton className="w-20 h-5" />
            </div>

            <div>
              <div className="flex justify-start items-center gap-1">
                <ReceiptTextIcon size={18} />
                <p>Additional pricing info:</p>
              </div>
              <div className="flex justify-end">
                <Skeleton className="w-36 h-20" />
              </div>
            </div>
          </div>
        </li>

        <li>
          <h4 className="text-orange-600 italic font-medium">
            How to get in touch
          </h4>
          <div className="text-sm my-1">
            <div className="flex justify-start items-center gap-1">
              <MailIcon size={18} />
              <p>Email:</p>
            </div>
            <div className="flex justify-end">
              <Skeleton className="w-28 h-5" />
            </div>

            <div className="flex justify-start items-center gap-1">
              <PhoneIcon size={18} />
              <p>Phone:</p>
            </div>
            <div className="flex justify-end">
              <Skeleton className="w-28 h-5" />
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default EventDetailsSkeleton;
