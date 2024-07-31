import React from "react";
import { Link } from "react-router-dom";
import FavoriteFilms from "./components/FavoriteFilms";

const Welcome: React.FC = () => {
  const userName = localStorage.getItem("userName");

  return (
    <div className="flex flex-col md:flex-row h-full items-center justify-center min-h-screen bg-yellow-600">
      <div className="md:w-1/2 md:ml-4 flex-shrink-0 m-5">
        <FavoriteFilms />
      </div>
      <div className="bg-white text-black p-6 rounded-md shadow-md w-full max-w-md text-center md:w-1/2 md:mr-4">
        <h2 className="text-2xl font-semibold mb-4">
          👋 | Welcome dear {userName}
        </h2>
        <p>Congrats... !!! You have successfully logged in.</p>
        <p className="mb-4">Enjoy exploring movies from my own picks !</p>
        <div className="space-y-4">
          <div className="font-semibold font-mono">
            <span className="underline">💬 </span>
            You can comment on any of them.
            <hr className="my-2" />
          </div>
          <div className="font-semibold font-mono">
            <span>💛 </span> Dont forget to collet your own favorites .
            <hr className="my-2" />
          </div>
          <div className="font-semibold font-mono">
            <span>👍👎 </span> Now you can rate any of them.
            <hr className="my-2" />
          </div>
          <div className="font-semibold font-mono">
            📨 Also, you can send message to admin, you have direct line to him,
            by clicking on the blue dot🔵 on the rigth bottom side. ↘️
            <hr className="my-2" />
          </div>
        </div>
        <button className="bg-black text-white py-2 px-4 rounded-md animate-pulse mt-4">
          <Link to="/" className="flex items-center hover:text-gray-300">
            Explore Films
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Welcome;
