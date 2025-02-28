"use client";

import { Button } from "@/components/ui/button";
import { FrownIcon, RotateCcwIcon } from "lucide-react";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // log error
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-full flex-col text-center gap-4 items-center justify-center my-28">
      <h2 className="text-xl font-mono">Something went wrong!</h2>
      <FrownIcon size={48} />
      <p className="text-sm text-muted-foreground italic">
        Failed to load this page, click to try again
      </p>
      <Button
        className=""
        onClick={
          // attempt to recover by trying to re-render the route
          () => reset()
        }
      >
        <RotateCcwIcon />
        <span>Try again</span>
      </Button>
    </div>
  );
}
