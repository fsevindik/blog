import React from "react";
import { useNavigate } from "react-router-dom";
import ArrowLeftIcon from "../../icons/ArrowLeftIcon";

const BackButton: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  };

  return (
    <button
      onClick={handleClick}
      className="absolute top-4 left-4 bg-gray-800 h-8 md:h-10 rounded-lg flex items-center justify-center hover:bg-gray-600 hover:scale-95 transition-all"
    >
      <ArrowLeftIcon className="text-white" size={4} />
      <span className="hidden md:inline text-white font-bold ml-1 mr-2">Back</span>
    </button>
  );
};

export default BackButton;