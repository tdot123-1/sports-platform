import EventDetails from "@/components/events/event-details";
import ReturnButton from "@/components/events/return-button";
import FavoriteButton from "@/components/favorites/favorite-button";
import FlagEventButton from "@/components/flag/flag-button";
import EventDetailsSkeleton from "@/components/skeletons/event-details-skeleton";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Event",
};

const Page = async ({ params }: { params: Promise<{ eventId: string }> }) => {
  const eventId = (await params).eventId;

  // throw new Error("test");
  return (
    <>
      <section className="px-4">
        <div className="mx-auto py-12 w-full md:w-3/4 lg:w-2/3 xl:w-1/2">
          <div className="mb-2 flex justify-between">
            <FavoriteButton eventId={eventId} />
            <FlagEventButton eventId={eventId} />
          </div>

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
