import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import DeleteIcon from "../../icons/DeleteIcon";
import EditIcon from "../../icons/EditIcon";
import { Film } from "../../types/Film";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL = "https://serverfilmolog.onrender.com";

interface FilmsTableProps {
  films?: Film[];
  setFilms: React.Dispatch<React.SetStateAction<Film[]>>;
}

const FilmsTable: React.FC<FilmsTableProps> = ({ films = [], setFilms }) => {
  const { user } = useAuth();
  const userRole = user?.role || "visitor";

  const handleDelete = async (filmId: string) => {
    const confirmDelete = window.confirm("Are you sure? You want to delete this film!!!");
    if (!confirmDelete) return;

    try {
      const response = await axios.delete(`${API_URL}/films/${filmId}`);
      if (response.status === 200) {
        toast.success("Film successfully deleted.");
        setFilms((prevFilms) => prevFilms.filter((film) => film._id !== filmId));
      } else {
        toast.error("Failed to delete the film.");
      }
    } catch (error) {
      console.error("Error deleting film:", error);
      toast.error("An error occurred while deleting the film.");
    }
  };

  const sortedFilms = films.sort((a, b) => a.title.localeCompare(b.title));

  return (
    <div className="overflow-x-auto bg-gray-700 m-5 p-1">
      <h1 className="font-mono bg-gray-900 p-2">filmolog's prescription</h1>
      <table className="w-full border-separate border-spacing-2">
        <thead>
          <tr>
            <th className="w-3/5 border border-slate-600 rounded-md bg-yellow-600 font-serif">Film</th>
            <th className="w-1/6 border border-slate-600 rounded-md bg-yellow-600 hidden md:table-cell font-serif">Director</th>
            <th className="w-1/6 border border-slate-600 rounded-md bg-yellow-600 hidden md:table-cell font-serif">Release Date</th>
            {userRole === "admin" && (
              <th className="w-1/6 border border-slate-600 rounded-md bg-yellow-600 font-serif">Operations</th>
            )}
          </tr>
        </thead>
        <tbody>
          {sortedFilms.map((film) => (
            <tr key={film._id} className="h-10 bg-gray-700 hover:bg-gray-600 transition-colors duration-200">
              <td className="relative pl-5 rounded-md">
                <Link
                  to={`/Films/details/${film._id}`}
                  className="flex items-center p-2 rounded-md hover:bg-yellow-500 cursor-pointer font-serif font-semibold flex-col md:flex-row transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  <div className="overflow-hidden rounded-md mb-2 md:mb-0">
                    <img
                      src={film.posterImageUrlA}
                      alt={film.title}
                      className="object-cover w-32 h-40 md:w-16 md:h-20 lg:w-20 lg:h-24 transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <span className="text-sm md:text-base ml-0 md:ml-3 mt-2 md:mt-0 text-center md:text-left">{film.title}</span>
                </Link>
              </td>
              <td className="rounded-md text-center font-semibold hidden md:table-cell w-1/6">{film.director}</td>
              <td className="rounded-md text-center font-semibold hidden md:table-cell w-1/6">{film.releaseYear}</td>
              {userRole === "admin" && (
                <td className="border border-white rounded-md text-center w-1/6">
                  <div className="flex justify-center gap-x-2 md:gap-x-4">
                    <Link to={`/Films/edit/${film._id}`}>
                      <EditIcon className="h-6 w-6 text-yellow-500 hover:text-white hover:scale-105" size={0} />
                    </Link>
                    <button onClick={() => handleDelete(film._id)}>
                      <DeleteIcon className="h-6 w-6 text-red-500 hover:text-black hover:scale-105" size={0} />
                    </button>
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <ToastContainer />
    </div>
  );
};

export default FilmsTable;