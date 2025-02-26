"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { Undo2Icon } from "lucide-react";
// import { usePathname, useRouter } from "next/navigation";
// import { useEffect, useState } from "react";

interface ReturnButtonProps {
  returnUrl: string;
}

const ReturnButton = ({ returnUrl }: ReturnButtonProps) => {
  const href = sessionStorage.getItem("returnUrl") || returnUrl;

  return (
    <>
      <Link href={href}>
        <Button variant={`secondary`}>
          <div className="flex justify-start items-start gap-1">
            <Undo2Icon />
            <span className="hidden md:block">Return</span>
          </div>
        </Button>
      </Link>
    </>
  );
};

export default ReturnButton;
