"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TargetAgeGroupMap } from "@/lib/types";
import { useEffect, useMemo, useState } from "react";

interface AgeSelectProps {
  name: string;
  target_age?: string[];
  pending: boolean;
}

const AgeSelect = ({ name, target_age, pending }: AgeSelectProps) => {
  // initialize selectedAgeGroups based on target_age
  const [selectedAgeGroups, setSelectedAgeGroups] = useState(() =>
    Object.fromEntries(
      Object.keys(TargetAgeGroupMap).map((k) => [
        k,
        target_age?.includes(k) || false,
      ])
    )
  );

  // compute targetAgeStr dynamically
  const targetAgeStr = useMemo(
    () =>
      Object.keys(selectedAgeGroups)
        .filter((key) => selectedAgeGroups[key])
        .join(","),
    [selectedAgeGroups]
  );

  // update selectedAgeGroups when target_age changes
  // maybe not necessary as it is part of props(?)
  useEffect(() => {
    if (target_age) {
      setSelectedAgeGroups((prev) =>
        Object.fromEntries(
          Object.keys(TargetAgeGroupMap).map((k) => [k, target_age.includes(k)])
        )
      );
    }
  }, [target_age]);

  const handleCheckedChange = (checked: any, key: string) => {
    // update selected age groups state
    console.log(`value: ${checked}, key: ${key}`);
    setSelectedAgeGroups((prev) => ({ ...prev, [key]: checked }));
  };

  return (
    <>
      <Label htmlFor={name}>
        Target Age Group <span className="text-destructive">*</span>
      </Label>
      <p className="text-xs italic">
        Select the age group(s) you are organizing the event for.
      </p>
      <p className="text-sm text-muted-foreground py-1">
        Age group (birthyear)
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 py-1">
        {Object.entries(TargetAgeGroupMap).map(([k, v]) => (
          <div key={k} className="flex items-center gap-1">
            <Checkbox
              id={k}
              name={k}
              disabled={pending}
              checked={selectedAgeGroups[k]}
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
        value={targetAgeStr}
        readOnly
        hidden
        className="hidden"
      />
    </>
  );
};

export default AgeSelect;
