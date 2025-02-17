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
        className="w-48 sm:w-9/12  max-w-screen-lg"
      >
        <CarouselContent>
          {events.map((_, i) => (
            <CarouselItem
              className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
              key={i}
            >
              <div className="p-1">
                <Card className="max-w-md">
                  <CardContent className="flex flex-col gap-2 aspect-square items-center justify-center">
                    <div className="w-full mb-3">
                      <Skeleton className="w-full h-4" />
                    </div>
                    <div className="w-full mb-3">
                      <Skeleton className="w-full h-4" />
                    </div>

                    <div className="w-full mb-8">
                      <Skeleton className="w-full h-4" />
                    </div>

                    <Button disabled>Details</Button>
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
