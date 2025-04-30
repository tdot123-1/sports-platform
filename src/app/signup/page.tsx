import GoogleSignin from "@/components/auth/google-signin";
import SignupForm from "@/components/auth/signup-form";
import { Separator } from "@/components/ui/separator";
import { createClient } from "@/lib/supabase/server";
import { Metadata } from "next";
import Link from "next/link";
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
      <section className="px-2 sm:px-4 py-8">
        <h1 className="text-3xl font-mono text-primary">Signup</h1>
        <div className="bg-textbox my-14 rounded-md px-4 md:px-10 py-16 md:min-w-fit shadow-md md:w-1/2 lg:w-1/3 mx-auto">
          <div className="text-center mb-6">
            <h2 className="font-mono text-xl mb-2">Welcome!</h2>
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href={"/login"}>
                <span className="underline underline-offset-2 font-medium">
                  Login
                </span>
              </Link>
            </p>
          </div>

          {SIGNUP_ENABLED === "true" && (
            <div className="flex justify-center">
              <GoogleSignin />
            </div>
          )}
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 my-8">
            <Separator />
            <span className="text-muted-foreground text-sm">OR</span>
            <Separator />
          </div>

          <div className="flex justify-center">
            <div className="w-full">
              <SignupForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Page;
