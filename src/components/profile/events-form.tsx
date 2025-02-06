"use client";

import { State } from "@/lib/actions/events/actions";
import {
  SportsEvent,
  SportsEventTypeMap,
  TargetAgeGroupMap,
  TargetGenderMap,
  TargetLevelMap,
} from "@/lib/types";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import Link from "next/link";
import { Separator } from "../ui/separator";
import DatePicker from "./date-picker";
import { CirclePlusIcon, SaveIcon, Undo2Icon } from "lucide-react";
import AgeSelect from "./form-components/age-select";
import LevelSelect from "./form-components/level-select";

interface EventFormProps {
  state: State;
  formAction: (payload: FormData) => void;
  pending: boolean;
  event?: SportsEvent;
}

const EventForm = ({ state, formAction, pending, event }: EventFormProps) => {
  return (
    <>
      <form action={formAction}>
        <div>
          <h3 className="text-lg font-semibold font-mono">Event info</h3>
          <p className="text-muted-foreground text-sm">
            Provide some information about the event itself.
          </p>
        </div>
        <Separator className="my-2" />
        <div className="mb-4">
          <Label htmlFor="event_name">
            Event Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="event_name"
            name="event_name"
            type="text"
            aria-describedby="event_name-error"
            disabled={pending}
            defaultValue={event ? event.event_name : ""}
          />
          <div id="event_name-error" aria-live="polite" aria-atomic="true">
            {state.errors?.event_name &&
              state.errors.event_name.map((error) => (
                <p className="text-sm mt-2 text-destructive italic" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        <div className="mb-4">
          <Label htmlFor="event_type">
            Event Type <span className="text-destructive">*</span>
          </Label>
          <p className="text-xs italic">
            Select the type that best describes the event you're organizing.
          </p>
          <Select
            disabled={pending}
            name="event_type"
            defaultValue={event ? event.event_type : ""}
          >
            <SelectTrigger>
              <SelectValue
                aria-describedby="event_type-error"
                id="event_type"
                // placeholder="Event"
              />
            </SelectTrigger>
            <SelectContent>
              {/* {SportsEventTypeArray.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))} */}
              {Object.entries(SportsEventTypeMap).map(([k, v]) => (
                <SelectItem key={k} value={k}>
                  {v}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div id="event_type-error" aria-live="polite" aria-atomic="true">
            {state.errors?.event_type &&
              state.errors.event_type.map((error) => (
                <p className="text-sm mt-2 text-destructive italic" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        <div className="mb-4">
          <Label htmlFor="event_location">
            Event Location <span className="text-destructive">*</span>
          </Label>
          <p className="text-xs italic">
            Provide the address where your event will be held
          </p>
          <Textarea
            id="event_location"
            name="event_location"
            aria-describedby="event_location-error"
            disabled={pending}
            defaultValue={event ? event.event_location : ""}
          />
          <div id="event_location-error" aria-live="polite" aria-atomic="true">
            {state.errors?.event_address &&
              state.errors.event_address.map((error) => (
                <p className="text-sm mt-2 text-destructive italic" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        <div className="mb-4">
          <Label htmlFor="start_date">
            Start date <span className="text-destructive">*</span>
          </Label>
          <p className="text-xs italic">
            Provide the starting date of your event.
          </p>
          <DatePicker
            name="start_date"
            eventDate={event?.start_date || undefined}
            pending={pending}
          />
          <div id="start_date-error" aria-live="polite" aria-atomic="true">
            {state.errors?.start_date &&
              state.errors.start_date.map((error) => (
                <p className="text-sm mt-2 text-destructive italic" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        <div className="mb-4">
          <Label htmlFor="end_date">End date</Label>
          <p className="text-xs italic">
            Provide the end date of your event if applicable.
          </p>
          <DatePicker
            name="end_date"
            eventDate={event?.end_date || undefined}
            pending={pending}
          />
          <div id="end_date-error" aria-live="polite" aria-atomic="true">
            {state.errors?.end_date &&
              state.errors.end_date.map((error) => (
                <p className="text-sm mt-2 text-destructive italic" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        <div className="mb-4">
          <Label htmlFor="description">Event Description</Label>
          <p className="text-xs italic">
            Optionally provide some extra info about your event.
          </p>
          <Textarea
            id="description"
            name="description"
            aria-describedby="description-error"
            disabled={pending}
            defaultValue={event?.description ? event.description : ""}
          />
          <div id="description-error" aria-live="polite" aria-atomic="true">
            {state.errors?.description &&
              state.errors.description.map((error) => (
                <p className="text-sm mt-2 text-destructive italic" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold font-mono">Target audience</h3>
          <p className="text-muted-foreground text-sm">
            Provide some information about who your event is meant for.
          </p>
        </div>
        <Separator className="my-2" />
        <div className="mb-4">
          {/* <Label htmlFor="target_age">
            Target Age Group <span className="text-destructive">*</span>
          </Label>
          <p className="text-xs italic">
            Select the age group you are organizing the event for.
          </p>
          <Select
            disabled={pending}
            name="target_age"
            defaultValue={event ? event.target_age : ""}
          >
            <SelectTrigger>
              <SelectValue
                aria-describedby="target_age-error"
                id="target_age"
                placeholder="Age group (birthyear)"
              />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(TargetAgeGroupMap).map(([k, v]) => (
                <SelectItem key={k} value={k}>
                  {v}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div id="target_age-error" aria-live="polite" aria-atomic="true">
            {state.errors?.target_age &&
              state.errors.target_age.map((error) => (
                <p className="text-sm mt-2 text-destructive italic" key={error}>
                  {error}
                </p>
              ))}
          </div> */}
          <AgeSelect />
        </div>
        <div className="mb-4">
          {/* <Label htmlFor="target_level">Target Skill Level</Label>
          <p className="text-xs italic">
            Select the skill level required for your event (if applicable).
          </p>
          <Select
            disabled={pending}
            name="target_level"
            defaultValue={event?.target_level ? event.target_level : ""}
          >
            <SelectTrigger>
              <SelectValue
                aria-describedby="target_level-error"
                id="target_level"
                // placeholder="Skill level"
              />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(TargetLevelMap).map(([k, v]) => (
                <SelectItem key={k} value={k}>
                  {v}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div id="target_level-error" aria-live="polite" aria-atomic="true">
            {state.errors?.target_level &&
              state.errors.target_level.map((error) => (
                <p className="text-sm mt-2 text-destructive italic" key={error}>
                  {error}
                </p>
              ))}
          </div> */}
          <LevelSelect />
        </div>
        <div className="mb-4">
          <Label htmlFor="target_gender">
            Target Gender <span className="text-destructive">*</span>
          </Label>
          <p className="text-xs italic">Select who your event is meant for.</p>
          <Select
            disabled={pending}
            name="target_gender"
            defaultValue={event ? event.target_gender : ""}
          >
            <SelectTrigger>
              <SelectValue
                aria-describedby="target_gender-error"
                id="target_gender"
                // placeholder="Gender"
              />
            </SelectTrigger>
            <SelectContent>
              {/* {TargetGenderArray.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))} */}
              {Object.entries(TargetGenderMap).map(([k, v]) => (
                <SelectItem key={k} value={k}>
                  {v}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div id="target_gender-error" aria-live="polite" aria-atomic="true">
            {state.errors?.target_gender &&
              state.errors.target_gender.map((error) => (
                <p className="text-sm mt-2 text-destructive italic" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold font-mono">Contact info</h3>
          <p className="text-muted-foreground text-sm">
            Provide information about how to get in contact with event
            organizers.
          </p>
        </div>
        <Separator className="my-2" />
        <div className="mb-4">
          <Label htmlFor="contact_email">
            Email address <span className="text-destructive">*</span>
          </Label>
          <p className="text-xs italic">
            Provide an email address via which you can be contacted about your
            event.
          </p>
          <Input
            id="contact_email"
            name="contact_email"
            type="text"
            aria-describedby="contact_email-error"
            disabled={pending}
            defaultValue={event ? event.contact_email : ""}
          />
          <div id="contact_email-error" aria-live="polite" aria-atomic="true">
            {state.errors?.contact_email &&
              state.errors.contact_email.map((error) => (
                <p className="text-sm mt-2 text-destructive italic" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        <div className="mb-4">
          <Label htmlFor="contact_phone">Phone number</Label>
          <p className="text-xs italic">
            Optionally, provide a phone number via which you can be contacted
            about your event.
          </p>
          <Input
            id="contact_phone"
            name="contact_phone"
            type="text"
            aria-describedby="contact_phone-error"
            disabled={pending}
            defaultValue={event ? event.contact_phone : ""}
          />
          <div id="contact_phone-error" aria-live="polite" aria-atomic="true">
            {state.errors?.contact_phone &&
              state.errors.contact_phone.map((error) => (
                <p className="text-sm mt-2 text-destructive italic" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        <div className="flex justify-center gap-4">
          <Button variant={`secondary`} type="button" disabled={pending}>
            <Link href={"/profile"}>
              <div className="flex justify-start items-center gap-1">
                <Undo2Icon />
                <span className="hidden md:block">Cancel</span>
              </div>
            </Link>
          </Button>
          <Button type="submit" disabled={pending}>
            {event ? (
              <div className="flex justify-start items-center gap-1">
                <SaveIcon />
                <span className="hidden md:block">Update</span>
              </div>
            ) : (
              <div className="flex justify-start items-center gap-1">
                <CirclePlusIcon />
                <span className="hidden md:block">Create</span>
              </div>
            )}
          </Button>
        </div>
        <div>
          {state.message && (
            <p className="text-sm mt-2 text-destructive italic text-center">
              {state.message}
            </p>
          )}
        </div>
      </form>
    </>
  );
};

export default EventForm;
