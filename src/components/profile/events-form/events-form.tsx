"use client";

import { State } from "@/lib/actions/events/actions";
import {
  Country,
  EventStatusMap,
  SportsEvent,
  SportsEventTypeMap,
  TargetGenderMap,
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
import { CirclePlusIcon, SaveIcon, Undo2Icon } from "lucide-react";
import LinksInput from "./form-components/links-input";
import CostEstimate from "./form-components/cost-estimate";
import DateRangePicker from "./form-components/date-range-picker";
import AgeSelect from "./form-components/age-select";
import LevelSelect from "./form-components/level-select";
import LocationInput from "@/components/places-autocomplete/location-input";

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
          <h3 className="text-xl font-semibold font-mono">Event info</h3>
          <p className="text-muted-foreground text-sm">
            Provide some information about the event itself.
          </p>
        </div>
        <Separator className="mb-6 mt-2" />
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
            required
            maxLength={254}
          />
          <div id="event_name-error" aria-live="polite" aria-atomic="true">
            {state.errors?.event_name &&
              state.errors.event_name.map((error) => (
                <p className="text-sm mt-2 text-destructive" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        <div className="mb-4">
          <Label htmlFor="event_type">
            Event Type <span className="text-destructive">*</span>
          </Label>
          <p className="text-xs text-muted-foreground">
            Select the type that best describes the event you&apos;re
            organizing.
          </p>
          <Select
            disabled={pending}
            name="event_type"
            defaultValue={event ? event.event_type : undefined}
            required
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
                <p className="text-sm mt-2 text-destructive" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        <div className="mb-4">
          <p className="text-sm font-medium leading-none">
            Event Location <span className="text-destructive">*</span>
          </p>
          <p className="text-xs text-muted-foreground mb-2">
            Provide the location where your event will be held
          </p>
          <LocationInput
            countryList={countryList}
            pending={pending}
            state={state}
            address_country={event ? event.address_country : undefined}
            address_city={event ? event.address_city : undefined}
            address_location={event ? event.address_location_read : undefined}
          />
        </div>

        <div className="mb-4">
          <Label htmlFor="start_date">
            Dates <span className="text-destructive">*</span>
          </Label>
          <p className="text-xs text-muted-foreground">
            Provide the start and end dates of your event.
          </p>
          <DateRangePicker
            name={`start_date`}
            startDate={event?.start_date ? event.start_date : undefined}
            endDate={event?.end_date ? event.end_date : undefined}
            pending={pending}
            describedBy="start_date-error"
          />
          <div id="start_date-error" aria-live="polite" aria-atomic="true">
            {state.errors?.start_date &&
              state.errors.start_date.map((error) => (
                <p className="text-sm mt-2 text-destructive" key={error}>
                  {error}
                </p>
              ))}
            {state.errors?.end_date &&
              state.errors.end_date.map((error) => (
                <p className="text-sm mt-2 text-destructive" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        <div className="mb-4">
          <Label htmlFor="event_status">
            Event Status <span className="text-destructive">*</span>
          </Label>
          <p className="text-xs text-muted-foreground">
            Select the current status of your event.
          </p>
          <Select
            disabled={pending}
            name="event_status"
            defaultValue={event ? event.event_status : undefined}
            required
          >
            <SelectTrigger id="event_status">
              <SelectValue aria-describedby="event_status-error" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(EventStatusMap).map(([k, v]) => (
                <SelectItem key={k} value={k}>
                  {v}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div id="event_status-error" aria-live="polite" aria-atomic="true">
            {state.errors?.event_status &&
              state.errors.event_status.map((error) => (
                <p className="text-sm mt-2 text-destructive" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        <div className="mb-4">
          <Label htmlFor="event_description">Event Description</Label>
          <p className="text-xs text-muted-foreground">
            (Optional) Provide some extra info about your event.
          </p>
          <Textarea
            id="event_description"
            name="event_description"
            aria-describedby="event_description-error"
            disabled={pending}
            defaultValue={
              event?.event_description ? event.event_description : ""
            }
            maxLength={2000}
          />
          <div
            id="event_description-error"
            aria-live="polite"
            aria-atomic="true"
          >
            {state.errors?.event_description &&
              state.errors.event_description.map((error) => (
                <p className="text-sm mt-2 text-destructive" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        <div className="mt-8">
          <h3 className="text-xl font-semibold font-mono">Target audience</h3>
          <p className="text-muted-foreground text-sm">
            Provide some information about who your event is meant for.
          </p>
        </div>
        <Separator className="mb-6 mt-2" />
        <div className="mb-4">
          <p className="text-sm font-medium leading-none">
            Target Age Group <span className="text-destructive">*</span>
          </p>
          <p className="text-xs text-muted-foreground">
            Select the age group(s) you are organizing the event for.
          </p>
          <AgeSelect
            name="target_age"
            initialValues={event?.target_age ? event.target_age : undefined}
            pending={pending}
            describedBy="target_age-error"
          />
          <div id="target_age-error" aria-live="polite" aria-atomic="true">
            {state.errors?.target_age &&
              state.errors.target_age.map((error) => (
                <p className="text-sm mt-2 text-destructive" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        <div className="mb-4">
          <p className="text-sm font-medium leading-none">Target Skill Level</p>
          <p className="text-xs text-muted-foreground">
            (Optional) Select the skill level(s) required for your event if
            applicable.
          </p>
          <LevelSelect
            name="target_level"
            pending={pending}
            describedBy="target_level-error"
            initialValues={event?.target_level ? event.target_level : undefined}
          />
          <div id="target_level-error" aria-live="polite" aria-atomic="true">
            {state.errors?.target_level &&
              state.errors.target_level.map((error) => (
                <p className="text-sm mt-2 text-destructive" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        <div className="mb-4">
          <Label htmlFor="target_gender">
            Target Gender <span className="text-destructive">*</span>
          </Label>
          <p className="text-xs text-muted-foreground">
            Select who your event is meant for.
          </p>
          <Select
            disabled={pending}
            name="target_gender"
            defaultValue={event ? event.target_gender : undefined}
            required
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
                <p className="text-sm mt-2 text-destructive" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        <div className="mt-8">
          <h3 className="text-xl font-semibold font-mono">Event cost</h3>
          <p className="text-muted-foreground text-sm">
            Provide information about what your event will cost for attendees.
          </p>
        </div>
        <Separator className="mb-6 mt-2" />
        <Label htmlFor="cost_estimate">Cost estimate</Label>
        <p className="text-xs text-muted-foreground">
          (Optional) Provide an estimation of the total price for attending your
          event.
        </p>
        <div className="mb-4">
          <CostEstimate
            name="cost_estimate"
            pending={pending}
            cost_estimate={event?.cost_estimate || undefined}
            cost_currency={event?.cost_currency}
            describedBy="cost_estimate-error"
          />
          {/** errors */}
          <div id="cost_estimate-error" aria-live="polite" aria-atomic="true">
            {state.errors?.cost_estimate &&
              state.errors.cost_estimate.map((error) => (
                <p className="text-sm mt-2 text-destructive" key={error}>
                  {error}
                </p>
              ))}
          </div>
          <div id="cost_currency-error" aria-live="polite" aria-atomic="true">
            {state.errors?.cost_currency &&
              state.errors.cost_currency.map((error) => (
                <p className="text-sm mt-2 text-destructive" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        <div className="mb-4">
          {/** cost description */}
          <Label htmlFor="cost_description">Cost description</Label>
          <p className="text-xs text-muted-foreground">
            (Optional) Describe what attendees receive for the price of your
            event (access, catering, lodging etc.).
          </p>
          <Textarea
            id="cost_description"
            name="cost_description"
            aria-describedby="cost_description-error"
            disabled={pending}
            defaultValue={event?.cost_description ? event.cost_description : ""}
            maxLength={2000}
          />
          <div
            id="cost_description-error"
            aria-live="polite"
            aria-atomic="true"
          >
            {state.errors?.cost_description &&
              state.errors.cost_description.map((error) => (
                <p className="text-sm mt-2 text-destructive" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        <div className="mt-8">
          <h3 className="text-xl font-semibold font-mono">Contact info</h3>
          <p className="text-muted-foreground text-sm">
            Provide information about how to get in contact with event
            organizers.
          </p>
        </div>
        <Separator className="mb-6 mt-2" />
        <div className="mb-4">
          <p className="text-sm font-medium leading-none">
            Primary point of contact <span className="text-destructive">*</span>
          </p>
          <p className="text-xs text-muted-foreground mb-2">
            Provide either an email address or a URL where you can be contacted
            about your event.
          </p>

          <Label htmlFor="contact_email">Email address</Label>
          <Input
            id="contact_email"
            name="contact_email"
            type={`email`}
            aria-describedby="contact_email-error"
            disabled={pending}
            defaultValue={event?.contact_email ? event.contact_email : ""}
            maxLength={320}
          />
          <div id="contact_email-error" aria-live="polite" aria-atomic="true">
            {state.errors?.contact_email &&
              state.errors.contact_email.map((error) => (
                <p className="text-sm mt-2 text-destructive" key={error}>
                  {error}
                </p>
              ))}
          </div>

          <Label htmlFor="contact_url">Contact URL</Label>
          <Input
            id="contact_url"
            name="contact_url"
            type={`text`}
            aria-describedby="contact_url-error"
            disabled={pending}
            defaultValue={event?.contact_url ? event.contact_url : ""}
            maxLength={2000}
          />
          <div id="contact_url-error" aria-live="polite" aria-atomic="true">
            {state.errors?.contact_url &&
              state.errors.contact_url.map((error) => (
                <p className="text-sm mt-2 text-destructive" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        <div className="mb-4">
          <Label htmlFor="contact_phone">Phone number</Label>
          <p className="text-xs text-muted-foreground">
            (Optional) Provide a phone number via which you can be contacted
            about your event.
          </p>
          <Input
            id="contact_phone"
            name="contact_phone"
            type={`tel`}
            aria-describedby="contact_phone-error"
            disabled={pending}
            defaultValue={event ? event.contact_phone : ""}
            maxLength={15}
            pattern="^\+?[0-9]\d{1,14}$"
            placeholder="+123456789"
          />

          <div id="contact_phone-error" aria-live="polite" aria-atomic="true">
            {state.errors?.contact_phone &&
              state.errors.contact_phone.map((error) => (
                <p className="text-sm mt-2 text-destructive" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        <div className="mb-4">
          <Label htmlFor="event_link">Event Link</Label>
          <p className="text-xs text-muted-foreground">
            (Optional) Provide a link to your event website.
          </p>
          <Input
            id="event_link"
            name="event_link"
            type={`url`}
            aria-describedby="event_link-error"
            disabled={pending}
            defaultValue={event?.event_link ? event.event_link : ""}
            maxLength={2000}
          />
          <div id="event_link-error" aria-live="polite" aria-atomic="true">
            {state.errors?.event_link &&
              state.errors.event_link.map((error) => (
                <p className="text-sm mt-2 text-destructive" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        <div className="mb-4">
          <p className="text-sm font-medium leading-none">Social media</p>
          <p className="text-xs text-muted-foreground">
            (Optional) Link any social media where attendees can find more
            details.
          </p>
          <LinksInput
            name="social_links"
            pending={pending}
            describedBy="social_links-error"
            event_links={event?.social_links ? event.social_links : undefined}
          />
          {/** errors */}
          <div id="social_links-error" aria-live="polite" aria-atomic="true">
            {state.errors?.social_links &&
              state.errors.social_links.map((error) => (
                <p className="text-sm mt-2 text-destructive" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        <div className="flex flex-col-reverse md:flex-row justify-center gap-4 mt-10">
          <Button variant={`secondary`} type="button" disabled={pending}>
            <Link href={event ? `/profile/events/${event.id}` : "/profile"}>
              <div className="flex justify-start items-center gap-1">
                <Undo2Icon />
                <span>Cancel</span>
              </div>
            </Link>
          </Button>
          <Button
            className="bg-basket hover:bg-basket/60"
            type="submit"
            disabled={pending}
          >
            {event ? (
              <div className="flex justify-start items-center gap-1">
                <SaveIcon />
                <span>Update</span>
              </div>
            ) : (
              <div className="flex justify-start items-center gap-1">
                <CirclePlusIcon />
                <span>Create</span>
              </div>
            )}
          </Button>
        </div>
        <div>
          {state.message && !state.success && (
            <p className="text-sm mt-2 text-destructive text-center">
              {state.message}
            </p>
          )}
        </div>
      </form>
    </>
  );
};

export default EventForm;
