"use client";

import { State } from "@/lib/actions/events/actions";
import { Country, SportsEvent } from "@/lib/types";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import CountrySelect from "../profile/events-form/form-components/country-select";
import { useState } from "react";
import CityAutocomplete from "./city-autocomplete";

interface LocationInputProps {
  state: State;
  event?: SportsEvent;
  pending: boolean;
  countryList: Country[];
}

const LocationInput = ({
  state,
  event,
  pending,
  countryList,
}: LocationInputProps) => {
  const [selectedCountry, setSelectedCountry] = useState(
    event?.address_country ? event.address_country : ""
  );

  return (
    <>
      <div className="flex flex-col justify-between items-baseline lg:flex-row mb-2 gap-1">
        <Label className="text-muted-foreground" htmlFor="address_country">
          Country<span className="text-destructive">*</span>:
        </Label>
        <CountrySelect
          countryList={countryList}
          pending={pending}
          name="address_country"
          describedBy="address_country-error"
          address_country={event?.address_country}
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
        />
      </div>
      <div id="address_country-error" aria-live="polite" aria-atomic="true">
        {state.errors?.address_country &&
          state.errors.address_country.map((error) => (
            <p
              className="text-sm mt-2 text-right text-destructive italic"
              key={error}
            >
              {error}
            </p>
          ))}
      </div>

      <div className="flex flex-col justify-between items-baseline lg:flex-row my-2 gap-1">
        <Label className="text-muted-foreground" htmlFor="address_city">
          City<span className="text-destructive">*</span>:
        </Label>
        <CityAutocomplete
          countryCode={selectedCountry.toLowerCase()}
          name="address_city"
          pending={pending}
          describedBy="address_city-error"
          address_city={event?.address_city}
        />
      </div>
      <div id="address_city-error" aria-live="polite" aria-atomic="true">
        {state.errors?.address_city &&
          state.errors.address_city.map((error) => (
            <p
              className="text-sm mt-2 text-right text-destructive italic"
              key={error}
            >
              {error}
            </p>
          ))}
      </div>
    </>
  );
};

export default LocationInput;
