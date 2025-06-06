import React from 'react'
import { useState } from 'react';
import logo from '../assets/logo.png';
import { NavLink, Link } from 'react-router';

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobileAboutOpen, setIsMobileAboutOpen] = useState(false);
    const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false);

    return (
        <nav className="bg-[#021210] text-white px-4 font-oswald sticky top-0 z-50">
            <div className="container mx-auto flex items-center justify-between flex-wrap ">

                {/* Logo */}
                <div>
                    <img src={logo} alt="Logo" className="h-30 w-auto lg:h-20 md:h-30" />
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-6 ml-6 text-[16px]">
                    <NavLink to="/">Home</NavLink>

                    {/* About Us Dropdown */}
                    <div className="relative group">

                        <NavLink> About Us <i className="ri-arrow-down-s-line text-sm"></i></NavLink>

                        <div className="absolute top-full left-0 mt-0 group-hover:flex hidden flex-col bg-white text-[#1C8057] shadow-lg rounded-md min-w-[160px] z-50">
                            <NavLink to="/ourstory" className="px-4 py-2 text-sm hover:bg-yellow-100">Our Story</NavLink>

                           <NavLink to="/mission" className="px-4 py-2 text-sm hover:bg-yellow-100">Our Mission/Vission</NavLink>

                             <NavLink to="/team" className="px-4 py-2 text-sm hover:bg-yellow-100">Our Team</NavLink>

                            <NavLink to="/train" className="px-4 py-2 text-sm hover:bg-yellow-100">Our Trainings</NavLink>
                        </div>
                    </div>

                    {/* Products Dropdown */}
                    <div className="relative group">
                        <a href="#" className="hover:text-yellow-400 flex items-center gap-1">
                            Products <i className="ri-arrow-down-s-line text-sm"></i>
                        </a>
                        <div className="absolute top-full left-0 mt-0 group-hover:flex hidden flex-col bg-white text-[#1C8057] shadow-lg rounded-md min-w-[160px] z-50">
                            <a href="#" className="px-4 py-2 text-sm hover:bg-yellow-100">Grains</a>
                            <a href="#" className="px-4 py-2 text-sm hover:bg-yellow-100">Poultry Products</a>
                            <a href="#" className="px-4 py-2 text-sm hover:bg-yellow-100">Certified Seeds</a>
                        </div>
                    </div>

                    <a href="#" className="hover:text-yellow-400">Blog</a>
                    <a href="#" className="hover:text-yellow-400">Contact Us</a>
                </div>

                {/* Desktop Button */}
                <div className="hidden md:flex items-center gap-1 font-medium">
                    <button className="bg-white hover:bg-green-700 text-green-800 px-6 py-3 text-sm sm:text-base rounded-full">
                        Shop Now <i className="ri-arrow-right-line"></i>
                    </button>
                </div>

                {/* Mobile Menu Toggle */}
                <div className="md:hidden ml-auto">
                    <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                        <i className="ri-menu-line text-5xl text-white"></i>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden mt-3 flex flex-col gap-2 text-1xl font-medium px-4 pb-4">
                    <NavLink to="/" className="hover:text-yellow-400">Home</NavLink>

                    {/* Mobile About Us */}
                    <div className="flex flex-col">
                        <button
                            onClick={() => setIsMobileAboutOpen(!isMobileAboutOpen)}
                            className="flex items-center gap-1 hover:text-yellow-400 w-full text-left"
                        >
                            About Us <i className="ri-arrow-down-s-line text-sm"></i>
                        </button>
                        {isMobileAboutOpen && (
                            <div className="flex flex-col bg-white text-[#1C8057] shadow-lg rounded-md mt-1">
                                <NavLink to="/ourstory" className="px-4 py-2 text-sm hover:bg-yellow-100">Our Story</NavLink>
                                <a href="#" className="px-4 py-2 text-sm hover:bg-yellow-100">Mission/Vision</a>
                                <a href="#" className="px-4 py-2 text-sm hover:bg-yellow-100">Our Team</a>
                            </div>
                        )}
                    </div>

                    {/* Mobile Products */}
                    <div className="flex flex-col">
                        <button
                            onClick={() => setIsMobileProductsOpen(!isMobileProductsOpen)}
                            className="flex items-center gap-1 hover:text-yellow-400 w-full text-left"
                        >
                            Products <i className="ri-arrow-down-s-line text-sm"></i>
                        </button>
                        {isMobileProductsOpen && (
                            <div className="flex flex-col bg-white text-[#1C8057] shadow-lg rounded-md mt-1">
                                <a href="#" className="px-4 py-2 text-sm hover:bg-yellow-100">Grains</a>
                                <a href="#" className="px-4 py-2 text-sm hover:bg-yellow-100">Poultry Products</a>
                                <a href="#" className="px-4 py-2 text-sm hover:bg-yellow-100">Certified Seeds</a>
                            </div>
                        )}
                    </div>

                    <a href="#" className="hover:text-yellow-400">Blog</a>
                    <a href="#" className="hover:text-yellow-400">Contact Us</a>

                    <div className="mt-2">
                        <button className="bg-yellow-400 hover:bg-yellow-500 text-[#1C8057] px-4 py-2 rounded-lg shadow-sm font-semibold w-full">
                            Shop
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
