import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import HeartIcon from "../../icons/HeartIcon";
import HomeIcon from "../../icons/HomeIcon";
import MessageIcon from "../../icons/MessageIcon";
import UserIcon from "../../icons/UserIcon";
import UserDropdown from "../Header/UserDropDown";

const Navbar: React.FC<{ user: any }> = ({ user }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="flex items-center space-x-4">
      <NavItem to="/" icon={<HomeIcon className="w-6 h-6" />} text="Home" />
      <NavItem
        to="/films/trends"
        icon={<HeartIcon className="w-6 h-6" />}
        text="Trends"
      />
      <NavItem
        to="/"
        icon={<MessageIcon className="w-6 h-6" />}
        text="Messages"
      />
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={toggleDropdown}
          className="text-yellow-500 hover:text-white flex items-center space-x-2"
        >
          <UserIcon className="w-6 h-6" />
          <span className="hidden sm:inline">
            {user ? user.name : "Profile"}
          </span>
        </button>
        {dropdownOpen && (
          <div className="absolute right-0 top-full mt-2 bg-gray-800 text-white rounded-md shadow-lg z-20">
            <UserDropdown user={user} />
          </div>
        )}
      </div>
    </nav>
  );
};

const NavItem: React.FC<{
  to: string;
  icon: React.ReactNode;
  text: string;
}> = ({ to, icon, text }) => (
  <Link to={to} className="text-yellow-500 hover:text-white flex items-center">
    {icon}
    <span className="hidden sm:inline ml-1">{text}</span>
  </Link>
);

export default Navbar;
