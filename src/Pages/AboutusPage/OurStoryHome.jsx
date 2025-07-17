import React, { useEffect } from 'react'
import women from '../AboutusPage/women.jpg'
import OurStory from './OurStory';
import AOS from "aos";
import "aos/dist/aos.css";
import MissionVision from './MissionVission';
import AboutTeam from './AboutTeam';
import { NavLink } from 'react-router';

const OurStoryHome = () => {

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div>
      <section className="flex flex-col md:flex-row items-center justify-between bg-[#f4f4f4] text-green-900 px-6 md:px-20 py-16">
        {/* Left Content */}
        <div className="md:w-1/2" data-aos="fade-right">

          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Empowering Farmers Through Integrated Solutions
          </h1>
          <p className="text-gray-700 mb-6">
            We specialize in certified seed production and distribution, poultry farming, grain aggregation and market linkages, and agricultural education—empowering farmers with the tools, knowledge, and opportunities to succeed.
          </p>
          <div className="flex items-center gap-4">
            <NavLink to="/shop">
              <button className="bg-green-900 text-white px-6 py-3 rounded-full hover:bg-[#1C8057] transition">
                Shop Now <i className="ri-arrow-right-line"></i>
              </button>
            </NavLink>

          </div>
        </div>

        <div data-aos="fade-left">
          <div className="relative group">
            <div className="absolute top-0 left-0 w-full h-full bg-yellow-300 rounded-tl-[80px] rounded-br-[80px] opacity-20 -z-10 rotate-2"></div>
            <div className="overflow-hidden shadow-2xl border-l-8 border-b-8 border-green-900 rounded-tl-[80px] rounded-br-[80px] transform hover:scale-105 transition duration-500">
              <img
                src={women}
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

      <AboutTeam />

    </div>
  );
};



export default OurStoryHome