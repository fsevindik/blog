import React from "react";
import { Link } from "react-router-dom";
import HamburgerIcon from "../../icons/HamburgerIcon";
import HeartIcon from "../../icons/HeartIcon";
import HomeIcon from "../../icons/HomeIcon";
import MessageIcon from "../../icons/MessageIcon";

const Navbar: React.FC = () => {
  return (
    <nav className="p-4 rounded-lg shadow-md bg-gray-800">
      <div className="flex items-center justify-between">
        <ul className="flex items-center space-x-4">
          <li className="flex items-center space-x-2">
            <Link
              to="/"
              className="text-white hover:text-yellow-600 flex items-center"
            >
              <HomeIcon className="w-5 h-5" />
              <span className="hidden sm:inline text-sm md:text-base lg:text-lg">
                Home
              </span>
            </Link>
          </li>

          <li className="flex items-center space-x-2">
            <Link
              to="/services"
              className="text-white hover:text-yellow-600 flex items-center"
            >
              <HeartIcon className="w-5 h-5" />
              <span className="hidden sm:inline text-sm md:text-base lg:text-lg">
                Most Beloveds
              </span>
            </Link>
          </li>

          <li className="flex items-center space-x-2">
            <Link
              to="/"
              className="text-white hover:text-yellow-600 flex items-center"
            >
              <MessageIcon className="w-5 h-5" />
              <span className="hidden sm:inline text-sm md:text-base lg:text-lg">
                Messages
              </span>
            </Link>
          </li>

          <li className="flex items-center space-x-2">
            <div className="text-white hover:text-yellow-600 flex items-center cursor-pointer">
              <span className="hidden sm:inline text-sm md:text-base lg:text-lg">
                User
              </span>
              <HamburgerIcon className="w-5 h-5 ml-2" />
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
