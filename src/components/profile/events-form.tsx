"use client";

import { State } from "@/lib/actions/events/actions";
import { SportsEvent } from "@/lib/types";

interface EventFormProps {
  state: State;
  formAction: (payload: FormData) => void;
  pending: boolean;
  event?: SportsEvent;
}

const EventForm = ({ state, formAction, pending, event }: EventFormProps) => {
  return (
    <>
      <form action={formAction}></form>
    </>
  );
};

export default EventForm;
