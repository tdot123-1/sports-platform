import EventsCalendarWrapper from "@/components/events/events-calendar/events-calendar-wrapper";
import CalendarSkeleton from "@/components/skeletons/calendar-skeleton";
import ViewsToggle from "@/components/views/views-toggle";

import { parseSearchParams } from "@/lib/utils";

import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Calendar",
};

const Page = async (props: {
  searchParams?: Promise<{
    month?: string;
    year?: string;
    batch?: string;
    price?: string;
    et?: string;
    tg?: string;
    ta?: string;
    tl?: string;
    es?: string;
  }>;
}) => {
  const searchParams = await props.searchParams;

  const { month, year, currentBatch, filter, priceFilter } =
    parseSearchParams(searchParams);

  return (
    <>
      <div className="px-4">
        <ViewsToggle currentView="calendar" />
      </div>

      <div className="pb-4 h-[75vh] w-full">
        <Suspense fallback={<CalendarSkeleton />}>
          <EventsCalendarWrapper
            month={month}
            year={year}
            batch={currentBatch}
            filter={filter}
            priceFilter={priceFilter}
          />
        </Suspense>
      </div>
    </>
  );
};

export default Page;
