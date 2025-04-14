import EventsMapWrapper from "@/components/events/map/map-wrapper";
import EventsMap from "@/components/test/map-test";
import EventsMapWrapperTest from "@/components/test/map-wrapper-test";
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
    lat?: string;
    lng?: string;
    sth?: string;
    wst?: string;
    nth?: string;
    est?: string;
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
  const { filter, priceFilter, passedEventsFilter, currentBatch } =
    parseSearchParams(searchParams);

  return (
    <div className="px-4">
      <section className="mx-auto w-full md:w-9/12 lg:w-7/12 max-w-screen-xl my-8 h-[calc(100vh-150px)]">
        {/** toolbar (filter, search, batch select) */}
        <div className="flex justify-between mb-1">
          <Button>Filter</Button>
          <Button>Search</Button>
          <Button>Batch</Button>
        </div>
        <Suspense fallback={<Skeleton className="w-full h-full" />}>
          <EventsMapWrapperTest mapId={MAP_ID} apiKey={MAPS_API_KEY} />
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
