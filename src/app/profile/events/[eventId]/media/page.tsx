import EventMediaWrapper from "@/components/profile/storage/event-media-wrapper";
import EventMediaSkeleton from "@/components/skeletons/event-media-skeleton";
import { Button } from "@/components/ui/button";
import { Undo2Icon } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Event Media",
};

const Page = async ({ params }: { params: Promise<{ eventId: string }> }) => {
  const eventId = (await params).eventId;
  return (
    <>
      <div className="px-4">
        <h1 className="text-2xl font-mono text-primary my-4">Event Media</h1>
        {/* <h1 className="text-center mt-4">
          My event: <span className="text-muted-foreground">{eventId}</span>
        </h1> */}
        <div className="my-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_2fr] gap-4 lg:gap-8">
          <Suspense fallback={<EventMediaSkeleton />}>
            <EventMediaWrapper eventId={eventId} />
          </Suspense>
        </div>
        <div className="flex justify-center my-6">
          <Link href={`/profile/events/${eventId}`}>
            <Button variant={`secondary`}>
              <div className="flex justify-start items-start gap-1">
                <Undo2Icon />
                <span className="hidden md:block">Return</span>
              </div>
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Page;
