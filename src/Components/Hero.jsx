import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'remixicon/fonts/remixicon.css';
import maizefarm from '../assets/cornharvest.jpg';
import happyfarmers from '../assets/happy-farm.jpg';
import poultry from '../assets/poultry.jpg';
import seeds from '../assets/bowlseeds.jpg';
import Fixed from './Fixed';
import { NavLink } from 'react-router';

const images = [happyfarmers, seeds, maizefarm, poultry];

const Hero = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });

    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <section className="relative w-full h-screen flex items-center px-6 md:px-12 overflow-hidden">
        {/* Backgrounds */}
        {images.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-center bg-cover transition-opacity duration-1000 ${
              index === currentImage ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ backgroundImage: `url(${img})` }}
          ></div>
        ))}

        {/* Overlay */}
        <div className="absolute inset-0 bg-[#0212107e] z-10"></div>

        {/* Text Box */}
        <div
          className="relative z-20 max-w-[40rem] w-full md:w-2/3 bg-green-900/60 backdrop-blur-sm rounded-2xl p-6 md:p-10 text-white shadow-lg"
          data-aos="fade-up"
        >
          <h1
            className="text-3xl md:text-5xl font-bold mb-4 leading-tight"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Empowering Farmers, Feeding Nations and
            <br />
            <span className="text-yellow-300">Building Sustainable Futures</span>
          </h1>

          <p
            className="text-sm md:text-lg text-green-100 mb-8 leading-relaxed"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Welcome to Eagle Park Innovations Ltd
          </p>

          <div
            className="flex items-center gap-2 font-medium"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <NavLink to="/ourstory">
              <button className="bg-white hover:bg-green-600 text-[#002920] px-6 py-3 text-sm sm:text-base rounded-full transition">
                Learn More <i className="ri-arrow-right-line ml-1"></i>
              </button>
            </NavLink>
          </div>
        </div>
      </section>

      <Fixed />
    </div>
  );
};

export default Hero;
