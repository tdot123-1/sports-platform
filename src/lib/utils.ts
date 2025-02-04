import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  FilterOptions,
  SortOptions,
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
