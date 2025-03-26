"use client";

import { useEffect } from "react";
import { toast } from "sonner";

const ConfirmEmailChangeToast = () => {
  useEffect(() => {
    console.log("TOAST")
    toast.info(
      "Click the link in your other email to finish the transfer"
    );
  }, []);
  
  return <div></div>;
};

export default ConfirmEmailChangeToast;
