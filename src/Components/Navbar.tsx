'use client';

import React, { useState } from 'react';
import logo from '../assets/loggo.png';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/src/auth/AuthProvider';

const Navbar = () => {
  const pathname = usePathname();
  const isProductPage = ['/seed', '/grain', '/poultry'].includes(pathname);
  const productLinkClass = (href: string) =>
    `px-4 py-2 text-sm ${pathname === href ? 'bg-[#e0e8d9] text-[#294834] font-semibold' : 'hover:bg-[#ede8d0]'}`;
  const { user, isLoading: isAuthLoading, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false);

  const handleCloseMenu = () => {
    setIsMobileMenuOpen(false);
    setIsMobileProductsOpen(false);
  };

  return (
    <nav className="site-nav bg-white text-stone-800 px-4 sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between flex-wrap py-1">
        <div className="m-1.5 shrink-0">
          <Link href="/">
            <img
              src={logo.src}
              alt="Eagle Park Innovations home"
              className="h-[3.5rem] w-auto items-center pr-2"
            />
          </Link>
        </div>
        <div className="hidden xl:flex items-center gap-6 ml-6 text-[16px]">
          <Link className={pathname === '/' ? "text-green-800" : "text-stone-800"} href="/">Home</Link>
          <div>
            <Link className={pathname === '/ourstory' ? "text-green-800" : "text-stone-800"} href='/ourstory'> About Us</Link>
          </div>
          <div className="relative group">
           
              <button type="button" className={`cursor-pointer ${isProductPage ? 'text-green-800 font-semibold' : ''}`}>Products <i className="ri-arrow-down-s-line text-sm" aria-hidden="true"></i></button>
         
            <div className="absolute top-full left-0 mt-0 group-hover:flex group-focus-within:flex hidden flex-col bg-white text-[#002920] shadow-lg rounded-md min-w-[160px] z-50">
              <Link href="/seed" aria-current={pathname === '/seed' ? 'page' : undefined} className={productLinkClass('/seed')}>Bundled Services</Link>
              <Link href="/grain" aria-current={pathname === '/grain' ? 'page' : undefined} className={productLinkClass('/grain')}>Premium Grains</Link>
              <Link href="/poultry" aria-current={pathname === '/poultry' ? 'page' : undefined} className={productLinkClass('/poultry')}>Poultry Products</Link>
            </div>
          </div>

          <Link className={pathname === '/train' ? "text-green-800" : "text-stone-800"} href="/train">Training and Consultancy Hub</Link>
          <Link
            href="/contact"
            className={`flex items-center gap-1 hover:text-green-700 ${pathname === '/contact' ? "text-green-800 font-semibold" : "text-stone-800"}`}
          >
            Contact Us
          </Link>

        </div>
        <div className="hidden xl:flex items-center gap-1 font-medium ">
          {!isAuthLoading && user ? (
            <>
              {user.role === 'admin' && <Link href="/admin" className="mr-3 text-sm text-green-800 hover:text-green-700">Admin</Link>}
              <span className="mr-3 max-w-32 truncate text-sm" title={user.name}>{user.name}</span>
              <button type="button" onClick={logout} className="rounded-full bg-stone-100 px-5 py-2.5 text-sm text-green-950 hover:bg-stone-200">Logout</button>
            </>
          ) : !isAuthLoading ? (
            <Link href="/login" className="rounded-full bg-stone-100 px-6 py-3 text-sm text-green-950 hover:bg-stone-200">Login <i className="ri-login-box-line" aria-hidden="true" /></Link>
          ) : null}
        </div>
        <div className="xl:hidden ml-auto">
          <button aria-label={isMobileMenuOpen ? "Close navigation" : "Open navigation"} aria-expanded={isMobileMenuOpen} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <i className={`text-3xl text-stone-800 ${isMobileMenuOpen ? 'ri-close-line' : 'ri-menu-line'}`}></i>
          </button>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="xl:hidden mt-3 flex flex-col gap-2 text-1xl font-medium px-4 pb-4">
          <Link href="/" onClick={handleCloseMenu} className="hover:text-green-700">Home</Link>
          <Link href="/ourstory" onClick={handleCloseMenu} className="hover:text-green-700">About Us</Link>
          <div className="flex flex-col">
            <button
              aria-expanded={isMobileProductsOpen}
              onClick={() => setIsMobileProductsOpen(!isMobileProductsOpen)}
              className={`flex items-center gap-1 hover:text-green-700 w-full text-left ${isProductPage ? 'text-green-800 font-semibold' : ''}`}
            >
              Products <i className="ri-arrow-down-s-line text-sm"></i>
            </button>
            {isMobileProductsOpen && (
              <div className="flex flex-col bg-white text-green-900 shadow-lg rounded-md mt-1">
                <Link href="/seed" onClick={handleCloseMenu} aria-current={pathname === '/seed' ? 'page' : undefined} className={productLinkClass('/seed')}>Bundled Services</Link>
                <Link href="/poultry" onClick={handleCloseMenu} aria-current={pathname === '/poultry' ? 'page' : undefined} className={productLinkClass('/poultry')}>Poultry products</Link>
                <Link href="/grain" onClick={handleCloseMenu} aria-current={pathname === '/grain' ? 'page' : undefined} className={productLinkClass('/grain')}>Premium Grains</Link>
              </div>
            )}
          </div>

          <Link href="/train" onClick={handleCloseMenu} className="hover:text-green-700">Training and consultancy Hub</Link>
          <Link href="/contact" onClick={handleCloseMenu} className="hover:text-green-700">Contact Us</Link>
          {!isAuthLoading && user?.role === 'admin' && <Link href="/admin" onClick={handleCloseMenu} className="text-green-800">Admin</Link>}

          <div className="mt-2">
            {!isAuthLoading && user ? (
              <button type="button" onClick={() => { handleCloseMenu(); logout(); }} className="bg-stone-100 hover:bg-stone-200 text-green-900 px-4 py-2 rounded-lg shadow-sm font-semibold w-full">Logout</button>
            ) : !isAuthLoading ? (
              <Link href="/login" onClick={handleCloseMenu} className="block bg-stone-100 hover:bg-stone-200 text-green-900 px-4 py-2 rounded-lg shadow-sm font-semibold w-full text-center">Login</Link>
            ) : null}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
