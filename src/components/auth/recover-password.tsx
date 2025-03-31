"use client";

import { SendIcon } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { sendResetPasswordEmail, State } from "@/lib/actions/auth/actions";
import { useActionState, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import CaptchaComponent from "./captcha-component";

const RecoverPassword = () => {
  const [captchaToken, setCaptchaToken] = useState<string>("");
  const captcha = useRef<HCaptcha | null>(null);

  const initialState: State = { message: "", errors: {}, success: false };
  const [state, formAction, pending] = useActionState(
    sendResetPasswordEmail,
    initialState
  );

  // show toast to show success
  useEffect(() => {
    if (!pending) {
      if (state.success) {
        toast.info("Email sent! Click the link to continue");
      }
      captcha?.current?.resetCaptcha();
    }
  }, [pending, state]);

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant={`link`} type={`button`}>
            Forgot password?
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reset password</DialogTitle>
            <DialogDescription className="text-left">
              Please submit your email address, then click the link in the email
              you receive to reset your password.
            </DialogDescription>
          </DialogHeader>
          <div>
            <form action={formAction}>
              <div className="mb-4">
                <Label>Email address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  aria-describedby="email-error"
                  required
                  disabled={pending}
                />
                <div id="email-error" aria-live="polite" aria-atomic="true">
                  {state.errors?.email &&
                    state.errors.email.map((error) => (
                      <p
                        className="text-sm mt-2 text-destructive italic"
                        key={error}
                      >
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
              <Button disabled={pending} type="submit">
                <SendIcon /> Send
              </Button>
              <div>
                {state.message && (
                  <p
                    className={cn(
                      "text-sm mt-2 italic text-center",
                      state.success ? "text-info" : "text-destructive"
                    )}
                  >
                    {state.message}
                  </p>
                )}
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default RecoverPassword;
