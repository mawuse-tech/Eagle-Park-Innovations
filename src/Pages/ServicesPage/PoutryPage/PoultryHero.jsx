import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import poultry from "../PoutryPage/poultryLady.jpg";
import PoultryMainSec from './PoultryMainSec';
import { NavLink } from 'react-router';
// import GrainMain from './GrainMainSec';

const PoultryHero = () => {
    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    return (
        <section className="w-full py-16 px-4 md:px-16 bg-white">
            <div className="max-w-7xl mx-auto grid md:grid-cols-2 items-center gap-10">

                {/* Text Section */}
                <div data-aos="fade-right" className="space-y-6">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight text-green-900">
                        Quality Poultry products <br /> for Every Home
                    </h1>
                    <p className="text-gray-700 mb-6">
                       At EPI, we provide high-quality eggs produced through responsible and scalable farming practices. Our circular economy model transforms poultry by-products into organic fertilizer, creating a closed-loop system that boosts sustainability and product quality.
                    </p>
                    <div className="flex gap-4">
                         <NavLink to="/shop">
                            <button className="bg-green-900 text-white px-6 py-3 rounded-full hover:bg-[#1C8057] transition">
                            shop now
                        </button>
                        </NavLink>
                        <button className="border border-[#002920] text-[#1C8057] px-6 py-3 rounded-full hover:bg-[#1C8057] hover:text-white transition">
                            Learn More
                        </button>
                    </div>
                </div>

                {/* Image Section */}
                <div data-aos="fade-left">
                    <div className="relative group">
                        <div className="absolute top-0 left-0 w-full h-full bg-[#002920] rounded-tl-[80px] rounded-br-[80px] opacity-20 -z-10 rotate-2"></div>
                        <div className="overflow-hidden shadow-2xl border-l-8 border-b-8 border-green-900 rounded-tl-[80px] rounded-br-[80px] transform hover:scale-105 transition duration-500">
                            <img
                                src={poultry}
                                alt="Grain Farming"
                                className="w-full h-[400px] object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>

          <PoultryMainSec/>
        </section>
    );
};

export default PoultryHero;



