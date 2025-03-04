"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TargetAgeGroupMap } from "@/lib/types";
import { cn } from "@/lib/utils";
import { CheckIcon } from "lucide-react";
import { useMemo } from "react";

interface AgeSelectDropdownProps {
  selectedAgeGroups: {
    [k: string]: boolean;
  };
  toggleAgeGroup: (key: keyof typeof TargetAgeGroupMap) => void;
  pending: boolean;
}

const AgeSelectDropdown = ({
  selectedAgeGroups,
  toggleAgeGroup,
  pending,
}: AgeSelectDropdownProps) => {
  const hasYouthSelected = useMemo(
    () =>
      Object.entries(selectedAgeGroups).some(
        ([key, value]) => key.startsWith("2") && value
      ),
    [selectedAgeGroups]
  );
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            type="button"
            className={cn(hasYouthSelected && "bg-muted")}
            variant={`outline`}
          >
            {hasYouthSelected && <CheckIcon />}
            <span>youth</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Select target birthyear(s)</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <ScrollArea className="h-48">
            {Object.entries(TargetAgeGroupMap)
              .filter(([k]) => k.startsWith("2"))
              .map(([k, v]) => (
                <DropdownMenuCheckboxItem
                  key={k}
                  id={k}
                  disabled={pending}
                  onCheckedChange={() =>
                    toggleAgeGroup(k as keyof typeof TargetAgeGroupMap)
                  }
                  checked={selectedAgeGroups[k]}
                >
                  {v}
                </DropdownMenuCheckboxItem>
              ))}
          </ScrollArea>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default AgeSelectDropdown;
