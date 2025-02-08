import countries from "i18n-iso-countries";

// fetch and process country codes & names once
const countryList = Object.entries(countries.getNames("en")).map(
  ([code, name]) => ({ code: code.toUpperCase(), name })
);

// create a Set of valid country codes for fast lookup
const validCountryCodes = new Set(countryList.map((c) => c.code.toUpperCase()));

export { countryList, validCountryCodes };
