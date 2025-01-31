import EventDetails from "@/components/event-details";
import DeleteEvent from "@/components/profile/delete-event";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Page = async ({ params }: { params: Promise<{ eventId: string }> }) => {
  const eventId = (await params).eventId;
  return (
    <>
      <h1>Event</h1>
      <p>My event: {eventId}</p>
      <Link href={`/profile/events/${eventId}/edit`}>
        <Button>Edit</Button>
      </Link>
      <DeleteEvent eventId={eventId} />
      <EventDetails eventId={eventId} />
    </>
  );
};

export default Page;
