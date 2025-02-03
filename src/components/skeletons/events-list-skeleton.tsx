import EventCardSkeleton from "./event-card-skeleton";

const cards = Array.from({ length: 10 });

const EventsListSkeleton = () => {
  return (
    <div className="py-6">
      <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {cards.map((_, i) => (
          <li key={i}>
            <EventCardSkeleton />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventsListSkeleton;
