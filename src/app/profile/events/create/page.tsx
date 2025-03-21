import FormWrapper from "@/components/profile/events-form/form-wrapper";
import { Button } from "@/components/ui/button";
import { ConstructionIcon, HomeIcon } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Create Event",
};

const Page = () => {
  const EVENT_CREATION_ENABLED = process.env.EVENT_CREATION_ENABLED;

  if (EVENT_CREATION_ENABLED !== "true") {
    return (
      <>
        <section className="px-4">
          <h1 className="text-2xl font-mono text-primary my-4">Create Event</h1>
          <div className="flex flex-col justify-center items-center gap-4 py-20">
            <ConstructionIcon size={40} />
            <p className="font-mono text-lg text-center mb-8">
              Event creation currently unavailable
            </p>
            <Link href={"/"}>
              <Button>
                <HomeIcon />
                Return
              </Button>
            </Link>
          </div>
        </section>
      </>
    );
  }
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
