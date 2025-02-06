"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { TargetLevelMap } from "@/lib/types";

const LevelSelect = () => {
  const handleCheckedChange = (e: any) => {
    console.log(e);
  };
  return (
    <>
      <Label htmlFor="target_level">Target Skill Level</Label>
      <p className="text-xs italic">
        Select the skill level(s) required for your event if applicable.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 py-1">
        {Object.entries(TargetLevelMap).map(([k, v]) => (
          <div key={k} className="flex items-center gap-1">
            <Checkbox id={k} name={k} onCheckedChange={(e) => handleCheckedChange(e)} />
            <Label htmlFor={k}>{v}</Label>
          </div>
        ))}
      </div>
    </>
  );
};

export default LevelSelect;
