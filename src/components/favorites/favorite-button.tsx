"use client";

import { HeartIcon, HeartOffIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const FavoriteButton = ({ eventId }: { eventId: string }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const localFavorites: string[] = JSON.parse(
      localStorage.getItem("fav") || "[]"
    );

    setIsFavorite(localFavorites.includes(eventId));
  }, [eventId]);

  const toggleFavorite = () => {
    let newFavorites: string[] = JSON.parse(
      localStorage.getItem("fav") || "[]"
    );
    if (isFavorite) {
      // remove from favs
      newFavorites = newFavorites.filter((id) => id !== eventId);
    } else {
      // check if favorites is less than 10
      if (newFavorites.length < 10) {
        // add to favs
        newFavorites.push(eventId);
      } else {
        // show toast if favorites is full
        toast.warning("Maximum favorites selected", {
          description: "Tip: un-favorite some events to add new favorites",
        });

        return;
      }
    }

    // update local storage and state
    localStorage.setItem("fav", JSON.stringify(newFavorites));
    setIsFavorite((prev) => !prev);
  };

  return (
    <>
      <Button
        className="bg-basket hover:bg-basket/60 border-2 shadow-md"
        type={`button`}
        onClick={toggleFavorite}
      >
        {isFavorite ? (
          <>
            <HeartOffIcon />
            <span className="hidden md:block">Unfavorite</span>
          </>
        ) : (
          <>
            <HeartIcon />
            <span className="hidden md:block">Favorite</span>
          </>
        )}
      </Button>
    </>
  );
};

export default FavoriteButton;
