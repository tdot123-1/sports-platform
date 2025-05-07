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
import EventCard from "./event-card";

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
        className="w-full min-w-0 cursor-grab"
      >
        <CarouselContent>
          {events.map((event) => (
            <CarouselItem className="sm:basis-1/2 lg:basis-1/3" key={event.id}>
              <EventCard event={event} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex" />
        <CarouselNext className="hidden md:flex" />
      </Carousel>
    </>
  );
};

export default NewEventsCarousel;
