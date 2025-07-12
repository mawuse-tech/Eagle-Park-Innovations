import { useEffect } from 'react';
import absa from '../assets/absalogo.png';
import giz from '../assets/gizlogo.png';
import kic from '../assets/kiclogo.png';
import leverage from '../assets/levlogo.png';
import nastag from '../assets/nastaglogo.png';
import oca from '../assets/ocalogo.png';
import gh from '../assets/ghlogo.png';

const PartnersPage = () => {
  useEffect(() => {
    // Optional: prevent scroll-jank on slow devices
    document.documentElement.style.setProperty('--scroll-speed', '40s');
  }, []);

  const logos = [
    absa,
    giz,
    kic,
    leverage,
    nastag,
    oca,
    gh
  ];

  return (
    <section className="bg-[#f4f4f4] py-16 px-6 md:px-20">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-green-900 mb-10">
        Our Partners
      </h2>

      <div className="overflow-x-hidden relative">
        <div className="flex animate-scroll min-w-[200%] gap-10 items-center">
          {logos.concat(logos).map((logo, index) => (
            <img
              key={index}
              src={logo}
              alt={`Partner ${index + 1}`}
              className="h-12 md:h-20 w-auto object-contain"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersPage;
