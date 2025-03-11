"use client";

import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { Input } from "../ui/input";
import { useDebouncedCallback } from "use-debounce";
import { v4 as uuidv4 } from "uuid";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { capitalizeCity } from "@/lib/utils";

interface CityAutocompleteProps {
  name: string;
  countryCode: string;
  pending: boolean;
  describedBy: string;
  address_city?: string;
  address_location?: string;
}

// check for api key

const CityAutocomplete = ({
  countryCode,
  name,
  pending,
  describedBy,
  address_city,
  address_location,
}: CityAutocompleteProps) => {
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [open, setOpen] = useState(false);

  const [selectedCountry, setSelectedCountry] = useState(countryCode);

  const [selectedCity, setSelectedCity] = useState(
    address_city ? address_city : ""
  );

  const [location, setLocation] = useState(
    address_location ? address_location : ""
  );

  const [sessionToken, setSessionToken] = useState(uuidv4());

  useEffect(() => {
    if (selectedCountry !== countryCode) {
      setSelectedCity("");
      setLocation("");
      setSuggestions([]);
    }
  }, [countryCode]);

  const fetchPlaceDetails = async (placeId: string) => {
    if (!placeId) return;

    try {
      const response = await fetch(
        `https://places.googleapis.com/v1/places/${placeId}?fields=location&key=${process.env.NEXT_PUBLIC_MAPS_API_KEY}&sessionToken=${sessionToken}`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch location data: ${response.status}`);
      }

      const data = await response.json();

      if (!data.location) {
        throw new Error("No location data returned");
      }

      console.log("LOCATION: ", data.location);

      const { latitude, longitude } = data.location;

      setLocation(`POINT(${longitude} ${latitude})`);

      setSessionToken(uuidv4());
    } catch (error) {
      console.error("Failed to fetch location: ", error);
    }
  };

  const fetchAutocomplete = async (input: string) => {
    if (!input) return;

    if (countryCode.length !== 2) return;

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

  const handleSelectCity = (city: string, placeId: string) => {
    console.log("Selected city: ", city);
    setSelectedCity(city);

    // fetch location data (place details)
    fetchPlaceDetails(placeId);

    setSuggestions([]);
  };

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full lg:w-1/2 justify-between"
            disabled={pending || !countryCode}
            aria-describedby={describedBy}
            value={selectedCity}
            id={name}
          >
            {countryCode
              ? selectedCity && selectedCity !== ""
                ? capitalizeCity(selectedCity)
                : "Select city..."
              : "Please select a country"}

            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-10/12  p-0">
          <Command>
            <CommandInput
              disabled={pending || !countryCode}
              placeholder="Search city..."
              className="h-9"
              onValueChange={handleInputChange}
            />

            <CommandList>
              <CommandEmpty>No cities found.</CommandEmpty>
              <CommandGroup>
                {suggestions?.map((v) => (
                  <CommandItem
                    disabled={pending || !countryCode}
                    key={v.placePrediction?.placeId}
                    value={v.placePrediction?.text?.text}
                    onSelect={() => {
                      handleSelectCity(
                        v.placePrediction?.text?.text,
                        v.placePrediction?.placeId
                      );
                      setOpen(false);
                    }}
                  >
                    {v.placePrediction?.text?.text}
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
      <Input
        name="address_location"
        type="hidden"
        value={location}
        readOnly
        hidden
        className="hidden"
        required
      />
    </>
  );
};

export default CityAutocomplete;
