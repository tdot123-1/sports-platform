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
            delay: 2500,
          }),
        ]}
        className="w-full max-w-48 sm:max-w-sm md:max-w-lg lg:max-w-4xl cursor-grab"
      >
        <CarouselContent>
          {events.map((event) => (
            <CarouselItem className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4 flex-shrink" key={event.id}>
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
