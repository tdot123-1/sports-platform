import { SearchIcon } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Input } from "../ui/input";

const ToolbarSearch = () => {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={`outline`}>
            <div className="flex justify-start items-center gap-1">
              <SearchIcon />
              <span className="hidden md:block">Search</span>
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64">
          <DropdownMenuLabel>Search Events</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <div className="py-1">
            <Input />
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default ToolbarSearch;
