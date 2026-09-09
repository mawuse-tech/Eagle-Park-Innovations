'use client';

import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import WhySeedsPage from './WhySeedsPage';
import Link from 'next/link';

const services = [
    {
        name: 'Timely, High-Quality Inputs',
        icon: 'ri-seedling-line',
        description: 'No delays, no guesswork. We deliver premium inputs directly to farmers at fair prices and on schedule, ensuring a strong start to every season.'
    },
    {
        name: 'Practical Training & Field Support',
        icon: 'ri-graduation-cap-line',
        description: 'Knowledge drives results. Through practical training and continuous field guidance, we empower farmers to strengthen decision-making, increase productivity, and grow their income.',
    },
    {
        name: 'Climate-Smart Production',
        icon: 'ri-earth-line',
        description: 'We equip farmers to adopt practices that increase yields and reduce climate risks while protecting soil and other natural resources for future generations.',
    },
    {
        name: 'Reliable Market Access',
        icon: 'ri-store-2-line',
        description: 'We connect farmers directly to trusted buyers, helping them secure fair prices, reduce post-harvest losses, and earn stable incomes.',
    },
];

const SeedMainSec = () => {
    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    return (
        <div>

            <section className="relative w-full bg-stone-50 pt-0 pb-20 px-4 md:px-16 overflow-hidden">




                {/* Section Content */}
                <div className="max-w-7xl mx-auto text-center mb-12 pt-20 relative z-20">
                    <h2 className="text-4xl font-bold text-stone-900" data-aos="fade-down">
                        Our Integrated Farmer Growth Bundle
                    </h2>
                    <p className="text-stone-600 mt-4 text-base md:text-lg" data-aos="fade-up">
                       Everything farmers need to build resilient, profitable agribusinesses—connected in one practical system.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto relative z-20">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="bg-transparent overflow-hidden"
                            data-aos="fade-up"
                            data-aos-delay={index * 100}
                        >
                            <div className="p-5 space-y-3">
                                <i className={`${service.icon} text-4xl text-green-800`}></i>
                                <h3 className="text-xl font-semibold text-stone-900">{index + 1}. {service.name}</h3>
                                <p className="text-gray-600 text-sm">{service.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-16">
                    <h2 className="text-xl md:text-2xl font-semibold text-stone-900 mb-4">
                       Whether Transforming Your Farm or Empowering Smallholder Farmers, EPI Gets You There
                    </h2>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link href="/contact"><button className="bg-yellow-300 hover:bg-yellow-400 text-stone-900 px-6 py-3 mt-6 text-sm sm:text-base rounded-full">
                            Get Your Custom Bundle Today <i className="ri-arrow-right-line"></i>
                        </button></Link>
                        <Link href="/contact"><button className="border border-yellow-300 hover:bg-yellow-300 hover:text-stone-900 text-stone-600 px-6 py-3 mt-6 text-sm sm:text-base rounded-full">
                            Partner with Us <i className="ri-arrow-right-line"></i>
                        </button></Link>
                    </div>
                </div>
            </section>

        <WhySeedsPage/>

        </div>
    );
};

export default SeedMainSec;
