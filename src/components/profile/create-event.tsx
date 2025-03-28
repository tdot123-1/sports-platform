"use client";

import { createEvent, State } from "@/lib/actions/events/actions";
import { useActionState, useEffect } from "react";
import EventForm from "./events-form/events-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Country } from "@/lib/types";

interface CreateEventProps {
  countryList: Country[];
}

const CreateEvent = ({ countryList }: CreateEventProps) => {
  const initialState: State = { message: "", errors: {}, success: false };
  const [state, formAction, pending] = useActionState(
    createEvent,
    initialState
  );

  const router = useRouter();

  useEffect(() => {
    if (!pending) {
      if (state.success) {
        toast.success("New event created!");

        router.push(`/profile/events/${state.message}`);
      }
    }
  }, [pending, state, router]);

  return (
    <>
      <EventForm
        countryList={countryList}
        state={state}
        formAction={formAction}
        pending={pending}
      />
    </>
  );
};

export default CreateEvent;
