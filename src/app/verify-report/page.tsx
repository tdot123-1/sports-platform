import VerifyReport from "@/components/flag/verify-report";
import { LoaderIcon } from "lucide-react";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Verify Report",
};

const Page = async (props: {
  searchParams?: Promise<{
    token?: string;
  }>;
}) => {
  const searchParams = await props.searchParams;
  const token = searchParams?.token;

  if (!token) {
    redirect("/");
  }

  return (
    <section className="px-4 py-8">
      <h1 className="text-3xl font-mono text-primary mt-4 text-center md:text-left mx-0 md:mx-8">
        Verify your report
      </h1>
      <div className="w-fit mx-auto my-32 bg-white rounded-md p-8">
        <Suspense fallback={<LoaderIcon className="animate-spin" />}>
          <VerifyReport token={token} />
        </Suspense>
      </div>
    </section>
  );
};

export default Page;
