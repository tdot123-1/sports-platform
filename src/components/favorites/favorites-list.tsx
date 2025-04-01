"use client";

import { SportsEvent } from "@/lib/types";
import { useEffect, useState } from "react";
import FavoriteCard from "./favorite-card";
import Link from "next/link";
import { Button } from "../ui/button";
import { ArrowRightIcon, LoaderIcon } from "lucide-react";

interface FavoritesListProps {
  fetchDataFromServer: (eventIds: string[]) => Promise<SportsEvent[]>;
}

const FavoritesList = ({ fetchDataFromServer }: FavoritesListProps) => {
  const [favorites, setFavorites] = useState<SportsEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // use state to be able to redirect to error component
  const [fetchError, setFetchError] = useState(false);

  // if fetch error -> throw error to call global error component 
  useEffect(() => {
    if (fetchError) {
      throw new Error("Error fetching favorites");
    }
  }, [fetchError]);

  const fetchEventData = async (localFavorites: string[]) => {
    // test skeleton
    // await new Promise((resolve) => setTimeout(resolve, 5000));

    try {
      const fetchedEvents = await fetchDataFromServer(localFavorites);
      setFavorites(fetchedEvents);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching favorites: ", error);
      setFetchError(true);
    }
  };

  useEffect(() => {
    // fetch events
    const localFavorites: string[] = JSON.parse(
      localStorage.getItem("fav") || "[]"
    );

    if (localFavorites.length) {
      fetchEventData(localFavorites);
    } else {
      setIsLoading(false);
    }
  }, [fetchDataFromServer]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center mt-32 w-full">
        <LoaderIcon
          color="hsl(var(--primary))"
          size={36}
          className="animate-spin"
        />
      </div>
    );
  }

  return (
    <>
      <div className="pb-12 pt-6">
        {favorites.length ? (
          <>
            <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {favorites.map((event) => (
                <li key={event.id}>
                  <FavoriteCard event={event} />
                </li>
              ))}
            </ul>
          </>
        ) : (
          <>
            <div className="bg-primary flex flex-col justify-center items-center gap-4 text-center border border-muted p-8 w-fit rounded-md mx-auto mt-12 shadow-md">
              <h3 className="text-lg font-mono">No favorites added yet!</h3>
              <p className="text-sm">
                Click the ❤️ heart button to add an event to your favorites.
              </p>
              <Link href={`/events/grid`}>
                <Button className="bg-basket hover:bg-basket/60" variant={`default`}>
                  <span>To events</span>
                  <ArrowRightIcon />
                </Button>
              </Link>
              <p className="text-xs italic text-muted-foreground">
                Favorites are stored locally on your device
              </p>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default FavoritesList;
