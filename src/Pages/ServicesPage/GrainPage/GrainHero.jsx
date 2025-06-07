import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import grainLady from "../GrainPage/grainLady.jpg"
import GrainMain from './GrainMainSec';

const GrainHero = () => {
    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    return (
        <section className="w-full py-16 px-4 md:px-16 bg-white">
            <div className="max-w-7xl mx-auto grid md:grid-cols-2 items-center gap-10">

                {/* Text Section */}
                <div data-aos="fade-right" className="space-y-6">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-[#1C8057] leading-tight">
                        Grain is Life,<br /> Let’s Grow It Right
                    </h1>
                    <p className="text-gray-800 text-base md:text-lg">
                        We specialize in the production, packaging, and export of premium grains. Empowering local farmers while feeding the world.
                    </p>
                    <div className="flex gap-4">
                        <button className="bg-[#1C8057] text-white px-6 py-3 rounded-full hover:bg-[#1C8057] transition">
                            Get Started
                        </button>
                        <button className="border border-[#1C8057] text-[#1C8057] px-6 py-3 rounded-full hover:bg-[#1C8057] hover:text-white transition">
                            Learn More
                        </button>
                    </div>
                </div>

                {/* Image Section */}
                <div data-aos="fade-left">
                    <div className="relative group">
                        <div className="absolute top-0 left-0 w-full h-full bg-green-800 rounded-tl-[80px] rounded-br-[80px] opacity-20 -z-10 rotate-2"></div>
                        <div className="overflow-hidden shadow-2xl border-l-8 border-b-8 border-green-800 rounded-tl-[80px] rounded-br-[80px] transform hover:scale-105 transition duration-500">
                            <img
                                src={grainLady}
                                alt="Grain Farming"
                                className="w-full h-[400px] object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <GrainMain />
        </section>
    );
};

export default GrainHero;



