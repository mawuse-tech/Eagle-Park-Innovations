import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { RiArrowRightSLine } from 'react-icons/ri';
import sarkseeds from '../assets/ealgle.png'
import hen from '../assets/hen.png'
import man from '../assets/man.png'


const Example = () => {
  useEffect(() => {
    AOS.init({ duration: 900, once: true });
  }, []);

  const cards = [
    {
      title: 'Premium Maize and Soyabean Grains',
      text: 'At the heart of our grain offerings are premium-quality maize and soyabean grains, carefully cultivated using sustainable farming practices.',
    },
    {
      title: 'Premium Farm Fresh Eggs and Organic Compost',
      text: 'Enjoy the goodness of our fresh eggs, rich in flavor and nutrients, Pair it with our organic compost, made from natural farm waste for soil health.',

    },
    {
      title: 'Climate-Smart Certified Seeds',
      text: 'Our climate-smart certified seeds are drought-tolerant, pest-resistant, and ideal for boosting yields in changing weather conditions—empowering farmers to grow more sustainably.'

    },
  ];

  return (
    <div className="bg-[#ede8d0]  py-16 px-6 md:px-20">
      <h1 className="text-3xl md:text-4xl font-bold text-[#002920] text-center mb-12">
        Our Main Products
      </h1>
      <div className="grid md:grid-cols-3 gap-8">
        {cards.map((card, index) => (
          <div
            key={index}
            data-aos="fade-up"
            data-aos-delay={index * 200}
            className="bg-[#002920] shadow-lg"
          >
            
            <div className="p-6 text-[#ede8d0]">
              <h3 className="text-lg md:text-xl font-semibold leading-tight mb-3">
                {card.title}
              </h3>
              <p className="text-sm text-[#ede8d0] mb-4">{card.text}</p>
              <div className="flex items-center gap-1 text-[#e5bf4a] text-sm font-semibold cursor-pointer hover:underline">
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
