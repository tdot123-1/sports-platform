"use client";

import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { SportsEvent } from "@/lib/types";
import NewEventCard from "./new-events-card";

const NewEventsCarousel = ({ events }: { events: SportsEvent[] }) => {
  return (
    <>
      <Carousel
        opts={{ loop: true, align: `center` }}
        plugins={[
          Autoplay({
            delay: 3000,
          }),
        ]}
        className="w-48 md:w-96 lg:w-9/12 max-w-screen-lg"
      >
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
