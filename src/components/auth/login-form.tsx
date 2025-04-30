"use client";

import { loginWithPassword, State } from "@/lib/actions/auth/actions";
import { useActionState, useEffect, useRef, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import CaptchaComponent from "./captcha-component";

const LoginForm = () => {
  const [captchaToken, setCaptchaToken] = useState<string>("");
  const captcha = useRef<HCaptcha | null>(null);

  const initialState: State = { message: "", errors: {}, success: false };
  const [state, formAction, pending] = useActionState(
    loginWithPassword,
    initialState
  );
  const router = useRouter();

  // show toast after log in
  useEffect(() => {
    if (!pending) {
      if (state.success) {
        toast("Logged in", {
          description: "Welcome back!",
        });

        router.push("/");
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
            required
          />
          <div id="email-error" aria-live="polite" aria-atomic="true">
            {state.errors?.email &&
              state.errors.email.map((error) => (
                <p className="text-sm mt-2 text-destructive" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        <div className="mb-8">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            aria-describedby="password-error"
            disabled={pending}
            required
          />
          <div id="password-error" aria-live="polite" aria-atomic="true">
            {state.errors?.password &&
              state.errors.password.map((error) => (
                <p className="text-sm mt-2 text-destructive" key={error}>
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
            Login
          </Button>
        </div>
        <div>
          {state.message && !state.success && (
            <p className="text-sm mt-2 text-destructive text-center">
              {state.message}
            </p>
          )}
        </div>
      </form>
    </>
  );
};

export default LoginForm;
