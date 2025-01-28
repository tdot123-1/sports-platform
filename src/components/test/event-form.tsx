interface EventFormProps {
  action: (formDate: FormData) => Promise<void>;
}

const EventForm = ({ action }: EventFormProps) => {
  return (
    <form action={action}>
      <div className="mb-4">
        <label htmlFor="name">Event name</label>
        <input name="name" id="name" type="text" />
      </div>
      <div className="mb-4">
        <label htmlFor="type">Event type</label>
        <input name="type" id="type" type="text" />
      </div>
      <div className="mb-4">
        <label htmlFor="location">Event location</label>
        <input name="location" id="location" type="text" />
      </div>
      <div className="mb-4">
        <label htmlFor="description">Event description</label>
        <textarea name="description" id="description" />
      </div>
      <div className="mb-4">
        <label htmlFor="age">Target age</label>
        <input name="age" id="age" type="text" />
      </div>
      <div className="mb-4">
        <label htmlFor="level">Target level</label>
        <input name="level" id="level" type="text" />
      </div>
      <div className="mb-4">
        <label htmlFor="gender">Target gender</label>
        <input name="gender" id="gender" type="text" />
      </div>
      <div className="mb-4">
        <label htmlFor="start">Start date</label>
        <input name="start" id="start" type="date" />
      </div>
      <div className="mb-4">
        <label htmlFor="end">End date</label>
        <input name="end" id="end" type="date" />
      </div>
      <div className="mb-4">
        <label htmlFor="email">Contact email</label>
        <input name="email" id="email" type="text" />
      </div>
      <div className="mb-4">
        <label htmlFor="phone">Contact phone nr.</label>
        <input name="phone" id="phone" type="text" />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default EventForm;
