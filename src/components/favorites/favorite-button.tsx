"use client";

import { HeartIcon, HeartOffIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";

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
      // add to favs
      newFavorites.push(eventId);
    }

    // update local storage and state
    localStorage.setItem("fav", JSON.stringify(newFavorites));
    setIsFavorite((prev) => !prev);
  };

  return (
    <>
      <Button onClick={toggleFavorite}>
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
