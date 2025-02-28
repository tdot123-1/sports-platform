import EventsTable from "@/components/events/events-table";
import PaginationWrapper from "@/components/events/pagination-wrapper";
import EventsTableSkeleton from "@/components/skeletons/events-table-skeleton";
import Toolbar from "@/components/toolbar/toolbar";
import { Skeleton } from "@/components/ui/skeleton";
import { FilterOptions, SortOptions } from "@/lib/types";
import { parseFilters, parseSortOptions } from "@/lib/utils";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Table",
};

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

  return (
    <>
      <Suspense fallback={<Skeleton className="w-full h-12" />}>
        <Toolbar filter={filter} sort={sort} priceFilter={priceFilter} />
      </Suspense>
      <section className="px-0 md:px-4">
        <Suspense fallback={<EventsTableSkeleton />}>
          <EventsTable
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
