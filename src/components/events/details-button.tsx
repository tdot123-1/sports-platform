"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";
import { InfoIcon } from "lucide-react";

const ViewDetailsButton = ({
  nextUrl,
  innerText,
}: {
  nextUrl: string;
  innerText: string;
}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleNavigation = () => {
    const returnUrl = `${pathname}?${searchParams.toString()}`;
    sessionStorage.setItem("returnUrl", returnUrl);

    router.push(nextUrl);
  };
  return (
    <>
      <Button size={`sm`} className="bg-basket hover:bg-basket/60" onClick={handleNavigation}>
        <div className="flex items-center gap-1">
          <InfoIcon />
          <span>{innerText}</span>
        </div>
      </Button>
    </>
  );
};

export default ViewDetailsButton;
