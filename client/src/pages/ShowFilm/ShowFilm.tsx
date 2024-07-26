import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "../../componenets/Spinner";
import { Film } from "../../types/Film";
import BackButton from "../components/BackButton";
import CommentSection from "./CommentSection";
import RatingComponent from "./RatingComponent";

const API_URL = "http://localhost:3000";
const userId = localStorage.getItem("userId");

const ShowFilm: React.FC = () => {
  const [film, setFilm] = useState<Film | null>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchFilm = async () => {
      setLoading(true);
      try {
        console.log(`Fetching film with ID: ${id}`);
        const response = await axios.get<Film>(`${API_URL}/films/${id}`);
        console.log("API response:", response.data);
        setFilm(response.data);
      } catch (error) {
        console.error("Error fetching film:", error);
        toast.error("Failed to load film data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchFilm();
    }
  }, [id]);

  if (loading) {
    return <Spinner />;
  }

  if (!film) {
    return <div>Film not found</div>;
  }

  return (
    <div className="min-h-screen p-2 bg-[#1c1a1a] flex flex-col items-center">
      <BackButton />
      <h1 className="text-xl my-2 text-white font-mono">Film Info</h1>

      <div className="max-w-4xl mx-auto p-4 bg-yellow-500 rounded-xl shadow-lg space-y-4">
        <div className="flex flex-col md:flex-row p-1">
          <div className="w-full md:w-1/2 pr-0 md:pr-2 mb-4 md:mb-0 flex justify-center md:justify-start p-1 ">
            <img
              src={film.posterImageUrlA}
              alt={film.title}
              className="rounded-lg shadow-lg w-full h-auto object-cover border-2 border-gray-700 mb-4 md:mb-0"
            />
          </div>
          <div className="hidden md:block w-full md:w-1/2 pl-0 md:pl-2 p-1">
            <img
              src={film.bannerImageUrlB}
              alt={film.title}
              className="rounded-lg shadow-lg w-full h-full object-cover border-2  border-gray-700"
            />
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <h1 className="text-3xl font-bold mb-2 text-gray-900">
              {film.title}
            </h1>
            <p className="text-xl mb-2 text-gray-800">
              Directed by {film.director}
            </p>
            <p className="text-lg mb-4 text-gray-700">
              Released in {film.releaseYear}
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-2 text-gray-900">
              Overview
            </h2>
            <p className="text-gray-800">{film.filmOverview}</p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-2 text-gray-900">Cast</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {film.actors.map((actor, index) => (
                <div key={index} className="text-center">
                  <img
                    src={actor.imageUrl}
                    alt={actor.name}
                    className="w-24 h-24 object-cover rounded-full mx-auto mb-2 border-2 bg-slate-800 border-gray-900"
                  />
                  <p className="text-gray-900">{actor.name}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <RatingComponent filmId={film.filmId} ratings={film.ratings} />
            <CommentSection filmId={id} currentUserId={userId} />
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default ShowFilm;
