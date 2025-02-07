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
  describedBy
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

  // compute valuesStr dynamically
  const valuesStr = useMemo(
    () =>
      Object.keys(selectedValues)
        .filter((key) => selectedValues[key])
        .join(","),
    [selectedValues]
  );

  // update selectedValues when initial_values changes
  // maybe not necessary as it is part of props(?)
  useEffect(() => {
    if (initial_values) {
      setSelectedValues((prev) =>
        Object.fromEntries(
          Object.keys(optionsMap).map((k) => [k, initial_values.includes(k)])
        )
      );
    }
  }, [initial_values]);

  const handleCheckedChange = (checked: any, key: string) => {
    // update selected values state
    console.log(`value: ${checked}, key: ${key}`);
    setSelectedValues((prev) => ({ ...prev, [key]: checked }));
  };

  return (
    <>
      <div aria-describedby={describedBy} className="grid grid-cols-1 sm:grid-cols-2 gap-1 py-1">
        {Object.entries(optionsMap).map(([k, v]) => (
          <div key={k} className="flex items-center gap-1">
            <Checkbox
              id={k}
              name={k}
              disabled={pending}
              checked={selectedValues[k]}
              onCheckedChange={(checked) => handleCheckedChange(checked, k)}
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
