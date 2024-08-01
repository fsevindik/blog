// Example ShowFilmInfo component

import axios from "axios";
import React, { useState } from "react";
import AverageIcon from "../../icons/AverageIcon";
import { Film } from "../../icons/types"; // Adjust path if necessary
import FavoriteButton from "../components/FavoriteButton";
import RateModal from "./RateModal";
import YouTubeEmbed from "./YouTubeEmbed";

interface FilmInfoProps {
  film: Film;
  userId: string | null;
}

const API_URL = "https://serverfilmolog.onrender.com";

const extractYouTubeVideoId = (url: string): string | null => {
  const match = url.match(
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^\s&]+)/
  );
  return match ? match[1] : null;
};

const ShowFilmInfo: React.FC<FilmInfoProps> = ({
  film: initialFilm,
  userId,
}) => {
  const [film, setFilm] = useState<Film>(initialFilm);
  const [averageRating, setAverageRating] = useState(
    initialFilm.ratings.length > 0 ? initialFilm.ratings[0].rating : 0
  );
  const trailerId = extractYouTubeVideoId(film.trailerUrl);

  const handleRate = async (rate: number) => {
    if (!userId) return;

    try {
      const response = await axios.post(`${API_URL}/films/${film._id}/rate`, {
        userId,
        rating: rate,
      });

      if (response.status === 200) {
        setFilm({
          ...film,
          ratings: response.data.ratings,
        });
        setAverageRating(response.data.averageRating);
      }
    } catch (error) {
      console.error("Error rating the film:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-yellow-500 rounded-xl shadow-lg space-y-4">
      <div className="flex flex-col md:flex-row p-1">
        <div className="md:w-1/2 pr-0 md:pr-2 mb-4 md:mb-0 flex justify-center md:justify-start p-1">
          <img
            src={film.posterImageUrlA}
            alt={film.title}
            className="rounded-lg shadow-lg w-full h-[500px] object-cover border-4 border-gray-900 mb-4 md:mb-0"
          />
        </div>
        <div className="hidden md:block w-full md:w-1/2 pl-0 md:pl-2 p-1">
          <img
            src={film.bannerImageUrlB}
            alt={film.title}
            className="rounded-lg shadow-lg w-full h-[500px] object-cover border-4 border-gray-900"
          />
        </div>
      </div>
      {trailerId && <YouTubeEmbed trailerId={trailerId} title={film.title} />}
      <div className="space-y-4">
        <div className="border-b-2 border-black">
          <h1 className="text-2xl md:text-3xl font-bold mb-2 text-gray-900">
            {film.title}
          </h1>
          <p className="text-lg md:text-xl mb-2 text-gray-800">
            Directed by {film.director}
          </p>
          <p className="text-base md:text-lg mb-4 text-gray-700">
            Released in {film.releaseYear}
          </p>
        </div>
        <div>
          <h2 className="text-xl md:text-2xl font-semibold mb-2 text-gray-900">
            Overview
          </h2>
          <p className="text-gray-800">{film.filmOverview}</p>
        </div>
        <div>
          <h2 className="text-xl md:text-2xl font-semibold mb-2 text-gray-900">
            Cast
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {film.actors.map((actor, index) => (
              <div
                key={index}
                className=" flex flex-col items-center text-center"
              >
                <img
                  src={actor.imageUrl}
                  alt={actor.name}
                  className="w-20 h-28 sm:w-24 sm:h-32 object-cover p-1 rounded-md -auto mb-2 border-1 bg-slate-100 border-gray-800"
                />
                <p className="text-gray-900 md:text-sm sm:text-xs font-semibold ">
                  {actor.name}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-grow items-center">
          <AverageIcon rating={averageRating} />
          <RateModal film={film} onRate={handleRate} />
        </div>
        <FavoriteButton filmId={film._id} userId={userId} />
      </div>
    </div>
  );
};

export default ShowFilmInfo;
