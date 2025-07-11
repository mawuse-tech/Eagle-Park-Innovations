import React from 'react';
import happyfarmers from '../assets/singlefarmer.jpg';
import HeroCompo from './HeroCompo';
import Example from './Example';
import PartnersPage from './PartnersPage';
import { NavLink } from 'react-router';

const Fixed = () => {
    return (
        <div>
            <section>
                <div>
                    <Example />
                </div>
            </section>

            <section
                className="relative bg-fixed bg-center bg-cover bg-no-repeat py-24 px-6 md:px-12 text-white"
                style={{ backgroundImage: `url(${happyfarmers})` }}
            >
                {/* Overlay */}
                <div className="absolute inset-0 bg-[#0212108a] z-0"></div>

                {/* Content */}
                <div
                    className="relative z-10 p-8 md:p-12 rounded-xl max-w-5xl mx-auto text-center"
                    data-aos="fade-up"
                    data-aos-duration="1000"
                >
                    <h1 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight">
                        Join Our Training and <span className="text-yellow-300">Consultancy Hub</span>
                    </h1>

                    <p className="text-base md:text-lg text-gray-200 mb-8 max-w-2xl mx-auto">
                        Learn directly from experienced farmers and agricultural professionals. 
                    </p>

                   <NavLink to="/train">
                     <button className="bg-green-700 hover:bg-green-600 text-white px-6 py-3 text-sm sm:text-base rounded-full transition">
                        Register Now <i className="ri-arrow-right-line ml-1"></i>
                    </button>
                   </NavLink>
                </div>
            </section>


            <section className="py-10 bg-gray-100">
                <div>
                    <HeroCompo />
                </div>
                <div>
                    <PartnersPage/>
                </div>
            </section>

        </div>
    )
}

export default Fixed