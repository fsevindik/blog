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
      className="absolute top-4 left-4 p-2 md:p-3 rounded-full hover:scale-110 transition-transform duration-300"
    >
      <ArrowLeftIcon className="text-white w-6 h-6 md:w-7 md:h-7" size={0} />
    </button>
  );
};

export default BackButton;
