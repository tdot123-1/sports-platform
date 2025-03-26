"use client";

import { useEffect } from "react";
import { toast } from "sonner";

// toast to inform user after profile was deleted
const ProfileDeletedToast = () => {
  useEffect(() => {
    toast.info("Profile succesfully deleted. Goodbye!");
  }, []);

  return <div></div>;
};

export default ProfileDeletedToast;
