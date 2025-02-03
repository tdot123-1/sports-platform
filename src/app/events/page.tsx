import EventsList from "@/components/events/events-list";
import EventsListSkeleton from "@/components/skeletons/events-list-skeleton";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

const Page = () => {
  return (
    <>
      <h1>Events</h1>
      <Suspense fallback={<EventsListSkeleton />}>
        <EventsList />
      </Suspense>
    </>
  );
};

export default Page;
