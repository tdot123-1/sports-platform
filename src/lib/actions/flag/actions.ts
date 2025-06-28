"use server";

import { z } from "zod";
import jwt from "jsonwebtoken";
import {
  sendEmailAfterVerifiedReport,
  sendEmailToVerifyReport,
} from "../sendgrid/actions";
import { verifyCaptcha } from "@/lib/captcha";
import { createAdminClient } from "@/lib/supabase/admin";

const reportReasons = ["off_lang", "off_img", "fake", "sus"] as const;

const FormSchema = z.object({
  event_id: z.string().uuid(),
  report_reason: z.enum(reportReasons, {
    invalid_type_error: "Please select a report reason",
    message: "Please select from the available reasons",
  }),
  report_details: z
    .string({
      invalid_type_error: "Please provide some details",
    })
    .trim()
    .min(3, { message: "Please provide some details" })
    .max(3000, { message: "Max characters exceeded" }),
  user_email: z
    .string({ invalid_type_error: "Please add an email address" })
    .trim()
    .email({ message: "Please provide a valid email address" }),
});

export type ReportState = {
  errors?: {
    report_reason?: string[];
    report_details?: string[];
    user_email?: string[];
  };
  message?: string;
  success: boolean;
};

export const insertReportedEvent = async (
  prevState: ReportState,
  formData: FormData
) => {
  const validatedFields = FormSchema.safeParse({
    event_id: formData.get("event_id"),
    report_reason: formData.get("report_reason"),
    report_details: formData.get("report_details"),
    user_email: formData.get("user_email"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing data. Please try again.",
      success: false,
    };
  }

  const { event_id, report_details, report_reason, user_email } =
    validatedFields.data;

  // get captcha token from form
  const token = formData.get("token");

  if (!token) {
    return {
      message: "Missing CAPTCHA token. Please try again.",
      success: false,
    };
  }

  // verify captcha token
  const verifiedCaptcha = await verifyCaptcha(token.toString());

  if (!verifiedCaptcha) {
    return {
      message: "Failed CAPTCHA challenge. Please try again.",
      success: false,
    };
  }

  try {
    const supabase = await createAdminClient();

    const { data, error } = await supabase
      .from("event_reports")
      .insert({ event_id, report_details, report_reason, user_email })
      .select("id")
      .single();

    if (error) {
      console.error("Database error on report event: ", error.message);
      return {
        message: `Database error. Please try again later`,
        success: false,
      };
    }

    // console.log("New report: ", data.id);

    // generate JWT
    const secret = process.env.JWT_SECRET;

    if (!secret) {
      console.error("Missing JWT secret");
      throw new Error("Missing JWT secret");
    }

    // sign token with report id
    const token = jwt.sign({ report_id: data.id }, secret, {
      expiresIn: 60 * 15,
    });

    // send email with token in link
    const emailSent = await sendEmailToVerifyReport(user_email, token);

    if (!emailSent) {
      return {
        message: "Failed to send verification email. Please try again.",
        success: false,
      };
    }

    return { message: `${user_email},${data.id}`, success: true };
  } catch (error) {
    console.error("Unexpected error: ", error);
    return { message: "An unexpected error occurred.", success: false };
  }
};

export const resendVerificationEmail = async (
  reportId: string,
  userEmail: string
) => {
  if (!reportId || !userEmail) {
    console.error(
      `Missing report id or email; id: ${reportId}; email: ${userEmail};`
    );
    return {
      message: "Missing report ID or user email",
      success: false,
    };
  }
  try {
    // generate JWT
    const secret = process.env.JWT_SECRET;

    if (!secret) {
      console.error("Missing JWT secret");
      throw new Error("Missing JWT secret");
    }

    // sign token with report id
    const token = jwt.sign({ report_id: reportId }, secret, {
      expiresIn: 60 * 15,
    });

    // send email with token in link
    const emailSent = await sendEmailToVerifyReport(userEmail, token);

    if (!emailSent) {
      return {
        message: "Failed to send verification email. Please try again.",
        success: false,
      };
    }

    return { success: true, message: "" };
  } catch (error) {
    console.error("Failed to resend verification email: ", error);
    return {
      message: "Failed to send verification email. Please try again.",
      success: false,
    };
  }
};

export const verifyEventReport = async (reportId: string) => {
  try {
    const supabase = await createAdminClient();
    const { data, error } = await supabase
      .from("event_reports")
      .update({ report_verified: true })
      .eq("id", reportId)
      .select()
      .single();

    if (error) {
      console.error("Database error on verify report: ", error);
      return false;
    }

    const reason = data.report_reason || "";

    const emailSent = await sendEmailAfterVerifiedReport(reason, reportId);

    if (!emailSent) {
      console.error("Failed to send email notification");
    }

    return true;
  } catch (error) {
    console.error("Unexpected error: ", error);
    return false;
  }
};
