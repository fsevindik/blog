import React from "react";
import { Link } from "react-router-dom";
import HomeIcon from "../../icons/HomeIcon";
import MessageIcon from "../../icons/MessageIcon";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-700 p-4 rounded-lg shadow-md">
      <ul className="flex space-x-4">
        <li>
          <Link to="/" className="text-white hover:text-gray-300">
            <HomeIcon />
          </Link>
        </li>

        <li>
          <Link to="/services" className="text-white hover:text-gray-300">
            most beloveds
          </Link>
        </li>
        <li>
          <Link to="/" className="text-white hover:text-gray-300">
            <MessageIcon />
          </Link>
        </li>
        <li>
          <Link to="/" className="text-white hover:text-gray-300">
            user
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
