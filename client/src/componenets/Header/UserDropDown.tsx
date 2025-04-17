import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { UserDropdownProps } from "../../types/types";

const UserDropdown: React.FC<UserDropdownProps> = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [showTooltip, setShowTooltip] = useState(false);

  const userNameFirstChar = user ? user.name.charAt(0).toUpperCase() : "G";

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="py-2 bg-gray-800 rounded-b-lg shadow-md z-40">
      <div className="p-4 flex items-center text-gray-100">
        {user ? (
          <Link
            to={user.role === "admin" ? "/admin" : "/welcome"}
            className="rounded-full transition-all duration-200"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-800 font-semibold hover:bg-gray-100 transition-colors">
              {userNameFirstChar}
            </div>
            {showTooltip && (
              <div className="absolute bg-gray-700 text-white text-sm py-1 px-3 rounded-md mt-2 shadow-lg">
                {user.role === "admin"
                  ? "Go to admin dashboard"
                  : "Go to your welcome page"}
              </div>
            )}
          </Link>
        ) : (
          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-gray-700 font-semibold">
            {userNameFirstChar}
          </div>
        )}
        <span className="ml-3 font-medium">{user ? user.name : "Guest"}</span>
      </div>
      <div className="border-t border-gray-700"></div>
      <div className="p-2">
        {user ? (
          <button
            onClick={handleLogout}
            className="text-gray-300 text-left px-4 py-2 text-sm rounded-md hover:bg-gray-700 transition-colors w-full "
          >
            Logout
          </button>
        ) : (
          <div className="flex flex-col w-full">
            <Link
              to="/auth?mode=login"
              className="rounded-md text-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-700 transition-colors w-full text-left"
            >
              Login
            </Link>
            <Link
              to="/auth?mode=register"
              className="rounded-md px-4 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 transition-colors w-full text-left"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDropdown;