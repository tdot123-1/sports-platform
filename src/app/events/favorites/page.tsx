import FavoritesList from "@/components/favorites/favorites-list";
import { fetchFavoriteEvents } from "@/lib/data/events/data";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Favorites",
};

const Page = () => {
  return (
    <>
      <section className="px-2 sm:px-4 py-8">
        <div className="mx-0 md:mx-8">
          <h1 className="text-3xl font-mono text-primary text-center md:text-left">Favorites</h1>
          <div className="p-2 rounded-md w-fit text-sm my-4 text-muted-foreground">
            <p>Store up to 10 of your favorite events for easy retrieval.</p>
            <p className="mt-1">Favorites are stored locally on your device.</p>
          </div>
        </div>

        <FavoritesList fetchDataFromServer={fetchFavoriteEvents} />
      </section>
    </>
  );
};

export default Page;
