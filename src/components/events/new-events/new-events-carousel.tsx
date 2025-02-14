import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { fetchNewEvents } from "@/lib/data/events/data";
import { SportsEvent } from "@/lib/types";
import { convertFetchedEvent } from "@/lib/utils";
import NewEventCard from "./new-events-card";

const NewEventsCarousel = async () => {
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
      <Carousel className="w-48 md:w-96 lg:w-9/12 max-w-screen-lg">
        <CarouselContent>
          {events.map((event) => (
            <CarouselItem className="md:basis-1/2 lg:basis-1/4" key={event.id}>
              <div className="p-1">
                <NewEventCard event={event} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </>
  );
};

export default NewEventsCarousel;
