import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import FilmContext from "../../context/FilmDb";
import useDebounce from "../../hooks/useDebounce";
import WishList from "../../pages/components/WishList";
import Navbar from "../Navbar/Navbar";
import { Film, User } from "../../types/types";
import SearchIcon from "../../icons/SearchIcon";
import HomeIcon from "../../icons/HomeIcon";

interface HeaderProps {
  user: User | null;
}

const Header: React.FC<HeaderProps> = ({ user }) => {
  const { handleSearch } = useContext(FilmContext);
  const inputRef = useRef<HTMLInputElement>(null);
  const [, setSearchResults] = useState<Film[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 400);
  const token = localStorage.getItem("token");
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

  const handleSearchClick = () => {
    if (inputRef.current) {
      setSearchTerm(inputRef.current.value);
      handleSearch(inputRef.current.value);
    }
  };

  const isWelcomePage = location.pathname === "/welcome"; 
  
  return (
    <header className="bg-gray-900 text-white p-4 shadow-lg border-b-2 border-yellow-500">
      <div className="container mx-auto">
        <div className="hidden md:flex items-center justify-between p-2">
          <Link
            to="/"
            className="text-yellow-500 hover:text-white flex items-center"
          >
            <HomeIcon
              className="md:w-8 md:h-8 w-6 h-6 hover:scale-110 transition-transform duration-300"
              size={2}
            />
          </Link>

          {!isWelcomePage && (
            <div className="relative w-1/4 max-w-xs h-8">
              <input
                type="text"
                placeholder="Search from My List"
                className="p-1 pr-8 w-full bg-gray-700 text-white text-sm border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                ref={inputRef}
                onChange={handleInputChange}
              />
              <button
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-yellow-500 transition duration-300"
                onClick={handleSearchClick}
                aria-label="Search"
              >
                <SearchIcon size={3} />
              </button>
            </div>
          )}

          <div className="flex items-center space-x-4">
            {token && <WishList />}
            <Navbar user={user} />
          </div>
        </div>

        <div className="md:hidden flex flex-col gap-2">
          <div className="flex items-center justify-between p-1">
            <Link
              to="/"
              className="text-yellow-500 hover:text-white flex items-center"
            >
              <HomeIcon
                className="w-6 h-6 hover:scale-110 transition-transform duration-300"
                size={2}
              />
            </Link>

            <div className="flex items-center space-x-3">
              {token && <WishList />}
              <Navbar user={user} />
            </div>
          </div>

          {!isWelcomePage && (
            <div className="relative w-full max-w-xs mx-auto h-8">
              <input
                type="text"
                placeholder="Search"
                className="p-1 pr-8 w-full bg-gray-800 text-white text-sm border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                ref={inputRef}
                onChange={handleInputChange}
              />
              <button
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-yellow-500 transition duration-300"
                onClick={handleSearchClick}
                aria-label="Search"
              >
                <SearchIcon size={3} />
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
