"use client";

import { State } from "@/lib/actions/events/actions";
import { Country } from "@/lib/types";
import { Label } from "../ui/label";
import CountrySelect from "../profile/events-form/form-components/country-select";
import { useState } from "react";
import CityAutocomplete from "./city-autocomplete";

interface LocationInputProps {
  state: State;
  pending: boolean;
  countryList: Country[];
  address_country?: string;
  address_city?: string;
  address_location?: string;
}

const LocationInput = ({
  state,
  pending,
  countryList,
  address_country,
  address_city,
  address_location,
}: LocationInputProps) => {
  const [selectedCountry, setSelectedCountry] = useState(
    address_country ? address_country : ""
  );

  const [cityError, setCityError] = useState("");

  return (
    <>
      <div className="flex flex-col justify-between items-baseline lg:flex-row mb-2 gap-1">
        <Label className="text-muted-foreground" htmlFor="address_country">
          Country:
        </Label>
        <CountrySelect
          countryList={countryList}
          pending={pending}
          name="address_country"
          describedBy="address_country-error"
          address_country={address_country}
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
        />
      </div>
      <div id="address_country-error" aria-live="polite" aria-atomic="true">
        {state.errors?.address_country &&
          state.errors.address_country.map((error) => (
            <p
              className="text-sm mt-2 text-right text-destructive"
              key={error}
            >
              {error}
            </p>
          ))}
      </div>
      {/* <span className="text-destructive">*</span> */}
      <div className="flex flex-col justify-between items-baseline lg:flex-row my-2 gap-1">
        <Label className="text-muted-foreground" htmlFor="address_city">
          City:
        </Label>
        <CityAutocomplete
          countryCode={selectedCountry.toLowerCase()}
          name="address_city"
          pending={pending}
          describedBy="address_city-error"
          address_city={address_city}
          address_location={address_location}
          setCityError={setCityError}
        />
      </div>

      {/* display any error related to failed api calls */}
      {cityError && (
        <p className="text-sm mt-2 text-right text-destructive">
          {cityError}
        </p>
      )}

      <div id="address_city-error" aria-live="polite" aria-atomic="true">
        {state.errors?.address_city &&
          state.errors.address_city.map((error) => (
            <p
              className="text-sm mt-2 text-right text-destructive"
              key={error}
            >
              {error}
            </p>
          ))}
      </div>
      <div id="address_location-error" aria-live="polite" aria-atomic="true">
        {state.errors?.address_location &&
          state.errors.address_location.map((error) => (
            <p
              className="text-sm mt-2 text-right text-destructive"
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
