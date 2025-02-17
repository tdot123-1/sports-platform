import NewEventsCarouselWrapper from "@/components/events/new-events/events-carousel-wrapper";
import CurrencySelect from "@/components/profile/events-form/form-components/currency-select";
import CarouselSkeleton from "@/components/skeletons/carousel-skeleton";
import { Skeleton } from "@/components/ui/skeleton";
import { currencyList } from "@/lib/countries";
import { Suspense } from "react";

export default function Home() {
  return (
    <>
      <h1>Sports platform</h1>

      <section className="my-16">
        <div className="">
          <h2 className="text-2xl font-mono text-primary px-4">What's New</h2>
          <div className="w-full flex-shrink flex justify-center">
            <Suspense fallback={<CarouselSkeleton />}>
              <NewEventsCarouselWrapper />
            </Suspense>
          </div>
        </div>
      </section>
      <section className="px-4">
        <h2 className="text-2xl font-mono text-primary">Some other info</h2>
        <p className=" md:w-1/3 lg:w-1/3 py-2">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam minus,
          nihil fuga, praesentium sunt eveniet magni ipsum dolorum vero iusto
          impedit assumenda. Cupiditate veritatis quo qui nemo quod non
          voluptas?
        </p>
      </section>
    </>
  );
}
