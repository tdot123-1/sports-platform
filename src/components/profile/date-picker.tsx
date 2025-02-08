"use client";

import { CalendarIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useState } from "react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "../ui/calendar";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

interface DatePickerProps {
  name: string;
  eventDate?: Date;
  pending: boolean;
  required?: boolean;
}

const DatePicker = ({
  name,
  eventDate,
  pending,
  required,
}: DatePickerProps) => {
  const [date, setDate] = useState<Date | undefined>(eventDate);
  const [checked, setChecked] = useState(false);

  const handleCheckedChange = (e: any) => {
    if (e === true) {
      setDate(undefined);
    }
    setChecked((prev) => !prev);
  };

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            type="button"
            disabled={pending || checked}
            variant={"outline"}
            className={cn(
              "justify-start text-left font-normal w-full",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <Input
          name={name}
          id={name}
          type="hidden"
          value={date ? date.toString() : ""}
          readOnly
          hidden
          className="hidden"
        />
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
            disabled={pending || checked}
          />
        </PopoverContent>
      </Popover>
      {required && (
        <>
          <p className="text-xs italic mt-1">
            Check this option if your event doesn't have a start date yet.
          </p>
          <div className="flex items-center gap-1">
            <Checkbox
              disabled={pending || !!date}
              checked={checked}
              onCheckedChange={handleCheckedChange}
              name="start_date_tbd"
              id="start_date_tbd"
            />
            <Label htmlFor="start_date_tbd">TBD</Label>
          </div>
        </>
      )}
    </>
  );
};

export default DatePicker;
