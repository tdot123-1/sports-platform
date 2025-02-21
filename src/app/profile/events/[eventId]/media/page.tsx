import ReturnButton from "@/components/events/return-button";
import EventMediaWrapper from "@/components/profile/storage/event-media-wrapper";
import EventMediaSkeleton from "@/components/skeletons/event-media-skeleton";
import { Suspense } from "react";

const Page = async ({ params }: { params: Promise<{ eventId: string }> }) => {
  const eventId = (await params).eventId;
  return (
    <>
      <div className="px-4">
        <h1 className="text-center mt-4">
          My event: <span className="text-muted-foreground">{eventId}</span>
        </h1>
        <div className="my-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_2fr] gap-4 lg:gap-8">
          <Suspense fallback={<EventMediaSkeleton />}>
            <EventMediaWrapper eventId={eventId} />
          </Suspense>
        </div>
        <div className="flex justify-center my-6">
          <ReturnButton returnUrl={`/profile/events/${eventId}`} />
        </div>
      </div>
    </>
  );
};

export default Page;
