import { AGE_RANGE, CURRENT_YEAR, START_AGE } from "./constants";

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
  beg: "beginner",
  mid: "intermediate",
  adv: "advanced",
  any: "any",
} as const;

export const TargetLevelArray = Object.values(TargetLevelMap);
// export type TargetLevel = (typeof TargetLevelArray)[number];

export type TargetLevel = keyof typeof TargetLevelMap;

export const TargetLevelKeys = Object.keys(TargetLevelMap) as Array<
  keyof typeof TargetLevelMap
>;

export type BirthYearKey = `${number}`;
export type AgeGroupKey = "all" | "adu" | "vet" | BirthYearKey;

export const TargetAgeGroupMap: Record<AgeGroupKey, string> = {
  all: "all ages",
  adu: "adults",
  vet: "veterans",
  ...Object.fromEntries(
    Array.from({ length: AGE_RANGE }, (_, i) => {
      const year = CURRENT_YEAR - i - START_AGE; // auto-generate birth years
      return [year.toString(), year.toString()];
    })
  ),
};

export type TargetAgeGroup = keyof typeof TargetAgeGroupMap;

export const TargetAgeGroupKeys = Object.keys(TargetAgeGroupMap) as Array<
  keyof typeof TargetAgeGroupMap
>;

export const EventStatusMap = {
  open: "signup open",
  closed: "signup closed",
  wait: "waitlist",
  tba: "to be announced",
} as const;

export const EventStatusArray = Object.values(EventStatusMap);

export type EventStatus = keyof typeof EventStatusMap;

export const EventStatusKeys = Object.keys(EventStatusMap) as Array<
  keyof typeof EventStatusMap
>;

export interface EventImage {
  image_url: string;
}

export interface SportsEvent {
  // row
  id: string;
  inserted_at: Date;
  updated_at: Date;
  user_id: string;

  // event
  event_name: string;
  event_type: SportsEventType;
  event_description: string | null;
  event_status: EventStatus;

  // target
  target_age: TargetAgeGroup[];
  target_level: TargetLevel[] | null;
  target_gender: TargetGender;

  // location
  address_city: string;
  address_country: string;
  address_location: string;
  address_location_read: string;

  // dates
  start_date: Date | null;
  end_date: Date | null;

  // contact
  contact_email: string | null;
  contact_url: string | null;
  contact_phone: string;

  // cost
  cost_estimate: number | null;
  cost_currency: string;
  cost_description: string | null;
  cost_estimate_eur: number;

  // links
  event_link: string | null;
  social_links: string[] | null;

  // images
  event_logo_url: string | null;
  event_images: EventImage[];
}

export interface FilterOptions {
  event_type?: SportsEventType[];
  target_gender?: TargetGender[];
  target_age?: TargetAgeGroup[];
  target_level?: TargetLevel[];
  event_status?: EventStatus[];
}

export const SortOptionsMap = {
  inserted_at: "Created",
  updated_at: "Last updated",
  event_name: "Event name",
  start_date: "Start date",
  end_date: "End date",
  cost_estimate_eur: "Price (EUR)",
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
  event_status: "es",
} as const;

export interface Country {
  code: string;
  name: string;
}

export interface Currency {
  code: string;
  currency: string;
}

export interface SportsEventCalendar {
  start: Date;
  end: Date | null;
  title: string;
  id: string;
  event_type: SportsEventType;
  address_city: string;
  address_country: string;
  event_logo_url: string | null;
}

export interface SportsEventMap {
  id: string;
  event_name: string;
  event_type: SportsEventType;
  address_city: string;
  address_country: string;
  event_logo_url: string;

  lat: number;
  lng: number;
}

export interface MapEvent {
  id: string;
  event_name: string;
  address_city: string;

  lat: number;
  lng: number;
}
