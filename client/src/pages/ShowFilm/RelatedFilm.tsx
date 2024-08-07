import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Film } from "../../icons/types";
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
    <div className="max-w-4xl mx-auto p-4 bg-yellow-500 rounded-xl shadow-lg">
      <BackButton />
      <h2 className="text-2xl font-bold mb-4 text-gray-900">
        Films Featuring {actorName}
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {films.map((film) => (
          <div
            key={film._id}
            className="flex flex-col items-center cursor-pointer"
            onClick={() => handleFilmClick(film._id)}
          >
            <img
              src={film.posterImageUrlA}
              alt={film.title}
              className="w-20 h-25 object-cover rounded-lg shadow-md mb-2 transition-transform duration-300 transform hover:scale-110"
            />
            <p className="text-center text-gray-900 font-semibold">
              {film.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedFilms;
