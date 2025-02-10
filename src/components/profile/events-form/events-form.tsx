"use client";

import { State } from "@/lib/actions/events/actions";
import {
  Country,
  SportsEvent,
  SportsEventTypeMap,
  TargetAgeGroupMap,
  TargetGenderMap,
  TargetLevelMap,
} from "@/lib/types";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { Textarea } from "../../ui/textarea";
import { Button } from "../../ui/button";
import Link from "next/link";
import { Separator } from "../../ui/separator";
import DatePicker from "../date-picker";
import { CirclePlusIcon, SaveIcon, Undo2Icon } from "lucide-react";
import LinksInput from "./form-components/links-input";
import MultiSelect from "./form-components/multiselect";
import CostEstimate from "./form-components/cost-estimate";
import AddressInput from "./form-components/address-input";
import CountrySelect from "./form-components/country-select";

interface EventFormProps {
  state: State;
  formAction: (payload: FormData) => void;
  pending: boolean;
  event?: SportsEvent;
  countryList: Country[];
}

const EventForm = ({
  state,
  formAction,
  pending,
  event,
  countryList,
}: EventFormProps) => {
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
            defaultValue={event ? event.event_type : undefined}
          >
            <SelectTrigger id="event_type">
              <SelectValue aria-describedby="event_type-error" />
            </SelectTrigger>
            <SelectContent>
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
          <p className="text-sm font-medium leading-none">
            Event Address <span className="text-destructive">*</span>
          </p>
          <p className="text-xs italic">
            Provide the address where your event will be held
          </p>
          <AddressInput pending={pending} state={state} />
          <div className="flex flex-col justify-between items-baseline lg:flex-row mb-2 gap-1">
            <Label className="text-muted-foreground" htmlFor="address_country">
              Country<span className="text-destructive">*</span>:
            </Label>
            <CountrySelect
              countryList={countryList}
              pending={pending}
              name="address_country"
              describedBy="address_country-error"
            />
          </div>
          <div id="address_country-error" aria-live="polite" aria-atomic="true">
            {state.errors?.address_country &&
              state.errors.address_country.map((error) => (
                <p
                  className="text-sm mt-2 text-right text-destructive italic"
                  key={error}
                >
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
            describedBy="start_date-error"
            required
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
            describedBy="end_date-error"
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
          <p className="text-sm font-medium leading-none">
            Target Age Group <span className="text-destructive">*</span>
          </p>
          <p className="text-xs italic">
            Select the age group(s) you are organizing the event for.
          </p>
          <p className="text-sm text-muted-foreground py-1">
            Age group (birthyear)
          </p>
          <MultiSelect
            name="target_age"
            pending={pending}
            optionsMap={TargetAgeGroupMap}
            describedBy="target_age-error"
            initial_values={event ? event.target_age : undefined}
          />
          <div id="target_age-error" aria-live="polite" aria-atomic="true">
            {state.errors?.target_age &&
              state.errors.target_age.map((error) => (
                <p className="text-sm mt-2 text-destructive italic" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        <div className="mb-4">
          <p className="text-sm font-medium leading-none">Target Skill Level</p>
          <p className="text-xs italic">
            Select the skill level(s) required for your event if applicable.
          </p>
          <MultiSelect
            name="target_level"
            pending={pending}
            optionsMap={TargetLevelMap}
            describedBy="target_level-error"
            initial_values={
              event?.target_level ? event.target_level : undefined
            }
          />
          <div id="target_level-error" aria-live="polite" aria-atomic="true">
            {state.errors?.target_level &&
              state.errors.target_level.map((error) => (
                <p className="text-sm mt-2 text-destructive italic" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        <div className="mb-4">
          <Label htmlFor="target_gender">
            Target Gender <span className="text-destructive">*</span>
          </Label>
          <p className="text-xs italic">Select who your event is meant for.</p>
          <Select
            disabled={pending}
            name="target_gender"
            defaultValue={event ? event.target_gender : undefined}
          >
            <SelectTrigger id="target_gender">
              <SelectValue aria-describedby="target_gender-error" />
            </SelectTrigger>
            <SelectContent>
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
          <h3 className="text-lg font-semibold font-mono">Event cost</h3>
          <p className="text-muted-foreground text-sm">
            Provide information about what your event will cost for attendees.
          </p>
        </div>
        <Separator className="my-2" />
        <Label htmlFor="cost_estimate">
          Cost estimate <span className="text-destructive">*</span>
        </Label>
        <p className="text-xs italic">
          Provide an estimation of the total price for attending your event.
        </p>
        <div className="mb-4">
          <CostEstimate
            name="cost_estimate"
            pending={pending}
            cost_estimate={event?.cost_estimate}
            cost_currency={event?.cost_currency}
            describedBy="cost_estimate-error"
          />
          {/** errors */}
          <div id="cost_estimate-error" aria-live="polite" aria-atomic="true">
            {state.errors?.cost_estimate &&
              state.errors.cost_estimate.map((error) => (
                <p className="text-sm mt-2 text-destructive italic" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        <div className="mb-4">
          {/** cost description */}
          <Label htmlFor="cost_description">Cost description</Label>
          <p className="text-xs italic">
            Optionally describe what attendees receive for the price of your
            event (access, catering, lodging etc.).
          </p>
          <Textarea
            id="cost_description"
            name="cost_description"
            aria-describedby="cost_description-error"
            disabled={pending}
            defaultValue={event?.cost_description ? event.cost_description : ""}
          />
          <div
            id="cost_description-error"
            aria-live="polite"
            aria-atomic="true"
          >
            {state.errors?.cost_description &&
              state.errors.cost_description.map((error) => (
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
        <div className="mb-4">
          <p className="text-sm font-medium leading-none">Links</p>
          <p className="text-xs italic">
            Optionally, provide some links to further inform about your event
            (social media, event website, etc.).
          </p>
          <LinksInput
            name="event_links"
            pending={pending}
            describedBy="event_links-error"
            event_links={event?.event_links}
          />
          {/** errors */}
          <div id="event_links-error" aria-live="polite" aria-atomic="true">
            {state.errors?.event_links &&
              state.errors.event_links.map((error) => (
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
