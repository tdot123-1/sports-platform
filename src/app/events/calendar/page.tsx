import EventsCalendarWrapper from "@/components/events/events-calendar/events-calendar-wrapper";

const Page = async (props: {
  searchParams?: Promise<{
    month?: string;
    year?: string;
    batch?: string;
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

  return (
    <>
      <h1>Calendar view</h1>
      <div className="h-[80vh] w-full">
        <EventsCalendarWrapper month={month} year={year} batch={batch} />
      </div>
    </>
  );
};

export default Page;
