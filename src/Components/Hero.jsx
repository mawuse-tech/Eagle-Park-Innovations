import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'remixicon/fonts/remixicon.css';
import HeroCompo from './HeroCompo';
import CountSection from './CountSection';
import Example from './Example';
import hen from '../assets/hen.png';
import corn from '../assets/corn.webp';
import soyabeans from '../assets/soyabeans.jpg';


const images = [
  corn,
  soyabeans,
  hen,
];

const Hero = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });

    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000); // Rotate every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <section
        className="relative w-full h-screen bg-center bg-cover bg-no-repeat flex items-center px-6 md:px-12 transition-all duration-1000"
        style={{
          backgroundImage: `url(${images[currentImage]})`,
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-[#021210de] z-0"></div>

        {/* Hero Text */}
        <div className="relative z-10 max-w-3xl text-white" data-aos="fade-up">
          <h1
            className="text-3xl md:text-5xl font-bold mb-4 leading-tight"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Transforming the World<br />
            <span className="text-[#ede8d0]">Through Agriculture</span>
          </h1>

          <p
            className="text-sm md:text-lg text-[#ede8d0] mb-8 leading-relaxed"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Empowering farmers, feeding nations, and building sustainable futures.
          </p>

          <div
            className="hidden md:flex items-center gap-2 font-medium"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <div className="hidden md:flex items-center gap-1 font-medium ">
              <button className="bg-[#ede8d0] hover:bg-green-700 text-[#002920] px-6 py-3 text-sm sm:text-base rounded-full">
                Learn More <i className="ri-arrow-right-line"></i>
              </button>
            </div>
          </div>
        </div>
      </section>

      <Example />
      <HeroCompo />
      <CountSection />
    </div>
  );
};

export default Hero;





