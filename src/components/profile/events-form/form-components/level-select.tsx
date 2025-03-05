"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TargetLevelMap } from "@/lib/types";
import { cn } from "@/lib/utils";
import { CheckIcon } from "lucide-react";
import { useMemo, useState } from "react";

// maybe change level select to dropdown (?)

interface LevelSelectProps {
  name: string;
  initialValues?: string[];
  pending: boolean;
  describedBy: string;
}

const LevelSelect = ({
  name,
  initialValues,
  pending,
  describedBy,
}: LevelSelectProps) => {
  // initialize state based on initial values -> {key1: boolean, key2: boolean}
  const [selectedLevels, setSelectedLevels] = useState(() =>
    Object.fromEntries(
      Object.keys(TargetLevelMap).map((k) => [
        k,
        initialValues?.includes(k) || false,
      ])
    )
  );

  // toggle selection
  const toggleLevel = (key: keyof typeof TargetLevelMap) => {
    setSelectedLevels((prev) => {
      const newState = { ...prev };

      if (key === "any") {
        // toggle "any"
        newState.any = !prev.any;

        if (newState.any) {
          // if "any" selected, deselect all other age groups
          Object.keys(TargetLevelMap).forEach((k) => {
            if (k !== "any") {
              newState[k as keyof typeof TargetLevelMap] = false;
            }
          });
        }
      } else {
        // toggle specific skill level
        newState[key] = !prev[key];

        // if any other level is selected, deselect "any" option
        if (newState[key]) {
          newState.any = false;
        }
      }

      return newState;
    });
  };

  // compute levelsStr dynamically, to be submitted along form
  const levelsStr = useMemo(
    () =>
      // construct array from selected values object keys
      Object.keys(selectedLevels)
        // filter out false values to remain with array of only 'true' keys
        .filter((key) => selectedLevels[key])
        // join together into comma seperated string
        .join(","),
    [selectedLevels]
  );

  return (
    <>
      <div
        aria-describedby={describedBy}
        className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-1"
      >
        {Object.entries(TargetLevelMap).map(([k, v]) => (
          <Button
            key={k}
            type="button"
            className={cn(selectedLevels[k] && "bg-muted", "overflow-hidden")}
            variant={`outline`}
            onClick={() => toggleLevel(k as keyof typeof TargetLevelMap)}
            disabled={pending}
          >
            {selectedLevels[k] && <CheckIcon />}
            <span>{v}</span>
          </Button>
        ))}
      </div>
      <Input
        name={name}
        id={name}
        type="hidden"
        value={levelsStr}
        readOnly
        hidden
        className="hidden"
      />
    </>
  );
};

export default LevelSelect;
