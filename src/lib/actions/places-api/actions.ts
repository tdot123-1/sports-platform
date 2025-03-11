"use server";

export const fetchPlaceSuggestionsApi = async (
  input: string,
  countryCode: string,
  sessionToken: string
) => {
  const API_KEY = process.env.MAPS_API_KEY;

  if (!API_KEY) {
    console.error("No API key found");
    return;
  }

  if (countryCode.length !== 2) {
    console.error("Country code not correctly formatted");
    return;
  }

  try {
    const response = await fetch(
      `https://places.googleapis.com/v1/places:autocomplete?key=${API_KEY}`,
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
      console.error("Response: ", response);
      throw new Error("Failed to fetch results");
    }

    const data = await response.json();
    console.log("Data: ", data);
    return data;
  } catch (error) {
    console.error("Failed to fetch suggestions ", error);
  }
};

export const fetchPlaceDetailsApi = async (
  placeId: string,
  sessionToken: string
) => {
  const API_KEY = process.env.MAPS_API_KEY;

  if (!API_KEY) {
    console.error("No API key found");
    return;
  }

  try {
    const response = await fetch(
      `https://places.googleapis.com/v1/places/${placeId}?fields=location&key=${API_KEY}&sessionToken=${sessionToken}`
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

    return `POINT(${longitude} ${latitude})`;
  } catch (error) {
    console.error("Failed to fetch location: ", error);
  }
};
