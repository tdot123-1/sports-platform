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
  DropdownMenuCheckboxItem,
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

  const [typeFilter, setTypeFilter] = useState<{
    [key in SportsEventType]: boolean;
  }>({} as any);
  const [genderFilter, setGenderFilter] = useState<{
    [key in TargetGender]: boolean;
  }>({} as any);
  const [ageFilter, setAgeFilter] = useState<{
    [key in TargetAgeGroup]: boolean;
  }>({} as any);
  const [levelFilter, setLevelFilter] = useState<{
    [key in TargetLevel]: boolean;
  }>({} as any);

  // Initialize state based on received filter props
  useEffect(() => {
    // Initialize event type filter state
    const initialEventTypeFilter = SportsEventTypeArray.reduce((acc, type) => {
      acc[type] = filter?.event_type?.includes(type) || false; // Set to true if exists in filter, else false
      return acc;
    }, {} as { [key in SportsEventType]: boolean });
    setTypeFilter(initialEventTypeFilter);

    // Initialize target gender filter state
    const initialTargetGenderFilter = TargetGenderArray.reduce(
      (acc, gender) => {
        acc[gender] = filter?.target_gender?.includes(gender) || false; // Set to true if exists in filter, else false
        return acc;
      },
      {} as { [key in TargetGender]: boolean }
    );
    setGenderFilter(initialTargetGenderFilter);

    // Initialize target age filter state
    const initialTargetAgeFilter = TargetAgeGroupArray.reduce((acc, age) => {
      acc[age] = filter?.target_age?.includes(age) || false; // Set to true if exists in filter, else false
      return acc;
    }, {} as { [key in TargetAgeGroup]: boolean });
    setAgeFilter(initialTargetAgeFilter);

    // Initialize target level filter state
    const initialTargetLevelFilter = TargetLevelArray.reduce((acc, level) => {
      acc[level] = filter?.target_level?.includes(level) || false; // Set to true if exists in filter, else false
      return acc;
    }, {} as { [key in TargetLevel]: boolean });
    setLevelFilter(initialTargetLevelFilter);
  }, [filter]); // Run when filter prop changes

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
    setter((prev: any) => ({ ...prev, [value]: !prev[value] }));
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
                {SportsEventTypeArray.map((v) => (
                  <DropdownMenuCheckboxItem
                    key={v}
                    checked={typeFilter[v]}
                    onCheckedChange={() => handleChangeFilter(v, setTypeFilter)}
                  >
                    {v}
                  </DropdownMenuCheckboxItem>
                ))}
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
                {TargetGenderArray.map((v) => (
                  <DropdownMenuCheckboxItem
                    key={v}
                    checked={genderFilter[v]}
                    onCheckedChange={() =>
                      handleChangeFilter(v, setGenderFilter)
                    }
                  >
                    {v}
                  </DropdownMenuCheckboxItem>
                ))}
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
                {TargetAgeGroupArray.map((v) => (
                  <DropdownMenuCheckboxItem
                    key={v}
                    checked={ageFilter[v]}
                    onCheckedChange={() => handleChangeFilter(v, setAgeFilter)}
                  >
                    {v}
                  </DropdownMenuCheckboxItem>
                ))}
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
                {TargetLevelArray.map((v) => (
                  <DropdownMenuCheckboxItem
                    key={v}
                    checked={levelFilter[v]}
                    onCheckedChange={() =>
                      handleChangeFilter(v, setLevelFilter)
                    }
                  >
                    {v}
                  </DropdownMenuCheckboxItem>
                ))}
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
