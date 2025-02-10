import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  FilterKeyMap,
  FilterOptions,
  SortByKey,
  SortOptions,
  SortOptionsMap,
  SportsEvent,
} from "./types";
import { ReadonlyURLSearchParams } from "next/navigation";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const convertFetchedEvent = (data: any): SportsEvent => {
  return {
    ...data,
    inserted_at: new Date(data.inserted_at),
    updated_at: new Date(data.updated_at),
    start_date: data.start_date ? new Date(data.start_date) : null,
    end_date: data.end_date ? new Date(data.end_date) : null,
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

// dynamically apply filters to query
export const applyQueryFilters = (query: any, filters: FilterOptions) => {
  Object.entries(filters).forEach(([key, value]) => {
    // return if no value provided to filter
    if (!value || value.length === 0) return;

    if (value.length === 1) {
      query = query.eq(key, value);
    } else {
      query = query.or(value.map((v: string) => `${key}.eq.${v}`).join(","));
    }
  });

  // return query with all filters applied
  return query;
};

// encode filters
export const encodeFilters = (filters: FilterOptions) => {
  // flatmap to remove cases where no values are provided
  const encoded = Object.entries(filters).flatMap(([key, value]) => {
    if (Array.isArray(value) && value.length > 0) {
      // join the array of applied filters into a comma-separated string and encode
      return `${FilterKeyMap[key as keyof FilterOptions]}=${encodeURIComponent(
        value?.join(",")
      )}`;
    }
    // return empty array if no values are provided (to be removed)
    return [];
  });

  return encoded;
};

// extract filters from search params
export const parseFilters = (
  searchParams: Record<string, string | undefined>
) => {
  // initialize filter options
  const filters: FilterOptions = {};

  // convert filter key map to array of pairs
  Object.entries(FilterKeyMap)
    // loop over each pair to get full filter key and abbr key in url
    .forEach(([fullKey, shortKey]) => {
      // look up abbr key in search params
      const value = searchParams[shortKey];
      if (value) {
        // map decoded value to full key of 'FilterOptions' instance
        // split commas to return applied filters per category as array
        filters[fullKey as keyof FilterOptions] = decodeURIComponent(
          value
        ).split(",") as any;
      }
    });

  // return filters object
  return filters;
};

export const parseSortOptions = (
  searchParams: Record<string, string | undefined>
) => {
  // default sort options
  const sort: SortOptions = { sort_by: "inserted_at", order: "asc" };

  // check if sort params provided
  if (searchParams.sort) {
    // check if value is one of the allowed sort columns
    if (searchParams.sort in SortOptionsMap) {
      sort.sort_by = searchParams.sort as SortByKey;
    }
  }

  // check for order params
  if (searchParams.order) {
    // check if order is one of the allowed values
    if (searchParams.order === "asc" || searchParams.order === "desc") {
      sort.order = searchParams.order as "asc" | "desc";
    }
  }

  // return SortOptions object
  return sort;
};

// helper function to apply filters to search params
export const createSearchParams = (
  pathname: string,
  searchParams: ReadonlyURLSearchParams,
  filter?: FilterOptions,
  sort?: SortOptions
) => {
  const params = new URLSearchParams(searchParams);

  params.set("page", "1");

  if (filter) {
    // encode and format filters
    const filterParams = encodeFilters(filter);

    console.log("FILTER PARAMS: ", filterParams);

    // clear old filter params before setting new ones
    Object.keys(FilterKeyMap).forEach((key) => {
      params.delete(FilterKeyMap[key as keyof FilterOptions]);
    });

    // set each filter param one by one
    filterParams.forEach((param) => {
      const [k, v] = param.split("=");
      params.set(k, v);
    });
  }

  // apply sorting options in params
  if (sort) {
    if (sort.sort_by) {
      params.set("sort", sort.sort_by);
    }
    if (sort.order) {
      params.set("order", sort.order);
    }
  }

  return `${pathname}?${params.toString()}`;
};

// get object with boolean values, return array of true keys as strings
export const constructFilterOptions = (state: any) => {
  return Object.keys(state).filter((key) => state[key as keyof typeof state]);
};

export const convertCurrencyStringToValue = (str: string) => {
  // convert string (ex. 10.55) to value in cents (1055)
  const formattedStr = str.replace(",", ".").trim();

  const valuInCents = Math.round(parseFloat(formattedStr) * 100);

  return valuInCents;
};

export const convertCurrencyValueToString = (nr: number) => {
  return (nr / 100).toFixed(2);
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

  return {
    ...rawFormData,
    // set empty or missing fields to null
    address_line_two: getOptional("address_line_two"),
    address_region: getOptional("address_region"),
    address_postal_code: getOptional("address_postal_code"),
    event_description: getOptional("event_description"),
    cost_description: getOptional("cost_description"),
    contact_phone: getOptional("contact_phone"),

    // transform dates to Date objects
    start_date: getOptional("start_date")
      ? new Date(getOptional("start_date")!)
      : null,
    end_date: getOptional("end_date")
      ? new Date(getOptional("end_date")!)
      : null,

    // transform comma-separated strings into arrays
    target_age: getArray("target_age"),
    target_level: getArray("target_level"),
    event_links: getArray("event_links"),

    // convert string cost to numeric cents value
    cost_estimate: getOptional("cost_estimate")
      ? convertCurrencyStringToValue(getOptional("cost_estimate")!)
      : null,
  };
};
