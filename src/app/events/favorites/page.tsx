import FavoritesList from "@/components/favorites/favorites-list";
import { fetchFavoriteEvents } from "@/lib/data/events/data";

const Page = () => {
  return (
    <>
      <section className="px-4 bg-basket-background">
        <h1 className="text-3xl font-mono text-primary pt-6">Favorites</h1>
        <div className="p-2 rounded-md w-fit text-sm my-4 text-muted-foreground">
          <p>Store up to 10 of your favorite events for easy retrieval.</p>
          <p className="mt-1">Favorites are stored locally on your device.</p>
        </div>

        <FavoritesList fetchDataFromServer={fetchFavoriteEvents} />
      </section>
    </>
  );
};

export default Page;
