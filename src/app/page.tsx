import NewEventsCarousel from "@/components/events/new-events/new-events-carousel";

export default function Home() {
  return (
    <>
      <section className="px-4">
        <h1>Sports platform</h1>
        <p>What's new</p>
        <div className="w-full my-16 flex justify-center">
          <NewEventsCarousel />
        </div>
      </section>
    </>
  );
}
