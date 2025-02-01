import EventDetails from "@/components/event-details";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { Suspense } from "react";

const Page = async ({ params }: { params: Promise<{ eventId: string }> }) => {
  const eventId = (await params).eventId;
  return (
    <>
      <h1>Event Details</h1>
      <section className="mx-auto my-6 w-full md:w-3/4 lg:w-2/3 xl:w-1/2">
        <Suspense fallback={<Skeleton className="h-32 w-full" />}>
          <EventDetails eventId={eventId} />
        </Suspense>
        <div className="w-fit mx-auto mt-3">
          <Link href={`/events`}>
            <Button>Return</Button>
          </Link>
        </div>
      </section>
    </>
  );
};

export default Page;
