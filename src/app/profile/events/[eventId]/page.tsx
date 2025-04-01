import EventDetails from "@/components/events/event-details";
import ReturnButton from "@/components/events/return-button";
import DeleteEvent from "@/components/profile/delete-event";
import EventDetailsSkeleton from "@/components/skeletons/event-details-skeleton";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";
import { EditIcon, ImageUpIcon } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "My Event",
};

const Page = async ({ params }: { params: Promise<{ eventId: string }> }) => {
  const eventId = (await params).eventId;

  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  return (
    <>
      <section className="px-4">
        <h1 className="text-center mt-4">
          My event:{" "}
          <span className="text-muted-foreground text-sm">{eventId}</span>
        </h1>

        <div className="mx-auto py-6 w-full md:w-3/4 lg:w-2/3 xl:w-1/2">
          <div className="flex justify-between items-start pb-4">
            <Link href={`/profile/events/${eventId}/edit`}>
              <Button className="bg-basket hover:bg-basket/60">
                <div className="flex justify-start items-start gap-1">
                  <EditIcon />
                  <span className="hidden md:block">Edit</span>
                </div>
              </Button>
            </Link>
            <Link href={`/profile/events/${eventId}/media`}>
              <Button variant={`secondary`}>
                <div className="flex justify-start items-start gap-1">
                  <ImageUpIcon />
                  <span className="hidden md:block">Upload media</span>
                </div>
              </Button>
            </Link>
            <DeleteEvent eventId={eventId} />
          </div>
          <Suspense fallback={<EventDetailsSkeleton />}>
            <EventDetails eventId={eventId} />
          </Suspense>

          <div className="w-fit mx-auto mt-4">
            <ReturnButton returnUrl={`/profile/events`} />
          </div>
        </div>
      </section>
    </>
  );
};

export default Page;
