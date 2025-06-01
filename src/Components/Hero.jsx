import React, { useEffect, useState } from 'react'
import heroImg from '../assets/ealgle.png'
import hero1Img from '../assets/eagle2.webp'
import hero2Img from '../assets/eagle3.jpg'



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
      const [index, setIndex] = useState(0);

      useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000); // every 5 seconds

    return () => clearInterval(timer);
  }, []);

  const current = slides[index];

    return (
        <section className="py-10 px-4 sm:px-6 md:px-10 lg:px-20 bg-[#F7F7F7] flex flex-col lg:flex-row items-center justify-between gap-10">
  {/* Left content */}
  <div className="w-full lg:w-1/2 space-y-6 text-center lg:text-left">
    {/* Top Badge */}
    <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 text-xs sm:text-sm font-medium px-3 sm:px-4 py-1 rounded-full w-max mx-auto lg:mx-0">
      <img src="/logo.svg" alt="grocery icon" className="w-4 h-4" />
      The Best Online Grocery Store
    </div>

    {/* Headings */}
    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-gray-900">
      {current.title} <br />
      <span className="text-green-600">{current.subTitle}</span>
    </h1>

    {/* Description */}
    <p className="text-gray-500 max-w-md mx-auto lg:mx-0 text-sm sm:text-base">{current.description}</p>

    {/* Buttons */}
    <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
      <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 text-sm sm:text-base rounded-full">
        Shop Now <i className="ri-arrow-right-line"></i>
      </button>
      <a href="#" className="text-sm sm:text-base font-medium text-gray-800 hover:underline">
        View All Products
      </a>
    </div>
  </div>

  {/* Right image */}
  <div className="w-full lg:w-1/2 relative mt-10 lg:mt-0">
    <img
      src={current.image}
      alt="hero"
      className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto"
    />

    {/* Floating Badges */}
    <div className="absolute top-4 right-4 bg-white shadow-md rounded-full px-3 py-1 sm:px-4 sm:py-2 flex items-center gap-2 text-xs sm:text-sm text-green-800">
      Secure Payment
    </div>
    <div className="absolute bottom-4 left-4 bg-white shadow-md rounded-full px-3 py-1 sm:px-4 sm:py-2 flex items-center gap-2 text-xs sm:text-sm text-green-800">
      Fast Delivery
    </div>
  </div>
</section>




    )
}

export default Hero