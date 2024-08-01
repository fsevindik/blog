import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { Film, FilmSliderProps } from "../../types/Film";

const FilmSlider: React.FC<FilmSliderProps> = ({ films }) => {
  const swiperRef = useRef<SwiperRef | null>(null);
  const navigate = useNavigate();

  const handleFilmClick = (filmId: string) => {
    navigate(`/Films/details/${filmId}`);
  };

  return (
    <div className="relative w-full max-w-screen-xl mx-auto px-4 mb-10 bg-gray-900 p-4 rounded-lg border border-gray-700">
      <Swiper
        spaceBetween={10}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
          1280: { slidesPerView: 5 },
          1536: { slidesPerView: 6 },
        }}
        onSwiper={(swiper: SwiperTyp) => {
          swiperRef.current = swiper;
        }}
        className="swiper-container"
      >
        {films.map((film: Film) => (
          <SwiperSlide key={film._id}>
            <div
              onClick={() => handleFilmClick(film._id)}
              className="relative w-full h-60 overflow-hidden rounded-lg border-r-2 border-white transition-transform duration-300 hover:scale-105 cursor-pointer"
            >
              <img
                src={film.posterImageUrlA}
                alt={film.title}
                className="w-full h-full object-contain object-center"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <button
        className="absolute top-1/2 left-2 transform -translate-y-1/2 text-yellow-400 hover:text-white hover:scale-110 cursor-pointer z-10 transition-all duration-300 ease-in-out"
        onClick={() => swiperRef.current?.slidePrev()}
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
        onClick={() => swiperRef.current?.slideNext()}
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
