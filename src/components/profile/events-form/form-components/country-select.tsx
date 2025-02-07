"use client";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";

interface Country {
  code: string;
  name: string;
}

interface CountrySelectProps {
  countryList: Country[];
  pending: boolean;
  event_country?: string;
  name: string;
  describedBy: string;
}

const CountrySelect = ({
  countryList,
  pending,
  event_country,
  name,
  describedBy,
}: CountrySelectProps) => {
  // const [selectedCountry, setSelectedCountry] = useState(event_country)
  const [open, setOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(event_country);

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full lg:w-1/2 justify-between"
            disabled={pending}
            aria-describedby={describedBy}
            value={selectedCountry}
          >
            {selectedCountry
              ? countryList.find((country) => country.code === selectedCountry)
                  ?.name
              : "Select country..."}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full lg:w-1/2 p-0">
          <Command>
            {/** set value here */}
            <CommandInput
              disabled={pending}
              placeholder="Search country..."
              className="h-9"
            />
            <CommandList>
              <CommandEmpty>Country not found.</CommandEmpty>
              <CommandGroup>
                {countryList?.map((country) => (
                  <CommandItem
                    key={country.code}
                    value={country.name}
                    onSelect={() => {
                      setSelectedCountry(
                        country.code === selectedCountry ? "" : country.code
                      );
                      setOpen(false);
                    }}
                  >
                    {country.name}
                    <Check
                      className={cn(
                        "ml-auto",
                        selectedCountry === country.code
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <Input
        name={name}
        id={name}
        type="hidden"
        value={selectedCountry}
        readOnly
        hidden
        className="hidden"
      />
    </>
  );
};

export default CountrySelect;
