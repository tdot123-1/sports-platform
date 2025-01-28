import { createClient } from "@/lib/supabase/server";

const EventsList = async () => {
  const supabase = await createClient();

  const { data: events, error } = await supabase.from("events").select("*");

  if (error) {
    return (
      <div>
        <p>Error fetching events: {error.message}</p>
      </div>
    );
  }
  return (
    <>
      <div>
        <ul>
          {events.map((event) => (
            <li key={event.id} className="border border-zinc-700 p-3 m-2">
              <h2>{event.event_name}</h2>
              <p>{event.description}</p>
              <p>Location: {event.event_location}</p>
              <p>Start date: {event.start_date}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default EventsList;
