'use client';

import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import grainLady from "../../../assets/grain/grainLady.jpg"
import GrainMain from './GrainMainSec';
import Link from 'next/link';

const GrainHero = () => {
    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    return (
        <section className="w-full py-16 px-4 md:px-16 bg-white">
            <div className="max-w-7xl mx-auto grid md:grid-cols-2 items-center gap-10">

                {/* Text Section */}
                <div data-aos="fade-right" className="space-y-6">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight text-stone-900">
                    Grains That Nourish. <br />Partnerships That Empower.
                    </h1>
                    <p className="text-gray-700 mb-6">
                       EPI sources quality grains directly from smallholder farmers and connects them to reliable buyers. Through fair pricing, reduced post-harvest losses, and stronger market linkages, we help farmers earn more while strengthening local food systems.
                    </p>
                    <div className="flex gap-4">
                         <Link href="/shop">
                            <button className="bg-green-900 text-white px-6 py-3 rounded-full hover:bg-[#1C8057] transition">
                            Shop Now <i className="ri-arrow-right-line"></i>
                        </button>
                        </Link>
                        {/* <button className="border border-[#002920] text-stone-900 px-6 py-3 rounded-full hover:bg-[#1C8057] hover:text-white transition">
                            Learn More
                        </button> */}
                    </div>
                </div>

                {/* Image Section */}
                <div data-aos="fade-left">
                    <div className="relative group">

                        <div className="overflow-hidden rounded-lg">
                            <img
                                src={grainLady.src}
                                alt="Grain Farming"
                                loading='lazy'
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

