import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";

const FilmSlider = ({ films }) => {
  const swiperRef = useRef(null);

  return (
    <div className="relative w-full max-w-screen-xl mx-auto px-4 bg-gray-300 p-4 rounded-lg border border-gray-700">
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
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        className="swiper-container"
      >
        {films.map((film) => (
          <SwiperSlide key={film._id}>
            <div className="relative w-full h-60 overflow-hidden rounded-lg">
              <img
                src={film.posterImageUrlA}
                alt={film.title}
                className="w-full h-full object-contain object-center "
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <button
        className="absolute top-1/2 left-2 transform -translate-y-1/2 text-yellow-400 hover:text-yellow-300 cursor-pointer z-10 transition-transform duration-300 ease-in-out"
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
        className="absolute top-1/2 right-2 transform -translate-y-1/2 text-yellow-400 hover:text-yellow-300 cursor-pointer z-10 transition-transform duration-300 ease-in-out"
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
