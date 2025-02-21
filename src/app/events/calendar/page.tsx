import EventsCalendarWrapper from "@/components/events/events-calendar/events-calendar-wrapper";

const Page = () => {
  return (
    <>
      <h1>Calendar view</h1>
      <div className="h-[80vh] w-full">
        <EventsCalendarWrapper />
      </div>
    </>
  );
};

export default Page;
