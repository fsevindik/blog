import axios from "axios";
import React, { useEffect, useState } from "react";
import HeartIcon from "../../icons/HeartIcon";
import HearthIcon from "../../icons/HearthIcon";

interface FavoriteButtonProps {
  filmId: string;
  userId: string | null;
}

const API_URL = "http://localhost:3000";

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ filmId }) => {
  const [isFavorited, setIsFavorited] = useState<boolean>(false);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const checkIfFavorited = async () => {
      if (!userId) return;

      try {
        const response = await axios.get(
          `${API_URL}/users/${userId}/favorites`
        );
        const { favorites } = response.data;
        setIsFavorited(favorites.includes(filmId));
      } catch (error) {
        console.error("Error checking favorites:", error);
      }
    };

    checkIfFavorited();
  }, [filmId, userId]);

  const handleFavorite = async () => {
    if (!userId) {
      alert("Lütfen giriş yapın!");
      return;
    }

    try {
      if (isFavorited) {
        await axios.delete(`${API_URL}/users/${userId}/favorites/${filmId}`);
      } else {
        await axios.post(`${API_URL}/users/${userId}/favorites/${filmId}`);
      }
      setIsFavorited(!isFavorited);
    } catch (error) {
      console.error("Error updating favorites:", error);
    }
  };

  return (
    <button
      onClick={handleFavorite}
      disabled={!userId}
      className={`cursor-${userId ? "pointer" : "not-allowed"} ${
        !userId ? "opacity-50" : ""
      }`}
    >
      {isFavorited ? (
        <HearthIcon size={16} className="text-red-700" />
      ) : (
        <HeartIcon className="text-white" />
      )}
    </button>
  );
};

export default FavoriteButton;
