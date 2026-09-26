'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import absa from '../assets/absalogo.png';
import giz from '../assets/gizlogo.png';
import kic from '../assets/kiclogo.png';
import leverage from '../assets/levlogo.png';
import nastag from '../assets/nastaglogo.png';
import oca from '../assets/ocalogo.png';
import gh from '../assets/ghlogo.png';
import tvet from '../assets/TVET logo.png';
import fff from '../assets/large_1_fff-logo-mandala.jpg';
import fao from '../assets/fao.jpg';



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
    gh,
    tvet,
    fff,
    fao
  ];

  return (
    <section className="partners-section editorial-width">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-stone-900 mb-10">
        Our Partners
      </h2>

      <div className="overflow-x-hidden relative">
        <div className="flex animate-scroll min-w-[200%] gap-10 items-center">
          {logos.concat(logos).map((logo, index) => (
            <Image
              key={index}
              src={logo}
              alt={index < logos.length ? ["Absa", "GIZ", "Kosmos Innovation Center", "Leverage", "NASTAG", "OCA", "Ghana Climate Innovation Centre", "Ghana TVET Service", "Forest and Farm Facility", "FAO"][index] : ""}
              sizes="180px"
              className="h-12 md:h-20 w-auto object-contain"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersPage;
