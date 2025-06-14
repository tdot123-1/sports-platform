import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Confirm Email",
};

const Page = () => {
  return (
    <>
      <section className="my-12 px-4 py-8">
        <h1 className="text-center font-semibold text-lg">
          Confirm your email
        </h1>
        <p className="text-center text-sm text-muted-foreground my-6">
          A confirmation email has been sent to the submitted address. Please
          click the link in your email to complete the signup process.
        </p>
        <p className="text-center text-sm text-muted-foreground">
          It may take some time before the email is received
        </p>
      </section>
    </>
  );
};

export default Page;
