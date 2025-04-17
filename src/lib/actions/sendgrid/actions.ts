"use server";

import sgMail from "@sendgrid/mail";

export const sendEmailToVerifyReport = async (
  userEmail: string,
  token: string
) => {
  const SENDGRID_SENDER = process.env.SENDGRID_VERIFIED_SENDER;
  const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;

  if (!SENDGRID_SENDER || !SENDGRID_API_KEY) {
    console.error("Missing API key or verified sender");
    return false;
  }

  // send email with jwt in link (reportId in sub(?))

  sgMail.setApiKey(SENDGRID_API_KEY);

  const verifyUrl = `${process.env.APP_URL}/verify-report?token=${token}`;

  const msg = {
    to: userEmail,
    from: {
      email: SENDGRID_SENDER,
      name: "Hi-Fives",
    },
    subject: "Verify your report",
    html: `
    <h3>Thank you for helping us moderate!</h3>
    <p>Click the link below to verify your report:</p>
    <br>
    <a href="${verifyUrl}">Verify Report</a>
    `,
  };

  try {
    await sgMail.send(msg);
    console.log("Verification email sent");
    return true;
  } catch (error) {
    console.error("Error sending email: ", error);
    return false;
  }
};

export const sendEmailAfterVerifiedReport = async (
  reason: string,
  reportId: string
) => {
  const SENDGRID_SENDER = process.env.SENDGRID_VERIFIED_SENDER;
  const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
  const REPORTS_EMAIL = process.env.REPORTS_EMAIL;

  if (!SENDGRID_SENDER || !SENDGRID_API_KEY || !REPORTS_EMAIL) {
    console.error("Missing API key or verified sender");
    return false;
  }

  sgMail.setApiKey(SENDGRID_API_KEY);

  const msg = {
    to: REPORTS_EMAIL,
    from: {
      email: SENDGRID_SENDER,
      name: "Hi-Fives",
    },
    subject: "An event was reported",
    html: `
    <h3>An event was recently reported</h3>
    <p>An event was reported as inappropriate for the following reason: ${reason}.</p>
    <p>Report ID: ${reportId}</p>
    <br>
    <p>Please check the database for more details.</p>
    `,
  };

  try {
    await sgMail.send(msg);
    console.log("Report notification sent");
    return true;
  } catch (error) {
    console.error("Error sending email: ", error);
    return false;
  }
};
