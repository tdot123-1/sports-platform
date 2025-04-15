import EventsTable from "@/components/events/events-table";
import PaginationWrapper from "@/components/events/pagination-wrapper";
import EventsTableSkeleton from "@/components/skeletons/events-table-skeleton";
import Toolbar from "@/components/toolbar/toolbar";
import { Skeleton } from "@/components/ui/skeleton";

import { parseSearchParams } from "@/lib/utils";

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
    es?: string;
    pe?: string;
    sort?: string;
    order?: string;
    price?: string;
  }>;
}) => {
  const searchParams = await props.searchParams;

  const { filter, sort, priceFilter, passedEventsFilter, query, currentPage } =
    parseSearchParams(searchParams);

  return (
    <>
      <Suspense fallback={<Skeleton className="w-full h-12" />}>
        <Toolbar
          filter={filter}
          sort={sort}
          priceFilter={priceFilter}
          passedEventsFilter={passedEventsFilter}
        />
      </Suspense>
      <section className="px-0 md:px-4">
        <Suspense fallback={<EventsTableSkeleton />}>
          <EventsTable
            currentPage={currentPage}
            filter={filter}
            sort={sort}
            searchQuery={query}
            priceFilter={priceFilter}
            passedEventsFilter={passedEventsFilter}
          />
        </Suspense>
        <div className="w-fit mx-auto py-6">
          <Suspense fallback={<Skeleton className="h-6 w-28" />}>
            <PaginationWrapper
              query={query}
              filter={filter}
              priceFilter={priceFilter}
              passedEventsFilter={passedEventsFilter}
            />
          </Suspense>
        </div>
      </section>
    </>
  );
};

export default Page;
