import UpdateEventWrapper from "@/components/profile/update-event-wrapper";

const Page = async ({ params }: { params: Promise<{ eventId: string }> }) => {
  const eventId = (await params).eventId;
  return (
    <>
      <section className="px-4">
        <h1>Edit Event</h1>
        <div className="flex justify-center pb-6">
          <div className="w-full md:w-1/2 lg:w-1/3">
            <h2 className="mb-4 text-center">Update Event</h2>
            <UpdateEventWrapper eventId={eventId} />
          </div>
        </div>
      </section>
    </>
  );
};

export default Page;
