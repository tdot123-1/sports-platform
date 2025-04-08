import { InfoIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Separator } from "../ui/separator";
import { Skeleton } from "../ui/skeleton";

const EventCardSkeleton = () => {
  // <Skeleton className="h-12 w-12 rounded-full" />
  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-center gap-1">
            <Skeleton className="w-full h-5" />
            <Skeleton className="h-10 w-10 rounded-full" />
          </div>
        </CardHeader>
        <CardContent>
          <ul>
            <li>
              <div className="flex justify-end">
                <Skeleton className="w-20 h-5" />
              </div>
            </li>
            <Separator className="my-1" />
            <li>
              <div className="flex justify-end">
                <Skeleton className="w-20 h-5" />
              </div>
            </li>
            <Separator className="my-1" />
            <li>
              <Skeleton className="ml-auto w-9/12 h-5" />
            </li>
            <Separator className="my-1" />
            <li>
              <div>
                <div className="flex justify-between">
                  <p className="text-sm">Age(s)</p>
                  <Skeleton className="w-20 h-5" />
                </div>
                <div className="flex justify-between">
                  <p className="text-sm">Level(s)</p>
                  <Skeleton className="w-20 h-5" />
                </div>
                <div className="flex justify-between">
                  <p className="text-sm">Gender</p>
                  <Skeleton className="w-20 h-5" />
                </div>
              </div>
            </li>
            <Separator className="my-1" />
          </ul>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button size={`sm`} className="bg-basket" disabled>
            <div className="flex items-center gap-1">
              <InfoIcon />
              <span>View details</span>
            </div>
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default EventCardSkeleton;
