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
    <h1>Thank you for helping us moderate!</h1>
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
