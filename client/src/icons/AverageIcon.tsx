import React from "react";

interface AverageIconProps {
  rating?: number;
  className?: string;
}

const AverageIcon: React.FC<AverageIconProps> = ({ rating = 0, className }) => {
  return (
    <div
      className={`border-2 border-gray-700 p-2 rounded-md bg-gray-800 flex items-center justify-center ${className}`}
    >
      <span className="text-2xl font-bold mr-2">⭐️</span>
      <span className="font-bold text-lg">{rating} / 10</span>
    </div>
  );
};

export default AverageIcon;
