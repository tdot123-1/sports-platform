import EventsList from "@/components/events-list";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

const Page = () => {
  return (
    <>
      <h1>Events</h1>
      <Suspense fallback={<Skeleton className="w-full h-20" />}>
        <EventsList />
      </Suspense>
    </>
  );
};

export default Page;
