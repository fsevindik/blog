import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Film } from "../../types/types";

const FavoriteFilms: React.FC = () => {
  const [favorites, setFavorites] = useState<Film[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get<{ favorites: Film[] }>(
          `https://serverfilmolog.onrender.com/users/${userId}/favorites`
        );
        setFavorites(response.data.favorites);
      } catch (error) {
        setError("Error fetching favorite films. Please try again later.");
        console.error("Error fetching favorite films:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchFavorites();
    } else {
      setLoading(false);
      setError("User ID is not available.");
    }
  }, [userId]);

  if (loading) return <div className="text-center text-white">Loading...</div>;

  return (
    <div className="p-4 bg-gray-800 min-h-screen">
      <h2 className="lg:text-3xl  text-md font-bold mb-6 text-center text-white border-b border-white">
        Your Favorite Films
      </h2>
      {error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favorites.length > 0 ? (
            favorites.map((film) => (
              <Link
                key={film._id}
                to={`/Films/details/${film._id}`}
                className="block  bg-gray-700 rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-xl"
              >
                <img
                  src={film.posterImageUrlA}
                  alt={film.title}
                  className="w-full h-48 object-cover "
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-yellow-500 mb-1 truncate">
                    {film.title}
                  </h3>
                  <p className="text-gray-300 text-sm truncate">
                    {film.description}
                  </p>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-center text-white">No favorite films found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default FavoriteFilms;
