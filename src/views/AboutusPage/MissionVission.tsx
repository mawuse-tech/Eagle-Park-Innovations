'use client';

import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const MissionVision = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <section className="bg-stone-50 py-16 px-6 md:px-20">
      <div className="max-w-6xl mx-auto">
        <h2
          className="text-4xl font-bold text-center text-stone-900 mb-12"
          data-aos="zoom-in"
        >
          Our Mission and Vision
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Mission */}
          <div
            className="bg-transparent  p-8 rounded-lg hover: transition duration-300 lg:h-50"
            data-aos="fade-left"
          >
            <div className="flex items-center gap-4 mb-4">
              <i className="ri-seedling-fill text-stone-900 text-3xl"></i>
              <h3 className="text-2xl font-semibold text-stone-900">Our Mission</h3>
            </div>
            <p className="text-gray-600 leading-relaxed">
            To advance sustainable agriculture through integrated, innovative solutions that prioritize people and the planet for food security and inclusive growth.
            </p>
          </div>

          {/* Vision */}
          <div
            className="bg-transparent  p-8 rounded-lg hover: transition duration-300 lg:h-50"
            data-aos="fade-right"
          >
            <div className="flex items-center gap-4 mb-4">
              <i className="ri-eye-fill text-stone-900 text-3xl"></i>
              <h3 className="text-2xl font-semibold text-stone-900">Our Vision</h3>
            </div>
            <p className="text-gray-600 leading-relaxed">
             To lead Africa’s transformation towards sustainable agriculture by empowering communities, enriching lives, and protecting the environment.
            </p>
          </div>
        </div>

        {/* Bottom Quote or Callout */}
        <div className="mt-16 text-center max-w-3xl mx-auto" data-aos="fade-left">
          <i className="ri-plant-fill text-4xl text-stone-600 mb-4"></i>
          <p className="text-lg text-stone-600 italic">
            “A seed today, a forest tomorrow. Together, we grow a sustainable future.”
          </p>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;
