// use map to be able to use search filter
export const SportsEventTypeMap = {
  camp: "camp",
  clinic: "clinic",
  friendly_game: "friendly game",
  tournament: "tournament",
  training: "training",
  other: "other",
} as const;

// use array so that it can be used in form validation
export const SportsEventTypeArray = Object.values(SportsEventTypeMap);

// create type and ensure it is one of the pre defined event types
// export type SportsEventType = (typeof SportsEventTypeArray)[number];

export type SportsEventType = keyof typeof SportsEventTypeMap;

export const SportsEventTypeKeys = Object.keys(SportsEventTypeMap) as Array<
  keyof typeof SportsEventTypeMap
>;

export const TargetGenderMap = {
  male: "male",
  female: "female",
  all: "all",
} as const;

export const TargetGenderArray = Object.values(TargetGenderMap);
// export type TargetGender = (typeof TargetGenderArray)[number];

export type TargetGender = keyof typeof TargetGenderMap;

export const TargetGenderKeys = Object.keys(TargetGenderMap) as Array<
  keyof typeof TargetGenderMap
>;

export const TargetLevelMap = {
  beginner: "beginner",
  intermediate: "intermediate",
  advanced: "advanced",
  any: "any",
} as const;

export const TargetLevelArray = Object.values(TargetLevelMap);
// export type TargetLevel = (typeof TargetLevelArray)[number];

export type TargetLevel = keyof typeof TargetLevelMap;

export const TargetLevelKeys = Object.keys(TargetLevelMap) as Array<
  keyof typeof TargetLevelMap
>;

// use map to be able to use search filters
export const TargetAgeGroupMap = {
  u8: "u8 (2017 and after)",
  u10: "u10 (2015 + 2016)",
  u12: "u12 (2013 + 2014)",
  u14: "u14 (2011 + 2012)",
  u16: "u16 (2009 + 2010)",
  u18: "u18 (2007 + 2008)",
  u20: "u20 (2005 + 2006)",
  u22: "u22 (2003 + 2004)",
  seniors: "seniors (2002 and before)",
  all: "all ages",
} as const;

export const TargetAgeGroupArray = Object.values(TargetAgeGroupMap);

// export type TargetAgeGroup = (typeof TargetAgeGroupArray)[number];

export type TargetAgeGroup = keyof typeof TargetAgeGroupMap;

export const TargetAgeGroupKeys = Object.keys(TargetAgeGroupMap) as Array<
  keyof typeof TargetAgeGroupMap
>;

//(!) allow multiple levels, ages
export interface SportsEvent {
  id: string;
  inserted_at: Date;
  updated_at: Date;
  event_name: string;
  event_type: SportsEventType;
  target_age: TargetAgeGroup[];
  target_level: TargetLevel[] | null;
  target_gender: TargetGender;
  address_line_one: string;
  address_line_two: string | null;
  address_city: string;
  address_region: string | null;
  address_postal_code: string | null;
  address_country: string;
  event_description: string | null;
  start_date: Date | null;
  end_date: Date | null;
  contact_email: string;
  contact_phone: string;
  cost_estimate: number;
  cost_currency: string;
  cost_description: string | null;
  event_links: string[] | null;
  event_logo_url: string | null;
  user_id: string;
}

export interface FilterOptions {
  event_type?: SportsEventType[];
  target_gender?: TargetGender[];
  target_age?: TargetAgeGroup[];
  target_level?: TargetLevel[];
}

export const SortOptionsMap = {
  inserted_at: "Created",
  updated_at: "Last updated",
  event_name: "Event name",
  start_date: "Start date",
  end_date: "End date",
  cost_estimate: "Price",
} as const;

export type SortByKey = keyof typeof SortOptionsMap;

export interface SortOptions {
  sort_by?: SortByKey;
  order?: "asc" | "desc";
}

// use abbreviations for search params
export const FilterKeyMap = {
  event_type: "et",
  target_gender: "tg",
  target_age: "ta",
  target_level: "tl",
} as const;

export const CurrencyCodes = ["EUR", "USD", "GBP", "CAD", "AUD"] as const;

export interface Country {
  code: string;
  name: string;
}

export interface Currency {
  code: string;
  currency: string;
}
