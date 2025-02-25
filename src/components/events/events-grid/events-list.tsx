import { fetchAllEvents } from "@/lib/data/events/data";
import { FilterOptions, SortOptions, SportsEvent } from "@/lib/types";
import { convertFetchedEvent } from "@/lib/utils";
import EventCard from "./event-card";

interface EventsListProps {
  userId?: string;
  currentPage?: number;
  searchQuery?: string;
  filter?: FilterOptions;
  sort?: SortOptions;
  priceFilter?: number;
}

const EventsList = async ({
  userId,
  currentPage = 1,
  searchQuery,
  filter,
  sort,
  priceFilter,
}: EventsListProps) => {
  // test skeleton
  // await new Promise((resolve) => setTimeout(resolve, 5000));

  const fetchedEvents = await fetchAllEvents(
    currentPage,
    userId,
    searchQuery,
    filter,
    sort,
    priceFilter
  );

  // convert Dates and get public logo url
  const events: SportsEvent[] = await Promise.all(
    fetchedEvents.map(convertFetchedEvent)
  );

  return (
    <>
      <div className="py-6">
        {events.length ? (
          <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {events.map((event) => (
              <li key={event.id}>
                <EventCard event={event} userId={userId ? userId : undefined} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-20">
            <h3 className="mx-auto">No events found!</h3>
          </div>
        )}
      </div>
    </>
  );
};

export default EventsList;
