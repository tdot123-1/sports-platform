"use client";

import HCaptcha from "@hcaptcha/react-hcaptcha";
import { Dispatch, RefObject, SetStateAction } from "react";

const CaptchaComponent = ({
  setCaptchaToken,
  captcha,
}: {
  setCaptchaToken: Dispatch<SetStateAction<string>>;
  captcha: RefObject<HCaptcha | null>;
}) => {
  const SITE_KEY = process.env.NEXT_PUBLIC_HCAPTCHA_SITEKEY;

  if (!SITE_KEY) {
    return null;
  }

  return (
    <>
      <HCaptcha
        sitekey={SITE_KEY}
        ref={captcha}
        onVerify={(token) => {
          setCaptchaToken(token);
        }}
      />
    </>
  );
};

export default CaptchaComponent;
