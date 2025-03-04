"use client";

import { Button } from "@/components/ui/button";
import { TargetAgeGroupMap } from "@/lib/types";
import { cn } from "@/lib/utils";
import { CheckIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import AgeSelectDropdown from "./age-select-dropdown";
import { Input } from "@/components/ui/input";

interface AgeSelectProps {
  name: string;
  initialValues?: string[];
  pending: boolean;
  describedBy: string;
}

const buttonOrder: (keyof typeof TargetAgeGroupMap | "youth")[] = [
  "all",
  "youth",
  "adu",
  "vet",
];

const AgeSelect = ({
  name,
  initialValues,
  pending,
  describedBy,
}: AgeSelectProps) => {
  // initialize selectedAgeGroups based on initialValues
  const [selectedAgeGroups, setSelectedAgeGroups] = useState(() =>
    Object.fromEntries(
      Object.keys(TargetAgeGroupMap).map((k) => [
        k,
        initialValues?.includes(k) || false,
      ])
    )
  );

  const handleSelectAll = () => {
    // set all age groups to false
    const updatedAgeGroups = Object.keys(TargetAgeGroupMap).reduce(
      (acc, key) => {
        // only "all" remains true
        acc[key] = key === "all";
        return acc;
      },
      {} as Record<string, boolean>
    );
    // update state
    setSelectedAgeGroups(updatedAgeGroups);
  };

  // toggle selection
  const toggleAgeGroup = (key: string) => {
    if (key === "all") {
      handleSelectAll();
    } else {
      setSelectedAgeGroups((prev) => ({
        ...prev,
        [key]: !prev[key],
      }));
    }
  };

  // compute ageGroupsStr dynamically, to be submitted along form
  const ageGroupsStr = useMemo(
    () =>
      // construct array from selected values object keys
      Object.keys(selectedAgeGroups)
        // filter out false values to remain with array of only 'true' keys
        .filter((key) => selectedAgeGroups[key])
        // join together into comma seperated string
        .join(","),
    [selectedAgeGroups]
  );

  return (
    <>
      <div
        aria-describedby={describedBy}
        className="grid grid-cols-2 sm:grid-cols-4 gap-3"
      >
        {buttonOrder.map((k) => {
          if (k === "youth") {
            return (
              <AgeSelectDropdown
                key={k}
                selectedAgeGroups={selectedAgeGroups}
                toggleAgeGroup={toggleAgeGroup}
                pending={pending}
              />
            );
          }

          const v = TargetAgeGroupMap[k];

          return (
            <Button
              key={k}
              type="button"
              className={cn(selectedAgeGroups[k] && "bg-muted")}
              variant={`outline`}
              onClick={() => toggleAgeGroup(k)}
            >
              {selectedAgeGroups[k] && <CheckIcon />}
              <span>{v}</span>
            </Button>
          );
        })}
      </div>
      <Input
        name={name}
        id={name}
        type="hidden"
        value={ageGroupsStr}
        readOnly
        hidden
        className="hidden"
      />
    </>
  );
};

export default AgeSelect;
