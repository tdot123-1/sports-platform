"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useMemo, useState } from "react";

//define props with generic T
interface MultiSelectProps<T extends Record<string, string>> {
  name: string;
  initial_values?: (keyof T)[]; // only keys of map
  pending: boolean;
  optionsMap: T; // enforces exact keys from passed map
  describedBy: string;
}

const MultiSelect = <T extends Record<string, string>>({
  name,
  initial_values,
  pending,
  optionsMap,
  describedBy,
}: MultiSelectProps<T>) => {
  // initialize selectedValues based on initial_values
  const [selectedValues, setSelectedValues] = useState(() =>
    Object.fromEntries(
      Object.keys(optionsMap).map((k) => [
        k,
        initial_values?.includes(k) || false,
      ])
    )
  );

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

  // update selectedValues when initial_values changes
  // maybe not necessary as it is part of props(?)
  useEffect(() => {
    if (initial_values) {
      setSelectedValues(() =>
        // create new object
        Object.fromEntries(
          // map over keys from initial map,
          // set key to true if value is included in initial_values array
          Object.keys(optionsMap).map((k) => [k, initial_values.includes(k)])
        )
      );
    }
  }, [initial_values, optionsMap]);

  const handleCheckedChange = (checked: boolean, key: string) => {
    // update selected values state
    setSelectedValues((prev) => ({ ...prev, [key]: checked }));
  };

  return (
    <>
      <div
        aria-describedby={describedBy}
        className="grid grid-cols-1 sm:grid-cols-2 gap-1 py-1"
      >
        {Object.entries(optionsMap).map(([k, v]) => (
          <div key={k} className="flex items-center gap-1">
            <Checkbox
              id={k}
              name={k}
              disabled={pending}
              checked={selectedValues[k]}
              onCheckedChange={(checked) =>
                handleCheckedChange(checked as boolean, k)
              }
            />
            <Label htmlFor={k}>{v}</Label>
          </div>
        ))}
      </div>
      <Input
        name={name}
        id={name}
        type="hidden"
        value={valuesStr}
        readOnly
        hidden
        className="hidden"
      />
    </>
  );
};

export default MultiSelect;
