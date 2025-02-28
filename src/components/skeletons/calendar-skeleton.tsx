import { ChevronLeftIcon, ChevronRightIcon, FilterIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";

const CalendarSkeleton = () => {
  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <>
      <div>
        <div className="pb-1 pt-4 px-4 flex justify-between">
          <Button variant={`outline`} disabled>
            <div className="flex justify-start items-center gap-1">
              <FilterIcon />
              <span className="hidden md:block">Filter</span>
            </div>
          </Button>
          <div>
            <div className="ml-auto flex justify-end w-fit">
              <Button disabled size={`icon`} variant={`outline`}>
                <p hidden className="hidden">
                  Previous batch
                </p>
                <ChevronLeftIcon />
              </Button>
              <Button disabled size={`icon`} variant={`outline`}>
                <p hidden className="hidden">
                  Next batch
                </p>
                <ChevronRightIcon />
              </Button>
            </div>
            <p className="text-xs font-semibold">Events 0-25</p>
          </div>
        </div>
        <div>
          <div className="flex flex-col md:flex-row justify-between items-center pb-2">
            <div className="flex text-muted-foreground">
              <div className="border border-muted px-4 py-1 rounded-l-sm">
                Today
              </div>
              <div className="border border-muted px-4 py-1">Back</div>
              <div className="border border-muted px-4 py-1 rounded-r-sm">
                Next
              </div>
            </div>
            <div>Calendar 2025</div>
            <div></div>
          </div>
          <div className="grid grid-cols-7">
            {weekDays.map((day) => (
              <div
                key={day}
                className="py-0.5 font-bold text-sm text-center h-fit w-full border border-muted"
              >
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7">
            {Array.from({ length: 7 * 5 }).map((_, i) => (
              <div
                key={i}
                className="h-20 lg:h-24 w-full border border-muted p-1"
              >
                <Skeleton className="h-full w-full rounded-md" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CalendarSkeleton;
