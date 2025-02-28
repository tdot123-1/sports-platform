import EventsCalendarWrapper from "@/components/events/events-calendar/events-calendar-wrapper";
import { FilterOptions } from "@/lib/types";
import { parseFilters } from "@/lib/utils";
import { Metadata } from "next";

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
  }>;
}) => {
  const searchParams = await props.searchParams;

  // get selected month or current month
  const month =
    // ensure param can be converted to number
    searchParams?.month && !isNaN(Number(searchParams.month))
      ? // ensure number is between 1 and 12
        Math.min(Math.max(1, Number(searchParams.month)), 12)
      : new Date().getMonth() + 1;

  // get selected year or current year
  const year =
    // ensure param can be converted to number
    searchParams?.year && !isNaN(Number(searchParams.year))
      ? // ensure year is later than 2000
        Math.max(2000, Number(searchParams.year))
      : new Date().getFullYear();

  const batch = Number(searchParams?.batch) || 1;

  const priceFilter =
    Number(searchParams?.price) >= 0 ? Number(searchParams?.price) : undefined;

  // parse filters
  let filter: FilterOptions | undefined;
  if (searchParams) {
    filter = parseFilters(searchParams);
  }

  return (
    <>
      <div className="pb-4 h-[80vh] w-full">
        <EventsCalendarWrapper
          month={month}
          year={year}
          batch={batch}
          filter={filter}
          priceFilter={priceFilter}
        />
      </div>
    </>
  );
};

export default Page;
