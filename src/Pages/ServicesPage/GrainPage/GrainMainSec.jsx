import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import grainLady from "../GrainPage/grainLady.jpg"
import GrainCouter from './GrainCounter';
import GrainCounter from './GrainCounter';

const grains = [
    {
        name: 'Maize',
        image: grainLady,
        description: 'Maize is a versatile grain used for food, feed, and fuel. It thrives in many climates and is a staple for millions.',
    },
    {
        name: 'Millet',
        image: grainLady,
        description: 'Millet is a resilient cereal ideal for dry regions. Rich in nutrients, it’s perfect for porridge and local dishes.',
    },
    {
        name: 'Rice',
        image: grainLady,
        description: 'Rice is a major global food crop grown in flooded fields. It provides essential calories for over half the world.',
    },
    {
        name: 'Sorghum',
        image: grainLady,
        description: 'Sorghum is drought-tolerant and packed with nutrients. It’s used in food, beverages, and animal feed.',
    },
];

const GrainMain = () => {
    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    return (
        <div>

            <section className="relative w-full bg-[#002920] pt-0 pb-20 px-4 md:px-16 overflow-hidden">

                {/* Simple Wavy Top Shape */}
                <div className="absolute top-0 left-0 w-full overflow-hidden z-10">
                    <svg
                        viewBox="0 0 500 150"
                        preserveAspectRatio="none"
                        className="w-full h-[70px]"
                    >
                        <path
                            d="M0.00,49.98 C150.00,150.00 349.61,-49.98 500.00,49.98 L500.00,0.00 L0.00,0.00 Z"
                            style={{ fill: '#ffffff' }}
                        ></path>
                    </svg>
                </div>

                {/* Section Content */}
                <div className="max-w-7xl mx-auto text-center mb-12 pt-20 relative z-20">
                    <h2 className="text-4xl font-bold text-white" data-aos="fade-down">
                        Our Focus Grains
                    </h2>
                    <p className="text-green-100 mt-4 text-base md:text-lg" data-aos="fade-up">
                        We specialize in key cereal grains to empower farmers and boost food security across communities.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto relative z-20">
                    {grains.map((grain, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition duration-300"
                            data-aos="fade-up"
                            data-aos-delay={index * 100}
                        >
                            <img
                                src={grain.image}
                                alt={grain.name}
                                className="h-48 w-full object-cover"
                            />
                            <div className="p-5 space-y-3">
                                <h3 className="text-xl font-semibold text-green-800">{grain.name}</h3>
                                <p className="text-gray-700 text-sm">{grain.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

              <GrainCounter/>

        </div>
    );
};

export default GrainMain;
