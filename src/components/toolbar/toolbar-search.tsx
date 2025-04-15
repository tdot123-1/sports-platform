"use client";

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
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { Label } from "../ui/label";

const ToolbarSearch = ({ batch }: { batch?: boolean }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term) => {
    // console.log(`Searching... ${term}`);

    const params = new URLSearchParams(searchParams);

    if (batch) {
      params.set("batch", "1");
    } else {
      params.set("page", "1");
    }

    if (term) {
      params.set("query", encodeURIComponent(term));
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

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
            <Label htmlFor="search" className="sr-only">
              Search
            </Label>
            <Input
              id="search"
              defaultValue={
                searchParams.get("query") &&
                typeof searchParams.get("query") === "string"
                  ? decodeURIComponent(searchParams.get("query")!)
                  : ""
              }
              onChange={(e) => {
                handleSearch(e.target.value);
              }}
            />
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default ToolbarSearch;
