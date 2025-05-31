import React from 'react'
import heroImg from '../assets/ealgle.png'
import hero1Img from '../assets/eagle2.webp'
import hero2Img from '../assets/eagle3.jpg'
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const slides = [
    {
        image: hero2Img,
        title: "Healthy Grains",
        subTitle: "Quality Groceries",
        description: "Quality grains for your kitchen",
    },
    {
        image: heroImg,
        title: "Healthy Grains",
        subTitle: "Quality Groceriesdnhdnhd",
        description: "Quality grains for your kitchen",
    },
    {
        image: hero1Img,
        title: "Organic Fruits",
        subTitle: "Quality Groceriesdndjmsk",
        description: "Naturally sweet and fresh",
    },
];

const Hero = () => {
    return (
        <div className='relative w-full h-screen overflow-hidden'>

            {/* Static Top Badge */}
            <div className="absolute top-10 left-10 z-20">
                <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 text-sm font-medium px-4 py-1 rounded-full w-max">
                    <img src="/logo.svg" alt="grocery icon" className="w-4 h-4" />
                    The Best Online Grocery Store
                </div>
            </div>

            {/* Static Bottom CTA */}
            <div className="absolute top-[45rem] lg:top-[50rem] xl:top-[30rem] left-10 z-20 ">
                <div className="flex flex-col sm:flex-row items-center gap-4">
                    <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 text-sm rounded-full">
                        Shop Now <i className="ri-arrow-right-line"></i>
                    </button>
                    <a href="#" className="text-sm font-medium text-gray-800 hover:underline">
                        View All Products
                    </a>
                </div>
            </div>

            {/* Swiper for the sliding content */}
            <Swiper
                modules={[Autoplay, Pagination, Navigation]}
                spaceBetween={0}
                slidesPerView={1}
                loop={true}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                speed={1500}
                pagination={{ clickable: true }}
                navigation
                className="w-full h-full"
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={index}>
                        <section className="py-12 px-6 md:px-20 lg:flex items-center justify-between bg-[#F7F7F7] h-screen">
                            {/* Left: sliding title/subtitle/description only */}
                            <div className="lg:w-1/2 space-y-6 mt-20">
                                <h1 className="text-4xl md:text-5xl font-bold leading-tight text-gray-900">
                                    {slide.title} <br />
                                    <span className="text-green-600">{slide.subTitle}</span>
                                </h1>
                                <p className="text-gray-500 max-w-md">{slide.description}</p>
                            </div>

                            {/* Right: image */}
                            <div className="lg:w-1/2 relative mt-10 lg:mt-0">
                                <img
                                    src={slide.image}
                                    alt="hero"
                                    className="w-full max-w-lg mx-auto"
                                />



                            </div>
                        </section>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

export default Hero
