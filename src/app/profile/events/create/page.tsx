import FormWrapper from "@/components/profile/events-form/form-wrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Event",
};

const Page = () => {
  return (
    <>
      <section className="px-4">
        <h1 className="text-2xl font-mono text-primary my-4">Create Event</h1>
        <div className="flex justify-center pb-6">
          <div className="w-full md:w-3/4 lg:w-2/3 xl:w-1/2">
            <FormWrapper />
          </div>
        </div>
      </section>
    </>
  );
};

export default Page;
