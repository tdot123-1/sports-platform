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
import { updateEmail, UpdateEmailState } from "@/lib/actions/profile/actions";
import { MailIcon, RefreshCcwIcon } from "lucide-react";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

interface ChangeEmailProps {
  isOpenEmail: boolean;
  toggleCollapsible: (collapsible: string) => void;
  providers: string[];
}

const ChangeEmail = ({
  isOpenEmail,
  toggleCollapsible,
  providers,
}: ChangeEmailProps) => {
  // form action
  const initialState: UpdateEmailState = {
    message: "",
    errors: {},
    success: false,
  };
  const [state, formAction, pending] = useActionState(
    updateEmail,
    initialState
  );

  useEffect(() => {
    if (!pending) {
      if (state.success) {
        toast.success("Email address updated!");
        toggleCollapsible("email");
      }
    }
  }, [state, pending, toggleCollapsible]);

  // check providers
  // if only email -> allow
  // if google -> show button to update app email
  const googleProvider = providers.includes("google");

  return (
    <>
      <Collapsible
        className="flex flex-col justify-center items-center"
        open={isOpenEmail}
        onOpenChange={() => toggleCollapsible("email")}
      >
        <CollapsibleTrigger asChild>
          <Button type="button" variant={`secondary`}>
            <MailIcon /> Change email
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <Separator className="mt-2" />
          {googleProvider ? (
            <>
              <div className="text-left mt-2">
                <p className="text-sm">
                  Your account is linked to your Google account.
                </p>
                <p className="text-xs text-muted-foreground">
                  If you change the email address connected to your Google
                  account, it will automatically be updated in this app as well.
                </p>
                {/* <div className="w-fit mr-auto mt-2">
                  <Button type="button">
                    <RefreshCcwIcon /> Update email
                  </Button>
                </div> */}
              </div>
            </>
          ) : (
            <>
              <form action={formAction}>
                <div className="text-left mb-4">
                  <Label htmlFor="newEmail">New email address</Label>
                  <p className="text-xs italic text-muted-foreground">
                    An email will be sent to this address to confirm the change
                  </p>
                  <Input
                    name="newEmail"
                    id="newEmail"
                    disabled={pending}
                    aria-describedby="newEmail-error"
                    type={`email`}
                    required
                    max={254}
                    min={3}
                  />
                  <div
                    id="newEmail-error"
                    aria-live="polite"
                    aria-atomic="true"
                  >
                    {state.errors?.newEmail &&
                      state.errors.newEmail.map((error) => (
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
          )}

          <Separator className="mt-2" />
        </CollapsibleContent>
      </Collapsible>
    </>
  );
};

export default ChangeEmail;
