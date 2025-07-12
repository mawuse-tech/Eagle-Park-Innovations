import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { RiArrowRightSLine } from 'react-icons/ri';
import { NavLink } from 'react-router';

const Example = () => {
  useEffect(() => {
    AOS.init({ duration: 900, once: true });
  }, []);

  const cards = [
    {
      title: 'Certified Seed Production and Distribution',
      text: 'We provide certified seeds of climate-resilient maize, soyabean, and cowpea varieties, plus tailored farming advice to help farmers boost yields sustainably.',
      link: '/seed',
    },
    {
      title: 'Grain Aggregation',
      text: 'We aggregate quality grains from farmers and link them to reliable markets, ensuring fair prices, reduced postharvest losses, and inclusive rural growth. ',
      link: '/grain',
    },
    {
      title: 'Poultry Farming',
      text: 'We produce fresh, high-quality eggs through responsible farming, turning poultry waste into organic fertilizer to improve soil fertility and crop yields and ensure zero-waste, sustainable production.',
      link: '/poultry',
    },
    {
      title: 'Training and Consultancy',
      text: 'We equip farmers and agribusinesses with practical skills and personalized strategies to boost productivity, grow income, build resilience, and operate sustainably. ',
      link: '/train',
    },

  ];

  return (
    <div className="bg-[#f4f4f4] py-16 px-6 md:px-20">
      <h1 className="text-3xl md:text-4xl font-bold text-green-900 text-center mb-12">
        Explore How Our Solutions Connect <br /> to Empower Your Growth
      </h1>
      <div className="grid md:grid-cols-4 gap-8">
        {cards.map((card, index) => (
          <div
            key={index}
            data-aos="fade-up"
            data-aos-delay={index * 200}
            className="bg-white shadow-md hover:shadow-lg rounded-lg border border-gray-200 transition duration-300"
          >
            <div className="p-3 text-green-900 ">
              <h3 className="text-lg md:text-xl font-semibold leading-tight mb-3">
                {card.title}
              </h3>
              <p className="text-sm text-gray-700 mb-4">{card.text}</p>
              <div className="flex items-center gap-1 text-green-700 text-sm font-semibold cursor-pointer hover:underline">
                
                <NavLink to={card.link}
                  className="flex items-center gap-1 text-green-700 text-sm font-semibold hover:underline">
                  Learn More <RiArrowRightSLine className="text-lg" />
                </NavLink>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Example;
