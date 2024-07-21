import React from "react";
import DoctorIcon from "../../icons/DoctorIcon";
import Navbar from "../Navbar/Navbar";

const Header: React.FC = () => {
  return (
    <header className="bg-gray-900 text-yellow-500 p-4 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <DoctorIcon />
        <span className="text-xs md:text-lg font-semi-bold font-cursive">
          Dr. Filmolog
        </span>
      </div>
      <Navbar />
    </header>
  );
};

export default Header;
