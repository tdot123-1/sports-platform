"use client";

import {
  EventStatus,
  EventStatusKeys,
  EventStatusMap,
  FilterOptions,
  SportsEventType,
  SportsEventTypeKeys,
  SportsEventTypeMap,
  TargetAgeGroup,
  TargetAgeGroupKeys,
  TargetAgeGroupMap,
  TargetGender,
  TargetGenderKeys,
  TargetGenderMap,
  TargetLevel,
  TargetLevelKeys,
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
import FilterPrice from "./filter-price";
import { constructFilterOptions, createSearchParams } from "@/lib/filters";
import FilterPassedEvents from "./filter-passed-events";

// const MAX_PRICE = 1000;

const ToolbarFilter = ({
  filter,
  priceFilter,
  maxPrice,
  batch,
  passedEventsFilter,
  isCalendar,
}: {
  filter?: FilterOptions;
  priceFilter?: number;
  maxPrice: number;
  batch?: boolean;
  passedEventsFilter?: boolean;
  isCalendar?: boolean;
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // seperate state for price filter
  const [priceRange, setPriceRange] = useState(
    priceFilter !== undefined ? [priceFilter] : [maxPrice]
  );

  // state to trigger use effect to update search params with 'price range' when
  // 'delete all filters' is clicked
  const [deletePriceRange, setDeletePriceRange] = useState(false);

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

  // each state is an object where every key is a filter option, and value is boolean
  const [typeFilter, setTypeFilter] = useState<{
    [key in SportsEventType]: boolean;
  }>(initializeFilterState(SportsEventTypeKeys, filter?.event_type));

  const [genderFilter, setGenderFilter] = useState<{
    [key in TargetGender]: boolean;
  }>(initializeFilterState(TargetGenderKeys, filter?.target_gender));

  const [ageFilter, setAgeFilter] = useState<{
    [key in TargetAgeGroup]: boolean;
  }>(initializeFilterState(TargetAgeGroupKeys, filter?.target_age));

  const [levelFilter, setLevelFilter] = useState<{
    [key in TargetLevel]: boolean;
  }>(initializeFilterState(TargetLevelKeys, filter?.target_level));

  // new status filter
  const [statusFilter, setStatusFilter] = useState<{
    [key in EventStatus]: boolean;
  }>(initializeFilterState(EventStatusKeys, filter?.event_status));

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

    newFilter.event_status = constructFilterOptions(statusFilter).map(
      (key) => key as EventStatus
    );

    const priceFilter = { filter: priceRange[0], max: maxPrice };

    // construct new url with filters
    const newUrl = createSearchParams(
      pathname,
      searchParams,
      newFilter,
      undefined,
      priceFilter,
      batch
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
  }, [
    typeFilter,
    genderFilter,
    ageFilter,
    levelFilter,
    statusFilter,
    deletePriceRange,
  ]);

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
    setPriceRange([maxPrice]);
    setDeletePriceRange((prev) => !prev);
  };

  const removeAllFilters = () => {
    removeFilters(setLevelFilter);
    removeFilters(setAgeFilter);
    removeFilters(setGenderFilter);
    removeFilters(setTypeFilter);
    removeFilters(setStatusFilter);
    removePriceFilter();
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
    {
      trigger: "Status",
      options: EventStatusMap,
      state: statusFilter,
      setter: setStatusFilter,
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
          {!isCalendar && (
            <FilterPassedEvents
              passedEventsFilter={passedEventsFilter}
              pathname={pathname}
              replace={replace}
              searchParams={searchParams}
              batch={batch}
            />
          )}

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
                  <div className="max-h-48 overflow-y-auto">
                    {Object.entries(sub.options).map(([k, v]) => (
                      <DropdownMenuCheckboxItem
                        key={k}
                        checked={sub.state[k as keyof typeof sub.state]}
                        onSelect={(e) => {
                          e.preventDefault();
                          handleChangeFilter(k, sub.setter);
                        }}
                      >
                        {v}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </div>
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
            maxPrice={maxPrice}
            batch={batch}
          />
          <DropdownMenuSeparator />
          <DropdownMenuItem
            disabled={
              !hasFilters(levelFilter) &&
              !hasFilters(genderFilter) &&
              !hasFilters(ageFilter) &&
              !hasFilters(typeFilter) &&
              !hasFilters(statusFilter) &&
              priceRange[0] === maxPrice
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
