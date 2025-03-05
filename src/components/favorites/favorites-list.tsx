"use client";

import { SportsEvent } from "@/lib/types";
import { useEffect, useState } from "react";
import EventCard from "../events/events-grid/event-card";
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

  useEffect(() => {
    // fetch events
    const localFavorites: string[] = JSON.parse(
      localStorage.getItem("fav") || "[]"
    );

    const fetchEventData = async () => {
      try {
        // test skeleton
        // await new Promise((resolve) => setTimeout(resolve, 5000));

        const fetchedEvents = await fetchDataFromServer(localFavorites);
        setFavorites(fetchedEvents);
      } catch (error) {
        console.error("Error fetching favorites: ", error);
        throw new Error(`Error fetching favorites: ${error}`);
      } finally {
        setIsLoading(false);
      }
    };

    if (localFavorites.length) {
      fetchEventData();
    } else {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center mt-36 w-full">
        <LoaderIcon color="hsl(var(--primary))" size={36} className="animate-spin" />
      </div>
    );
  }

  return (
    <>
      <div className="py-12">
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
            <div className="flex flex-col justify-center items-center gap-4 text-center border border-muted p-8 w-fit rounded-md mx-auto mt-24 shadow-md">
              <h3 className="text-lg font-mono">No favorites added yet!</h3>
              <p className="text-sm">
                Click the ❤️ heart button to add an event to your favorites.
              </p>
              <Link href={`/events/grid`}>
                <Button variant={`default`}>
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
