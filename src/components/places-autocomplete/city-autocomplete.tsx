"use client";

import { LoadScript, Autocomplete } from "@react-google-maps/api";
import { Input } from "../ui/input";
import { useEffect, useRef, useState } from "react";

const libraries: "places"[] = ["places"];

// check for api key

const CityAutocomplete = ({ countryCode }: { countryCode: string }) => {
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const [city, setCity] = useState("");

  useEffect(() => {
    console.log("KEY: ", process.env.NEXT_PUBLIC_MAPS_API_KEY)
  }, [])

  const handlePlaceSelect = () => {
    console.log("SELECT PLACE");
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();

      if (!place || !place.address_components) return;

      const cityComponent = place.address_components.find(
        (c) =>
          c.types.includes("locality") ||
          c.types.includes("administrative_area_level_1")
      );

      if (cityComponent) {
        const selectedCity = cityComponent.long_name;
        setCity(selectedCity);

        // pass city data to parent component
      }
    }
  };
  return (
    <>
      <LoadScript
        googleMapsApiKey={process.env.NEXT_PUBLIC_MAPS_API_KEY!}
        libraries={libraries}
      >
        <Autocomplete
          onLoad={(ref) => (autocompleteRef.current = ref)}
          onPlaceChanged={handlePlaceSelect}
          options={{
            types: ["(cities)"],
            componentRestrictions: { country: countryCode },
          }}
        >
          <Input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter a city"
          />
        </Autocomplete>
      </LoadScript>
    </>
  );
};

export default CityAutocomplete;
