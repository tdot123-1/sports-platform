import FormWrapper from "@/components/profile/events-form/form-wrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Event",
};

const Page = async ({ params }: { params: Promise<{ eventId: string }> }) => {
  const eventId = (await params).eventId;
  return (
    <>
      <section className="px-4">
        <h1>Edit Event</h1>
        <div className="flex justify-center pb-6">
          <div className="w-full md:w-3/4 lg:w-2/3 xl:w-1/2">
            <h2 className="mb-4 text-center">Update Event</h2>
            <FormWrapper eventId={eventId} />
          </div>
        </div>
      </section>
    </>
  );
};

export default Page;
