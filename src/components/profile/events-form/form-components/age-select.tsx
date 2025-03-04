"use client";

import { Button } from "@/components/ui/button";
import { TargetAgeGroupMap } from "@/lib/types";
import { cn } from "@/lib/utils";
import { CheckIcon } from "lucide-react";
import { useMemo, useState } from "react";
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

  // toggle selection
  const toggleAgeGroup = (key: keyof typeof TargetAgeGroupMap) => {
    setSelectedAgeGroups((prev) => {
      const newState = { ...prev };

      if (key === "all") {
        // toggle "all"
        newState.all = !prev.all;

        if (newState.all) {
          // if "all" selected, deselect all other age groups
          Object.keys(TargetAgeGroupMap).forEach((k) => {
            if (k !== "all") {
              newState[k as keyof typeof TargetAgeGroupMap] = false;
            }
          });
        }
      } else {
        // toggle specific age group
        newState[key] = !prev[key];

        // if any individual group is selected, deselect "all" option
        if (newState[key]) {
          newState.all = false;
        }
      }

      return newState;
    });
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
