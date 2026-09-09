'use client';

import React, { useEffect } from 'react';
import AOS from 'aos';
import train from '../../../assets/practical training and support.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChalkboardTeacher, faCrow, faHandshake, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import CountSection from '../../../Components/CountSection';
import Link from 'next/link';

const TrainPage = () => {
    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    return (
        <div className=" text-stone-900">
            {/* Hero Section */}
            <section className="flex flex-col md:flex-row items-center justify-between bg-white text-stone-900 px-6 md:px-20 py-16">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 items-center gap-10">

                    {/* Text Section */}
                    <div data-aos="fade-right" className="space-y-6">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight text-stone-900">
                            Learn, Grow, and <br /> Build with Us
                        </h1>
                        <p className="text-gray-700 mb-6">
                            We equip farmers and agribusinesses with practical skills, actionable knowledge, and field-tested strategies to build resilient, profitable ventures.

                        </p>
                        <div className="flex gap-4">
                            <Link href="/contact">
                                <button className="bg-green-900 text-white px-6 py-3 rounded-full hover:bg-[#1C8057] transition">
                                    Register
                                </button>
                            </Link>

                            <Link href="/ourstory">
                                <button className="border border-green-900 text-[#1C8057] px-6 py-3 rounded-full hover:bg-[#1C8057] hover:text-white transition">
                                    Learn More
                                </button>
                            </Link>

                        </div>
                    </div>

                    {/* Image Section */}
                    <div data-aos="fade-left">
                        <div className="relative group">

                            <div className="overflow-hidden rounded-lg">
                                <img
                                    src={train.src}
                                    alt="Grain Farming"
                                    loading='lazy'
                                    className="w-full h-[400px] object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>

            </section>

            {/* Training Overview */}
            <section className="py-16 px-6 md:px-20 bg-stone-50">
                <div className="text-center mb-12" data-aos="fade-up">
                    <h2 className="text-3xl md:text-4xl font-bold text-stone-900">What We Offer</h2>
                    <p className="text-stone-600 mt-2 max-w-xl mx-auto">
                        Tap into our expertise to turn your passion for farming and agribusiness into profitable ventures and lasting impact. We offer training and consultancy services in the following key areas:
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5" data-aos="fade-up">
                    <div className="bg-transparent p-6 rounded-xl ">
                        <i className="ri-plant-line text-3xl text-stone-900 mb-4"></i>
                        <h3 className="text-xl font-semibold mb-2">Sustainable Agricultural Practices</h3>
                        <p className="text-sm text-gray-600">
                            Learn to farm sustainably with nature-based solutions and modern techniques. Our curated curriculum empowers participants to farm smarter, boost yields, earn more, and spend less, while protecting the environment, enhancing farmer safety, and ensuring long-term food security.
                        </p>
                    </div>

                    <div className="bg-transparent p-6 rounded-xl ">
                        <FontAwesomeIcon icon={faCrow} className="text-3xl text-stone-900 mb-3" />
                        <h3 className="text-xl font-semibold mb-2">Poultry Farming</h3>
                        <p className="text-sm text-gray-600">
                            Gain practical skills for profitable, sustainable poultry production. Our training program covers brooding, feeding, housing, health management, and marketing. Participants also receive a tool to track feed, medication, productivity, and costs, helping reduce losses, monitor performance, and boost profitability for both new and experienced poultry farmers.
                        </p>
                    </div>

                    <div className="bg-transparent p-6 rounded-xl ">
                        <FontAwesomeIcon icon={faHandshake} className="text-3xl text-stone-900 mb-3" />
                        <h3 className="text-xl font-semibold mb-2">Agribusiness</h3>
                        <p className="text-sm text-gray-600">
                            Build the skills to launch, manage, and grow a successful agribusiness. Our curated curriculum is tailored to the needs of farmers, entrepreneurs, and agribusiness professionals. The program combines real-world insights, industry-based strategies, and interactive learning to help participants turn agricultural opportunities into profitable and sustainable ventures.
                        </p>
                    </div>

                    <div className="bg-transparent p-6 rounded-xl ">
                        <FontAwesomeIcon icon={faChalkboardTeacher} className="text-3xl text-stone-900 mb-3" />
                        <h3 className="text-xl font-semibold mb-2">Mentorship/internship</h3>
                        <p className="text-sm text-gray-600">
                            Bridge the gap between knowledge and real-world experience. Our mentorship and internship program connects young agripreneurs and students with industry experts for hands-on experience, personalized guidance, and career readiness in agribusiness.
                        </p>
                    </div>

                    <div className="bg-transparent p-6 rounded-xl ">
                        <FontAwesomeIcon icon={faMagnifyingGlass} className="text-3xl text-stone-900 mb-3" />
                        <h3 className="text-xl font-semibold mb-2">Consultancy Services</h3>
                        <p className="text-sm text-gray-600">
                            EPI combines deep knowledge of Ghana’s agricultural sector with practical industry expertise to deliver trusted consultancy for agricultural initiatives, value-chain development, and credible data to guide your next strategic decision.
                        </p>
                    </div>
                </div>

            </section>

            <div className="h-10 md:h-16 bg-white" aria-hidden="true" />

            <section className="bg-stone-50 py-16 px-6 md:px-20">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-stone-900 text-center mb-8">Why Choose Us?</h2>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {[
                            ['Tailored Solutions', 'Services designed around each client’s goals and challenges.'],
                            ['Expert-Led Delivery', 'Training backed by our affiliation with the Ghana TVET Service.'],
                            ['A Partner in Growth, Not Just a Service Provider', 'We build lasting partnerships, not one-off transactions.'],
                            ['Proven Impact', 'More than 9,000 farmers and agripreneurs supported, including women and youth.'],
                        ].map(([title, description]) => (
                            <div key={title} className="bg-transparent p-6 ">
                                <h3 className="text-lg font-semibold mb-2">{title}</h3>
                                <p className="text-sm text-gray-600">{description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <CountSection />

            {/* Call to Action */}
            <section className="bg-white text-stone-900 py-16 px-6 md:px-20" data-aos="fade-up">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-4">Ready to strengthen your farming or agribusiness skills?</h2>
                    <p className="mb-6 text-gray-600">
                        Join EPI’s growing community of empowered agripreneurs driving agricultural transformation.
                    </p>
                    <Link href="/contact">
                        <button className="bg-green-900 hover:bg-green-700 text-white px-6 py-3 text-sm sm:text-base rounded-full">
                            Get Started <i className="ri-arrow-right-line transition"></i>
                        </button>
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default TrainPage;
