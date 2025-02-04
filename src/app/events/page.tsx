import EventsList from "@/components/events/events-list";
import PaginationWrapper from "@/components/events/pagination-wrapper";
import EventsListSkeleton from "@/components/skeletons/events-list-skeleton";
import Toolbar from "@/components/toolbar/toolbar";
import { Skeleton } from "@/components/ui/skeleton";
import { FilterOptions, SortOptions } from "@/lib/types";
import { Suspense } from "react";

const Page = async (props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
    filter?: string;
    sort?: string;
  }>;
}) => {
  const searchParams = await props.searchParams;
  const query = searchParams?.query
    ? decodeURIComponent(searchParams.query)
    : "";
  const currentPage = Number(searchParams?.page) || 1;

  // parse filters
  let filters: FilterOptions | undefined;
  if (searchParams?.filter) {
    try {
      filters = JSON.parse(decodeURIComponent(searchParams.filter));
    } catch (error) {
      console.error("Error parsing filter params: ", error);
    }
  }

  // parse sort options
  let sort: SortOptions | undefined;
  if (searchParams?.sort) {
    try {
      sort = JSON.parse(decodeURIComponent(searchParams.sort));
    } catch (error) {
      console.error("Error parsing sort params: ", error);
    }
  }

  return (
    <>
      <h1>Events</h1>
      <Toolbar filter={filters} sort={sort} />
      <Suspense fallback={<EventsListSkeleton />}>
        <EventsList currentPage={currentPage} filter={filters} sort={sort} />
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