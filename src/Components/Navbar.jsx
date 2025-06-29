import React, { useState } from 'react';
import logo from '../assets/log.png';
import { NavLink } from 'react-router';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileAboutOpen, setIsMobileAboutOpen] = useState(false);
  const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false);

  const handleCloseMenu = () => {
    setIsMobileMenuOpen(false);
    setIsMobileAboutOpen(false);
    setIsMobileProductsOpen(false);
  };

  return (
    <nav className="bg-green-900/90 text-white px-4 font-oswald sticky top-0 z-50">
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
            <div className="absolute top-full left-0 mt-0 group-hover:flex hidden flex-col bg-white text-green-900 shadow-lg rounded-md min-w-[160px] z-50">
              <NavLink to="/ourstory" className="px-4 py-2 text-sm hover:bg-[#ede8d0]">About</NavLink>
              <NavLink to="/mission" className="px-4 py-2 text-sm hover:bg-[#ede8d0]">Our Mission/Vission</NavLink>
              <NavLink to="/team" className="px-4 py-2 text-sm hover:bg-[#ede8d0]">Our Team</NavLink>
            </div>
          </div>

          {/* Products Dropdown */}
          <div className="relative group">
            <NavLink className="hover:text-yellow-400 flex items-center gap-1">
              Products <i className="ri-arrow-down-s-line text-sm"></i>
            </NavLink>
            <div className="absolute top-full left-0 mt-0 group-hover:flex hidden flex-col bg-white text-[#002920] shadow-lg rounded-md min-w-[160px] z-50">
              <NavLink to="/seed" className="px-4 py-2 text-sm hover:bg-[#ede8d0]">Certified seeds</NavLink>
              <NavLink to="/poultry" className="px-4 py-2 text-sm hover:bg-[#ede8d0]">Poultry Products</NavLink>
              <NavLink to="/grain" className="px-4 py-2 text-sm hover:bg-[#ede8d0]">Premium Grains</NavLink>
            </div>
          </div>

          <NavLink to="/train">Training and consultancy Hub</NavLink>
          <NavLink to="/contact" className="hover:text-yellow-400 flex items-center gap-1">Contact us</NavLink>
        </div>

        {/* Desktop Button */}
        <div className="hidden md:flex items-center gap-1 font-medium ">
          <NavLink to="/shop">
            <button className="bg-yellow-300 hover:bg-yellow-400 text-green-900 px-6 py-3 text-sm sm:text-base rounded-full">
              Shop Now <i className="ri-arrow-right-line"></i>
            </button>
          </NavLink>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden ml-auto">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <i className={`text-5xl text-white ${isMobileMenuOpen ? 'ri-close-line' : 'ri-menu-line'}`}></i>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-3 flex flex-col gap-2 text-1xl font-medium px-4 pb-4">
          <NavLink to="/" onClick={handleCloseMenu} className="hover:text-yellow-400">Home</NavLink>

          {/* Mobile About Us */}
          <div className="flex flex-col">
            <button
              onClick={() => setIsMobileAboutOpen(!isMobileAboutOpen)}
              className="flex items-center gap-1 hover:text-yellow-400 w-full text-left"
            >
              About Us <i className="ri-arrow-down-s-line text-sm"></i>
            </button>
            {isMobileAboutOpen && (
              <div className="flex flex-col bg-white text-green-900 shadow-lg rounded-md mt-1">
                <NavLink to="/ourstory" onClick={handleCloseMenu} className="px-4 py-2 text-sm hover:bg-[#ede8d0]">Our Story</NavLink>
                <NavLink to="/mission" onClick={handleCloseMenu} className="px-4 py-2 text-sm hover:bg-[#ede8d0]">Mission/Vission</NavLink>
                <NavLink to="/team" onClick={handleCloseMenu} className="px-4 py-2 text-sm hover:bg-[#ede8d0]">Our Team</NavLink>
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
              <div className="flex flex-col bg-white text-green-900 shadow-lg rounded-md mt-1">
                <NavLink to="/seed" onClick={handleCloseMenu} className="px-4 py-2 text-sm hover:bg-[#ede8d0]">Certified seeds</NavLink>
                <NavLink to="/poultry" onClick={handleCloseMenu} className="px-4 py-2 text-sm hover:bg-[#ede8d0]">Poultry products</NavLink>
                <NavLink to="/grain" onClick={handleCloseMenu} className="px-4 py-2 text-sm hover:bg-[#ede8d0]">Premium Grains</NavLink>
              </div>
            )}
          </div>

          <NavLink to="/train" onClick={handleCloseMenu} className="hover:text-yellow-400">Training and consultancy Hub</NavLink>
          <NavLink to="/contact" onClick={handleCloseMenu} className="hover:text-yellow-400">Contact Us</NavLink>

          <div className="mt-2">
            <NavLink to="/shop" onClick={handleCloseMenu}>
              <button className="bg-yellow-300 hover:bg-yellow-500 text-green-900 px-4 py-2 rounded-lg shadow-sm font-semibold w-full">
                Shop now <i className="ri-arrow-right-line"></i>
              </button>
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
