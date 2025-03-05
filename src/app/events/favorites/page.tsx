import FavoritesList from "@/components/favorites/favorites-list";
import { fetchFavoriteEvents } from "@/lib/data/events/data";

const Page = () => {
  return (
    <>
      <section className="px-4">
        <FavoritesList fetchDataFromServer={fetchFavoriteEvents} />
      </section>
    </>
  );
};

export default Page;
