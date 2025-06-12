import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import farm from '../assets/corn.webp'
import hens from '../assets/hens.jpg'
import seeds from '../assets/seeds.jpg'
import { NavLink } from "react-router";

const promoCardsData = [
  {
    id: 1,
    title: "Grains Page",
    description:
      "Discover our premium selection of grains including maize, millet and sorghum",
    imageSrc: farm,
    imageAlt: "basket of vegetables",

  },
  {
    id: 2,
    title: "Poultry Page",
    description:
      "Explore our healthy and well-raised poultry products, including farm-fresh eggs and organic compost.",
    imageSrc: hens,
    imageAlt: "basket of fruits",
  },
  {
    id: 3,
    title: "Seeds Page",
    description:
      "Discover our range of climate-smart certified seeds designed to thrive in diverse conditions.",
    imageSrc: seeds,
    imageAlt: "basket of dairy products",
  },
];

export default function HeroCompo() {
  return (
    <section className="bg-[#002920] py-16 px-4 md:px-10 overflow-visible">
      <h1 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
        Navigate Our Pages
      </h1>

      <div className="relative max-w-4xl mx-auto">
        <Swiper
          modules={[Pagination, Autoplay, Navigation]}
          spaceBetween={30}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          navigation
          loop
          className="overflow-visible"
        >
          {promoCardsData.map((card) => (
            <SwiperSlide key={card.id}>
              <div className="flex flex-col md:flex-row items-center justify-between border border-gray-200 rounded-xl p-8 shadow-lg min-h-[350px] bg-[#f4f4f4]">
                {/* Left Content */}
                <div className="flex-1 mb-6 md:mb-0">
                  <div className="bg-yellow-300 text-gray-800 inline-block px-4 py-1 rounded-full text-sm mb-4">
                    {card.discount}
                  </div>
                  <h2 className="text-3xl font-bold mb-3">{card.title}</h2>

                  <p className="text-gray-600 mb-6 max-w-md">{card.description}</p>

                  <div className="hidden md:flex items-center gap-1 font-medium ">
                    <NavLink to="/shop"><button className="bg-[#002920] hover:bg-[#213b35] text-white px-6 py-3 text-sm sm:text-base rounded-full">
                      Viwe Page <i className="ri-arrow-right-line"></i>
                    </button></NavLink>
                  </div>
                </div>

                {/* Right Image */}
                <img
                  src={card.imageSrc}
                  alt={card.imageAlt}
                  className="w-100 h-auto object-contain"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Optional styles to enhance nav buttons */}
        <style>
          {`
            .swiper-button-next,
            .swiper-button-prev {
              color: #1f2937; /* Tailwind gray-800 */
              top: 50%;
              transform: translateY(-50%);
              z-index: 10;
            }
            .swiper-button-next::after,
            .swiper-button-prev::after {
              font-size: 20px;
            }
          `}
        </style>
      </div>
    </section>
  );
}
