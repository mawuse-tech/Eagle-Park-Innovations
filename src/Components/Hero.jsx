import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'remixicon/fonts/remixicon.css';
import HeroCompo from './HeroCompo';
import CountSection from './CountSection';
import Example from './Example';

const Hero = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div>
      <section className="hero-section">
        <div className="overlay"></div>
        <div className="hero-text" data-aos="fade-up">
          <h1 data-aos="fade-up" data-aos-delay="100">
            Transforming the World<br /><span>Through Agriculture</span>
          </h1>
          <p className="subtitle" data-aos="fade-up" data-aos-delay="200">
            Empowering farmers, feeding nations, and building sustainable futures.
          </p>
          <div
            className="hidden md:flex items-center gap-1 font-medium"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <button className="bg-[#136b46d0] hover:bg-green-700 text-white px-6 py-3 text-sm sm:text-base rounded-full">
              Get Started <i className="ri-arrow-right-line"></i>
            </button>
          </div>
        </div>
      </section>

      <Example/>
      <HeroCompo />
      <CountSection/>
    </div>
  );
};

export default Hero;





