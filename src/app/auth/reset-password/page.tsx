import ResetPasswordForm from "@/components/auth/reset-password-form";

import { redirect } from "next/navigation";

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
    <section className="px-4">
      <h1 className="text-2xl font-mono text-primary mt-4">Reset Password</h1>
      <div className="flex justify-center mt-14">
        <div className="w-full md:w-1/2 lg:w-1/3">
          <ResetPasswordForm code={code} />
        </div>
      </div>
    </section>
  );
};

export default Page;
