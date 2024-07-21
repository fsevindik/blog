import React from "react";
import Navbar from "../Navbar/Navbar";

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 text-white p-4 flex items-center justify-between">
      <img src="logo.png" alt="Site Logo" className="w-12 h-12" />
      <h1 className="text-xl font-bold">DR.filmolog</h1>
      <Navbar />
    </header>
  );
};

export default Header;
