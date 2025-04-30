import { fetchAllEvents } from "@/lib/data/events/data";
import { FilterOptions, SortOptions, SportsEvent } from "@/lib/types";
import { convertFetchedEvent } from "@/lib/utils";
import EventCard from "./event-card";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon } from "lucide-react";
import Link from "next/link";

interface EventsListProps {
  userId?: string;
  currentPage?: number;
  searchQuery?: string;
  filter?: FilterOptions;
  sort?: SortOptions;
  priceFilter?: number;
  passedEventsFilter?: boolean;
}

const EventsList = async ({
  userId,
  currentPage = 1,
  searchQuery,
  filter,
  sort,
  priceFilter,
  passedEventsFilter,
}: EventsListProps) => {
  // test skeleton
  // await new Promise((resolve) => setTimeout(resolve, 5000));

  const fetchedEvents = await fetchAllEvents(
    currentPage,
    userId,
    searchQuery,
    filter,
    sort,
    priceFilter,
    passedEventsFilter
  );

  // convert Dates and get public logo url
  const events: SportsEvent[] = await Promise.all(
    fetchedEvents.map(convertFetchedEvent)
  );

  return (
    <>
      <div className="py-6 min-h-screen">
        {events.length ? (
          <ul className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {events.map((event) => (
              <li key={event.id}>
                <EventCard event={event} userId={userId ? userId : undefined} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-36">
            {userId ? (
              <>
                <div className="w-fit mx-auto">
                  <h3 className="text-center text-muted-foreground">
                    No events created yet!
                  </h3>
                  <div className="w-fit mx-auto mt-8">
                    <Link href={`/profile/events/create`}>
                      <Button>
                        <PlusCircleIcon /> Create Event
                      </Button>
                    </Link>
                  </div>
                </div>
              </>
            ) : (
              <>
                <h3 className="text-center text-muted-foreground">
                  No events found!
                </h3>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default EventsList;
