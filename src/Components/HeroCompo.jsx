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

const promoCardsData = [
  {
    id: 1,
    discount: "Flat 20% Discount",
    title: "Purely Fresh Vegetables",
    description:
      "Sourced from trusted local farms — rich in nutrients, naturally grown, and freshly harvested for your health.",
    buttonText: "Shop Now →",
    imageSrc: farm,
    imageAlt: "basket of vegetables",
    bgColor: "bg-green-700",
    hoverBgColor: "hover:bg-green-800",
  },
  {
    id: 2,
    discount: "Save 15% Today",
    title: "Organic Fruits Basket",
    description:
      "Handpicked organic fruits to nourish your body and delight your taste buds every day.",
    buttonText: "Buy Fruits →",
    imageSrc: hens,
    imageAlt: "basket of fruits",
    bgColor: "bg-red-600",
    hoverBgColor: "hover:bg-red-700",
  },
  {
    id: 3,
    discount: "Free Delivery",
    title: "Farm Fresh Dairy",
    description:
      "Milk, cheese, and other dairy products delivered fresh from the farm to your doorstep.",
    buttonText: "Order Dairy →",
    imageSrc: seeds,
    imageAlt: "basket of dairy products",
    bgColor: "bg-blue-700",
    hoverBgColor: "hover:bg-blue-800",
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
                  <button
                    className={`${card.bgColor} text-white px-6 py-3 rounded-full transition ${card.hoverBgColor}`}
                  >
                    {card.buttonText}
                  </button>
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
