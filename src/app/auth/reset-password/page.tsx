import ResetPasswordForm from "@/components/auth/reset-password-form";
import { Metadata } from "next";

import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Reset Password",
};

const Page = async (props: {
  searchParams?: Promise<{
    code?: string;
  }>;
}) => {
  const searchParams = await props.searchParams;
  const code = searchParams?.code;

  if (!code) {
    redirect(`/`);
  }

  return (
    <section className="px-4 py-8">
      <h1 className="text-3xl font-mono text-primary mt-4 text-center md:text-left mx-0 md:mx-8">
        Reset Password
      </h1>
      <div className="bg-textbox my-14 rounded-md px-4 md:px-10 py-12 md:min-w-fit shadow-md md:w-1/2 lg:w-1/3 mx-auto">
        <ResetPasswordForm code={code} />
      </div>
    </section>
  );
};

export default Page;
