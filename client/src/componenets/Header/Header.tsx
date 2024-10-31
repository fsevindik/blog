import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import FilmContext from "../../context/FilmDb";
import useDebounce from "../../hooks/useDebounce";
import DoctorIcon from "../../icons/DoctorIcon";
import WishList from "../../pages/components/WishList";
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
  const token = localStorage.getItem("token");

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
    <header className="bg-gray-900 text-white p-4 shadow-lg border-b-2 border-yellow-500">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="flex items-center mb-4 lg:mb-0">
            {!token ? null : <WishList />}

            <DoctorIcon
              className="w-8 h-8 text-yellow-400 mr-2 ml-12"
              size={12}
            />
            <p className="text-sm lg:text-lg font-semibold text-yellow-400 mr-5">
              Dr. Filmolog: Your cinematic cure
            </p>
          </div>

          {location.pathname === "/" && (
            <div className="flex-grow flex items-center justify-center mb-4 lg:mb-0 lg:mr-4">
              <input
                type="text"
                placeholder="Search from My List"
                className="p-2 w-full lg:w-64 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                ref={inputRef}
                onChange={handleInputChange}
              />
              <button
                className="p-2 w-1/4 lg:w-auto bg-yellow-500 text-gray-900 font-semibold rounded-md ml-2 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-300"
                onClick={handleButtonClick}
              >
                Search
              </button>
            </div>
          )}

          <div className="flex items-center lg:ml-auto">
            <Navbar user={user} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
