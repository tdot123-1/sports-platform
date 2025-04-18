import VerifyReport from "@/components/flag/verify-report";
import { LoaderIcon } from "lucide-react";
import { redirect } from "next/navigation";
import { Suspense } from "react";

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
    <section className="px-4">
      <h1 className="text-2xl font-mono text-primary mt-4">
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
