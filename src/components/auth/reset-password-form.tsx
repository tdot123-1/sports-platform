"use client";

import {
  resetForgottenPassword,
  UpdatePasswordState,
} from "@/lib/actions/profile/actions";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const ResetPasswordForm = ({ code }: { code: string }) => {
  const initialState: UpdatePasswordState = {
    message: "",
    errors: {},
    success: false,
  };

  const resetPasswordWithCode = resetForgottenPassword.bind(null, code);
  const [state, formAction, pending] = useActionState(
    resetPasswordWithCode,
    initialState
  );
  const router = useRouter();

  // show toast after log in
  useEffect(() => {
    if (!pending) {
      if (state.success) {
        toast.info("Password successfully updated!");

        router.push("/login");
      }
    }
  }, [pending, state, router]);

  return (
    <>
      <form action={formAction} className="text-left">
        <div className="mb-4">
          <Label htmlFor="newPassword">New password</Label>
          <Input
            name="newPassword"
            id="newPassword"
            disabled={pending}
            aria-describedby="newPassword-error"
            type={`password`}
            max={254}
            min={3}
          />
          <div id="newPassword-error" aria-live="polite" aria-atomic="true">
            {state.errors?.newPassword &&
              state.errors.newPassword.map((error) => (
                <p className="text-sm mt-2 text-destructive italic" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        <div className="mb-4">
          <Label>Confirm new password</Label>
          <Input
            name="confirmNewPassword"
            id="confirmNewPassword"
            disabled={pending}
            aria-describedby="confirmNewPassword-error"
            type={`password`}
            max={254}
            min={3}
          />
          <div
            id="confirmNewPassword-error"
            aria-live="polite"
            aria-atomic="true"
          >
            {state.errors?.confirmNewPassword &&
              state.errors.confirmNewPassword.map((error) => (
                <p className="text-sm mt-2 text-destructive italic" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        <div className="w-fit mr-auto">
          <Button disabled={pending} type="submit">
            Submit
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

export default ResetPasswordForm;
