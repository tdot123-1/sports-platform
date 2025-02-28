import EventsList from "@/components/events/events-grid/events-list";
import PaginationWrapper from "@/components/events/pagination-wrapper";
import EventsListSkeleton from "@/components/skeletons/events-list-skeleton";
import Toolbar from "@/components/toolbar/toolbar";
import { Skeleton } from "@/components/ui/skeleton";
import { createClient } from "@/lib/supabase/server";
import { FilterOptions, SortOptions } from "@/lib/types";
import { parseFilters, parseSortOptions } from "@/lib/utils";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "My Events",
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
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

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
    Number(searchParams?.price) > 0 ? Number(searchParams?.price) : undefined;

  return (
    <>
      <Toolbar filter={filter} sort={sort} priceFilter={priceFilter} />
      <section className="px-4">
        <Suspense fallback={<EventsListSkeleton />}>
          <EventsList
            userId={data.user.id}
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
              userId={data.user.id}
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
