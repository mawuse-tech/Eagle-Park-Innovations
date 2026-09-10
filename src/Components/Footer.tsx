'use client';

import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'remixicon/fonts/remixicon.css';
import Link from 'next/link';

const Footer = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <footer className="bg-[#e0e8d9] text-[#294834] py-16 px-6 md:px-16">
      <div
        className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8"
        data-aos="fade-up"
      >
        {/* About */}
        <div data-aos="fade-up" data-aos-delay="100">
          <h2 className="text-xl font-semibold mb-4">EPI</h2>
          <p className="text-sm leading-relaxed">
          Empowering farmers, feeding nations, and building sustainable futures
          </p>
        </div>

        {/* Links */}
        <div data-aos="fade-up" data-aos-delay="200">
          <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:text-[#62734c] hover:underline">Home</Link></li>
            <li><Link href="/ourstory" className="hover:text-[#62734c] hover:underline">About Us</Link></li>
            <li><Link href="/shop" className="hover:text-[#62734c] hover:underline">Shop</Link></li>
            <li><Link href="/contact" className="hover:text-[#62734c] hover:underline">Contact</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div data-aos="fade-up" data-aos-delay="300">
          <h2 className="text-lg font-semibold mb-4">Contact</h2>
          <ul className="text-sm space-y-2 break-words">
            <li><i className="ri-map-pin-line mr-2 "></i>Bundled Services/Grains: Nyankpala, Northern Region</li>
            <li><i className="ri-map-pin-line mr-2 "></i>Poultry: Ankaase. Ashanti Region</li>
            <li><i className="ri-phone-line mr-2"></i> +233 244175741</li>
            <li><i className="ri-mail-line mr-2"></i>eagleparkinnovations@yahoo.com</li>
          </ul>
        </div>

        {/* Social Media */}
        <div data-aos="fade-up" data-aos-delay="400">
          <h2 className="text-lg font-semibold mb-4">Follow Us</h2>
          <div className="flex space-x-4 text-xl">
            <a href="https://www.facebook.com/share/1Ahtriscx4/?mibextid=WC7FNe" target='_blank' rel="noopener noreferrer"><i className="ri-facebook-box-fill text-[#386347] hover:text-[#62734c]"></i></a>

            <a href="https://www.instagram.com/p/DLncarnsdyb/?igsh=MW1nZW92YTR0aHB0bA==" target='_blank' rel="noopener noreferrer"><i className="ri-instagram-line  text-[#386347] hover:text-[#62734c]"></i></a>

            <a href="https://www.linkedin.com/company/eagle-park-innovations-limited/?viewAsMember=true" target='_blank'><i className="ri-linkedin-box-line  text-[#386347] hover:text-[#62734c]"></i></a>
          </div>
        </div>
      </div>

      {/* Bottom Text */}
      <div
        className="text-center text-sm mt-10 border-t border-[#d9ddce] pt-4 text-[#596653]"
        data-aos="fade-up"
        data-aos-delay="500"
      >
        &copy; {new Date().getFullYear()} EagleParkInn. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
