import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { TargetAgeGroupMap } from "@/lib/types";
import { cn } from "@/lib/utils";
import { CheckIcon } from "lucide-react";

const AgeSelectDropdown = () => {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            type="button"
            className={cn(hasSelectedValue && "bg-muted")}
            variant={`outline`}
          >
            {hasSelectedValue && <CheckIcon />}
            <span>Youth</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Select target birthyear(s)</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {Object.entries(TargetAgeGroupMap).map(([k, v]) => (
            <DropdownMenuCheckboxItem
              key={k}
              id={k}
              disabled={pending}
              checked={selectedValues[k]}
            >
              {v}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default AgeSelectDropdown;
