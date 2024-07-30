import axios from "axios";
import React, { useEffect, useState } from "react";
import HeartIcon from "../../icons/HeartIcon";
import HearthIcon from "../../icons/HearthIcon";

interface FavoriteButtonProps {
  filmId: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ filmId }) => {
  const [isFavorited, setIsFavorited] = useState<boolean>(false);

  const userId = localStorage.getItem("userId");
  const userName = localStorage.getItem("userName");

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
    <>
      {userId && userName && (
        <button onClick={handleFavorite}>
          {isFavorited ? (
            <HearthIcon size={16} className="text-red-700" />
          ) : (
            <HeartIcon size={16} className="text-white" />
          )}
        </button>
      )}
    </>
  );
};

export default FavoriteButton;
