import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import FilmContext from "../../context/FilmDb";
import useDebounce from "../../hooks/useDebounce";
import DoctorIcon from "../../icons/DoctorIcon";
import Navbar from "../Navbar/Navbar";

interface HeaderProps {
  user: any;
}

const Header: React.FC<HeaderProps> = ({ user }) => {
  const { handleSearch } = useContext(FilmContext);
  const inputRef = useRef<HTMLInputElement>(null);
  const [, setSearchResults] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 400);
  const location = useLocation();

  useEffect(() => {
    const performSearch = async () => {
      if (debouncedSearchTerm) {
        try {
          const results = await axios.get(`/api/search`, {
            params: { query: debouncedSearchTerm },
          });
          setSearchResults(results.data);
        } catch (error) {
          console.error("Error searching:", error);
          setSearchResults([]);
        }
      } else {
        setSearchResults([]);
      }
    };

    performSearch();
  }, [debouncedSearchTerm]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    handleSearch(value);
  };

  const handleButtonClick = () => {
    if (inputRef.current) {
      setSearchTerm(inputRef.current.value);
    }
  };

  return (
    <header className="bg-gray-900 text-white p-4 shadow-lg">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between">
        <div className="flex items-center mb-4 sm:mb-0">
          <DoctorIcon className="w-8 h-8 text-yellow-300 mr-2" size={12} />
          <p className="lg:text-lg font-semibold md:text-sm text-sm text-yellow-300 mr-5">
            Dr. Filmolog: Your cinematic cure
          </p>
        </div>
        {location.pathname === "/" && (
          <div className="flex items-center w-full sm:w-auto mb-4 sm:mb-0">
            <input
              type="text"
              placeholder="Search from My List"
              className="p-2 w-full sm:w-64 bg-gray-700 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              ref={inputRef}
              onChange={handleInputChange}
            />
            <button
              className="p-2 w-1/4  bg-yellow-500 text-white rounded-md ml-2 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              onClick={handleButtonClick}
            >
              Search
            </button>
          </div>
        )}

        <Navbar user={user} />
      </div>
    </header>
  );
};

export default Header;
