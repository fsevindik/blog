import React, { useState } from "react";
import { Link } from "react-router-dom";
import HamburgerIcon from "../../icons/HamburgerIcon";
import HeartIcon from "../../icons/HeartIcon";
import HomeIcon from "../../icons/HomeIcon";
import MessageIcon from "../../icons/MessageIcon";
import UserDropdown from "../Header/UserDropDown";

const Navbar: React.FC<{ user: any }> = ({ user }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="bg-gray-900 text-white p-4 shadow-md">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <button
          className="text-yellow-500 hover:text-white lg:hidden"
          onClick={toggleMenu}
        >
          <HamburgerIcon className="w-6 h-6" />
        </button>
        <div
          className={`flex flex-col lg:flex-row lg:space-x-6 ${
            menuOpen ? "block" : "hidden"
          } lg:flex lg:items-center`}
        >
          <div className="flex items-center space-x-2 py-2 lg:py-0 rounded-md hover:bg-yellow-600">
            <Link
              to="/"
              className="text-yellow-500 hover:text-white flex items-center p-1"
            >
              <HomeIcon className="w-5 h-5" />
              <span className="hidden sm:inline text-sm md:text-base lg:text-md ml-1">
                Home
              </span>
            </Link>
          </div>
          <div className="flex items-center space-x-2 py-2 lg:py-0 rounded-md hover:bg-yellow-600">
            <Link
              to="/films/trends"
              className="text-yellow-500 hover:text-white flex items-center p-1"
            >
              <HeartIcon className="w-5 h-5" />
              <span className="hidden sm:inline text-sm md:text-base lg:text-md ml-1">
                Trends
              </span>
            </Link>
          </div>
          <div className="flex items-center space-x-2 py-2 lg:py-0 rounded-md hover:bg-yellow-600">
            <Link
              to="/"
              className="text-yellow-500 hover:text-white flex items-center p-1"
            >
              <MessageIcon className="w-5 h-5" />
              <span className="hidden sm:inline text-sm md:text-base lg:text-md ml-1">
                Messages
              </span>
            </Link>
          </div>
          <div className="relative flex items-center space-x-2 py-2 lg:py-0 rounded-md hover:bg-yellow-600">
            <div
              className="text-yellow-500 hover:text-white flex items-center cursor-pointer p-1"
              onClick={toggleDropdown}
            >
              <HamburgerIcon className="w-5 h-5 ml-1" />
              <span className="hidden lg:inline text-sm md:text-base lg:text-md ml-2">
                User
              </span>
            </div>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 bg-gray-800 text-white rounded-md shadow-lg z-20">
                <UserDropdown user={user} />
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
