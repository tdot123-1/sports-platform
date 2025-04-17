import MapPaginationWrapper from "@/components/events/map/map-pagination-wrapper";
import MapToolbar from "@/components/events/map/map-toolbar";

import EventsMapWrapper from "@/components/events/map/map-wrapper";
import MapToolbarSkeleton from "@/components/skeletons/map-toolbar-skeleton";
import ToolbarFilter from "@/components/toolbar/toolbar-filter";
import ToolbarSearch from "@/components/toolbar/toolbar-search";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { parseSearchParams } from "@/lib/utils";
import { ConstructionIcon, HomeIcon } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Map",
};

const Page = async (props: {
  searchParams?: Promise<{
    query?: string;
    batch?: string;
    et?: string;
    tg?: string;
    ta?: string;
    tl?: string;
    es?: string;
    pe?: string;
    price?: string;
    lt?: string;
    lg?: string;
    s?: string;
    w?: string;
    n?: string;
    e?: string;
  }>;
}) => {
  const MAP_ID = process.env.MAP_ID;
  const MAPS_API_KEY = process.env.MAPS_API_KEY;

  if (!MAP_ID || !MAPS_API_KEY) {
    return (
      <div className="px-4 flex flex-col justify-center items-center gap-4 py-28">
        <ConstructionIcon size={40} />
        <p className="font-mono text-lg mb-8">Map currently unavailable</p>
        <Link href={"/"}>
          <Button>
            <HomeIcon />
            Return
          </Button>
        </Link>
      </div>
    );
  }

  const searchParams = await props.searchParams;
  const {
    filter,
    priceFilter,
    passedEventsFilter,
    currentBatch,
    mapCoords,
    query,
  } = parseSearchParams(searchParams);

  return (
    <div className="px-4">
      <section className="mx-auto w-full md:w-9/12 lg:w-7/12 max-w-screen-xl my-8 h-[calc(100vh-150px)]">
        {/** toolbar (filter, search, batch select) */}
        <Suspense fallback={<MapToolbarSkeleton />}>
          <MapToolbar
            searchQuery={query}
            filter={filter}
            priceFilter={priceFilter}
            passedEventsFilter={passedEventsFilter}
            mapCoords={mapCoords}
          />
        </Suspense>

        {/* <div className="flex justify-between mb-1">
          <div className="flex gap-8">
            <ToolbarFilter batch maxPrice={1000} passedEventsFilter={passedEventsFilter} />
            <ToolbarSearch batch />
          </div>

          <Suspense fallback={<Skeleton className="h-16 w-24" />}>
            <MapPaginationWrapper
              mapCoords={mapCoords}
              filter={filter}
              priceFilter={priceFilter}
              passedEventsFilter={passedEventsFilter}
              searchQuery={query}
            />
          </Suspense>
        </div> */}
        <Suspense fallback={<Skeleton className="w-full h-full" />}>
          <EventsMapWrapper
            mapId={MAP_ID}
            apiKey={MAPS_API_KEY}
            mapCoords={mapCoords}
            filter={filter}
            priceFilter={priceFilter}
            passedEventsFilter={passedEventsFilter}
            searchQuery={query}
            currentBatch={currentBatch}
          />
        </Suspense>
      </section>
    </div>
  );

  // return (
  //   <div className="px-4">
  //     <section className="mx-auto w-full md:w-9/12 lg:w-7/12 max-w-screen-xl my-8 h-[calc(100vh-150px)]">
  //       <Suspense fallback={<Skeleton className="w-full h-full" />}>
  //         <EventsMapWrapper mapId={MAP_ID} />
  //       </Suspense>
  //     </section>
  //   </div>
  // );
};

export default Page;
