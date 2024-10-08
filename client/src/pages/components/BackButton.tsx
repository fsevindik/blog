import React from "react";
import { useNavigate } from "react-router-dom";
import ArrowLeftIcon from "../../icons/ArrowLeftIcon";

const BackButton: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  };

  return (
    <div className="flex justify-center">
      <button
        onClick={handleClick}
        className="bg-red-700 sm:h-8 md:h-12 md:w-28 mt-4 text-white font-bold px-4 py-1 rounded-lg flex items-center hover:bg-gray-500 hover:scale-95"
      >
        <ArrowLeftIcon className="text-2xl" size={5} />
        <span className="ml-2">Back</span>
      </button>
    </div>
  );
};

export default BackButton;
