import React from "react";
import { Film } from "../../icons/types";

interface FilmInfoProps {
  film: Film;
  userId: string | null;
}

const extractYouTubeVideoId = (url: string): string | null => {
  const match = url.match(
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^\s&]+)/
  );
  return match ? match[1] : null;
};

const FilmInfo: React.FC<FilmInfoProps> = ({ film, userId }) => {
  const trailerId = extractYouTubeVideoId(film.trailerUrl);

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
      {trailerId && (
        <div className="w-full flex justify-center">
          <iframe
            width="100%"
            height="500"
            src={`https://www.youtube.com/embed/${trailerId}`}
            title={film.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-lg shadow-lg border-4 border-gray-900"
          ></iframe>
        </div>
      )}

      <div className="space-y-4">
        <div>
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
              <div key={index} className="text-center">
                <img
                  src={actor.imageUrl}
                  alt={actor.name}
                  className="w-20 h-28 sm:w-24 sm:h-32 object-cover rounded-full mx-auto mb-2 border-2 bg-slate-800 border-gray-900"
                />
                <p className="text-gray-900 text-sm sm:text-base">
                  {actor.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilmInfo;
