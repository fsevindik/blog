import React from "react";
import { Link } from "react-router-dom";
import HamburgerIcon from "../../icons/HamburgerIcon";
import HeartIcon from "../../icons/HeartIcon";
import HomeIcon from "../../icons/HomeIcon";
import MessageIcon from "../../icons/MessageIcon";

const Navbar: React.FC = () => {
  return (
    <nav className="p-4 rounded-lg shadow-md ">
      <div className="flex items-center justify-between">
        <ul className="flex items-center space-x-6">
          <li className="flex items-center space-x-2">
            <Link
              to="/"
              className=" text-yellow-500  hover:text-white  flex items-center"
            >
              <HomeIcon className="w-5 h-5 mr-1 " />
              <span className="hidden sm:inline text-sm md:text-base lg:text-md">
                Home
              </span>
            </Link>
          </li>

          <li className="flex items-center space-x-2">
            <Link
              to="/services"
              className="text-yellow-500 hover:text-white  flex items-center"
            >
              <HeartIcon className="w-5 h-5 mr-1" />
              <span className="hidden sm:inline text-sm md:text-base lg:text-md">
                Most Beloveds
              </span>
            </Link>
          </li>

          <li className="flex items-center space-x-2">
            <Link
              to="/"
              className="text-yellow-500 hover:text-white  flex items-center"
            >
              <MessageIcon className="w-5 h-5 mr-1" />
              <span className="hidden sm:inline  text-sm md:text-base lg:text-md">
                Messages
              </span>
            </Link>
          </li>

          <li className="flex items-center space-x-2">
            <div className="text-yellow-500 hover:text-white  flex items-center">
              <span className="hidden sm:inline  text-sm md:text-base lg:text-md">
                User
              </span>
              <HamburgerIcon className="w-5 h-5 ml-1" />
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
