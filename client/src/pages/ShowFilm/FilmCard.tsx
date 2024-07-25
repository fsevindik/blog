import React from "react";
import { Link } from "react-router-dom";
import { Film } from "../../types/Film";

interface FilmCardProps {
  film: Film;
}

const FilmCard: React.FC<FilmCardProps> = ({ film }) => {
  return (
    <Link
      to={`/film/${film.filmId}`}
      className="bg-white rounded-lg shadow-md overflow-hidden"
    >
      <img
        src={film.posterImageUrlA}
        alt={film.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold">{film.title}</h2>
        <p className="text-gray-600">{film.director}</p>
        <p className="text-gray-500">{film.releaseYear}</p>
      </div>
    </Link>
  );
};

export default FilmCard;
