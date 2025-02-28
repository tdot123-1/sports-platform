import NewEventsCarouselWrapper from "@/components/events/new-events/events-carousel-wrapper";
import CarouselSkeleton from "@/components/skeletons/carousel-skeleton";

import { Suspense } from "react";

export default function Home() {
  return (
    <>
      <section className="my-12 px-4">
        <h1 className="text-2xl font-mono text-primary w-fit mx-auto">
          Sports platform
        </h1>
        <p className="text-center md:w-1/2 mx-auto my-6">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis,
          voluptatibus tempore voluptates consequuntur aperiam possimus aliquam
          labore voluptas voluptate, similique neque nihil nam, repellendus
          fugiat nisi doloremque mollitia quam quisquam.
        </p>
      </section>

      <section className="my-12">
        <h2 className="text-2xl font-mono text-primary px-4">
          What&apos;s New
        </h2>
        <div className="flex-1 min-w-0 flex justify-center">
          <Suspense fallback={<CarouselSkeleton />}>
            <NewEventsCarouselWrapper />
          </Suspense>
        </div>
      </section>
      <section className="my-12 px-4">
        <h2 className="text-2xl font-mono text-primary">Some other info</h2>
        <p className=" md:w-1/2 lg:w-1/3 py-2">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam minus,
          nihil fuga, praesentium sunt eveniet magni ipsum dolorum vero iusto
          impedit assumenda. Cupiditate veritatis quo qui nemo quod non
          voluptas?
        </p>
      </section>
      <section className="my-12 px-4 text-right">
        <h2 className="text-2xl font-mono text-primary">Some other info</h2>
        <p className="ml-auto md:w-1/2 lg:w-1/3 py-2">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam minus,
          nihil fuga, praesentium sunt eveniet magni ipsum dolorum vero iusto
          impedit assumenda. Cupiditate veritatis quo qui nemo quod non
          voluptas?
        </p>
      </section>
    </>
  );
}
