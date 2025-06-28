import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { RiArrowRightSLine } from 'react-icons/ri';

const Example = () => {
  useEffect(() => {
    AOS.init({ duration: 900, once: true });
  }, []);

  const cards = [
    {
      title: 'Certified Seeds',
      text: 'Our climate-smart certified seeds are drought-tolerant, pest-resistant, and ideal for boosting yields in changing weather conditions—empowering farmers to grow more sustainably.'

    },

    {
      title: 'Poultry Products',
      text: 'Enjoy the goodness of our fresh eggs, rich in flavor and nutrients, Pair it with our organic compost, made from natural farm waste for soil health.',

    },
    {
      title: 'Premium Grains',
      text: 'At the heart of our grain offerings are premium-quality maize and soyabean, cowpea, rice and grounnutgrains carefully cultivated using sustainable farming practices.',
    },
    {
      title: 'Training and consultancy services',
      text: 'At the heart of our grain offerings are premium-quality maize and soyabean grains, carefully cultivated using sustainable farming practices.',
    },
    
  ];

  return (
    <div className="bg-[#f4f4f4] py-16 px-6 md:px-20">
      <h1 className="text-3xl md:text-4xl font-bold text-green-900 text-center mb-12">
        Main Products And Services
      </h1>
      <div className="grid md:grid-cols-4 gap-8">
        {cards.map((card, index) => (
          <div
            key={index}
            data-aos="fade-up"
            data-aos-delay={index * 200}
            className="bg-white shadow-md hover:shadow-lg rounded-lg border border-gray-200 transition duration-300"
          >
            <div className="p-6 text-green-900">
              <h3 className="text-lg md:text-xl font-semibold leading-tight mb-3">
                {card.title}
              </h3>
              <p className="text-sm text-gray-700 mb-4">{card.text}</p>
              <div className="flex items-center gap-1 text-green-700 text-sm font-semibold cursor-pointer hover:underline">
                Learn more <RiArrowRightSLine className="text-lg" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Example;
