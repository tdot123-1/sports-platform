"use client";

import {
  FilterOptions,
  SportsEventType,
  SportsEventTypeArray,
  TargetAgeGroup,
  TargetAgeGroupArray,
  TargetGender,
  TargetGenderArray,
  TargetLevel,
  TargetLevelArray,
} from "@/lib/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { CircleXIcon, FilterIcon, FilterXIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { createSearchParams } from "@/lib/utils";

const ToolbarFilter = ({ filter }: { filter?: FilterOptions }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [typeFilter, setTypeFilter] = useState<SportsEventType | "">(
    filter?.event_type || ""
  );
  const [genderFilter, setGenderFilter] = useState<TargetGender | "">(
    filter?.target_gender || ""
  );
  const [ageFilter, setAgeFilter] = useState<TargetAgeGroup | "">(
    filter?.target_age || ""
  );
  const [levelFilter, setLevelFilter] = useState<TargetLevel | "">(
    filter?.target_level || ""
  );

  const removeFilters = () => {
    // clear all states
    setTypeFilter("");
    setGenderFilter("");
    setAgeFilter("");
    setLevelFilter("");
  };
  const handleChangeFilter = (
    value: string,
    setter: Dispatch<SetStateAction<any>>
  ) => {
    console.log(value);
    setter(value);
  };

  useEffect(() => {
    // construct filterOptions object
    const newFilter: FilterOptions = {};
    // check which filters should be applied
    newFilter.event_type = typeFilter || undefined;
    newFilter.target_age = ageFilter || undefined;
    newFilter.target_gender = genderFilter || undefined;
    newFilter.target_level = levelFilter || undefined;

    // construct new url with filters
    const newUrl = createSearchParams(pathname, searchParams, newFilter);

    // get current url
    const params = new URLSearchParams(searchParams);

    // only redirect if the url has changed
    if (newUrl !== `${pathname}?${params.toString()}`) {
      replace(newUrl);
    }
  }, [typeFilter, genderFilter, ageFilter, levelFilter]);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={`outline`}>
            <div className="flex justify-start items-center gap-1">
              <FilterIcon />
              <span className="hidden md:block">Filter</span>
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="max-w-36">
          <DropdownMenuLabel>Apply Filters</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuSub>
            <div className="inline-flex w-full">
              {typeFilter && (
                <Button
                  onClick={() => setTypeFilter("")}
                  variant={`outline`}
                  className="p-0"
                >
                  <CircleXIcon className="p-0" />
                </Button>
              )}

              <DropdownMenuSubTrigger className="flex-grow">
                Event type
              </DropdownMenuSubTrigger>
            </div>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuRadioGroup
                  value={typeFilter}
                  onValueChange={(v) => handleChangeFilter(v, setTypeFilter)}
                >
                  {SportsEventTypeArray.map((v) => (
                    <DropdownMenuRadioItem value={v} key={v}>
                      {v}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuSub>
            <div className="inline-flex w-full">
              {genderFilter && (
                <Button
                  onClick={() => setGenderFilter("")}
                  variant={`outline`}
                  className="p-0"
                >
                  <CircleXIcon className="p-0" />
                </Button>
              )}

              <DropdownMenuSubTrigger className="flex-grow">
                Gender
              </DropdownMenuSubTrigger>
            </div>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuRadioGroup
                  value={genderFilter}
                  onValueChange={(v) => handleChangeFilter(v, setGenderFilter)}
                >
                  {TargetGenderArray.map((v) => (
                    <DropdownMenuRadioItem value={v} key={v}>
                      {v}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuSub>
            <div className="inline-flex w-full">
              {ageFilter && (
                <Button
                  onClick={() => setAgeFilter("")}
                  variant={`outline`}
                  className="p-0"
                >
                  <CircleXIcon className="p-0" />
                </Button>
              )}

              <DropdownMenuSubTrigger className="flex-grow">
                Age
              </DropdownMenuSubTrigger>
            </div>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuRadioGroup
                  value={ageFilter}
                  onValueChange={(v) => handleChangeFilter(v, setAgeFilter)}
                >
                  {TargetAgeGroupArray.map((v) => (
                    <DropdownMenuRadioItem value={v} key={v}>
                      {v}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuSub>
            <div className="inline-flex w-full">
              {levelFilter && (
                <Button
                  onClick={() => setLevelFilter("")}
                  variant={`outline`}
                  className="p-0"
                >
                  <CircleXIcon className="p-0" />
                </Button>
              )}

              <DropdownMenuSubTrigger className="flex-grow">
                Level
              </DropdownMenuSubTrigger>
            </div>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuRadioGroup
                  value={levelFilter}
                  onValueChange={(v) => handleChangeFilter(v, setLevelFilter)}
                >
                  {TargetLevelArray.map((v) => (
                    <DropdownMenuRadioItem value={v} key={v}>
                      {v}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuItem
            disabled={
              !typeFilter && !genderFilter && !ageFilter && !levelFilter
            }
            className="cursor-pointer"
            onClick={removeFilters}
          >
            <div className="flex justify-start items-start gap-1">
              <FilterXIcon size={18} />
              <span className="hidden md:block">Remove all</span>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default ToolbarFilter;
