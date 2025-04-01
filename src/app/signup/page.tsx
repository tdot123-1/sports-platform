import GoogleSignin from "@/components/auth/google-signin";
import SignupForm from "@/components/auth/signup-form";
import { Separator } from "@/components/ui/separator";
import { createClient } from "@/lib/supabase/server";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Signup",
};

const Page = async () => {
  const supabase = await createClient();

  const { data } = await supabase.auth.getUser();
  if (data?.user) {
    redirect("/profile");
  }

  const SIGNUP_ENABLED = process.env.SIGNUP_ENABLED;

  return (
    <>
      <section className="px-4">
        <h1 className="text-2xl font-mono text-primary mt-4">Signup</h1>
        <div className="bg-white mt-14 rounded-md p-4">
          <div className="flex justify-center">
            <div className="w-full md:w-1/2 lg:w-1/3">
              <SignupForm />
            </div>
          </div>
          <Separator className="my-8" />
          {SIGNUP_ENABLED === "true" && (
            <div className="flex justify-center">
              <GoogleSignin />
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Page;
