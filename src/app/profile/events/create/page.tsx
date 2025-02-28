import FormWrapper from "@/components/profile/events-form/form-wrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Event",
};

const Page = () => {
  return (
    <>
      <section className="px-4">
        <h1>Create Event</h1>
        <div className="flex justify-center pb-6">
          <div className="w-full md:w-3/4 lg:w-2/3 xl:w-1/2">
            <h2 className="mb-4 text-center">New Event</h2>
            <FormWrapper />
          </div>
        </div>
      </section>
    </>
  );
};

export default Page;
