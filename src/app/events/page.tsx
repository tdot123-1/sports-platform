import EventsList from "@/components/events/events-list";
import AppPagination from "@/components/events/pagination";
import PaginationWrapper from "@/components/events/pagination-wrapper";
import EventsListSkeleton from "@/components/skeletons/events-list-skeleton";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchEventsPages } from "@/lib/data/events/data";
import { Suspense } from "react";

const Page = async (props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
    filter?: string;
    sort?: string;
    order?: string;
  }>;
}) => {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <>
      <h1>Events</h1>
      <Suspense fallback={<EventsListSkeleton />}>
        <EventsList currentPage={currentPage} />
      </Suspense>
      <div className="w-fit mx-auto py-6">
        <Suspense fallback={<Skeleton className="h-6 w-28" />}>
          <PaginationWrapper query={query} />
        </Suspense>
      </div>
    </>
  );
};

export default Page;
