"use client";

import { ArrowDownNarrowWide, SortAscIcon, SortDescIcon } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useEffect, useState } from "react";
import { SortByKey, SortOptions, SortOptionsMap } from "@/lib/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { createSearchParams } from "@/lib/utils";

const ToolbarSort = ({ sort }: { sort?: SortOptions }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [ascending, setAscending] = useState(
    sort?.order === undefined ? undefined : sort?.order === "asc" ? true : false
  );
  const [sortBy, setSortBy] = useState(sort?.sort_by || "");

  // check if selected value is one of allowed columns, update state
  const handleSortBy = (value: string) => {
    if (Object.keys(SortOptionsMap).includes(value)) {
      setSortBy(value);
    }
  };

  useEffect(() => {
    // set sort options
    const newSort: SortOptions = {
      sort_by: Object.keys(SortOptionsMap).includes(sortBy)
        ? (sortBy as SortByKey)
        : undefined,
      order: ascending === undefined ? undefined : ascending ? "asc" : "desc",
    };

    // construct new url
    const newUrl = createSearchParams(
      pathname,
      searchParams,
      undefined,
      newSort
    );

    // get current and new params
    const params = new URLSearchParams(searchParams);
    const newParams = new URLSearchParams(newUrl.split("?")[1] || "");

    // remove 'page' param to compare changes
    params.delete("page");
    newParams.delete("page");

    // only redirect if url changed
    if (newParams.toString() !== params.toString()) {
      replace(newUrl);
    }
  }, [ascending, sortBy, pathname, replace, searchParams]);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={`outline`}>
            <div className="flex justify-start items-center gap-1">
              <ArrowDownNarrowWide />
              <span className="hidden md:block">Sort</span>
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="max-w-36">
          <DropdownMenuLabel>Sort Events</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setAscending((prev) => !prev)}>
            <div className="flex justify-start items-start gap-1">
              {ascending ? (
                <>
                  <SortAscIcon size={18} />
                  <span>Ascending</span>
                </>
              ) : (
                <>
                  <SortDescIcon size={18} />
                  <span>Descending</span>
                </>
              )}
            </div>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup
            value={sortBy}
            onValueChange={(v) => handleSortBy(v)}
          >
            {Object.entries(SortOptionsMap).map(([k, v]) => (
              <DropdownMenuRadioItem key={k} value={k}>
                {v}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default ToolbarSort;
