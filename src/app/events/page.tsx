import EventsList from "@/components/events/events-list";
import EventsListSkeleton from "@/components/skeletons/events-list-skeleton";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchEventsPages } from "@/lib/data/events/data";
import { Suspense } from "react";

const Page = async (props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) => {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  // fetch total pages
  const totalPages = fetchEventsPages(query);

  
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
