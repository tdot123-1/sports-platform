import UploadLogo from "@/components/profile/storage/upload-logo";

const Page = async ({ params }: { params: Promise<{ eventId: string }> }) => {
  const eventId = (await params).eventId;
  return (
    <>
      <div className="px-4">
        <h1>Upload media</h1>
        <section className="flex justify-center py-6">
          <div className="w-full md:w-3/4 lg:w-2/3 xl:w-1/2">
            <UploadLogo eventId={eventId} />
          </div>
        </section>
      </div>
    </>
  );
};

export default Page;
