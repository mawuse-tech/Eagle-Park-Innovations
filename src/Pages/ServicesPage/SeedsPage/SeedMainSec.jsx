import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import corn from "../SeedsPage/cornseed.jpg"
import soy from "../SeedsPage/bean.jpg"
import cow from "../SeedsPage/soyseed.jpg"
import WhySeedsPage from './WhySeedsPage';
import { NavLink } from 'react-router';

const grains = [
    {
        name: 'Maize',
        image: corn,
        description: 'We offer seeds of mainly hybrid maize varieties that are climate-smart, drought-tolerant, and efficient in using soil nutrients, with tolerance to common pests and diseases which are excellent for food, feed, and industrial uses.'

    },
    {
        name: 'Cowpea',
        image: soy,
        description: 'We offer early-maturing, high-yielding cowpea varieties that resist key pests, reduce pesticide use, and support safer, sustainable farming.',
    },
    {
        name: 'Soyabean',
        image: cow,
        description: 'We offer climate-smart soyabean varieties with non-shattering pods that reduce harvest losses, improve yield quality, and are ideal for food, feed, and industrial use.',
    },
    
];

const SeedMainSec = () => {
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
                        Our Focus Crops
                    </h2>
                    <p className="text-yellow-300 mt-4 text-base md:text-lg" data-aos="fade-up">
                       High-quality, certified seeds of key food crops that are specially developed to perform well in tropical environments.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto relative z-20">
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
                                <p className="text-gray-600 text-sm">{grain.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-16">
                    <h2 className="text-xl md:text-2xl font-semibold text-white mb-4">
                       Looking for certified, high-yield seeds you can trust?<br />
                        Look no further — we’ve got you covered.
                    </h2>
                     <NavLink to="/shop"><button className="bg-yellow-300 hover:bg-yellow-400 text-green-900 px-6 py-3 mt-6 text-sm sm:text-base rounded-full">
                        Shop Now <i className="ri-arrow-right-line"></i>
                    </button></NavLink>
                </div>
            </section>

        <WhySeedsPage/>

        </div>
    );
};

export default SeedMainSec;
