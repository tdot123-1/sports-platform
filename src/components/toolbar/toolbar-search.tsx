import { SearchIcon } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
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
        <DropdownMenuContent className="max-w-36">
          <DropdownMenuLabel>Search Events</DropdownMenuLabel>
          <div>
            <Input />
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default ToolbarSearch;
