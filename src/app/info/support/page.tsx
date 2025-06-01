import { HeartHandshakeIcon } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Support Us",
};

const Page = () => {
  return (
    <section className="px-4 py-8">
      <div className="mx-0 md:mx-8">
        <h1 className="text-3xl font-mono text-primary text-center md:text-left">
          Support Us
        </h1>
        <p className="my-6 w-full md:w-2/3 lg:w-1/3">
          [how to support the platform]
        </p>
        <div className="flex gap-1 my-4">
          <HeartHandshakeIcon />
          <span className="font-semibold underline underline-offset-2">
            link-to-support
          </span>
        </div>
      </div>
    </section>
  );
};

export default Page;
