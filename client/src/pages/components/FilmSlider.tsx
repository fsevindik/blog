import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Film, FilmSliderProps } from "../../types/Film";

const FilmSlider: React.FC<FilmSliderProps> = ({ films }) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const navigate = useNavigate();

  const handleFilmClick = (filmId: string) => {
    if (!isDragging) {
      navigate(`/Films/details/${filmId}`);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (sliderRef.current?.offsetLeft || 0));
    setScrollLeft(sliderRef.current?.scrollLeft || 0);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (sliderRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2;
    if (sliderRef.current) {
      sliderRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const slidePrev = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft -= sliderRef.current.offsetWidth;
    }
  };

  const slideNext = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft += sliderRef.current.offsetWidth;
    }
  };

  return (
    <div className="relative w-full max-w-screen-xl mx-auto px-4 mb-10 bg-gray-900 p-4 rounded-lg border border-gray-700 overflow-hidden">
      <div
        ref={sliderRef}
        className="flex overflow-x-auto scrollbar-hide"
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        style={{
          scrollBehavior: "smooth",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {films.map((film: Film) => (
          <div
            key={film._id}
            className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 2xl:w-1/6 px-2"
          >
            <div
              onClick={() => handleFilmClick(film._id)}
              className="relative w-full h-60 overflow-hidden rounded-lg border-r-2 border-white transition-transform duration-300 hover:scale-105 cursor-pointer"
            >
              <img
                src={film.posterImageUrlA}
                alt={film.title}
                className="w-full h-full object-contain object-center"
                draggable="false"
              />
            </div>
          </div>
        ))}
      </div>
      <button
        className="absolute top-1/2 left-2 transform -translate-y-1/2 text-yellow-400 hover:text-white hover:scale-110 cursor-pointer z-10 transition-all duration-300 ease-in-out"
        onClick={slidePrev}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-8 h-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <button
        className="absolute top-1/2 right-2 transform -translate-y-1/2 text-yellow-400 hover:text-white hover:scale-110 cursor-pointer z-10 transition-all duration-300 ease-in-out"
        onClick={slideNext}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-8 h-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
};

export default FilmSlider;
