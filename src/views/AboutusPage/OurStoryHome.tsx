'use client';

import React, { useEffect } from 'react'
import women from '../../assets/about/women.jpg'
import OurStory from './OurStory';
import AOS from "aos";
import "aos/dist/aos.css";
import MissionVision from './MissionVission';
import Link from 'next/link';

const OurStoryHome = () => {

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div>
      <section className="flex flex-col md:flex-row items-center justify-between gap-12 bg-stone-50 text-stone-900 px-6 md:px-20 py-16">
        {/* Left Content */}
        <div className="md:w-1/2" data-aos="fade-right">

          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Empowering Farmers Through Integrated Solutions
          </h1>
          <p className="text-gray-700 mb-6">
            Our convenient end-to-end solution connects farmers to quality inputs, extension services, and reliable markets, helping them increase yields, earn more, and grow sustainably.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/shop">
              <button className="bg-green-900 text-white px-6 py-3 rounded-full hover:bg-[#1C8057] transition">
                Shop Now <i className="ri-arrow-right-line"></i>
              </button>
            </Link>

          </div>
        </div>

        <div data-aos="fade-left">
          <div className="relative group">

            <div className="overflow-hidden rounded-lg">
              <img
                src={women.src}
                alt="Grain Farming"
                loading='lazy'
                className="w-full h-[400px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <OurStory />

      <MissionVision />

      <div className="h-8 md:h-12 bg-white" aria-hidden="true" />

    </div>
  );
};



export default OurStoryHome
