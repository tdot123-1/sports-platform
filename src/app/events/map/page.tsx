import MapToolbar from "@/components/events/map/map-toolbar";
import EventsMapWrapper from "@/components/events/map/map-wrapper";
import MapToolbarSkeleton from "@/components/skeletons/map-toolbar-skeleton";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import ViewsToggle from "@/components/views/views-toggle";
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
    <>
      <div className="bg-sidebar mt-1.5">
        <ViewsToggle currentView="map" />
      </div>
      <div className="min-h-dvh py-8 px-4">
        <section className="mx-auto w-full md:w-9/12 lg:w-7/12 max-w-screen-xl h-[calc(100vh-200px)]">
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
    </>
  );
};

export default Page;
