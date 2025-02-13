"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { Undo2Icon } from "lucide-react";
import { useSearchParams } from "next/navigation";

interface ReturnButtonProps {
  origin: "grid" | "table" | "map";
}

const ReturnButton = ({ origin }: ReturnButtonProps) => {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  
  return (
    <>
      <Link href={`/events/${origin}?${params.toString()}`}>
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
