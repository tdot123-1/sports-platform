"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { useEffect, useRef } from "react";
import { toast } from "sonner";

const GoogleSignin = () => {
  const router = useRouter();
  const buttonRef = useRef<HTMLDivElement>(null);

  const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  const handleSignInWithGoogle = async (response: any) => {
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithIdToken({
      provider: "google",
      token: response.credential,
    });

    if (error) {
      console.error("Error using google signin: ", error);
      toast.error("Failed to login");
      return;
    }

    console.log("login succesful");

    toast("Logged in", {
      description: "Welcome back!",
    });

    router.refresh();
  };

  const initializeGoogleButton = () => {
    if (!GOOGLE_CLIENT_ID) return;
    if (window.google && window.google.accounts) {
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleSignInWithGoogle,
        // use_fedcm_for_prompt: true,
        // use_fedcm_for_button: true,
      });

      if (buttonRef.current) {
        window.google.accounts.id.renderButton(buttonRef.current, {
          theme: "outline",
          size: "large",
          type: "standard",
        });
      }
    }
  };

  useEffect(() => {
    if (window.google && window.google.accounts) {
      initializeGoogleButton();
    } else {
      window.addEventListener("load", initializeGoogleButton);
      return () => window.removeEventListener("load", initializeGoogleButton);
    }
  }, []);

  if (!GOOGLE_CLIENT_ID) {
    return null;
  }

  return (
    <>
      <Script
        src="https://accounts.google.com/gsi/client"
        onLoad={() => initializeGoogleButton()}
        async
      />
      <div ref={buttonRef}></div>
    </>
  );
};

export default GoogleSignin;
