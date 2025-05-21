import React from "react";

interface UserWelcomeProps {
  userName: string;
  countdown: number;
}

const UserWelcome: React.FC<UserWelcomeProps> = ({ userName, countdown }) => {
  return (
    <div className="relative z-10 text-center bg-black bg-opacity-30 p-8 rounded-lg shadow-xl border-4 border-gray-900 film-frame">
      <h2 className="text-2xl font-bold mb-4 text-white">
        Welcome, {userName}!
      </h2>
      <p className="text-white mb-4">Login successful! Redirecting...</p>
      <p className="mt-4 text-sm text-white">
        Redirecting in <span className="font-bold">{countdown}</span> seconds...
      </p>
    </div>
  );
};

export default UserWelcome;