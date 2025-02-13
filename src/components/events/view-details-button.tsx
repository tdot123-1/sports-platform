"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

interface ViewDetailsButtonProps {
  eventId: string;
  size: "sm" | "default" | "lg" | "icon";
  innerText: string;
}

const ViewDetailsButton = ({
  eventId,
  size,
  innerText,
}: ViewDetailsButtonProps) => {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  useEffect(() => {
    console.log(params.toString());
  }, [params]);

  return (
    <>
      <Link href={`/events/${eventId}?${params.toString()}`}>
        <Button size={size}>{innerText}</Button>
      </Link>
    </>
  );
};

export default ViewDetailsButton;
