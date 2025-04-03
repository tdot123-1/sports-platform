import EventsList from "@/components/events/events-grid/events-list";
import PaginationWrapper from "@/components/events/pagination-wrapper";
import EventsListSkeleton from "@/components/skeletons/events-list-skeleton";
import Toolbar from "@/components/toolbar/toolbar";
import { Skeleton } from "@/components/ui/skeleton";
import { parseFilters, parseSortOptions } from "@/lib/filters";
import { FilterOptions, SortOptions } from "@/lib/types";

import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Grid",
};

// params hardcoded for now, maybe change to a map later(?)
const Page = async (props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
    et?: string;
    tg?: string;
    ta?: string;
    tl?: string;
    es?: string;
    sort?: string;
    order?: string;
    price?: string;
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

  const priceFilter =
    Number(searchParams?.price) >= 0 ? Number(searchParams?.price) : undefined;

  // throw new Error("test");

  return (
    <>
      <Suspense fallback={<Skeleton className="w-full h-12" />}>
        <Toolbar filter={filter} sort={sort} priceFilter={priceFilter} />
      </Suspense>

      <section className="px-4">
        <Suspense fallback={<EventsListSkeleton />}>
          <EventsList
            currentPage={currentPage}
            filter={filter}
            sort={sort}
            searchQuery={query}
            priceFilter={priceFilter}
          />
        </Suspense>
        <div className="w-fit mx-auto py-6">
          <Suspense fallback={<Skeleton className="h-6 w-28" />}>
            <PaginationWrapper
              query={query}
              filter={filter}
              priceFilter={priceFilter}
            />
          </Suspense>
        </div>
      </section>
    </>
  );
};

export default Page;
