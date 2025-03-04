"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CheckIcon } from "lucide-react";
import { useState } from "react";

const AgeSelect = () => {
  const [allAges, setAllAges] = useState(false);
  const [youth, setYouth] = useState(false);
  const [adults, setAdults] = useState(true);
  const [veterans, setVeterans] = useState(false);
  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Button className={cn(allAges && "bg-muted")} variant={`outline`}>
          {allAges && <CheckIcon />}
          <span>All ages</span>
        </Button>
        <Button className={cn(youth && "bg-muted")} variant={`outline`}>
          {youth && <CheckIcon />}
          <span>Youth</span>
        </Button>
        <Button className={cn(adults && "bg-muted")} variant={`outline`}>
          {adults && <CheckIcon />}
          <span>Adults</span>
        </Button>
        <Button className={cn(veterans && "bg-muted")} variant={`outline`}>
          {veterans && <CheckIcon />}
          <span>Veterans</span>
        </Button>
      </div>
    </>
  );
};

export default AgeSelect;
