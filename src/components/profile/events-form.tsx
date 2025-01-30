"use client";

interface EventFormProps {
  onSubmit: (payload: FormData) => void;
  event?: Event;
}

const EventForm = ({ onSubmit, event }: EventFormProps) => {
  return (
    <>
      <form></form>
    </>
  );
};

export default EventForm;
