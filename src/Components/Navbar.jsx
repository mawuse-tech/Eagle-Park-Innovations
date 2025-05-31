import React from 'react'
import { useState } from 'react';
import logo from '../assets/logo2.png'
const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <nav className="bg-[#1C8057] text-white px-4 ">
            <div className="container mx-auto flex items-center justify-between flex-wrap">

                <div>
                    <img src={logo} className="h-25 w-auto" />
                </div>


                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-6 ml-6 text-sm font-medium text-white text-[18px]">
                    <a href="#" className="hover:text-yellow-400">Home</a>
                    <a href="#" className="hover:text-yellow-400">Shop</a>
                    <a href="#" className="hover:text-yellow-400">Fruits</a>
                    <a href="#" className="hover:text-yellow-400">Vegetable</a>
                    <a href="#" className="hover:text-yellow-400">Beverages</a>
                    <a href="#" className="hover:text-yellow-400">About Us</a>
                    <a href="#" className="hover:text-yellow-400">Blogs</a>
                </div>

                {/* Right Dropdown */}
                <div className="hidden md:flex items-center gap-1 text-[#F5F5DC] font-medium cursor-pointer">
                    <span>Recently Viewed</span>
                    <i className="ri-arrow-down-s-line text-sm"></i>
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
                    <a href="#" className="hover:text-yellow-400">Shop</a>
                    <a href="#" className="hover:text-yellow-400">Fruits</a>
                    <a href="#" className="hover:text-yellow-400">Vegetable</a>
                    <a href="#" className="hover:text-yellow-400">Beverages</a>
                    <a href="#" className="hover:text-yellow-400">About Us</a>
                    <a href="#" className="hover:text-yellow-400">Blogs</a>
                    <div className="text-yellow-400 mt-2 flex items-center gap-1">
                        <span>Recently Viewed</span>
                        <i className="ri-arrow-down-s-line text-sm"></i>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
