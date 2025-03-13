import EventsMap from "@/components/map/events-map";
import EventsMapWrapper from "@/components/map/map-wrapper";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ConstructionIcon, HomeIcon } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Map",
};

const Page = () => {
  const MAP_ID = process.env.MAP_ID;
  if (!MAP_ID) {
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
  return (
    <div className="px-4">
      <section className="mx-auto w-full md:w-9/12 lg:w-7/12 max-w-screen-xl my-8 h-[calc(100vh-150px)]">
        <Suspense fallback={<Skeleton className="w-full h-full" />}>
          <EventsMapWrapper mapId={MAP_ID} />
        </Suspense>
      </section>
    </div>
  );
};

export default Page;
