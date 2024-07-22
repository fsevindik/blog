import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AddBoxIcon from "../icons/AddBoxIcon";
import { Film } from "../types/Film";
import FilmsTable from "./components/FilmTable";

const Home: React.FC = () => {
  const [films, setFilms] = useState<Film[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const response = await axios.get("http://localhost:3000/films");
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      Home
      <div>
        <Link
          to="/films/create"
          className="text-yellow-500 h-8 w-8 ml-auto hover:text-white flex items-center"
        >
          <AddBoxIcon />
        </Link>
      </div>
      {/* <div className="flex flex-wrap gap-4 p-4">
        test part
        {films.map((film) => (
          <div
            key={film._id}
            className="border p-4 text-black rounded-lg shadow-md bg-slate-200"
          >
            <h3 className="text-lg text-black font-bold">
              filmtitle:
              {film.title}
            </h3>
            <p className="text-black">{film.filmOverview}</p>
          </div>
        ))}
      </div> */}
      <FilmsTable films={films} />
    </div>
  );
};

export default Home;
