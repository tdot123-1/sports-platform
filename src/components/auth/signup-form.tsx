"use client";

import { signupWithPassword, State } from "@/lib/actions/auth/actions";
import { useActionState, useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import CaptchaComponent from "./captcha-component";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import HCaptcha from "@hcaptcha/react-hcaptcha";

const SignupForm = () => {
  const [captchaToken, setCaptchaToken] = useState<string>("");
  const captcha = useRef<HCaptcha | null>(null);

  const initialState: State = { message: "", errors: {}, success: false };
  const [state, formAction, pending] = useActionState(
    signupWithPassword,
    initialState
  );

  const router = useRouter();

  // show toast after log in
  useEffect(() => {
    if (!pending) {
      if (state.success) {
        toast.info("Account confirmation email sent");

        router.push("/auth/signup");
      }
      captcha?.current?.resetCaptcha();
    }
  }, [pending, state, router]);

  return (
    <>
      <form action={formAction}>
        <div className="mb-4">
          <Label htmlFor="email">Email address</Label>
          <Input
            id="email"
            name="email"
            type="email"
            aria-describedby="email-error"
            disabled={pending}
          />
          <div id="email-error" aria-live="polite" aria-atomic="true">
            {state.errors?.email &&
              state.errors.email.map((error) => (
                <p className="text-sm mt-2 text-destructive italic" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        <div className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            aria-describedby="password-error"
            disabled={pending}
          />
          <div id="password-error" aria-live="polite" aria-atomic="true">
            {state.errors?.password &&
              state.errors.password.map((error) => (
                <p className="text-sm mt-2 text-destructive italic" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        <div className="mb-4">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            aria-describedby="confirmPassword-error"
            disabled={pending}
          />
          <div id="confirmPassword-error" aria-live="polite" aria-atomic="true">
            {state.errors?.confirmPassword &&
              state.errors.confirmPassword.map((error) => (
                <p className="text-sm mt-2 text-destructive italic" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        <div className="mb-4 flex justify-center">
          <CaptchaComponent
            captcha={captcha}
            setCaptchaToken={setCaptchaToken}
          />
          <Input
            className="hidden"
            type={`hidden`}
            hidden
            readOnly
            name="token"
            id="token"
            value={captchaToken}
          />
        </div>
        <div className="flex justify-center">
          <Button type="submit" disabled={pending}>
            Signup
          </Button>
        </div>
        <div>
          {state.message && !state.success && (
            <p className="text-sm mt-2 text-destructive italic text-center">
              {state.message}
            </p>
          )}
        </div>
      </form>
    </>
  );
};

export default SignupForm;
