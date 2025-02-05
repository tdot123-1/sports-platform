import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  FilterKeyMap,
  FilterOptions,
  SortByKey,
  SortOptions,
  SortOptionsMap,
  SportsEvent,
  SportsEventTypeMap,
  TargetAgeGroupMap,
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
    start_date: new Date(data.start_date),
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
    if (!value) return;

    // // use map to convert shortened version (ex. u8) to full version ("u8 (2017 and after)")
    // if (key === "event_type") {
    //   const fullEventType =
    //     SportsEventTypeMap[value as keyof typeof SportsEventTypeMap];

    //   if (fullEventType) {
    //     query = query.eq(key, fullEventType);
    //   }
    // } else if (key === "target_age") {
    //   const fullTargetAge =
    //     TargetAgeGroupMap[value as keyof typeof TargetAgeGroupMap];

    //   if (fullTargetAge) {
    //     query = query.eq(key, fullTargetAge);
    //   }
    // } else {
    // if no map necessary, apply the filter as is
    query = query.eq(key, value);
    // }
  });

  // return query with all filters applied
  return query;
};

// helper function to apply filters to search params
export const createSearchParams = (
  pathname: string,
  searchParams: ReadonlyURLSearchParams,
  filter?: FilterOptions,
  sort?: SortOptions
) => {
  const params = new URLSearchParams(searchParams);

  if (filter) {
    params.set("page", "1");
    params.set("filter", encodeURIComponent(JSON.stringify(filter)));
  }

  if (sort) {
    params.set("sort", encodeURIComponent(JSON.stringify(sort)));
  }

  return `${pathname}?${params.toString()}`;
};


// encode filters
export const encodeFilters = (filters: FilterOptions) => {
  return Object.entries(filters)
    .map(
      ([key, value]) =>
        `${FilterKeyMap[key as keyof FilterOptions]}=${encodeURIComponent(
          value
        )}`
    )
    .join("&");
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
        filters[fullKey as keyof FilterOptions] = decodeURIComponent(
          value
        ) as any;
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
    // decode value
    const decodedSort = decodeURIComponent(searchParams.sort);

    // check if value is one of the allowed sort columns
    if (decodedSort in SortOptionsMap) {
      sort.sort_by = decodedSort as SortByKey;
    }
  }

  // check for order params
  if (searchParams.order) {
    const decodedOrder = decodeURIComponent(searchParams.order);

    // check if order is one of the allowed values
    if (decodedOrder === "asc" || decodedOrder === "desc") {
      sort.order = decodedOrder as "asc" | "desc";
    }
  }

  // return SortOptions object
  return sort;
};
