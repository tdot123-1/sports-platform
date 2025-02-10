import countries from "i18n-iso-countries";

// fetch and process country codes & names once
const countryList = Object.entries(countries.getNames("en")).map(
  ([code, name]) => ({ code: code.toUpperCase(), name })
);

// map code to country name
const countryNameMap = countryList.reduce(
  (acc: Record<string, string>, { code, name }) => {
    acc[code] = name;
    return acc;
  },
  {}
);

// create a Set of valid country codes for fast lookup
const validCountryCodes = new Set(countryList.map((c) => c.code.toUpperCase()));

export { countryList, validCountryCodes, countryNameMap };
