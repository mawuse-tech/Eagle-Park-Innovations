import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const MissionVision = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <section className="bg-green-50 text-gray-800 py-16 px-6 md:px-20">
      <div className="max-w-6xl mx-auto">
        <h2
          className="text-4xl font-bold text-center text-green-700 mb-12"
          data-aos="zoom-in"
        >
          Our Mission & Vision
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Mission */}
          <div
            className="bg-white shadow-md p-8 rounded-lg hover:shadow-xl transition duration-300"
            data-aos="flip-left"
          >
            <div className="flex items-center gap-4 mb-4">
              <i className="ri-seedling-fill text-green-600 text-3xl"></i>
              <h3 className="text-2xl font-semibold text-green-700">Our Mission</h3>
            </div>
            <p className="text-gray-700 leading-relaxed">
              To cultivate a greener future by empowering communities through sustainable agriculture. 
              We aim to improve food security by providing quality seeds, poultry, grains, and practical education for upcoming agriculturists.
            </p>
          </div>

          {/* Vision */}
          <div
            className="bg-white shadow-md p-8 rounded-lg hover:shadow-xl transition duration-300"
            data-aos="flip-right"
          >
            <div className="flex items-center gap-4 mb-4">
              <i className="ri-eye-fill text-green-600 text-3xl"></i>
              <h3 className="text-2xl font-semibold text-green-700">Our Vision</h3>
            </div>
            <p className="text-gray-700 leading-relaxed">
              To become Africa’s leading agric-education and production brand, transforming rural livelihoods through innovation, inclusiveness, and a deep respect for the land we farm.
            </p>
          </div>
        </div>

        {/* Bottom Quote or Callout */}
        <div className="mt-16 text-center max-w-3xl mx-auto" data-aos="fade-up">
          <i className="ri-plant-fill text-4xl text-green-500 mb-4"></i>
          <p className="text-lg text-gray-600 italic">
            “A seed today, a forest tomorrow. Together, we grow a sustainable future.”
          </p>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;
