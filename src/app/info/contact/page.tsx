import { MailIcon } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
};

const Page = () => {
  return (
    <section className="px-4 py-8">
      <div className="mx-0 md:mx-8">
        <h1 className="text-3xl font-mono text-primary mt-4 text-center md:text-left">
          Contact
        </h1>
        <p className="my-6 w-full md:w-2/3 lg:w-1/3">
          Have a question, need assistance, or just want to say hello? We&apos;d love
          to hear from you!
        </p>
        <div className="flex gap-1 my-4">
          <MailIcon />
          <span className="font-semibold">info@hi-fives.com</span>
        </div>
      </div>
    </section>
  );
};

export default Page;
