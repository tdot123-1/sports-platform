import NewEventsCarousel from "@/components/events/new-events/new-events-carousel";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

export default function Home() {
  return (
    <>
      <h1>Sports platform</h1>

      <section className="my-16">
        <div className="">
          <h2 className="text-2xl font-mono text-primary pl-10">What's New</h2>
          <div className="w-full flex justify-center">
            <Suspense fallback={<Skeleton className="w-1/2 h-36" />}>
              <NewEventsCarousel />
            </Suspense>
          </div>
        </div>
      </section>
    </>
  );
}
