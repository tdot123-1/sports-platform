import EventDetails from "@/components/events/event-details";
import ReturnButton from "@/components/events/return-button";
import EventDetailsSkeleton from "@/components/skeletons/event-details-skeleton";
import { Suspense } from "react";

const Page = async ({ params }: { params: Promise<{ eventId: string }> }) => {
  const eventId = (await params).eventId;
  return (
    <>
      <section className="px-4">
        <h1>Event Details</h1>

        <div className="mx-auto py-6 w-full md:w-3/4 lg:w-2/3 xl:w-1/2">
          <Suspense fallback={<EventDetailsSkeleton />}>
            <EventDetails eventId={eventId} />
          </Suspense>

          <div className="w-fit mx-auto mt-4">
            <ReturnButton returnUrl="/events/grid" />
          </div>
        </div>
      </section>
    </>
  );
};

export default Page;
