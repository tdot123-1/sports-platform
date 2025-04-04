"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CheckedState } from "@radix-ui/react-checkbox";
import { format } from "date-fns";
import { CalendarIcon, CheckCircle2Icon } from "lucide-react";
import { useState } from "react";
import { DateRange } from "react-day-picker";

interface DateRangePickerProps {
  name: string;
  startDate?: Date;
  endDate?: Date;
  pending: boolean;
  describedBy: string;
}

const DateRangePicker = ({
  name,
  startDate,
  endDate,
  pending,
  describedBy,
}: DateRangePickerProps) => {
  const [date, setDate] = useState<DateRange | undefined>({
    from: startDate,
    to: endDate,
  });

  const [checked, setChecked] = useState(false);

  const [open, setIsOpen] = useState(false);

  const handleCheckedChange = (e: CheckedState) => {
    if (e === true) {
      setDate(undefined);
    }
    setChecked((prev) => !prev);
  };

  return (
    <>
      <div className="grid gap-2">
        <Popover open={open} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button
              id={name}
              type="button"
              disabled={pending || checked}
              aria-describedby={describedBy}
              variant={"outline"}
              className={cn(
                "justify-start text-left font-normal w-full",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon />
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, "LLL dd, y")} -{" "}
                    {format(date.to, "LLL dd, y")}
                  </>
                ) : (
                  format(date.from, "LLL dd, y")
                )
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={setDate}
              numberOfMonths={1}
              disabled={pending || checked}
            />
            <div className="w-fit mx-auto pb-2">
              <Button
                onClick={() => setIsOpen(false)}
                size={`sm`}
                type="button"
              >
                <div className="flex items-center gap-1">
                  <CheckCircle2Icon size={32} />
                  <span>OK</span>
                </div>
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <Input
        name={"start_date"}
        type="hidden"
        value={date?.from ? format(date.from, "yyyy-MM-dd") : ""}
        readOnly
        hidden
        className="hidden"
      />
      <Input
        name={"end_date"}
        type="hidden"
        value={date?.to ? format(date.to, "yyyy-MM-dd") : ""}
        readOnly
        hidden
        className="hidden"
      />
      <p className="text-xs italic mt-1">
        Check this option if your event doesn&apos;t have a start date yet.
      </p>
      <div className="flex items-center gap-1">
        <Checkbox
          disabled={pending || !!date?.from}
          checked={checked}
          onCheckedChange={handleCheckedChange}
          name="start_date_tbd"
          id="start_date_tbd"
        />
        <Label htmlFor="start_date_tbd">TBD</Label>
      </div>
    </>
  );
};

export default DateRangePicker;
