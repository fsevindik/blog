import axios from "axios";
import React, { useState } from "react";
import { Rating } from "../../types/Film";

interface RatingComponentProps {
  filmId: string;
  ratings?: Rating[];
}

const RatingComponent: React.FC<RatingComponentProps> = ({
  filmId,
  ratings = [],
}) => {
  const [userRating, setUserRating] = useState<number>(0);

  const handleRating = async (rating: number) => {
    try {
      const userId = "current-user-id";
      await axios.post(`/films/${filmId}/rate`, { userId, rating });
      setUserRating(rating);
    } catch (error) {
      console.error("Error rating film:", error);
    }
  };

  const averageRating =
    ratings.length > 0
      ? ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length
      : 0;

  return (
    <div>
      <p>Average Rating: {averageRating.toFixed(1)}</p>
      <div>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
          <button
            key={star}
            onClick={() => handleRating(star)}
            className={`text-2xl ${
              star <= userRating ? "text-yellow-500" : "text-gray-300"
            }`}
          >
            ★
          </button>
        ))}
      </div>
    </div>
  );
};

export default RatingComponent;
