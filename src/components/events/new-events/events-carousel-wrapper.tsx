import { fetchNewEvents } from "@/lib/data/events/data";
import { SportsEvent } from "@/lib/types";
import { convertFetchedEvent } from "@/lib/utils";
import NewEventsCarousel from "./new-events-carousel";

const NewEventsCarouselWrapper = async () => {
  // test skeleton
  // await new Promise((resolve) => setTimeout(resolve, 5000));

  const fetchedEvents = await fetchNewEvents();

  if (fetchedEvents.length < 1) {
    return (
      <div className="w-48 sm:w-10/12 lg:w-1/2 text-center">
        <h3>No updates found</h3>
        <p>Check back again soon to find new events!</p>
      </div>
    );
  }

  const events: SportsEvent[] = fetchedEvents.map((event) =>
    convertFetchedEvent(event)
  );

  return (
    <>
      <NewEventsCarousel events={events} />
    </>
  );
};

export default NewEventsCarouselWrapper;
