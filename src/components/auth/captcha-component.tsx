"use client";

import HCaptcha from "@hcaptcha/react-hcaptcha";
import { Dispatch, SetStateAction, useRef } from "react";

const CaptchaComponent = ({
  setCaptchaToken,
}: {
  setCaptchaToken: Dispatch<SetStateAction<string>>;
}) => {
  const captcha = useRef<HCaptcha | null>(null);

  const SITE_KEY = process.env.NEXT_PUBLIC_HCAPTCHA_SITEKEY;

  if (!SITE_KEY) {
    return null;
  }

  //   useEffect(() => {
  //     console.log("Captcha token: ", captchaToken);
  //   }, [captchaToken]);

  return (
    <>
      <HCaptcha
        sitekey={SITE_KEY}
        ref={captcha}
        onVerify={(token) => {
          setCaptchaToken(token);
          captcha?.current?.resetCaptcha();
        }}
      />
    </>
  );
};

export default CaptchaComponent;
