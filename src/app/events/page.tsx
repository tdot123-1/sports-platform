import EventsList from "@/components/events/events-list";
import PaginationWrapper from "@/components/events/pagination-wrapper";
import EventsListSkeleton from "@/components/skeletons/events-list-skeleton";
import Toolbar from "@/components/toolbar/toolbar";
import { Skeleton } from "@/components/ui/skeleton";
import { FilterOptions, SortOptions } from "@/lib/types";
import { parseFilters, parseSortOptions } from "@/lib/utils";
import { Suspense } from "react";

// params hardcoded for now, maybe change to a map later(?)
const Page = async (props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
    et?: string;
    tg?: string;
    ta?: string;
    tl?: string;
    sort?: string;
    order?: string;
  }>;
}) => {
  const searchParams = await props.searchParams;
  const query = searchParams?.query
    ? decodeURIComponent(searchParams.query)
    : "";
  const currentPage = Number(searchParams?.page) || 1;

  // parse filters
  let filter: FilterOptions | undefined;
  if (searchParams) {
    filter = parseFilters(searchParams);
  }

  // parse sort options
  let sort: SortOptions | undefined;
  if (searchParams) {
    sort = parseSortOptions(searchParams);
  }

  return (
    <>
      <Toolbar filter={filter} sort={sort} />
      <div className="mx-4">
        <Suspense fallback={<EventsListSkeleton />}>
          <EventsList currentPage={currentPage} filter={filter} sort={sort} searchQuery={query} />
        </Suspense>
        <div className="w-fit mx-auto py-6">
          <Suspense fallback={<Skeleton className="h-6 w-28" />}>
            <PaginationWrapper query={query} />
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default Page;
