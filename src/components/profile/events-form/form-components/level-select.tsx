import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TargetLevelMap } from "@/lib/types";
import { ChevronDownIcon } from "lucide-react";

// maybe change level select to dropdown (?)

const LevelSelect = () => {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="w-full flex justify-between" type="button" variant={`outline`}>
            <span>Select Target Level</span>
            <ChevronDownIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-full">
          <DropdownMenuLabel>Select target level(s)</DropdownMenuLabel>
          <DropdownMenuSeparator />

          {Object.entries(TargetLevelMap).map(([k, v]) => (
            <DropdownMenuCheckboxItem key={k} id={k}>
              {v}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default LevelSelect;
