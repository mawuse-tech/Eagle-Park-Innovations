import React, { useEffect } from 'react'
import women from '../AboutusPage/women.jpg'
import OurStory from './OurStory';
import AOS from "aos";
import "aos/dist/aos.css";
import MissionVision from './MissionVission';
import AboutTeam from './AboutTeam';

const OurStoryHome = () => {

 useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div>
      <section className="flex flex-col md:flex-row items-center justify-between bg-white text-[#002920] px-6 md:px-20 py-16">
        {/* Left Content */}
        <div className="md:w-1/2" data-aos="fade-right">
          <p className="text-yellow-400 font-medium mb-3">🌾 OUR STORY</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Discover the future of agriculture
          </h1>
          <p className="text-gray-600 mb-6">
            We specialize in seed production, poultry farming, grain processing,
            and agricultural education to empower the next generation of farmers.
          </p>
          <div className="flex items-center gap-4">
            <button className="bg-[#002920] hover:bg-green-600 text-white font-semibold px-5 py-3 rounded-full">
              Read More →
            </button>

          </div>
        </div>

        <div data-aos="fade-left">
                           <div className="relative group">
                               <div className="absolute top-0 left-0 w-full h-full bg-[#021210] rounded-tl-[80px] rounded-br-[80px] opacity-20 -z-10 rotate-2"></div>
                               <div className="overflow-hidden shadow-2xl border-l-8 border-b-8 border-[#021210] rounded-tl-[80px] rounded-br-[80px] transform hover:scale-105 transition duration-500">
                                   <img
                                       src={women}
                                       alt="Grain Farming"
                                       className="w-full h-[400px] object-cover"
                                   />
                               </div>
                           </div>
                       </div>
      </section>

      <OurStory/>

      <MissionVision/>

      <AboutTeam/>

    </div>
  );
};



export default OurStoryHome