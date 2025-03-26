import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Separator } from "../ui/separator";
import { Skeleton } from "../ui/skeleton";

const EventCardSkeleton = () => {
  // <Skeleton className="h-12 w-12 rounded-full" />
  return (
    <>
      <Card>
        <CardHeader className="items-center">
          <Skeleton className="h-12 w-12 rounded-full" />
          <Skeleton className="w-8/12 mx-auto h-5 mt-4" />
        </CardHeader>
        <CardContent>
          <ul>
            <li>
              <h4 className="text-muted-foreground">What:</h4>
              <div className="flex justify-end">
                <Skeleton className="w-20 h-5" />
              </div>
            </li>
            <Separator className="my-1" />
            <li>
              <h4 className="text-muted-foreground">When:</h4>
              <div className="flex justify-end">
                <Skeleton className="w-20 h-5" />
              </div>
            </li>
            <Separator className="my-1" />
            <li>
              <h4 className="text-muted-foreground">Where:</h4>

              <Skeleton className="ml-auto w-9/12 h-5" />
            </li>
            <Separator className="my-1" />
            <li>
              <h4 className="text-muted-foreground">For:</h4>
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
          <Button disabled>View details</Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default EventCardSkeleton;
