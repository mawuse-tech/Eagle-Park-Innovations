import React from 'react'
import women from '../AboutusPage/women.jpg'

const MainAboutus = () => {
   return (
    <section className="flex flex-col md:flex-row items-center justify-between bg-white text-[#1C8057] px-6 md:px-20 py-16">
      {/* Left Content */}
      <div className="md:w-1/2">
        <p className="text-yellow-400 font-medium mb-3">🌾 Best in Agriculture</p>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
          Discover the <span className="text-[#1C8057]">future</span> of agriculture
        </h1>
        <p className="text-black mb-6">
          We specialize in seed production, poultry farming, grain processing,
          and agricultural education to empower the next generation of farmers.
        </p>
        <div className="flex items-center gap-4">
          <button className="bg-[#1C8057] hover:bg-green-600 text-white font-semibold px-5 py-3 rounded-full">
            Read More →
          </button>
         
        </div>
      </div>

      {/* Right Image */}
      <div className="mt-10 md:mt-0 md:w-1/2 flex justify-center">
        <img
          src={women}
          alt="Farmers smiling"
          className="rounded-tl-[60px] rounded-br-[60px] w-full md:w-[90%] object-cover"
        />
      </div>
    </section>
  );
};



export default MainAboutus