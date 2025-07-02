import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import grain from "../GrainPage/maizegrain.jpg";
import soy from "../GrainPage/soy.jpg";
import cowpea from "../GrainPage/cowpea.webp";
import rice from "../GrainPage/rice.jpg";
import nut from "../GrainPage/nut.jpeg";
import WhyGrainPage from './WhyGrainPage';
import { NavLink } from 'react-router';

const grains = [
    {
        name: 'Maize',
        image: grain,
        description: 'Maize is a versatile grain used for food, feed, and fuel. It thrives in many climates and is a staple for millions.',
    },
    {
        name: 'Cowpea',
        image: cowpea,
        description: 'Cowpea is a drought-tolerant legume Packed with protein and fiber, it’s a staple in stews, soups, and local delicacies.',
    },
    {
        name: 'Rice',
        image: rice,
        description: 'Rice is a major global food crop grown in waterlogged fields. It provides essential calories for over half the world.',
    },
    {
        name: 'SoyaBean',
        image: soy,
        description: 'Soyabean is a multi-purpose crop packed with protein and healthy oils. Grown worldwide, it is a major source of food, feed, and industrial products.',
    },
    {
        name: 'Groundnut',
        image: nut,
        description: 'Groundnut is a protein-rich legume with healthy oils, widely used in pastes, snacks, and sauces in local cuisines.',
    },
];

const GrainMain = () => {
    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    return (
        <div>

            <section className="relative w-full bg-green-900 pt-0 pb-20 px-4 md:px-16 overflow-hidden">

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
                    <p className="text-yellow-300 mt-4 text-base md:text-lg" data-aos="fade-up">
                       We specialize in key cereal and legume grains to empower farmers and boost food security across communities.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 max-w-7xl mx-auto relative z-20">
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
                                <h3 className="text-xl font-semibold text-[#002920]">{grain.name}</h3>
                                <p className="text-gray-700 text-sm">{grain.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-16">
                    <h2 className="text-xl md:text-2xl font-semibold text-white mb-4">
                        In need of grains with an excellent nutrient profile for food, feed, or industrial use? <br />
                        Look no further — we’ve got you covered.
                    </h2>
                     <NavLink to="/shop"><button className="bg-yellow-300 hover:bg-yellow-400 text-green-900 px-6 py-3 mt-6 text-sm sm:text-base rounded-full">
                        Shop Now <i className="ri-arrow-right-line"></i>
                    </button></NavLink>
                </div>
            </section>

         <WhyGrainPage/>

        </div>
    );
}

export default GrainMain;
