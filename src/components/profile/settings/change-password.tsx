"use client";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  updatePassword,
  UpdatePasswordState,
} from "@/lib/actions/profile/actions";
import { KeyRoundIcon } from "lucide-react";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

interface ChangePasswordProps {
  isOpenPassword: boolean;
  toggleCollapsible: (collapsible: string) => void;
  providers: string[];
}

const ChangePassword = ({
  isOpenPassword,
  toggleCollapsible,
  providers,
}: ChangePasswordProps) => {
  const initialState: UpdatePasswordState = {
    message: "",
    errors: {},
    success: false,
  };

  const [state, formAction, pending] = useActionState(
    updatePassword,
    initialState
  );

  useEffect(() => {
    // show toast, close collapsible on success
    if (!pending) {
      if (state.success) {
        toast.success("Password updated!");
        toggleCollapsible("password");
      }
    }
  }, [state.success, pending]);

  // password can only be changed if email auth provider was used 
  const emailProvider = providers.includes("email");

  return (
    <>
      <Collapsible
        className="flex flex-col justify-center items-center"
        open={isOpenPassword}
        onOpenChange={() => toggleCollapsible("password")}
      >
        <CollapsibleTrigger asChild>
          <Button type="button" variant={`secondary`}>
            <KeyRoundIcon /> Change password
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <Separator className="mt-2" />
          {emailProvider ? (
            <>
              <form action={formAction} className="text-left">
                <div className="mb-4">
                  <Label htmlFor="oldPassword">Current password</Label>
                  <Input
                    name="oldPassword"
                    id="oldPassword"
                    disabled={pending}
                    aria-describedby="oldPassword-error"
                    type={`password`}
                    max={254}
                    min={3}
                  />
                  <div
                    id="oldPassword-error"
                    aria-live="polite"
                    aria-atomic="true"
                  >
                    {state.errors?.oldPassword &&
                      state.errors.oldPassword.map((error) => (
                        <p
                          className="text-sm mt-2 text-destructive italic"
                          key={error}
                        >
                          {error}
                        </p>
                      ))}
                  </div>
                </div>
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
                  <div
                    id="newPassword-error"
                    aria-live="polite"
                    aria-atomic="true"
                  >
                    {state.errors?.newPassword &&
                      state.errors.newPassword.map((error) => (
                        <p
                          className="text-sm mt-2 text-destructive italic"
                          key={error}
                        >
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
                        <p
                          className="text-sm mt-2 text-destructive italic"
                          key={error}
                        >
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
          ) : (
            <>
              <div className="text-left mt-2">
                <p className="text-sm">
                  Your account is linked to your Google account.
                </p>
                <p className="text-xs text-muted-foreground">
                  You currently do not have a password specific to this app.
                </p>
              </div>
            </>
          )}

          <Separator className="mt-2" />
        </CollapsibleContent>
      </Collapsible>
    </>
  );
};

export default ChangePassword;
