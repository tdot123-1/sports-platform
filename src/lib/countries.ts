import countries from "i18n-iso-countries";
import cc from "currency-codes";

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

// fetch and process all currencies
// ensure currency is used by at least one country
const currencyList = cc.data
  .filter(
    ({ number, code, countries }) =>
      number !== undefined && // Must have a numeric ISO 4217 code
      !code.startsWith("X") &&
      Array.isArray(countries) &&
      countries.length > 0
  )
  .map(({ code, currency }) => ({
    code,
    currency,
  }));

// create array of valid currency codes
const validCurrencyCodes = currencyList.map((c) => c.code.toUpperCase()) as [
  string,
  ...string[]
];

export {
  countryList,
  validCountryCodes,
  countryNameMap,
  currencyList,
  validCurrencyCodes,
};
