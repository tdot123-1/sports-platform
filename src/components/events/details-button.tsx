"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";

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
      <Button onClick={handleNavigation}>{innerText}</Button>
    </>
  );
};

export default ViewDetailsButton;
