import React, { useEffect } from "react";
import story1 from '../AboutusPage/stry.jpg'
import AOS from "aos";
import "aos/dist/aos.css";

const OurStory = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <section className="bg-white text-green-900 py-16 px-6 md:px-20">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <div data-aos="fade-right">
          <h2 className="text-4xl font-bold mb-4">Our Story</h2>
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            Despite Ghana’s abundant arable land, food insecurity remains a critical issue due to low farm productivity and heavy reliance on imported staples. Farmers, especially women and youth, face limited access to quality seeds, poor soil health, inadequate extension services, and the growing threat of climate change. These challenges have left many communities vulnerable, with the COVID-19 pandemic further exposing the fragility of external food supply chains.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed">
           Eagle Park Innovations Limited was founded on May 27, 2020, to respond to these challenges with homegrown solutions. Rooted in local farming communities, we develop innovative, sustainable practices that increase productivity and empower farmers. Our mission is to secure Ghana’s food future by promoting resilience, equity, and self-reliance in agriculture.

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
