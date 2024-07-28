import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "../../componenets/Spinner";
import { Film } from "../../types/Film";
import BackButton from "../components/BackButton";
import CommentSection from "./CommentSection";
import FilmInfo from "./ShowFilmInfo";

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
      <FilmInfo film={film} userId={userId} />

      <div>
        <CommentSection filmId={film._id} currentUserId={userId} _id={null} />
      </div>
      <ToastContainer />
    </div>
  );
};

export default ShowFilm;
