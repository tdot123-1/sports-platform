"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UploadFormState, uploadLogo } from "@/lib/actions/storage/actions";
import { useRouter } from "next/navigation";
import { FormEvent, useActionState, useEffect } from "react";
import { toast } from "sonner";

const UploadLogo = ({ eventId }: { eventId: string }) => {
  const initialState: UploadFormState = { message: "", success: false };
  const uploadLogoWithId = uploadLogo.bind(null, eventId);
  const [state, formAction, pending] = useActionState(
    uploadLogoWithId,
    initialState
  );

  const router = useRouter();

  useEffect(() => {
    if (!pending) {
      if (state.success) {
        toast("Media uploaded", {
          description: "A new logo was added to your event!",
        });

        router.push("/profile");
      }
    }
  }, [pending, state]);

  return (
    <>
      <div>
        <form action={formAction}>
          <div className="mb-4">
            <Label htmlFor="file">Upload Logo</Label>
            <p className="text-muted-foreground text-sm">
              Attach a logo to your event
            </p>
            <Input disabled={pending} id="file" name="file" type={`file`} />
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

export default UploadLogo;
