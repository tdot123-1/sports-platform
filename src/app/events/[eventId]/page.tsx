import EventDetails from "@/components/events/event-details";
import EventDetailsSkeleton from "@/components/skeletons/event-details-skeleton";
import { Button } from "@/components/ui/button";
import { Undo2Icon } from "lucide-react";
import Link from "next/link";
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
            <Link href={`/events`}>
              <Button variant={`secondary`}>
                <div className="flex justify-start items-start gap-1">
                  <Undo2Icon />
                  <span className="hidden md:block">Return</span>
                </div>
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Page;
