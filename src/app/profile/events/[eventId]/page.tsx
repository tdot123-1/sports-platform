import EventDetails from "@/components/event-details";

const Page = async ({ params }: { params: Promise<{ eventId: string }> }) => {
  const eventId = (await params).eventId;
  return (
    <>
      <h1>Event</h1>
      <p>My event: {eventId}</p>
      <EventDetails eventId={eventId} />
    </>
  );
};

export default Page;
