import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'remixicon/fonts/remixicon.css';

const Footer = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <footer className="bg-green-900 text-white py-10 px-6 md:px-16">
      <div
        className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8"
        data-aos="fade-up"
      >
        {/* About */}
        <div data-aos="fade-up" data-aos-delay="100">
          <h2 className="text-xl font-semibold mb-4">Eagle Park Innovations</h2>
          <p className="text-sm leading-relaxed">
            Empowering farmers, feeding nations, and building sustainable futures.
          </p>
        </div>

        {/* Links */}
        <div data-aos="fade-up" data-aos-delay="200">
          <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-green-300">Home</a></li>
            <li><a href="ourstory" className="hover:text-green-300">About Us</a></li>
            <li><a href="shop" className="hover:text-green-300">Shop</a></li>
            <li><a href="contact" className="hover:text-green-300">Contact</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div data-aos="fade-up" data-aos-delay="300">
          <h2 className="text-lg font-semibold mb-4">Contact</h2>
          <ul className="text-sm space-y-2">
            <li><i className="ri-map-pin-line mr-2 "></i>Seeds/Grains: Nyankpala, Northern Region</li>
            <li><i className="ri-map-pin-line mr-2 "></i>Poultry: Ankaase. Ashanti Region</li>
            <li><i className="ri-phone-line mr-2"></i> +233 244175741</li>
            <li><i className="ri-mail-line mr-2"></i>eagleparkinnovations@yahoo.com</li>
          </ul>
        </div>

        {/* Social Media */}
        <div data-aos="fade-up" data-aos-delay="400">
          <h2 className="text-lg font-semibold mb-4">Follow Us</h2>
          <div className="flex space-x-4 text-xl">
            <a href="#"><i className="ri-facebook-box-fill hover:text-yellow-400 text-yellow-300"></i></a>
            <a href="#"><i className="ri-twitter-x-line  hover:text-yellow-400 text-yellow-300"></i></a>
            <a href="#"><i className="ri-instagram-line  hover:text-yellow-400 text-yellow-300"></i></a>
            <a href="#"><i className="ri-linkedin-box-line  hover:text-yellow-400 text-yellow-300"></i></a>
          </div>
        </div>
      </div>

      {/* Bottom Text */}
      <div
        className="text-center text-sm mt-10 border-t border-green-700 pt-4 text-yellow-300"
        data-aos="fade-up"
        data-aos-delay="500"
      >
        &copy; {new Date().getFullYear()} EagleParkInn. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
