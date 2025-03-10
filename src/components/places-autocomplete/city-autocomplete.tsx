"use client";

import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { useDebouncedCallback } from "use-debounce";
import { v4 as uuidv4 } from "uuid";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { cn } from "@/lib/utils";

interface CityAutocompleteProps {
  name: string;
  countryCode: string;
  pending: boolean;
  describedBy: string;
  address_city?: string;
}

// check for api key

const CityAutocomplete = ({
  countryCode,
  name,
  pending,
  describedBy,
  address_city,
}: CityAutocompleteProps) => {
  // const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState(address_city || "");
  const [sessionToken, setSessionToken] = useState(uuidv4());

  const fetchAutocomplete = async (input: string) => {
    if (!input) return;

    try {
      // include session token

      const response = await fetch(
        `https://places.googleapis.com/v1/places:autocomplete?key=${process.env.NEXT_PUBLIC_MAPS_API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            input,
            includedPrimaryTypes: ["locality"],
            includedRegionCodes: [countryCode],
            sessionToken,
          }),
        }
      );

      if (!response.ok) {
        console.error("Response not OK: ", response.status);
        throw new Error("Failed to fetch results");
      }

      const data = await response.json();
      console.log("Data: ", data);
      setSuggestions(data.suggestions || []);
    } catch (error) {
      console.error("Failed to fetch suggestions ", error);
    }
  };

  const handleInputChange = useDebouncedCallback((input) => {
    console.log(`Searching... ${input}`);

    if (input) {
      fetchAutocomplete(input);
    }
  }, 300);

  const handleSelectCity = (city: string) => {
    console.log("Selected city: ", city);
    setSelectedCity(city);
    setSuggestions([]);
    setSessionToken(uuidv4());
  };

  // add handle select city functionallity

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
            value={selectedCity}
            id={name}
          >
            {selectedCity ? selectedCity : "Select city..."}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-10/12  p-0">
          <Command>
            <CommandInput
              disabled={pending}
              placeholder="Search city..."
              className="h-9"
              onValueChange={handleInputChange}
            />

            <CommandList>
              <CommandEmpty>No cities found.</CommandEmpty>
              <CommandGroup>
                {suggestions?.map((v) => (
                  <CommandItem
                    key={v.placePrediction?.placeId}
                    value={v.placePrediction?.structuredFormat?.mainText?.text}
                    onSelect={() => {
                      handleSelectCity(
                        v.placePrediction?.structuredFormat?.mainText?.text
                      );
                      setOpen(false);
                    }}
                  >
                    {v.placePrediction?.structuredFormat?.mainText?.text}
                    {/* <Check
                      className={cn(
                        "ml-auto",
                        selectedCity ===
                          v.placePrediction?.structuredFormat?.mainText?.text
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    /> */}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <Input
        name={name}
        type="hidden"
        value={selectedCity}
        readOnly
        hidden
        className="hidden"
        required
      />
    </>
  );
};

export default CityAutocomplete;
