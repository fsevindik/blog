import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import FilmContext from "../context/FilmDb";
import AddBoxIcon from "../icons/AddBoxIcon";
import { Film } from "../types/Film";
import FilmSlider from "./components/FilmSlider";
import FilmsTable from "./components/FilmTable";

const Home: React.FC = () => {
  const [films, setFilms] = useState<Film[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const API_URL = "https://serverfilmolog.onrender.com";
  
  const { user } = useAuth();
  const { search } = useContext(FilmContext);
  const userRole = user?.role || "visitor";

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const response = await axios.get(`${API_URL}/films`);
        const filmsData = response.data.data;
        if (Array.isArray(filmsData)) {
          setFilms(filmsData);
        } else {
          setFilms([]);
        }
      } catch (error) {
        console.error("Failed to fetch films:", error);
        setError("Failed to fetch films");
      } finally {
        setLoading(false);
      }
    };

    fetchFilms();
  }, []);

  const filteredFilms = search
    ? films.filter((film) => 
        film.title.toLowerCase().includes(search.toLowerCase())
      )
    : films;

  const isSearching = search !== "";

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <div>
        {userRole === "admin" && (
          <Link
            to="/films/create"
            className="text-yellow-500 h-8 w-8 ml-auto mr-5 mt-5 border-b-2 border-r-2 border-yellow-500 rounded-md hover:text-white hover:bg-green-400 flex items-center"
          >
            <AddBoxIcon />
          </Link>
        )}
      </div>
      
      {isSearching ? (
        <div className="p-5 bg-gray-800 text-white">
          <h2 className="text-xl font-bold mb-2 ">Your Search Results</h2>
          <p>{filteredFilms.length} film(s) found</p>
        </div>
      ) : (
        <FilmSlider films={films} />
      )}
      
      <FilmsTable films={filteredFilms} setFilms={setFilms} />
    </div>
  );
};

export default Home;