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
                {/* Left Content */}
                <div className="md:w-1/2" data-aos="fade-right">
                    <p className="text-yellow-400 font-medium mb-3">🌾 OUR STORY</p>
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
                <div className="mt-10 md:mt-0 md:w-1/2 flex justify-center" data-aos="fade-left">
                    <img
                        src={train}
                        alt="Farmers smiling"
                        className="rounded-tl-[60px] rounded-br-[60px] w-full md:w-[90%] object-cover"
                    />
                </div>
            </section>

            {/* Training Overview */}
            <section className="py-16 px-6 md:px-20 bg-[#021210]">
                <div className="text-center mb-12" data-aos="fade-up">
                    <h2 className="text-3xl md:text-4xl font-bold text-white">What We Offer</h2>
                    <p className="text-white mt-2 max-w-xl mx-auto">
                        Our comprehensive training programs are designed to help farmers thrive in a changing world.
                    </p>
                </div>

                <div className="grid gap-10 md:grid-cols-3" data-aos="fade-up">
                    <div className="bg-[#f3fdf5] p-6 rounded-xl shadow-md hover:shadow-lg transition">
                        <i className="ri-seedling-fill text-3xl text-green-700 mb-4"></i>
                        <h3 className="text-xl font-semibold mb-2">Organic Farming</h3>
                        <p className="text-sm text-gray-700">
                            Learn the best practices in chemical-free farming to preserve soil and health.
                        </p>
                    </div>

                    <div className="bg-[#f3fdf5] p-6 rounded-xl shadow-md hover:shadow-lg transition">
                        <i className="ri-plant-line text-3xl text-green-700 mb-4"></i>
                        <h3 className="text-xl font-semibold mb-2">Crop Rotation</h3>
                        <p className="text-sm text-gray-700">
                            Maximize yield with smart planting strategies and climate-adaptive practices.
                        </p>
                    </div>

                    <div className="bg-[#f3fdf5] p-6 rounded-xl shadow-md hover:shadow-lg transition">
                        <i className="ri-tools-fill text-3xl text-green-700 mb-4"></i>
                        <h3 className="text-xl font-semibold mb-2">Modern Tools</h3>
                        <p className="text-sm text-gray-700">
                            Get hands-on training with irrigation systems, greenhouses, and more.
                        </p>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="bg-white text-[#021210] py-16 px-6 md:px-20" data-aos="fade-up">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-4">Ready to Grow Your Farming Skills?</h2>
                    <p className="mb-6 text-[#021210]">
                        Be part of a network of knowledgeable, empowered farmers transforming agriculture across the region.
                    </p>
                   <button className="bg-[#021210] hover:bg-[#021210] text-white px-6 py-3 text-sm sm:text-base rounded-full">
                        Register for our next class <i className="ri-arrow-right-line transition"></i>
                    </button>
                </div>
            </section>
        </div>
    );
};

export default TrainPage;
