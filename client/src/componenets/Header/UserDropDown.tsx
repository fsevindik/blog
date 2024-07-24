import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User } from "../../icons/types";

interface UserDropdownProps {
  onLogout?: () => void;
  user: User | null;
}

const UserDropdown: React.FC<UserDropdownProps> = ({ onLogout, user }) => {
  const navigate = useNavigate();
  const [showTooltip, setShowTooltip] = useState(false);

  const userRole = localStorage.getItem("UserRole");
  const userName = user ? user.name : "Guest";
  const userNameFirstChar = userName.charAt(0).toUpperCase();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
    if (onLogout) onLogout();
  };

  return (
    <div className="py-2">
      <div className="p-4 flex items-center text-white">
        {userName !== "Guest" ? (
          <Link
            to={userRole === "admin" ? "/admin" : "/welcome"}
            className="rounded-full hover:ring-2 hover:ring-red-500"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-black font-bold hover:text-red-500">
              {userNameFirstChar}
            </div>
            {showTooltip && (
              <div className="absolute bg-red-600 text-white text-md py-1 px-2 rounded-md mt-2">
                {userRole === "admin"
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
        <span className="ml-2">{userName}</span>
      </div>
      <div className="border-t border-gray-200"></div>
      <div className="p-2">
        {user ? (
          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 rounded-md"
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
