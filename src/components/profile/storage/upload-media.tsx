"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UploadFormState } from "@/lib/actions/storage/actions";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

interface UploadMediaFormProps {
  serverAction: (
    eventId: string,
    prevState: UploadFormState,
    formData: FormData
  ) => Promise<{
    message: string;
    success: boolean;
  }>;

  eventId: string;
  formLabel: string;
  formInstruction: string;
  toastDescription: string;
  name: string;
}

const UploadMediaForm = ({
  serverAction,
  eventId,
  formLabel,
  formInstruction,
  toastDescription,
  name,
}: UploadMediaFormProps) => {
  const initialState: UploadFormState = { message: "", success: false };
  const uploadMediaWithId = serverAction.bind(null, eventId);
  const [state, formAction, pending] = useActionState(
    uploadMediaWithId,
    initialState
  );

  useEffect(() => {
    if (!pending) {
      if (state.success) {
        toast("Media uploaded", {
          description: toastDescription,
        });
      }
    }
  }, [pending, state]);

  // add frontend validation for file size (?)

  return (
    <>
      <div>
        <form action={formAction}>
          <div className="mb-4">
            <Label htmlFor={name}>{formLabel}</Label>
            <p className="text-muted-foreground text-sm">{formInstruction}</p>
            <Input
              disabled={pending}
              id={name}
              name={name}
              type={`file`}
              accept="image/jpeg, image/png, image/webp, image/svg+xml"
            />
            {state.message && (
              <p className="text-sm text-destructive mt-1">{state.message}</p>
            )}
          </div>

          <Button disabled={pending} type={`submit`}>
            Upload
          </Button>
        </form>
      </div>
    </>
  );
};

export default UploadMediaForm;
