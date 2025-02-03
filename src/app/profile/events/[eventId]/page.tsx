import EventDetails from "@/components/events/event-details";
import DeleteEvent from "@/components/profile/delete-event";
import { Button } from "@/components/ui/button";
import { EditIcon, Undo2Icon } from "lucide-react";
import Link from "next/link";

const Page = async ({ params }: { params: Promise<{ eventId: string }> }) => {
  const eventId = (await params).eventId;
  return (
    <>
      <h1 className="text-center mt-4">
        My event: <span className="text-muted-foreground">{eventId}</span>
      </h1>
      <section className="mx-auto py-6 w-full md:w-3/4 lg:w-2/3 xl:w-1/2">
        <div className="flex justify-between items-start pb-4">
          <Link href={`/profile/events/${eventId}/edit`}>
            <Button>
              <div className="flex justify-start items-start gap-1">
                <EditIcon />
                <span className="hidden md:block">Edit</span>
              </div>
            </Button>
          </Link>
          <DeleteEvent eventId={eventId} />
        </div>

        <EventDetails eventId={eventId} />
        <div className="w-fit mx-auto mt-4">
          <Link href={`/profile/events`}>
            <Button>
              <div className="flex justify-start items-start gap-1">
                <Undo2Icon />
                <span className="hidden md:block">Return</span>
              </div>
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
};

export default Page;
