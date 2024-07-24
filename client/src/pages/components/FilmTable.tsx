import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DeleteIcon from "../../icons/DeleteIcon";
import EditIcon from "../../icons/EditIcon";
import { Film } from "../../types/Film";

interface FilmsTableProps {
  films?: Film[];
}

const FilmsTable: React.FC<FilmsTableProps> = ({ films = [] }) => {
  const [userType, setUserType] = useState<string>("visitor");

  useEffect(() => {
    const userStatus = localStorage.getItem("UserRole");
    if (userStatus) {
      setUserType(userStatus);
    }
  }, []);

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-separate border-spacing-2">
        <thead>
          <tr>
            <th className="w-1/2 border border-slate-600 rounded-md bg-slate-500">
              Title
            </th>
            <th className="w-1/6 border border-slate-600 rounded-md bg-slate-500 hidden md:table-cell">
              Director
            </th>
            <th className="w-1/6 border border-slate-600 rounded-md bg-slate-500 hidden md:table-cell">
              Release Date
            </th>
            {userType === "admin" && (
              <th className="w-1/6 border border-slate-600 rounded-md bg-slate-500">
                Operations
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {films.map((film) => (
            <tr key={film._id} className="h-12 bg-gray-300">
              <td className="relative pl-5 ">
                <Link
                  to={`/Films/details/${film._id}`}
                  className="flex items-center p-2 hover:bg-yellow-600 cursor-pointer font-serif font-semibold flex-wrap md:flex-nowrap"
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
              <td className="border border-slate-700 rounded-md text-center font-semibold hidden md:table-cell w-1/6">
                {film.director}
              </td>
              <td className="border border-slate-700 rounded-md text-center font-semibold hidden md:table-cell w-1/6">
                {film.releaseYear}
              </td>
              {userType === "admin" && (
                <td className="border border-slate-700 rounded-md text-center w-1/6">
                  <div className="flex justify-center gap-x-2 md:gap-x-4">
                    <Link to={`/Films/edit/${film._id}`}>
                      <EditIcon className="h-6 w-6 text-blue-500 hover:text-blue-700" />
                    </Link>
                    <button onClick={() => {}}>
                      <DeleteIcon className="h-6 w-6 text-red-500 hover:text-red-700" />
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
