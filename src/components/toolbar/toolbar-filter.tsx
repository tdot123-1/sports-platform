"use client";

import {
  FilterOptions,
  SportsEventType,
  SportsEventTypeArray,
  SportsEventTypeMap,
  TargetAgeGroup,
  TargetAgeGroupArray,
  TargetAgeGroupMap,
  TargetGender,
  TargetGenderArray,
  TargetGenderMap,
  TargetLevel,
  TargetLevelArray,
  TargetLevelMap,
} from "@/lib/types";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
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
import { constructFilterOptions, createSearchParams } from "@/lib/utils";
import FilterPrice from "./filter-price";

const MAX_PRICE = 1000;

const ToolbarFilter = ({
  filter,
  priceFilter,
}: {
  filter?: FilterOptions;
  priceFilter?: number;
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // seperate state for price filter
  const [priceRange, setPriceRange] = useState(
    priceFilter !== undefined ? [priceFilter] : [MAX_PRICE]
  );

  // state to trigger use effect to update search params with 'price range' when
  // 'delete all filters' is clicked
  const [deletePriceRange, setDeletePriceRange] = useState(false);

  // each state is an object where every key is a filter option, and value is boolean
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

  // T is generic type variable, makes function flexible
  const initializeFilterState = <T extends string>(
    optionsArray: T[],
    selectedFilters?: T[]
  ): Record<T, boolean> => {
    // build object where keys are filter options
    return optionsArray.reduce((acc, option) => {
      // values are true if included in props, false if not
      acc[option] = selectedFilters?.includes(option) || false;
      return acc;
    }, {} as Record<T, boolean>);
  };

  // initialize state based on received filter props
  useEffect(() => {
    setTypeFilter(
      initializeFilterState(SportsEventTypeArray, filter?.event_type)
    );
    setAgeFilter(
      initializeFilterState(TargetAgeGroupArray, filter?.target_age)
    );
    setGenderFilter(
      initializeFilterState(TargetGenderArray, filter?.target_gender)
    );
    setLevelFilter(
      initializeFilterState(TargetLevelArray, filter?.target_level)
    );
  }, []); // run on mount

  const handleChangeFilter = (
    value: string,
    setter: Dispatch<SetStateAction<any>>
  ) => {
    // console.log(value);
    setter((prev: any) => ({ ...prev, [value]: !prev[value] }));
  };

  useEffect(() => {
    // construct filterOptions object
    const newFilter: FilterOptions = {};

    console.log("EFFECT TRIGGERED");

    // check which filters should be applied
    newFilter.event_type = constructFilterOptions(typeFilter).map(
      (key) => key as SportsEventType
    );

    newFilter.target_age = constructFilterOptions(ageFilter).map(
      (key) => key as TargetAgeGroup
    );

    newFilter.target_gender = constructFilterOptions(genderFilter).map(
      (key) => key as TargetGender
    );

    newFilter.target_level = constructFilterOptions(levelFilter).map(
      (key) => key as TargetLevel
    );

    const priceFilter = { filter: priceRange[0], max: MAX_PRICE };

    // construct new url with filters
    const newUrl = createSearchParams(
      pathname,
      searchParams,
      newFilter,
      undefined,
      priceFilter
    );

    // get current url
    const params = new URLSearchParams(searchParams);

    // only redirect if the url has changed
    if (newUrl !== `${pathname}?${params.toString()}`) {
      replace(newUrl);
    }
  }, [typeFilter, genderFilter, ageFilter, levelFilter, deletePriceRange]);

  // check if category has any filters applied
  const hasFilters = (filter: any) => {
    return Object.values(filter).some((value) => value);
  };

  // set all keys to false on specific state variable
  const removeFilters = (setter: Dispatch<SetStateAction<any>>) => {
    setter((prev: any) =>
      Object.fromEntries(Object.keys(prev).map((key) => [key, false]))
    );
  };

  const removePriceFilter = () => {
    setPriceRange([MAX_PRICE]);
    setDeletePriceRange((prev) => !prev);
  };

  const removeAllFilters = () => {
    removeFilters(setLevelFilter);
    removeFilters(setAgeFilter);
    removeFilters(setGenderFilter);
    removeFilters(setTypeFilter);
    removePriceFilter();

    //(!) TEMPORARY reset price filter immediatly
    // setPriceRange([MAX_PRICE]);

    // const params = new URLSearchParams(searchParams);
    // params.delete("price");

    // replace(`${pathname}?${params.toString()}`);
  };

  const AllFilters = [
    {
      trigger: "Event type",
      options: SportsEventTypeMap,
      state: typeFilter,
      setter: setTypeFilter,
    },
    {
      trigger: "Gender",
      options: TargetGenderMap,
      state: genderFilter,
      setter: setGenderFilter,
    },
    {
      trigger: "Age",
      options: TargetAgeGroupMap,
      state: ageFilter,
      setter: setAgeFilter,
    },
    {
      trigger: "Level",
      options: TargetLevelMap,
      state: levelFilter,
      setter: setLevelFilter,
    },
  ];

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
          {AllFilters.map((sub) => (
            <DropdownMenuSub key={`${sub.trigger}`}>
              <div className="inline-flex w-full">
                {hasFilters(sub.state) && (
                  <Button
                    onClick={() => removeFilters(sub.setter)}
                    variant={`outline`}
                    className="p-0"
                  >
                    <p hidden className="hidden">
                      Remove filters
                    </p>
                    <CircleXIcon className="p-0" />
                  </Button>
                )}

                <DropdownMenuSubTrigger className="flex-grow">
                  {sub.trigger}
                </DropdownMenuSubTrigger>
              </div>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  {Object.entries(sub.options).map(([k, v]) => (
                    <DropdownMenuCheckboxItem
                      key={k}
                      checked={sub.state[k as keyof typeof sub.state]}
                      onCheckedChange={() => handleChangeFilter(k, sub.setter)}
                    >
                      {v}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          ))}
          <FilterPrice
            pathname={pathname}
            searchParams={searchParams}
            replace={replace}
            priceFilter={priceFilter}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
          />
          <DropdownMenuItem
            disabled={
              !hasFilters(levelFilter) &&
              !hasFilters(genderFilter) &&
              !hasFilters(ageFilter) &&
              !hasFilters(typeFilter) &&
              priceRange[0] === MAX_PRICE
            }
            className="cursor-pointer"
            onClick={removeAllFilters}
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
