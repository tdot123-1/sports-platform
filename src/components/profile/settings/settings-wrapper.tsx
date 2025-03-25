"use client";

import { useState } from "react";
import ChangePassword from "./change-password";
import ChangeEmail from "./change-email";

const SettingsWrapper = ({ providers }: { providers: string[] }) => {
  // control states of collapsibles
  const [isOpenEmail, setIsOpenEmail] = useState(false);
  const [isOpenPassword, setIsOpenPassword] = useState(false);

  const toggleCollapsible = (collapsible: string) => {
    if (collapsible === "email") {
      setIsOpenEmail((prev) => !prev);
      setIsOpenPassword(false);
    } else {
      setIsOpenPassword((prev) => !prev);
      setIsOpenEmail(false);
    }
  };
  return (
    <>
      <li>
        <ChangePassword
          isOpenPassword={isOpenPassword}
          toggleCollapsible={toggleCollapsible}
        />
      </li>
      <li>
        <ChangeEmail
          isOpenEmail={isOpenEmail}
          toggleCollapsible={toggleCollapsible}
          providers={providers}
        />
      </li>
    </>
  );
};

export default SettingsWrapper;
