import React, { useEffect } from 'react';
import AOS from 'aos';
import train from '../AboutusPage/train2.jpg'

const TrainPage = () => {
    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    return (
        <div className=" text-[#06360b]">
            {/* Hero Section */}
            <section className="flex flex-col md:flex-row items-center justify-between bg-white text-[#1C8057] px-6 md:px-20 py-16">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 items-center gap-10">

                    {/* Text Section */}
                    <div data-aos="fade-right" className="space-y-6">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-[#002920] leading-tight">
                           Grow With Us: Join Our Training Program
                        </h1>
                        <p className="text-gray-600 text-base md:text-lg">
                            Gain hands-on skills, expert guidance, and the tools you need to succeed in modern, sustainable agriculture. Learn, grow, and transform your farming journey.

                        </p>
                        <div className="flex gap-4">
                            <button className="bg-[#002920] text-white px-6 py-3 rounded-full hover:bg-[#1C8057] transition">
                                Register
                            </button>
                            <button className="border border-[#002920] text-[#1C8057] px-6 py-3 rounded-full hover:bg-[#1C8057] hover:text-white transition">
                                Learn More
                            </button>
                        </div>
                    </div>

                    {/* Image Section */}
                    <div data-aos="fade-left">
                        <div className="relative group">
                            <div className="absolute top-0 left-0 w-full h-full bg-[#002920] rounded-tl-[80px] rounded-br-[80px] opacity-20 -z-10 rotate-2"></div>
                            <div className="overflow-hidden shadow-2xl border-l-8 border-b-8 border-[#002920] rounded-tl-[80px] rounded-br-[80px] transform hover:scale-105 transition duration-500">
                                <img
                                    src={train}
                                    alt="Grain Farming"
                                    className="w-full h-[400px] object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>

            </section>

            {/* Training Overview */}
            <section className="py-16 px-6 md:px-20 bg-[#002920]">
                <div className="text-center mb-12" data-aos="fade-up">
                    <h2 className="text-3xl md:text-4xl font-bold text-white">What We Offer</h2>
                    <p className="text-white mt-2 max-w-xl mx-auto">
                        Our comprehensive training programs are designed to help farmers thrive in a changing world.
                    </p>
                </div>

                <div className="grid gap-10 md:grid-cols-3" data-aos="fade-up">
                    <div className="bg-[#f3fdf5] p-6 rounded-xl shadow-md hover:shadow-lg transition">
                        <i className="ri-seedling-fill text-3xl text-[#002920] mb-4"></i>
                        <h3 className="text-xl font-semibold mb-2">Organic Farming</h3>
                        <p className="text-sm text-gray-600">
                            Learn the best practices in chemical-free farming to preserve soil and health.
                        </p>
                    </div>

                    <div className="bg-[#f3fdf5] p-6 rounded-xl shadow-md hover:shadow-lg transition">
                        <i className="ri-plant-line text-3xl text-[#002920] mb-4"></i>
                        <h3 className="text-xl font-semibold mb-2">Crop Rotation</h3>
                        <p className="text-sm text-gray-600">
                            Maximize yield with smart planting strategies and climate-adaptive practices.
                        </p>
                    </div>

                    <div className="bg-[#f3fdf5] p-6 rounded-xl shadow-md hover:shadow-lg transition">
                        <i className="ri-tools-fill text-3xl text-[#002920] mb-4"></i>
                        <h3 className="text-xl font-semibold mb-2">Modern Tools</h3>
                        <p className="text-sm text-gray-600">
                            Get hands-on training with irrigation systems, greenhouses, and more.
                        </p>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="bg-white text-[#002920] py-16 px-6 md:px-20" data-aos="fade-up">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-4">Ready to Grow Your Farming Skills?</h2>
                    <p className="mb-6 text-gray-600">
                        Be part of a network of knowledgeable, empowered farmers transforming agriculture across the region.
                    </p>
                    <button className="bg-[#002920] hover:bg-green-700 text-white px-6 py-3 text-sm sm:text-base rounded-full">
                        Register for our next class <i className="ri-arrow-right-line transition"></i>
                    </button>
                </div>
            </section>
        </div>
    );
};

export default TrainPage;
