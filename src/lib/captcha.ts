"use server";

export const verifyCaptcha = async (token: string) => {
  const secret = process.env.HCAPTCHA_SECRET;

  if (!secret) {
    console.error("Missing CAPTCHA secret!");
    return false;
  }

  try {
    const response = await fetch("https://api.hcaptcha.com/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `secret=${secret}&response=${token}`,
    });

    const data = await response.json();

    if (!data.success) {
      console.error("Error validating CAPTCHA: ", data);
      return false;
    }

    return data.success as boolean;
  } catch (error) {
    console.error("Error validating CAPTCHA: ", error);
    return false;
  }
};
