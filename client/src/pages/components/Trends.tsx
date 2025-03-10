import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Spinner from "../../componenets/Spinner";
import StarIcon from "../../icons/StarIcon";
import { Film } from "../../types/types";
import BackButton from "./BackButton";

const API_URL = "https://serverfilmolog.onrender.com";

const Trends = () => {
  const [films, setFilms] = useState<Film[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API_URL}/films`)
      .then(async (response) => {
        const allFilms = response.data.data;
        const filmsWithRatings = await Promise.all(
          allFilms.map(async (film: Film) => {
            const ratingResponse = await axios.get(
              `${API_URL}/films/${film._id}/averageRating`
            );
            return {
              ...film,
              averageRating: ratingResponse.data.averageRating,
            };
          })
        );
        const trendingFilms = filmsWithRatings
          .sort((a, b) => (b.averageRating ?? 0) - (a.averageRating ?? 0))
          .slice(0, 8);
        setFilms(trendingFilms);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const truncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return `${text.substring(0, maxLength)}...`;
    }
    return text;
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="bg-[#1c1a1a] flex flex-grow flex-col items-center justify-center relative">
      <BackButton />
      <div className="flex-grow w-full my-8 mx-auto max-w-6xl px-4 pt-4">
        <h2 className="text-4xl font-bold text-center mb-8 text-white border-b border-white p-1">
          Top Rated
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {films.map((film) => (
            <Link key={film._id} to={`/films/details/${film._id}`}>
              <div className="bg-yellow-500 p-4 rounded-lg shadow-md flex flex-col h-[400px] cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105">
                <div className="flex flex-grow overflow-hidden rounded-lg justify-center">
                  <img
                    src={film.posterImageUrlA}
                    alt={film.title}
                    className="items-center top-0 w-3/4 h-full object-cover rounded-lg border-2 border-gray-700"
                  />
                </div>
                <div className="mt-4 flex flex-col justify-between">
                  <div>
                    <h3 className="font-semibold text-center md:text-md sm:text-sm h-10 overflow-hidden">
                      {truncateText(film.title, 30)}
                    </h3>
                    <p className="font-bold text-center md:text-md sm:text-sm p-2 mb-1">
                      <span className="font-serif text-gray-900">
                        {truncateText(film.director, 20)}
                      </span>
                    </p>
                  </div>
                  <div className="flex items-center justify-center mt-2">
                    <StarIcon className="text-gray-700 mr-1 text-sm" size={5} />
                    <span className="text-white md:text-md sm:text-xs font-bold">
                      {film.averageRating
                        ? film.averageRating.toFixed(1)
                        : "N/A"}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Trends;