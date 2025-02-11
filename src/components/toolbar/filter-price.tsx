"use client";

import { CircleXIcon } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "../ui/dropdown-menu";
import { Slider } from "../ui/slider";
import { Dispatch, SetStateAction, useState } from "react";
import { ReadonlyURLSearchParams } from "next/navigation";
import { NavigateOptions } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useDebouncedCallback } from "use-debounce";

const MAX_PRICE = 1000;

interface FilterPriceProps {
  pathname: string;
  searchParams: ReadonlyURLSearchParams;
  replace: (href: string, options?: NavigateOptions) => void;
  priceFilter?: number;
  priceRange: number[]
  setPriceRange: Dispatch<SetStateAction<number[]>>
}

const FilterPrice = ({
  pathname,
  searchParams,
  replace,
  priceFilter,
  priceRange,
  setPriceRange
}: FilterPriceProps) => {
  

  const handlePriceFilter = useDebouncedCallback((newPrice: number[]) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (newPrice[0] !== MAX_PRICE) {
      params.set("price", newPrice[0].toString());
    } else {
      params.delete("price");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 500);

  const handleValueChange = (e: number[]) => {
    // console.log(e);
    setPriceRange(e);
    handlePriceFilter(e);
  };

  return (
    <>
      <DropdownMenuSub>
        <div className="inline-flex w-full">
          {priceRange[0] !== MAX_PRICE && (
            <Button
              onClick={() => handleValueChange([MAX_PRICE])}
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
            Price range
          </DropdownMenuSubTrigger>
        </div>
        <DropdownMenuPortal>
          <DropdownMenuSubContent>
            <div className="p-2">
              <p>0,00 - {priceRange[0]},00</p>
              <Slider
                className="w-44"
                max={MAX_PRICE}
                value={priceRange}
                onValueChange={handleValueChange}
                step={5}
              />
            </div>
          </DropdownMenuSubContent>
        </DropdownMenuPortal>
      </DropdownMenuSub>
    </>
  );
};

export default FilterPrice;
