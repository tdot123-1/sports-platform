const Page = async ({ params }: { params: Promise<{ eventId: string }> }) => {
  const eventId = (await params).eventId;
  return (
    <>
      <h1>Edit Event</h1>
      <p>My event: {eventId}</p>
    </>
  );
};

export default Page;
