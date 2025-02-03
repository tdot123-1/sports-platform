import {
  BicepsFlexedIcon,
  CalendarCheck2Icon,
  CalendarX2Icon,
  MailIcon,
  MapPinIcon,
  PersonStandingIcon,
  PhoneIcon,
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
          <h4 className="text-orange-600 italic font-medium">Who is it for</h4>
          <div className="text-sm my-1">
            <div className="flex justify-between">
              <div className="flex justify-start items-center gap-1">
                <PersonStandingIcon size={18} />
                <p>Age:</p>
              </div>

              <Skeleton className="w-20 h-5" />
            </div>
            <div className="flex justify-between">
              <div className="flex justify-start items-center gap-1">
                <BicepsFlexedIcon size={18} />
                <p>Skill level:</p>
              </div>
              <Skeleton className="w-20 h-5" />
            </div>
            <div className="flex justify-between">
              <div className="flex justify-start items-center gap-1">
                <UsersIcon size={18} />
                <p>Gender:</p>
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
              <Skeleton className="w-36 h-5" />
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
