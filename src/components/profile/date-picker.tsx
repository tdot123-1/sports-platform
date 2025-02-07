"use client";

import { CalendarIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useState } from "react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "../ui/calendar";
import { Input } from "../ui/input";

interface DatePickerProps {
  name: string;
  eventDate?: Date;
  pending: boolean;
}

const DatePicker = ({ name, eventDate, pending }: DatePickerProps) => {
  const [date, setDate] = useState<Date | undefined>(eventDate);

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            type="button"
            disabled={pending}
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
          />
        </PopoverContent>
      </Popover>
    </>
  );
};

export default DatePicker;
