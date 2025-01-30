// use array so that it can be used in form validation
export const SportsEventTypeArray = [
  "Camp",
  "Clinic",
  "Friendly Game",
  "Tournament",
  "Training",
  "Other",
] as const;

// create type and ensure it is one of the pre defined event types
type SportsEventType = (typeof SportsEventTypeArray)[number];

export const TargetGenderArray = ["Male", "Female", "All"] as const;
type TargetGender = (typeof TargetGenderArray)[number];

export const TargetLevelArray = [
  "Beginner",
  "Intermediate",
  "Advanced",
  "Any",
] as const;
type TargetLevel = (typeof TargetLevelArray)[number];

export const TargetAgeGroupArray = [
  "U10 (8-9)",
  "U12 (10-11)",
  "U14 (12-13)",
  "U16 (14-15)",
  "U18 (16-17)",
  "U20 (18-19)",
  "Adults (19+)",
  "Seniors (40+)",
  "All ages",
] as const;

type TargetAgeGroup = (typeof TargetAgeGroupArray)[number];

export interface SportsEvent {
  id: string;
  event_name: string;
  event_type: SportsEventType;
  target_age: TargetAgeGroup[];
  target_level: TargetLevel[] | null;
  target_gender: TargetGender;
  event_location: string;
  description: string | null;
  start_date: Date;
  end_date: Date | null;
  contact_email: string;
  contact_phone: string;
}
