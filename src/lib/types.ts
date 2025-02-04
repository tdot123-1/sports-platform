// use map to be able to use search filter
export const SportsEventTypeMap = {
  camp: "camp",
  clinic: "clinic",
  friendly: "friendly game",
  tournament: "tournament",
  training: "training",
  other: "other",
} as const;

// use array so that it can be used in form validation
export const SportsEventTypeArray = Object.values(SportsEventTypeMap);

// create type and ensure it is one of the pre defined event types
export type SportsEventType = (typeof SportsEventTypeArray)[number];

export const TargetGenderArray = ["male", "female", "all"] as const;
export type TargetGender = (typeof TargetGenderArray)[number];

export const TargetLevelArray = [
  "beginner",
  "intermediate",
  "advanced",
  "any",
] as const;
export type TargetLevel = (typeof TargetLevelArray)[number];

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

export type TargetAgeGroup = (typeof TargetAgeGroupArray)[number];

//(!) allow multiple levels, ages
export interface SportsEvent {
  id: string;
  inserted_at: Date;
  updated_at: Date;
  event_name: string;
  event_type: SportsEventType;
  target_age: TargetAgeGroup;
  target_level: TargetLevel | null;
  target_gender: TargetGender;
  event_location: string;
  description: string | null;
  start_date: Date;
  end_date: Date | null;
  contact_email: string;
  contact_phone: string;
  user_id: string;
}

export interface FilterOptions {
  event_type?: SportsEventType;
  target_gender?: TargetGender;
  target_age?: TargetAgeGroup;
  target_level?: TargetLevel;
}

export const SortOptionsMap = {
  inserted_at: "Created",
  updated_at: "Last updated",
  event_name: "Event name",
  start_date: "Start date",
  end_date: "End date",
} as const;

export type SortByKey = keyof typeof SortOptionsMap;

export interface SortOptions {
  sort_by: SortByKey;
  order: "asc" | "desc";
}
