"use client";

import { Button } from "../ui/button";
import { Undo2Icon } from "lucide-react";
import { useRouter } from "next/navigation";

interface ReturnButtonProps {
  userId?: string;
}

const ReturnButton = ({ userId }: ReturnButtonProps) => {
  const router = useRouter();

  const isInternalReferrer =
    document.referrer &&
    new URL(document.referrer).origin === window.location.origin;

  const handleClick = () => {
    if (window.history.length > 1 && isInternalReferrer) {
      return router.back();
    } else {
      return userId
        ? router.push(`/profile/events`)
        : router.push(`/events/grid`);
    }
  };

  return (
    <>
      <Button variant={`secondary`} onClick={handleClick}>
        <div className="flex justify-start items-start gap-1">
          <Undo2Icon />
          <span className="hidden md:block">Return</span>
        </div>
      </Button>
    </>
  );
};

export default ReturnButton;
