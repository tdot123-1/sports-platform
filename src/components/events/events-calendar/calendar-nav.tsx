"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MONTHS } from "@/lib/constants";
import { CalendarSearchIcon } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

interface CalendarNavigationProps {
  currentMonth: Date;
  setCurrentMonth: Dispatch<SetStateAction<Date>>;
}

const CalendarNavigation = ({
  currentMonth,
  setCurrentMonth,
}: CalendarNavigationProps) => {

  // generate years on client to ensure list updates
  const years = Array.from(
    { length: 11 },
    (_, i) => new Date().getFullYear() - 1 + i
  );

  // update state in parent component to change url there
  const handleMonthChange = (monthString: string) => {
    const month = Number(monthString);
    setCurrentMonth(new Date(currentMonth.getFullYear(), month, 1));
  };

  const handleYearChange = (yearString: string) => {
    const year = Number(yearString);
    setCurrentMonth(new Date(year, currentMonth.getMonth(), 1));
  };

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button type="button" variant={`outline`}>
            <CalendarSearchIcon />
            <span className="hidden md:block">Select month</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <div className="flex gap-3 flex-col md:flex-row">
            <Select onValueChange={handleMonthChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select month" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Month</SelectLabel>
                  <div className="max-h-48 overflow-y-auto">
                    {MONTHS.map((month) => (
                      <SelectItem key={month.name} value={`${month.number}`}>
                        {month.name}
                      </SelectItem>
                    ))}
                  </div>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select onValueChange={handleYearChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select year" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Year</SelectLabel>
                  <div className="max-h-48 overflow-y-auto">
                    {years.map((year) => (
                      <SelectItem key={year} value={`${year}`}>
                        {year}
                      </SelectItem>
                    ))}
                  </div>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default CalendarNavigation;
