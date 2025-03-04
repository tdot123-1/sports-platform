"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { CheckIcon } from "lucide-react";
import { useMemo, useState } from "react";

interface MultiselectDropdownProps<T extends Record<string, string>> {
  trigger: string;
  subTitle: string;
  optionsMap: T;
  initialValues?: (keyof T)[];
  pending: boolean;
}

const MultiselectDropdown = <T extends Record<string, string>>({
  trigger,
  subTitle,
  optionsMap,
  initialValues,
  pending,
}: MultiselectDropdownProps<T>) => {
  // initialize selectedValues based on initialValues
  const [selectedValues, setSelectedValues] = useState(() =>
    // construct object from initial values { key1: boolean, key2: boolean }
    Object.fromEntries(
      Object.keys(optionsMap).map((k) => [
        k,
        initialValues?.includes(k) || false,
      ])
    )
  );

  // use 'useMemo' to optimize performance (necessary(?))

  // const hasSelectedValue = useMemo(
  //   () => Object.values(selectedValues).some(Boolean),
  //   [selectedValues]
  // );

  // compute valuesStr dynamically, to be submitted along form
  const valuesStr = useMemo(
    () =>
      // construct array from selected values object keys
      Object.keys(selectedValues)
        // filter out false values to remain with array of only 'true' keys
        .filter((key) => selectedValues[key])
        // join together into comma seperated string
        .join(","),
    [selectedValues]
  );

  // check if any value is set to 'true'
  const hasSelectedValue = Object.values(selectedValues).some(Boolean);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            type="button"
            className={cn(hasSelectedValue && "bg-muted")}
            variant={`outline`}
          >
            {hasSelectedValue && <CheckIcon />}
            <span>{trigger}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>{subTitle}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {Object.entries(optionsMap).map(([k, v]) => (
            <DropdownMenuCheckboxItem
              key={k}
              id={k}
              disabled={pending}
              checked={selectedValues[k]}
            >
              {v}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default MultiselectDropdown;
