// src/components/FilmDetail.tsx
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../../componenets/Spinner";
import { Film } from "../../types/Film";
import RatingComponent from "./RatingComponent";

const API_URL = "http://localhost:3000";
interface FilmDetailProps {
  film: Film;
}

const FilmDetail: React.FC<FilmDetailProps> = () => {
  const { filmId } = useParams<{ filmId: string }>();
  const [film, setFilm] = useState<Film | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFilm = async () => {
      setLoading(true);
      try {
        const response = await axios.get<Film>(`${API_URL}/films/${filmId}`);
        setFilm(response.data);
      } catch (error) {
        console.error("Error fetching film:", error);
        toast.error("Failed to load film data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchFilm();
  }, [filmId]);

  if (loading) return <Spinner />;
  if (!film) return <div>Film not found</div>;

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-lg">
      <img
        src={film.bannerImageUrlB}
        alt={film.title}
        className="w-full h-64 object-cover rounded-lg mb-4"
      />
      <h1 className="text-3xl font-bold mb-2 text-gray-800">{film.title}</h1>
      <p className="text-xl mb-2 text-gray-600">Directed by {film.director}</p>
      <p className="text-lg mb-4 text-gray-500">
        Released in {film.releaseYear}
      </p>
      <RatingComponent filmId={film.filmId} ratings={film.ratings} />
      <h2 className="text-2xl font-semibold mt-4 mb-2 text-gray-700">
        Overview
      </h2>
      <p className="text-gray-600">{film.filmOverview}</p>
      <h2 className="text-2xl font-semibold mt-4 mb-2 text-gray-700">Cast</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {film.actors.map((actor, index) => (
          <div key={index} className="text-center">
            <img
              src={actor.imageUrl}
              alt={actor.name}
              className="w-24 h-24 object-cover rounded-full mx-auto mb-2"
            />
            <p className="text-gray-700">{actor.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilmDetail;
