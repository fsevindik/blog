import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Film } from "../../types/types";
import BackButton from "../components/BackButton";

const API_URL = "https://serverfilmolog.onrender.com";

const RelatedFilms: React.FC = () => {
  const [films, setFilms] = useState<Film[]>([]);
  const { actorName } = useParams<{ actorName: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRelatedFilms = async () => {
      if (actorName) {
        try {
          const response = await axios.get(
            `${API_URL}/films/actor/${encodeURIComponent(actorName)}`
          );
          setFilms(response.data.films);
        } catch (error) {
          console.error("Error fetching related films:", error);
        }
      }
    };

    fetchRelatedFilms();
  }, [actorName]);

  const handleFilmClick = (filmId: string) => {
    navigate(`/Films/details/${filmId}`);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-yellow-500 rounded-xl shadow-lg relative">
      <BackButton />
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-gray-900">
        Films Featuring {actorName}
      </h2>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 sm:gap-4">
        {films.map((film) => (
          <div
            key={film._id}
            className="flex flex-col items-center cursor-pointer transition-all duration-300 hover:transform hover:scale-105"
            onClick={() => handleFilmClick(film._id)}
          >
            <div className="w-full aspect-[2/3] mb-2 sm:mb-3 overflow-hidden rounded-lg shadow-md">
              <img
                src={film.posterImageUrlA}
                alt={film.title}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-center text-gray-900 font-semibold text-xs sm:text-sm">
              {film.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedFilms;
