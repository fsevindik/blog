// src/pages/ShowFilm/RateModal.tsx
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useOutsideClick from "../../hooks/useOutsideClick"; // Hook'u import et
import StarIcon from "../../icons/StarIcon";
import { RateModalProps } from "../../icons/types";

const API_URL = "http://localhost:3000";

const RateModal: React.FC<RateModalProps> = ({ film, onRate }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [userId, setUserId] = useState<string | null>(
    localStorage.getItem("userId")
  );

  const modalRef = useRef<HTMLDivElement>(null);

  useOutsideClick(modalRef, () => setIsOpen(false));

  const handleHover = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);
  const handleClick = () => setIsOpen(!isOpen);

  useEffect(() => {
    const fetchUserRating = async () => {
      try {
        const savedRating = localStorage.getItem(
          `rating_${film._id}_${userId}`
        );
        if (savedRating) {
          setRating(Number(savedRating));
        } else {
          const response = await axios.get(
            `${API_URL}/films/${film._id}/user-rating/${userId}`
          );
          if (response.status === 200) {
            setRating(response.data.rating);
          }
        }
      } catch (error) {
        console.error("Error fetching user rating:", error);
      }
    };

    if (userId) {
      fetchUserRating();
    }
  }, [film._id, userId]);

  const handleRating = async (rate: number) => {
    try {
      const response = await axios.post(`${API_URL}/films/${film._id}/rate`, {
        userId,
        rating: rate,
      });

      if (response.status === 200) {
        setRating(rate);
        setIsOpen(false);
        toast.dismiss();
        toast.success(`Rated ${rate} stars`);
        onRate(rate);
      } else {
        throw new Error("Failed to rate the film.");
      }
    } catch (error) {
      console.error("Error rating the film:", error);
      toast.error("Failed to rate the film");
    }
  };

  const handleHoverRating = (rate: number) => setHoverRating(rate);
  const handleLeaveRating = () => setHoverRating(0);

  return (
    <div className="relative ml-auto">
      <div
        className={`flex border-4 border-gray-800 ml-auto items-center rounded-lg sm:rounded-xl h-10 sm:h-12 lg:h-14 xl:h-16 w-20 sm:w-24 lg:w-28 xl:w-32 bg-yellow-500 text-blue-600 p-2 cursor-pointer transition duration-300 animate-pulse ${
          isHovered
            ? "hover:bg-gray-800 hover:animate-none "
            : "hover:bg-yellow-500"
        }`}
        onMouseEnter={userId ? handleHover : undefined}
        onMouseLeave={userId ? handleMouseLeave : undefined}
        onClick={userId ? handleClick : undefined}
        style={{
          color: isHovered ? "#fff" : "inherit",
          opacity: userId ? 1 : 0.5,
          cursor: userId ? "pointer" : "not-allowed",
        }}
      >
        <StarIcon isHovered={isHovered} disabled={!userId} />
        <span
          className={`ml-2 text-sm sm:text-base lg:text-lg xl:text-xl font-bold ${
            isHovered ? "text-white" : "text-gray-800"
          }`}
        >
          Rate
        </span>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-20">
          <div
            ref={modalRef}
            className="bg-gray-900 rounded-lg shadow-lg p-6 sm:p-8 w-full sm:max-w-lg"
          >
            <div className="flex justify-end">
              <button
                className="text-white text-3xl hover:text-yellow-400 hover:scale-125"
                onClick={() => setIsOpen(false)}
              >
                &times;
              </button>
            </div>
            <div className="flex flex-col items-center mb-2">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl text-white mb-1 text-center">
                <span className="text-yellow-500">Your Rate for</span>{" "}
                {film.title}
              </h3>
              <h3 className="font-bold text-2xl sm:text-3xl lg:text-4xl text-blue-500 text-center">
                {rating}
              </h3>
            </div>
            <div className="flex justify-center space-x-1 sm:space-x-1 md:space-x-4 lg:space-x-6">
              {[...Array(10)].map((_, index) => (
                <StarIcon
                  key={index}
                  className={`cursor-pointer w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 hover:scale-110 ${
                    index + 1 <= (hoverRating || rating)
                      ? "text-yellow-500"
                      : "text-gray-400"
                  }`}
                  onClick={() => handleRating(index + 1)}
                  onMouseEnter={() => handleHoverRating(index + 1)}
                  onMouseLeave={handleLeaveRating}
                  disabled={!userId}
                />
              ))}
            </div>
          </div>
        </div>
      )}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default RateModal;
