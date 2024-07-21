import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Film {
  director: string;
  _id: string;
  title: string;
  author: string;
  publishYear: number;
  posterImageUrlA: string;
}

interface FilmsTableProps {
  Films?: Film[];
}

const FilmsTable: React.FC<FilmsTableProps> = ({ Films = [] }) => {
  const [showEditTooltip, setShowEditTooltip] = useState<boolean>(false);
  const [editTooltipIndex, setEditTooltipIndex] = useState<number | null>(null);
  const [showDeleteTooltip, setShowDeleteTooltip] = useState<boolean>(false);
  const [deleteTooltipIndex, setDeleteTooltipIndex] = useState<number | null>(
    null
  );
  const [userType, setUserType] = useState<string>("visitor");

  useEffect(() => {
    const userStatus = localStorage.getItem("UserRole");
    if (userStatus) {
      setUserType(userStatus);
    }
  }, []);

  const handleEditMouseEnter = (index: number) => {
    setShowEditTooltip(true);
    setEditTooltipIndex(index);
  };

  const handleEditMouseLeave = () => {
    setShowEditTooltip(false);
    setEditTooltipIndex(null);
  };

  const handleDeleteMouseEnter = (index: number) => {
    setShowDeleteTooltip(true);
    setDeleteTooltipIndex(index);
  };

  const handleDeleteMouseLeave = () => {
    setShowDeleteTooltip(false);
    setDeleteTooltipIndex(null);
  };

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
              Publish Year
            </th>
            {userType === "admin" && (
              <th className="w-1/6 border border-slate-600 rounded-md bg-slate-500">
                Operations
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {Films.map((Film, _index) => (
            <tr key={Film._id} className="h-12 bg-gray-300">
              <td className="relative pl-5 ">
                <Link
                  to={`/Films/details/${Film._id}`}
                  className="flex items-center p-2 hover:bg-yellow-600 cursor-pointer font-serif font-semibold flex-wrap md:flex-nowrap"
                >
                  <img
                    src={Film.posterImageUrlA}
                    alt={Film.title}
                    className="h-12 w-12 object-cover mr-2 mb-2 md:h-16 md:w-16 md:mb-0"
                  />
                  <span className="md:ml-2 md:text-base text-sm">
                    {Film.title}
                  </span>
                </Link>
              </td>
              <td className="border border-slate-700 rounded-md text-center font-semibold hidden md:table-cell w-1/6">
                {Film.director}
              </td>
              <td className="border border-slate-700 rounded-md text-center font-semibold hidden md:table-cell w-1/6">
                {Film.publishYear}
              </td>
              {userType === "admin" && (
                <td className="border border-slate-700 rounded-md text-center w-1/6">
                  {/* <div className="flex justify-center gap-x-2 md:gap-x-4">
                    <DetailsButton FilmId={Film._id} />
                    <EditButton
                      FilmId={Film._id}
                      userType={userType}
                      index={index}
                      handleMouseEnter={handleEditMouseEnter}
                      handleMouseLeave={handleEditMouseLeave}
                    />
                    <DeleteButton
                      FilmId={Film._id}
                      userType={userType}
                      index={index}
                      handleMouseEnter={handleDeleteMouseEnter}
                      handleMouseLeave={handleDeleteMouseLeave}
                    />
                  </div> */}
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
