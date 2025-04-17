"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { resendVerificationEmail } from "@/lib/actions/flag/actions";
import { toast } from "sonner";

const ResendVerifyEmail = ({
  reportId,
  userEmail,
}: {
  reportId: string;
  userEmail: string;
}) => {
  const [resendError, setResendError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleResend = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 300));
    try {
      const emailSent = await resendVerificationEmail(reportId, userEmail);
      if (!emailSent) {
        throw new Error("Failed to resend email");
      }

      toast.info("Verification email sent. Please click the link.");

    } catch (error) {
      console.error("Error re-sending email: ", error);
      toast.error("Failed to re-send email");
      setResendError("Something went wrong, please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button onClick={handleResend} disabled={isLoading} type="button" variant={`link`}>
        I didn&apos;t receive an email
      </Button>
      {resendError && (
        <p className="text-sm mt-2 text-destructive italic text-center">
          {resendError}
        </p>
      )}
    </>
  );
};

export default ResendVerifyEmail;
