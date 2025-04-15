import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  FilterOptions,
  SortOptions,
  SportsEvent,
  SportsEventMap,
} from "./types";
import { fetchEventLogo } from "./data/storage/data";
import { parseFilters, parseSortOptions } from "./filters";
import { mapStartCoords } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const convertFetchedEvent = async (data: any): Promise<SportsEvent> => {
  const logoPublicUrl = data.event_logo_url
    ? await fetchEventLogo(data.event_logo_url)
    : null;
  return {
    ...data,
    inserted_at: new Date(data.inserted_at),
    updated_at: new Date(data.updated_at),
    start_date: data.start_date ? new Date(data.start_date) : null,
    end_date: data.end_date ? new Date(data.end_date) : null,
    event_logo_url: logoPublicUrl,
  };
};

export const convertToMapEvent = async (data: any): Promise<SportsEventMap> => {
  const logoPublicUrl = data.event_logo_url
    ? await fetchEventLogo(data.event_logo_url)
    : null;
  return {
    ...data,
    event_logo_url: logoPublicUrl,
  };
};

export const generatePagination = (currentPage: number, totalPages: number) => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages];
  }

  if (currentPage >= totalPages - 2) {
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
  }

  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
};

export const generatePaginationMobile = (
  currentPage: number,
  totalPages: number
) => {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages];
  }

  if (currentPage >= totalPages - 2) {
    return [1, "...", totalPages - 2, totalPages - 1, totalPages];
  }

  return [1, "...", currentPage, "...", totalPages];
};

// determine if string is birthyear by matching 4 digit numbers
const isBirthYear = (value: string) => /^\d{4}$/.test(value);

// shorten year to 3 character ('08, '09 etc.)
const formatYear = (year: string) => `'${year.slice(-2)}`;

// render array values in ui
export const renderArrayField = (field: string[]) => {
  if (!field.length) return;

  // format each item in case it is a birthyear
  const formattedValues = field.map((item) =>
    isBirthYear(item) ? formatYear(item) : item
  );

  if (formattedValues.length === 1) {
    return `${formattedValues[0]}`;
  }
  if (formattedValues.length === 2) {
    return `${formattedValues[0]}, ${formattedValues[1]}`;
  }

  return `${formattedValues[0]}, ${formattedValues[1]}, ...+${
    field.length - 2
  }`;
};

export const convertCurrencyStringToValue = (str: string) => {
  // convert string (ex. 10.55) to value in cents (1055)
  // normalize input
  const formattedStr = str.replace(",", ".").trim();

  // validate input
  const parsedValue = parseFloat(formattedStr);
  if (isNaN(parsedValue)) {
    throw new Error("Invalid currency string format");
  }

  const valueInCents = Math.round(parsedValue * 100);
  return valueInCents;
};

export const convertCurrencyValueToString = (nr: number) => {
  // convert value in cents (1055) to currency string (10.55)
  return (nr / 100).toFixed(2);
};

export const formatCurrencyForDisplay = (nr: number, currency: string) => {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: currency,
  }).format(nr / 100);
};

// improved function -> less repitition, less unnecessary variables
export const formatRawFormData = (formData: FormData) => {
  const rawFormData = Object.fromEntries(formData.entries());

  // returns null if value is empty
  const getOptional = (key: string) => {
    const value = formData.get(key);
    return value && value.toString().trim() !== "" ? value.toString() : null;
  };

  // splits comma-separated strings into arrays
  const getArray = (key: string) => {
    const value = formData.get(key);
    return value ? value.toString().split(",") : null;
  };

  const parseDate = (key: string) => {
    const value = formData.get(key);
    return typeof value === "string" && value.length > 0
      ? new Date(value)
      : null;
  };

  return {
    ...rawFormData,
    // set empty or missing fields to null
    event_description: getOptional("event_description"),
    cost_description: getOptional("cost_description"),
    contact_phone: getOptional("contact_phone"),
    event_link: getOptional("event_link"),

    contact_email: getOptional("contact_email"),
    contact_url: getOptional("contact_url"),

    // transform dates to Date objects
    start_date: parseDate("start_date"),
    end_date: parseDate("end_date"),

    // transform comma-separated strings into arrays
    target_age: getArray("target_age"),
    target_level: getArray("target_level"),
    social_links: getArray("social_links"),

    // convert string cost to numeric cents value
    cost_estimate: getOptional("cost_estimate")
      ? convertCurrencyStringToValue(getOptional("cost_estimate")!)
      : null,
  };
};

// (!) NOT USED
export const capitalizeCity = (input: string) => {
  return input
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

// (!) NOT USED
export const formatCityName = (fullName: string) => {
  return fullName?.split(",")[0] || "";
};

// helper to extract
const parseCoord = (value: string | undefined, fallback: number) => {
  const parsed = parseFloat(value ?? "");
  return isNaN(parsed) ? fallback : parsed;
};

// general reusable function to get params from URL, process, and pass to components
export const parseSearchParams = (
  searchParams?: Record<string, string | undefined>
) => {
  const query = searchParams?.query
    ? decodeURIComponent(searchParams.query)
    : "";

  const currentPage = Number(searchParams?.page) || 1;

  // parse filters
  let filter: FilterOptions | undefined;
  if (searchParams) {
    filter = parseFilters(searchParams);
  }

  // parse sort options
  let sort: SortOptions | undefined;
  if (searchParams) {
    sort = parseSortOptions(searchParams);
  }

  const priceFilter =
    Number(searchParams?.price) >= 0 ? Number(searchParams?.price) : undefined;

  const passedEventsFilter = searchParams?.pe === "true" ? true : false;

  // get selected month or current month
  const month =
    // ensure param can be converted to number
    searchParams?.month && !isNaN(Number(searchParams.month))
      ? // ensure number is between 1 and 12
        Math.min(Math.max(1, Number(searchParams.month)), 12)
      : new Date().getMonth() + 1;

  // get selected year or current year
  const year =
    // ensure param can be converted to number
    searchParams?.year && !isNaN(Number(searchParams.year))
      ? // ensure year is later than 2000
        Math.max(2000, Number(searchParams.year))
      : new Date().getFullYear();

  const currentBatch = Number(searchParams?.batch) || 1;

  // extract map coords
  // center
  const lat = parseCoord(searchParams?.lt, mapStartCoords.center.lat);
  const lng = parseCoord(searchParams?.lg, mapStartCoords.center.lng);

  // bounds
  const south = parseCoord(searchParams?.s, mapStartCoords.bounds.south);
  const west = parseCoord(searchParams?.w, mapStartCoords.bounds.west);
  const north = parseCoord(searchParams?.n, mapStartCoords.bounds.north);
  const east = parseCoord(searchParams?.e, mapStartCoords.bounds.east);

  // get one coords object with all map info
  const mapCoords = {
    center: {
      lat,
      lng,
    },
    bounds: {
      south,
      west,
      north,
      east,
    },
  };

  return {
    query,
    currentPage,
    filter,
    sort,
    priceFilter,
    passedEventsFilter,
    month,
    year,
    currentBatch,
    mapCoords,
  };
};
