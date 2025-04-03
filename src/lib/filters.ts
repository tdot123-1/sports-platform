import { ReadonlyURLSearchParams } from "next/navigation";
import {
  FilterKeyMap,
  FilterOptions,
  SortByKey,
  SortOptions,
  SortOptionsMap,
} from "./types";

// dynamically apply filters to query
export const applyQueryFilters = (query: any, filters: FilterOptions) => {
  Object.entries(filters).forEach(([key, value]) => {
    // return if no value provided to filter
    if (!value || value.length === 0) return;

    // check if the key is one of the array fields
    const isArray = ["target_age", "target_level"].includes(key);

    if (isArray) {
      // use overlaps to check if any value in array matches
      query = query.overlaps(key, value);
    } else {
      if (value.length === 1) {
        query = query.eq(key, value);
      } else {
        query = query.or(value.map((v: string) => `${key}.eq.${v}`).join(","));
      }
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
  const sort: SortOptions = { sort_by: undefined, order: undefined };

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
  sort?: SortOptions,
  priceFilter?: { filter: number; max: number },
  batch?: boolean
) => {
  const params = new URLSearchParams(searchParams);
  // console.log("PARAMS: ", params.toString());
  // console.log("SORT: ", sort)
  if (batch) {
    params.set("batch", "1");
  } else {
    params.set("page", "1");
  }

  if (filter) {
    // encode and format filters
    const filterParams = encodeFilters(filter);

    // console.log("FILTER PARAMS: ", filterParams);

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

  if (priceFilter !== undefined) {
    if (priceFilter.filter !== priceFilter.max) {
      params.set("price", priceFilter.filter.toString());
    } else {
      params.delete("price");
    }
  }

  return `${pathname}?${params.toString()}`;
};

// get object with boolean values, return array of true keys as strings
export const constructFilterOptions = (state: any) => {
  return Object.keys(state).filter((key) => state[key as keyof typeof state]);
};
