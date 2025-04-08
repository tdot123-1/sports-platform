import { InfoIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Skeleton } from "../ui/skeleton";

const events = Array.from({ length: 6 });

const CarouselSkeleton = () => {
  return (
    <>
      <Carousel
        opts={{ loop: true, align: `center` }}
        className="w-full min-w-0 max-w-48 sm:max-w-sm md:max-w-lg lg:max-w-2xl xl:max-w-3xl"
      >
        <CarouselContent>
          {events.map((_, i) => (
            <CarouselItem
              className="sm:basis-1/2 md:basis-1/3 xl:basis-1/4 flex-shrink"
              key={i}
            >
              <div className="p-1">
                <Card className="max-w-md">
                  <CardContent className="flex flex-col gap-2 aspect-square items-center justify-center">
                    <div className="w-full mb-3 mt-2">
                      <Skeleton className="w-full h-4" />
                    </div>
                    <div className="w-full mb-1">
                      <Skeleton className="w-full h-4" />
                    </div>
                    <div className="w-full mb-1">
                      <Skeleton className="w-full h-4" />
                    </div>

                    <div className="w-full mb-1">
                      <Skeleton className="w-full h-4" />
                    </div>
                    <div>
                      <Skeleton className="rounded-full h-10 w-10" />
                    </div>

                    <Button size={`sm`} className="bg-basket" disabled>
                      <div className="flex items-center gap-1">
                        <InfoIcon />
                        <span>Details</span>
                      </div>
                    </Button>
                  </CardContent>
                </Card>
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

export default CarouselSkeleton;
