"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UploadFormState } from "@/lib/actions/storage/actions";
import { UploadIcon } from "lucide-react";
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
  previousImgUrl?: string | null;
}

// (!) NOT USED
const UploadMediaForm = ({
  serverAction,
  eventId,
  formLabel,
  formInstruction,
  toastDescription,
  name,
  previousImgUrl,
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
        toast.success(toastDescription);
      }
    }
  }, [pending, state, toastDescription]);

  return (
    <>
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
            required
          />
          {previousImgUrl && (
            <Input
              type={`hidden`}
              readOnly
              hidden
              className="hidden"
              value={previousImgUrl}
              id="previous_url"
              name="previous_url"
            />
          )}

          {state.message && (
            <p className="text-sm text-destructive mt-1">{state.message}</p>
          )}
        </div>

        <Button disabled={pending} type={`submit`}>
          <div className="flex justify-start items-start gap-1">
            <UploadIcon />
            <span className="hidden md:block">Upload</span>
          </div>
        </Button>
      </form>
    </>
  );
};

export default UploadMediaForm;
