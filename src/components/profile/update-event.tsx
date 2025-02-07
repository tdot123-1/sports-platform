"use client";

import { Country, SportsEvent } from "@/lib/types";
import EventForm from "./events-form/events-form";
import { State, updateEvent } from "@/lib/actions/events/actions";
import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface UpdateEventProps {
  event: SportsEvent;
  countryList: Country[];
}

const UpdateEvent = ({ event, countryList }: UpdateEventProps) => {
  const initialState: State = { message: "", errors: {}, success: false };

  const updateEventWithId = updateEvent.bind(null, event.id);
  const [state, formAction, pending] = useActionState(
    updateEventWithId,
    initialState
  );

  const router = useRouter();

  useEffect(() => {
    if (!pending) {
      if (state.success) {
        toast("Event updated", {
          description: "Changes to this event have been saved!",
        });

        router.push("/profile");
      }
    }
  }, [pending, state]);

  return (
    <>
      <EventForm
        state={state}
        formAction={formAction}
        pending={pending}
        event={event}
        countryList={countryList}
      />
    </>
  );
};

export default UpdateEvent;
