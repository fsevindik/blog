import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const UserDropdown: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [showTooltip, setShowTooltip] = useState(false);

  const userNameFirstChar = user ? user.name.charAt(0).toUpperCase() : "G";

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="py-2">
      <div className="p-4 flex items-center text-white">
        {user ? (
          <Link
            to={user.role === "admin" ? "/admin" : "/welcome"}
            className="rounded-full hover:ring-2 hover:ring-red-500"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-black font-bold hover:text-red-500">
              {userNameFirstChar}
            </div>
            {showTooltip && (
              <div className="absolute bg-red-600 text-white text-md py-1 px-2 rounded-md mt-2">
                {user.role === "admin"
                  ? "Go to admin dashboard"
                  : "Go to your welcome page"}
              </div>
            )}
          </Link>
        ) : (
          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-black font-bold">
            {userNameFirstChar}
          </div>
        )}
        <span className="ml-2">{user ? user.name : "Guest"}</span>
      </div>
      <div className="border-t border-gray-200"></div>
      <div className="p-2">
        {user ? (
          <button
            onClick={handleLogout}
            className="block w-full text-yellow-500 text-left px-4 py-2 text-md rounded-md hover:bg-red-500 hover:text-white"
          >
            Logout
          </button>
        ) : (
          <>
            <Link
              to="/auth?mode=login"
              className="block rounded-md text-yellow-500 px-4 py-2 text-sm font-bold hover:text-black hover:bg-yellow-500"
            >
              Login
            </Link>
            <Link
              to="/auth?mode=register"
              className="block rounded-md px-4 py-2 text-sm font-bold text-yellow-500 hover:text-black hover:bg-yellow-500"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default UserDropdown;
