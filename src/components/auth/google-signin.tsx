"use client";

import { createClient } from "@/lib/supabase/client";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { useEffect } from "react";
import { toast } from "sonner";

declare global {
  interface Window {
    handleSignInWithGoogle: (response: any) => void;
  }
}

const GoogleSignin = () => {
  const router = useRouter();

  //   async function handleSignInWithGoogle(response: any) {
  //     const supabase = createClient();
  //     const { data, error } = await supabase.auth.signInWithIdToken({
  //       provider: "google",
  //       token: response.credential,
  //     });

  //     if (error) {
  //       console.error("Error using google signin: ", error);
  //       toast.error("Failed to login");
  //       return;
  //     }

  //     router.push("/profile");
  //   }

  useEffect(() => {
    window.handleSignInWithGoogle = async (response: any) => {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signInWithIdToken({
        provider: "google",
        token: response.credential,
      });

      if (error) {
        console.error("Error using google signin: ", error);
        toast.error("Failed to login");
        return;
      }

      console.log("User signied in: ", data.user);

      toast("Logged in", {
        description: "Welcome back!",
      });

      router.replace("/profile");
    };
  }, [router]);

  const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  if (!GOOGLE_CLIENT_ID) {
    return null;
  }
  return (
    <>
      <Script src="https://accounts.google.com/gsi/client" async />
      <div
        id="g_id_onload"
        data-client_id={GOOGLE_CLIENT_ID}
        data-context="signin"
        data-ux_mode="popup"
        data-callback="handleSignInWithGoogle"
        data-auto_prompt="false"
      ></div>

      <div
        className="g_id_signin"
        data-type="standard"
        data-shape="rectangular"
        data-theme="outline"
        data-text="signin_with"
        data-size="large"
        data-locale="en-US"
        data-logo_alignment="left"
      ></div>
    </>
  );
};

export default GoogleSignin;
