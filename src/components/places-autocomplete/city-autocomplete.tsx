"use client";

import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { useDebouncedCallback } from "use-debounce";

// check for api key

const CityAutocomplete = ({ countryCode }: { countryCode: string }) => {
  // const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);

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
      console.error("Failed to fetch suggestions");
    }
  };

  const handleInputChange = useDebouncedCallback((input) => {
    console.log(`Searching... ${input}`);

    if (input) {
      fetchAutocomplete(input);
    }
  }, 300);

  // add handle select city functionallity

  return (
    <>
      <div>
        <Input onChange={(e) => handleInputChange(e.target.value)} />
      </div>
      <div>
        {suggestions.length && (
          <ul>
            {suggestions.map((v, i) => (
              <li key={i}>{v.placePrediction?.structuredFormat?.mainText?.text}</li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default CityAutocomplete;
