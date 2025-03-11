"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Input } from "../ui/input";
import { useDebouncedCallback } from "use-debounce";
import { v4 as uuidv4 } from "uuid";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { ChevronsUpDown, LoaderIcon } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { capitalizeCity } from "@/lib/utils";
import {
  fetchPlaceDetailsApi,
  fetchPlaceSuggestionsApi,
} from "@/lib/actions/places-api/actions";

interface CityAutocompleteProps {
  name: string;
  countryCode: string;
  pending: boolean;
  describedBy: string;
  address_city?: string;
  address_location?: string;
  setCityError: Dispatch<SetStateAction<string>>;
}

const CityAutocomplete = ({
  countryCode,
  name,
  pending,
  describedBy,
  address_city,
  address_location,
  setCityError,
}: CityAutocompleteProps) => {
  // list of suggestions
  const [suggestions, setSuggestions] = useState<any[]>([]);

  // state of combobox
  const [open, setOpen] = useState(false);

  // keep track if initially selected country (if provided)
  const [initialCountry] = useState(countryCode);

  // selected city
  const [selectedCity, setSelectedCity] = useState(
    address_city ? address_city : ""
  );

  // geo location
  const [location, setLocation] = useState(
    address_location ? address_location : ""
  );

  // loading state for fetching suggestions
  const [isLoading, setIsLoading] = useState(false);

  // token to batch suggestions (renew upon place select)
  const [sessionToken, setSessionToken] = useState(uuidv4());

  useEffect(() => {
    // console.log("CITY: ", selectedCity);
    // console.log("COUNTRY CODE: ", countryCode);
    // console.log("COUNTRY: ", selectedCountry);
    // console.log("LOCATION: ", location);

    // reset location, city, suggestions if country changes from initial country
    if (initialCountry !== countryCode) {
      setSelectedCity("");
      setLocation("");
      setSuggestions([]);
    }
  }, [countryCode]);

  // fetch location (long, lat) data for place with place id
  const fetchPlaceDetails = async (placeId: string) => {
    if (!placeId) return;

    try {
      // call api through server action
      const data = await fetchPlaceDetailsApi(placeId, sessionToken);

      // display error if !success
      if (!data.success) {
        setCityError(
          data.message || "An unexpected error occured, please try again"
        );
      } else {
        // if success, data must contain formatted string with geo data
        setLocation(data.data!);
      }

      // generate new token
      setSessionToken(uuidv4());
    } catch (error) {
      // in case of uncaught errors
      console.error("Failed to fetch location: ", error);
      setCityError("An unexpected error occured, please try again");
    }
  };

  const fetchAutocomplete = async (input: string) => {
    if (!input) return;

    // check if country code is correct length
    if (countryCode.length !== 2) return;

    try {
      // call api through server action
      const data = await fetchPlaceSuggestionsApi(
        input,
        countryCode,
        sessionToken
      );

      // display error message if !success
      if (!data.success) {
        setCityError(
          data.message || "An unexpected error occured, please try again"
        );
      } else {
        // set suggestions or empty array
        setSuggestions(data.data?.suggestions || []);
      }
    } catch (error) {
      // in case of uncaught errors
      console.error("Failed to fetch suggestions ", error);
      setCityError("An unexpected error occured, please try again");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = useDebouncedCallback((input) => {
    setCityError("");
    console.log(`Searching... ${input}`);

    if (input) {
      setIsLoading(true);
      fetchAutocomplete(input);
    }
  }, 300);

  const handleSelectCity = (city: string, placeId: string) => {
    setCityError("");
    setSelectedCity(city);

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
              <CommandEmpty>
                {isLoading ? (
                  <div className="flex justify-center">
                    <LoaderIcon className="animate-spin" />
                  </div>
                ) : (
                  "No cities found."
                )}
              </CommandEmpty>
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
