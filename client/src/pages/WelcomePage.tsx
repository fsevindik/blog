import React from "react";
import { Link } from "react-router-dom";
import UserMessage from "./components/UserMessage";

const Welcome: React.FC = () => {
  const userName = localStorage.getItem("UserName") || "Guest";

  return (
    <div className="flex flex-grow h-full items-center justify-center min-h-screen bg-yellow-500">
      <div className="bg-white text-black p-6 rounded-md shadow-md w-full max-w-md text-center">
        <h2 className="text-2xl font-semibold mb-4">
          👋 | WELCOME dear {userName}
        </h2>
        <p>Congrats... !!! You have successfully logged in.</p>
        <p className="mb-4">Enjoy exploring our bookstore!</p>
        <ul className="list-disc list-inside text-left mb-4">
          <li className="font-semibold font-mono">
            <span className="underline">💬 </span>
            You can comment on any of them.
          </li>
          <li className="font-semibold font-mono">
            <span>👍👎 </span> Now you can rate any of them.
          </li>
          <li className="font-semibold font-mono">
            📨 Also, you may request new books directly from the manager.
          </li>
        </ul>
        <button className="bg-black text-white py-2 px-4 rounded-md animate-pulse">
          <Link to="/" className="flex items-center hover:text-gray-300">
            Explore Books
          </Link>
        </button>
      </div>{" "}
      <UserMessage />
    </div>
  );
};

export default Welcome;
