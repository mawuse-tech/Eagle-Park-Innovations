import React, { useEffect } from 'react';
import AOS from 'aos';
import train from '../TrainingPage/train.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChalkboardTeacher, faCrow, faDove, faHandshake, faKiwiBird, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import CountSection from '../../../Components/CountSection';
import { NavLink } from 'react-router';

const TrainPage = () => {
    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    return (
        <div className=" text-green-900">
            {/* Hero Section */}
            <section className="flex flex-col md:flex-row items-center justify-between bg-white text-green-900 px-6 md:px-20 py-16">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 items-center gap-10">

                    {/* Text Section */}
                    <div data-aos="fade-right" className="space-y-6">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight text-green-900">
                            Grow with Us: Join Our Training and Consultancy Programs
                        </h1>
                        <p className="text-gray-700 mb-6">
                            Our comprehensive capacity-building program equips individuals and agribusinesses with hands-on skills, expert knowledge, and proven strategies tailored to their unique needs, thereby empowering farmers to transform their journey and helping agribusinesses grow, thrive, and stay resilient.

                        </p>
                        <div className="flex gap-4">
                            <NavLink to="/contact">
                                <button className="bg-green-900 text-white px-6 py-3 rounded-full hover:bg-[#1C8057] transition">
                                    Register
                                </button>
                            </NavLink>

                            <NavLink to="/ourstory">
                                <button className="border border-green-900 text-[#1C8057] px-6 py-3 rounded-full hover:bg-[#1C8057] hover:text-white transition">
                                    Learn More
                                </button>
                            </NavLink>

                        </div>
                    </div>

                    {/* Image Section */}
                    <div data-aos="fade-left">
                        <div className="relative group">
                            <div className="absolute top-0 left-0 w-full h-full bg-[#002920] rounded-tl-[80px] rounded-br-[80px] opacity-20 -z-10 rotate-2"></div>
                            <div className="overflow-hidden shadow-2xl border-l-8 border-b-8 border-green-900 rounded-tl-[80px] rounded-br-[80px] transform hover:scale-105 transition duration-500">
                                <img
                                    src={train}
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
            <section className="py-16 px-6 md:px-20 bg-green-900">
                <div className="text-center mb-12" data-aos="fade-up">
                    <h2 className="text-3xl md:text-4xl font-bold text-white">What We Offer</h2>
                    <p className="text-yellow-300 mt-2 max-w-xl mx-auto">
                        Tap into our expertise to turn your passion for farming and agribusiness into profitable ventures and lasting impact. We offer training and consultancy services in the following key areas:
                    </p>
                </div>

                <div className="grid gap-10 md:grid-cols-3" data-aos="fade-up">
                    <div className="bg-[#f3fdf5] p-6 rounded-xl shadow-md hover:shadow-lg transition">
                        <i className="ri-seedling-fill text-3xl text-[#002920] mb-4"></i>
                        <h3 className="text-xl font-semibold mb-2">Seed Production Techniques</h3>
                        <p className="text-sm text-gray-600">
                            Join our training program to master industry-validated seed production techniques. Our comprehensive curriculum equips participants to independently produce certified and early-generation seeds of hybrid, conventional, and open-pollinated crops that meet certification standards and support agricultural excellence.
                        </p>
                    </div>

                    <div className="bg-[#f3fdf5] p-6 rounded-xl shadow-md hover:shadow-lg transition">
                        <i className="ri-plant-line text-3xl text-[#002920] mb-4"></i>
                        <h3 className="text-xl font-semibold mb-2">Sustainable Agricultural Practices</h3>
                        <p className="text-sm text-gray-600">
                            Learn to farm sustainably with nature-based solutions and modern techniques. Our curated curriculum empowers participants to farm smarter, boost yields, earn more, and spend less, while protecting the environment, enhancing farmer safety, and ensuring long-term food security.
                        </p>
                    </div>

                    <div className="bg-[#f3fdf5] p-6 rounded-xl shadow-md hover:shadow-lg transition">
                        <FontAwesomeIcon icon={faCrow} className="text-3xl text-[[#002920]] mb-3" />
                        <h3 className="text-xl font-semibold mb-2">Poultry Farming</h3>
                        <p className="text-sm text-gray-600">
                            Gain practical skills for profitable, sustainable poultry production. Our training program covers brooding, feeding, housing, health management, and marketing. Participants also receive a tool to track feed, medication, productivity, and costs, helping reduce losses, monitor performance, and boost profitability for both new and experienced poultry farmers.
                        </p>
                    </div>

                    <div className="bg-[#f3fdf5] p-6 rounded-xl shadow-md hover:shadow-lg transition">
                        <FontAwesomeIcon icon={faHandshake} className="text-3xl text-[[#002920]] mb-3" />
                        <h3 className="text-xl font-semibold mb-2">Agribusiness</h3>
                        <p className="text-sm text-gray-600">
                            Build the skills to launch, manage, and grow a successful agribusiness. Our curated curriculum is tailored to the needs of farmers, entrepreneurs, and agribusiness professionals. The program combines real-world insights, industry-based strategies, and interactive learning to help participants turn agricultural opportunities into profitable and sustainable ventures.
                        </p>
                    </div>

                    <div className="bg-[#f3fdf5] p-6 rounded-xl shadow-md hover:shadow-lg transition">
                        <FontAwesomeIcon icon={faChalkboardTeacher} className="text-3xl text-[[#002920]] mb-3" />
                        <h3 className="text-xl font-semibold mb-2">Mentorship/internship</h3>
                        <p className="text-sm text-gray-600">
                            Bridge the gap between knowledge and real-world experience. Our mentorship and internship program connects young agripreneurs and students with industry experts for hands-on experience, personalized guidance, and career readiness in agribusiness.
                        </p>
                    </div>

                    <div className="bg-[#f3fdf5] p-6 rounded-xl shadow-md hover:shadow-lg transition">
                        <FontAwesomeIcon icon={faMagnifyingGlass} className="text-3xl text-[[#002920]] mb-3" />
                        <h3 className="text-xl font-semibold mb-2">Research and Consultancy</h3>
                        <p className="text-sm text-gray-600">
                            EPI is your go-to hub for agricultural research and consultancy, combining deep knowledge of Ghana’s agricultural landscape with rich industry experience to support proposal development, project implementation, value chain initiatives, and data-driven insights.
                        </p>
                    </div>
                </div>
            </section>

            <CountSection />

            {/* Call to Action */}
            <section className="bg-white text-green-900 py-16 px-6 md:px-20" data-aos="fade-up">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-4">Ready to Grow Your Farming and Agribusiness Skills?</h2>
                    <p className="mb-6 text-gray-600">
                        Be part of a network of knowledgeable, empowered farmers and businesses transforming agriculture across the region.
                    </p>
                    <NavLink to="/contact">
                        <button className="bg-green-900 hover:bg-green-700 text-white px-6 py-3 text-sm sm:text-base rounded-full">
                            Register for our next class <i className="ri-arrow-right-line transition"></i>
                        </button>
                    </NavLink>
                </div>
            </section>
        </div>
    );
};

export default TrainPage;
