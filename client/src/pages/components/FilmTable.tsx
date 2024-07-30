import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import DeleteIcon from "../../icons/DeleteIcon";
import EditIcon from "../../icons/EditIcon";
import { Film } from "../../types/Film";

interface FilmsTableProps {
  films?: Film[];
}

const FilmsTable: React.FC<FilmsTableProps> = ({ films = [] }) => {
  const { user } = useAuth();
  const userRole = user?.role || "visitor";

  return (
    <div className="overflow-x-auto bg-gray-700  m-5 p-1">
      <h1 className="font-mono bg-gray-900 p-2">filmolog's prescription</h1>
      <table className="w-full border-separate border-spacing-2 ">
        <thead>
          <tr>
            <th className="w-3/5 border border-slate-600 rounded-md bg-yellow-600 font-serif">
              Film
            </th>
            <th className="w-1/6 border border-slate-600 rounded-md bg-yellow-600 hidden md:table-cell font-serif">
              Director
            </th>
            <th className="w-1/6 border border-slate-600 rounded-md bg-yellow-600 hidden md:table-cell font-serif">
              Release Date
            </th>
            {userRole === "admin" && (
              <th className="w-1/6 border border-slate-600 rounded-md bg-yellow-600 font-serif ">
                Operations
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {films.map((film) => (
            <tr key={film._id} className="h-10 bg-gray-700  ">
              <td className="relative pl-5   rounded-md    ">
                <Link
                  to={`/Films/details/${film._id}`}
                  className="flex items-center p-2 rounded-md border-b  border-white  hover:bg-yellow-500 cursor-pointer font-serif font-semibold flex-wrap md:flex-nowrap"
                >
                  <img
                    src={film.posterImageUrlA}
                    alt={film.title}
                    className="h-12 w-12 object-cover mr-2 mb-2 md:h-16 md:w-16 md:mb-0"
                  />
                  <span className="md:ml-2 md:text-base text-sm">
                    {film.title}
                  </span>
                </Link>
              </td>

              <td className=" rounded-md text-center font-semibold hidden md:table-cell w-1/6">
                {film.director}
              </td>
              <td className="  rounded-md text-center font-semibold hidden md:table-cell w-1/6">
                {film.releaseYear}
              </td>
              {userRole === "admin" && (
                <td className="border    border-black  rounded-md text-center w-1/6">
                  <div className="flex justify-center gap-x-2 md:gap-x-4 ">
                    <Link to={`/Films/edit/${film._id}`}>
                      <EditIcon
                        className="h-6 w-6 text-yellow-500 hover:text-white hover:scale-105"
                        size={0}
                      />
                    </Link>
                    <button onClick={() => {}}>
                      <DeleteIcon
                        className="h-6 w-6 text-red-500 hover:text-black hover:scale-105 "
                        size={0}
                      />
                    </button>
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FilmsTable;
