import React, { useEffect } from "react";
import story1 from '../AboutusPage/stry.jpg'
import AOS from "aos";
import "aos/dist/aos.css";

const OurStory = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <section className="bg-white text-gray-800 py-16 px-6 md:px-20">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <div data-aos="fade-right">
          <h2 className="text-4xl font-bold mb-4 text-green-700">Our Story</h2>
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            For over a decade, we’ve nurtured the soil, empowered communities, and built sustainable agricultural systems. Our journey began with a small seed — a passion for farming — and has grown into a movement.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed">
            Today, we specialize in high-quality seed production, poultry farming, and grain cultivation. Beyond farming, we are also educating the next generation of agriculturists with hands-on training and innovation.
          </p>
        </div>

        {/* Image */}
        <div data-aos="fade-left">
          <img
            src={story1}
            alt="Farm story"
            className="rounded-tl-[40px] rounded-br-[40px] shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default OurStory;
