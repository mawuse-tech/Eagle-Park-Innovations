'use client';

import React, { useState } from 'react';
import logo from '../assets/loggo.png';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/src/auth/AuthProvider';

const Navbar = () => {
  const pathname = usePathname();
  const { user, isLoading: isAuthLoading, logout } = useAuth();
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
      <div className="container mx-auto flex items-center justify-between flex-wrap py-1">
        {/* Logo */}
        <div className="bg-white rounded-lg hover:shadow-lg transition m-1.5">
          <Link href="/">
            <img
              src={logo.src}
              alt="Logo"
              className="h-[3.5rem] w-auto items-center pr-2"
            />
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 ml-6 text-[16px]">
          <Link className={pathname === '/' ? "text-yellow-300" : "text-white"} href="/">Home</Link>

          {/* About Us Dropdown */}
          <div>
            <Link className={pathname === '/ourstory' ? "text-yellow-300" : "text-white"} href='/ourstory'> About Us</Link>
            {/* <div className="absolute top-full left-0 mt-0 group-hover:flex hidden flex-col bg-white text-green-900 shadow-lg rounded-md min-w-[160px] z-50">
              <Link href="/ourstory" className="px-4 py-2 text-sm hover:bg-[#ede8d0]">About</Link>
              <Link href="/mission" className="px-4 py-2 text-sm hover:bg-[#ede8d0]">Our Mission/Vission</Link>
              <Link href="/team" className="px-4 py-2 text-sm hover:bg-[#ede8d0]">Our Team</Link>
            </div> */}
          </div>

          {/* Products Dropdown */}
          <div className="relative group">
           
              Products <i className="ri-arrow-down-s-line text-sm"></i>
         
            <div className="absolute top-full left-0 mt-0 group-hover:flex hidden flex-col bg-white text-[#002920] shadow-lg rounded-md min-w-[160px] z-50">
              <Link href="/seed" className="px-4 py-2 text-sm hover:bg-[#ede8d0]">Bundled Services</Link>
              <Link href="/grain" className="px-4 py-2 text-sm hover:bg-[#ede8d0]">Premium Grains</Link>
              <Link href="/poultry" className="px-4 py-2 text-sm hover:bg-[#ede8d0]">Poultry Products</Link>
            </div>
          </div>

          <Link className={pathname === '/train' ? "text-yellow-300" : "text-white"} href="/train">Training and Consultancy Hub</Link>
          <Link
            href="/contact"
            className={`flex items-center gap-1 hover:text-yellow-400 ${pathname === '/contact' ? "text-yellow-300 font-semibold" : "text-white"}`}
          >
            Contact Us
          </Link>

        </div>

        {/* Desktop Button */}
        <div className="hidden md:flex items-center gap-1 font-medium ">
          {!isAuthLoading && user ? (
            <>
              {user.role === 'admin' && <Link href="/admin" className="mr-3 text-sm text-yellow-300 hover:text-yellow-200">Admin</Link>}
              <span className="mr-3 max-w-32 truncate text-sm" title={user.name}>{user.name}</span>
              <button type="button" onClick={logout} className="rounded-full bg-yellow-300 px-5 py-2.5 text-sm text-green-950 hover:bg-yellow-400">Logout</button>
            </>
          ) : !isAuthLoading ? (
            <Link href="/login" className="rounded-full bg-yellow-300 px-6 py-3 text-sm text-green-950 hover:bg-yellow-400">Login <i className="ri-login-box-line" aria-hidden="true" /></Link>
          ) : null}
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
          <Link href="/" onClick={handleCloseMenu} className="hover:text-yellow-400">Home</Link>

          {/* Mobile About Us */}
          <div className="flex flex-col">
            <button
              onClick={() => setIsMobileAboutOpen(!isMobileAboutOpen)}
              className="flex items-center gap-1 hover:text-yellow-400 w-full text-left"
            >
              <Link href='/ourstory' onClick={handleCloseMenu}> About Us </Link>
            </button>
            {/* {isMobileAboutOpen && (
              <div className="flex flex-col bg-white text-green-900 shadow-lg rounded-md mt-1">
                <Link href="/ourstory" onClick={handleCloseMenu} className="px-4 py-2 text-sm hover:bg-[#ede8d0]">Our Story</Link>
                <Link href="/mission" onClick={handleCloseMenu} className="px-4 py-2 text-sm hover:bg-[#ede8d0]">Mission/Vission</Link>
                <Link href="/team" onClick={handleCloseMenu} className="px-4 py-2 text-sm hover:bg-[#ede8d0]">Our Team</Link>
              </div>
            )} */}
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
                <Link href="/seed" onClick={handleCloseMenu} className="px-4 py-2 text-sm hover:bg-[#ede8d0]">Bundled Services</Link>
                <Link href="/poultry" onClick={handleCloseMenu} className="px-4 py-2 text-sm hover:bg-[#ede8d0]">Poultry products</Link>
                <Link href="/grain" onClick={handleCloseMenu} className="px-4 py-2 text-sm hover:bg-[#ede8d0]">Premium Grains</Link>
              </div>
            )}
          </div>

          <Link href="/train" onClick={handleCloseMenu} className="hover:text-yellow-400">Training and consultancy Hub</Link>
          <Link href="/contact" onClick={handleCloseMenu} className="hover:text-yellow-400">Contact Us</Link>
          {!isAuthLoading && user?.role === 'admin' && <Link href="/admin" onClick={handleCloseMenu} className="text-yellow-300">Admin</Link>}

          <div className="mt-2">
            {!isAuthLoading && user ? (
              <button type="button" onClick={() => { handleCloseMenu(); logout(); }} className="bg-yellow-300 hover:bg-yellow-500 text-green-900 px-4 py-2 rounded-lg shadow-sm font-semibold w-full">Logout</button>
            ) : !isAuthLoading ? (
              <Link href="/login" onClick={handleCloseMenu} className="block bg-yellow-300 hover:bg-yellow-500 text-green-900 px-4 py-2 rounded-lg shadow-sm font-semibold w-full text-center">Login</Link>
            ) : null}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
