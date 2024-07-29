import axios from "axios";
import React, { useEffect, useState } from "react";

interface FavoriteButtonProps {
  filmId: string;
  userId: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ filmId, userId }) => {
  const [isFavorited, setIsFavorited] = useState<boolean>(false);

  useEffect(() => {
    const checkIfFavorited = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/users/${userId}/favorites`
        );
        const { favorites } = response.data;
        setIsFavorited(favorites.includes(filmId));
      } catch (error) {
        console.error("Error checking favorites:", error);
      }
    };

    if (userId) {
      checkIfFavorited();
    }
  }, [filmId, userId]);

  const handleFavorite = async () => {
    try {
      if (isFavorited) {
        await axios.delete(
          `http://localhost:3000/users/${userId}/favorites/${filmId}`
        );
      } else {
        await axios.post(
          `http://localhost:3000/users/${userId}/favorites/${filmId}`
        );
      }
      setIsFavorited(!isFavorited);
    } catch (error) {
      console.error("Error updating favorites:", error);
    }
  };

  return (
    <button onClick={handleFavorite}>
      {isFavorited ? (
        <span role="img" aria-label="favorited">
          ❤️
        </span>
      ) : (
        <span role="img" aria-label="not-favorited">
          🤍
        </span>
      )}
    </button>
  );
};

export default FavoriteButton;
