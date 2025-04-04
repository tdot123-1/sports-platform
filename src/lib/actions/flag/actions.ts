"use server";

import { createClient } from "@/lib/supabase/server";
import { z } from "zod";

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
    .min(5, { message: "Please provide some details" })
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

  // return { success: true };

  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("event_reports")
      .insert({ event_id, report_details, report_reason, user_email })
      .select("id")
      .single();

    if (error) {
      console.error("Database error on report event: ", error.message);
      return { message: `Database error`, success: true };
    }

    console.log("New report: ", data.id);

    // send an email with event id in link to user
    // after link is clicked, set verified to true

    return { message: "", success: true };
  } catch (error) {
    console.error("Unexpected error: ", error);
    return { message: "An unexpected error occurred.", success: false };
  }
};
