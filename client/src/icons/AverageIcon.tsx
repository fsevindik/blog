import React from "react";

interface AverageIconProps {
  rating: number;
  className?: string;
}

const AverageIcon: React.FC<AverageIconProps> = ({ rating }) => {
  return (
    <div className="border-2 border-gray-700 p-1 rounded-md bg-blue-600 w-20 h-12 mr-auto">
      <span className="text-bold ">⭐️</span>
      <span className="font-bold">{rating} /10</span>
    </div>
  );
};

export default AverageIcon;
