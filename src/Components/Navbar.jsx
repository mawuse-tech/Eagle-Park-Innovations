import React from 'react'
import { useState } from 'react';
import logo from '../assets/logo2.png'
const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <nav className="bg-[#1C8057] text-white px-4 font-oswald">
            <div className="container mx-auto flex items-center justify-between flex-wrap">

                <div>
                    <img src={logo} className="h-25 w-auto" />
                </div>


                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-6 ml-6 text-sm  text-white text-[16px]">
                    <a href="#" className="hover:text-yellow-400">Home</a>
                    <div className="relative group">
                        {/* Trigger Link */}
                        <a
                            href="#"
                            className="hover:text-yellow-400 flex items-center gap-1"
                        >
                            About Us
                            <i className="ri-arrow-down-s-line text-sm"></i>
                        </a>

                        {/* Dropdown Menu */}
                        <div className="absolute top-full left-0 mt-0 group-hover:flex hidden flex-col bg-white text-[#1C8057] shadow-lg rounded-md min-w-[160px] z-50">
                            <a href="#" className="px-4 py-2 text-sm hover:bg-yellow-100">Our Story</a>
                            <a href="#" className="px-4 py-2 text-sm hover:bg-yellow-100">Mission/vission</a>
                            <a href="#" className="px-4 py-2 text-sm hover:bg-yellow-100">Our team</a>
                        </div>
                    </div>

                    <div className="relative group">
                        {/* Trigger Link */}
                        <a
                            href="#"
                            className="hover:text-yellow-400 flex items-center gap-1"
                        >
                            Products
                            <i className="ri-arrow-down-s-line text-sm"></i>
                        </a>

                        {/* Dropdown Menu */}
                        <div className="absolute top-full left-0 mt-0 group-hover:flex hidden flex-col bg-white text-[#1C8057] shadow-lg rounded-md min-w-[160px] z-50">
                            <a href="#" className="px-4 py-2 text-sm hover:bg-yellow-100">Grains</a>
                            <a href="#" className="px-4 py-2 text-sm hover:bg-yellow-100">poultry products</a>
                            <a href="#" className="px-4 py-2 text-sm hover:bg-yellow-100">Certified seeds</a>
                        </div>
                    </div>
                    <a href="#" className="hover:text-yellow-400">Bloq</a>
                    <a href="#" className="hover:text-yellow-400">Contact Us</a>

                </div>

                {/* Right Dropdown */}
                <div className="hidden md:flex items-center gap-1 font-medium cursor-pointer">
                    <button className="bg-yellow-400 hover:bg-yellow-500 text-[#1C8057] px-6 py-2 rounded-lg transition duration-300 shadow-sm font-semibold">
                        Shop
                    </button>
                </div>

                {/* Mobile Menu Toggle */}
                <div className="md:hidden ml-auto">
                    <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                        <i className="ri-menu-line text-2xl text-white"></i>
                    </button>
                </div>
            </div>

            {/* Mobile Menu Items */}
            {isMobileMenuOpen && (
                <div className="md:hidden mt-3 flex flex-col gap-2 text-sm font-medium px-4">
                    <a href="#" className="hover:text-yellow-400">Home</a>
                    <div className="relative group">
                        {/* Trigger Link */}
                        <a
                            href="#"
                            className="hover:text-yellow-400 flex items-center gap-1"
                        >
                            About Us
                            <i className="ri-arrow-down-s-line text-sm"></i>
                        </a>

                        {/* Dropdown Menu */}
                        <div className="absolute top-full left-0 mt-0 group-hover:flex hidden flex-col bg-white text-[#1C8057] shadow-lg rounded-md min-w-[160px] z-50">
                            <a href="#" className="px-4 py-2 text-sm hover:bg-yellow-100">Our Story</a>
                            <a href="#" className="px-4 py-2 text-sm hover:bg-yellow-100">Mission/Vission</a>
                            <a href="#" className="px-4 py-2 text-sm hover:bg-yellow-100">Our team</a>
                        </div>
                    </div>

                    <div className="relative group">
                        {/* Trigger Link */}
                        <a
                            href="#"
                            className="hover:text-yellow-400 flex items-center gap-1"
                        >
                            About Us
                            <i className="ri-arrow-down-s-line text-sm"></i>
                        </a>

                        {/* Dropdown Menu */}
                        <div className="absolute top-full left-0 mt-0 group-hover:flex hidden flex-col bg-white text-[#1C8057] shadow-lg rounded-md min-w-[160px] z-50">
                            <a href="#" className="px-4 py-2 text-sm hover:bg-yellow-100">Our Story</a>
                            <a href="#" className="px-4 py-2 text-sm hover:bg-yellow-100">Mission/vission</a>
                            <a href="#" className="px-4 py-2 text-sm hover:bg-yellow-100">Our team</a>
                        </div>
                    </div>
                    <a href="#" className="hover:text-yellow-400">Bloq</a>
                    <a href="#" className="hover:text-yellow-400">Contact Us</a>

                    <div className="text-yellow-400 mt-2 flex items-center gap-1 py-2">
                        <button className="bg-yellow-400 hover:bg-yellow-500 text-[#1C8057] px-4 py-2 rounded-lg transition duration-300 shadow-sm font-semibold">
                            Shop
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
