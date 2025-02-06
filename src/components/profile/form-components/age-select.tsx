import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { TargetAgeGroupMap } from "@/lib/types";

const AgeSelect = () => {
  return (
    <>
      <Label htmlFor="target_age">
        Target Age Group <span className="text-destructive">*</span>
      </Label>
      <p className="text-xs italic">
        Select the age group(s) you are organizing the event for.
      </p>
      <p className="text-sm text-muted-foreground py-1">Age group (birthyear)</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 py-1">
        
        {Object.entries(TargetAgeGroupMap).map(([k, v]) => (
          <div key={k} className="flex items-center gap-1">
            <Checkbox id={k} name={k} />
            <Label htmlFor={k}>{v}</Label>
          </div>
        ))}
      </div>
    </>
  );
};

export default AgeSelect;
