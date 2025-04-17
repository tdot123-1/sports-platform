"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { insertReportedEvent, ReportState } from "@/lib/actions/flag/actions";
import { toast } from "sonner";
import { CircleCheckIcon } from "lucide-react";
import { AlertDialogAction } from "../ui/alert-dialog";
import CaptchaComponent from "../auth/captcha-component";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import ResendVerifyEmail from "./resend-verify-email";

const ReportEventForm = ({ eventId }: { eventId: string }) => {
  const [captchaToken, setCaptchaToken] = useState<string>("");
  const captcha = useRef<HCaptcha | null>(null);
  const initialState: ReportState = { message: "", errors: {}, success: false };
  const [state, formAction, pending] = useActionState(
    insertReportedEvent,
    initialState
  );

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [reportId, setReportId] = useState("");

  useEffect(() => {
    if (!pending) {
      if (state.success) {
        toast.info("Report submitted, please check your email.");
        setIsSubmitted(true);
        const email = state.message?.split(",")[0];
        const id = state.message?.split(",")[1];
        setUserEmail(email || "");
        setReportId(id || "");
      }
      captcha?.current?.resetCaptcha();
    }
  }, [pending, state]);

  return (
    <>
      {isSubmitted ? (
        <>
          <div className="flex flex-col items-center justify-center text-center gap-4 py-4">
            <CircleCheckIcon size={40} />
            <h3 className="font-semibold">Thank you for reporting.</h3>
            <div className="text-sm">
              <p>Please click the link in your email to confirm your report.</p>
              <p>
                After you have confirmed, we will review your report and this
                event.
              </p>
            </div>
            <p className="italic">Thank you for your help!</p>
            <div className="my-4 px-2">
              <ResendVerifyEmail reportId={reportId} userEmail={userEmail} />
            </div>
            <AlertDialogAction>Continue</AlertDialogAction>
          </div>
        </>
      ) : (
        <>
          <form action={formAction}>
            <div className="mb-4">
              <Label htmlFor="report_reason">Reason</Label>
              <Select name="report_reason" disabled={pending} required>
                <SelectTrigger>
                  <SelectValue
                    placeholder="Select the reason for this report"
                    id="report_reason"
                    aria-describedby="report_reason-error"
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="off_lang">
                    Offensive/inappropriate language
                  </SelectItem>
                  <SelectItem value="off_img">
                    Offensive/inappropriate images
                  </SelectItem>
                  <SelectItem value="fake">Fake event</SelectItem>
                  <SelectItem value="sus">
                    Suspicious/harmful content
                  </SelectItem>
                </SelectContent>
              </Select>
              <div
                id="report_reason-error"
                aria-live="polite"
                aria-atomic="true"
              >
                {state.errors?.report_reason &&
                  state.errors.report_reason.map((error) => (
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
              <Label htmlFor="report_details">Details</Label>
              <Textarea
                id="report_details"
                name="report_details"
                aria-describedby="report_details-error"
                placeholder="Describe why you reported this event..."
                disabled={pending}
                minLength={3}
                required
              />
              <div
                id="report_details-error"
                aria-live="polite"
                aria-atomic="true"
              >
                {state.errors?.report_details &&
                  state.errors.report_details.map((error) => (
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
              <Label htmlFor="user_email">Email</Label>
              <p className="text-xs italic text-muted-foreground">
                Please submit your email address to verify you are a real person
              </p>
              <Input
                name="user_email"
                id="user_email"
                type="email"
                aria-describedby="user_email-error"
                disabled={pending}
              />
              <div id="user_email-error" aria-live="polite" aria-atomic="true">
                {state.errors?.user_email &&
                  state.errors.user_email.map((error) => (
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
            <Input
              name="event_id"
              id="event_id"
              type="hidden"
              readOnly
              className="hidden"
              hidden
              value={eventId}
            />
            <Button disabled={pending} type="submit">
              Submit
            </Button>
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
    </>
  );
};

export default ReportEventForm;
