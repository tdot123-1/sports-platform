"use server";

export const fetchPlaceSuggestionsApi = async (
  input: string,
  countryCode: string,
  sessionToken: string
) => {
  const API_KEY = process.env.MAPS_API_KEY;

  // check for api key
  if (!API_KEY) {
    console.error("Missing API key");
    return { success: false, message: "City select is currently unavailable" };
  }

  // check country code format
  if (countryCode.length !== 2) {
    console.error("Country code not correctly formatted");
    return { success: false, message: "Please select a country first" };
  }

  try {
    // throw new Error("test");

    const response = await fetch(
      `https://places.googleapis.com/v1/places:autocomplete?key=${API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          input,
          includedPrimaryTypes: ["locality"], // return cities only
          includedRegionCodes: [countryCode], // specify search to selected country
          sessionToken, // incl token to batch searches
        }),
      }
    );

    if (!response.ok) {
      // log response
      console.error("Response not OK: ", response.status);
      console.error("Response: ", response);
      throw new Error("Failed to fetch results");
    }

    const data = await response.json();
    // console.log("Data: ", data);

    return { success: true, data };
  } catch (error) {
    console.error("Failed to fetch suggestions ", error);
    return {
      success: false,
      message: "Failed to fetch cities, please try again later",
    };
  }
};

export const fetchPlaceDetailsApi = async (
  placeId: string,
  sessionToken: string
) => {
  const API_KEY = process.env.MAPS_API_KEY;

  // check for key
  if (!API_KEY) {
    console.error("No API key found");
    return { success: false, message: "City select is currently unavailable" };
  }

  try {
    // throw new Error("test");

    const response = await fetch(
      `https://places.googleapis.com/v1/places/${placeId}?fields=location&key=${API_KEY}&sessionToken=${sessionToken}`
    );

    if (!response.ok) {
      // log response
      console.error("Response not OK: ", response.status);
      console.error("Response: ", response);
      throw new Error(`Failed to fetch location data: ${response.status}`);
    }

    const data = await response.json();

    if (!data.location) {
      throw new Error("No location data returned");
    }

    // console.log("LOCATION: ", data.location);

    // extract long, lat
    const { latitude, longitude } = data.location;

    // format string to be of geo data type expected by supabase gis
    return { success: true, data: `POINT(${longitude} ${latitude})` };
  } catch (error) {
    console.error("Failed to fetch location: ", error);
    return {
      success: false,
      message: "Failed to fetch city details, please try again",
    };
  }
};
