import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { RiArrowRightSLine } from 'react-icons/ri';
import sarkseeds from '../assets/ealgle.png'
import hen from '../assets/hen.png'
import man from '../assets/man.png'


const BlogCards = () => {
  useEffect(() => {
    AOS.init({ duration: 900, once: true });
  }, []);

  const cards = [
    {
      title: '5 Plants That Are Suitable For Home Decoration',
      date: '06',
      month: 'Nov',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      img: sarkseeds,
    },
    {
      title: 'Outdoor Vintage Flower Garden Decoration',
      date: '06',
      month: 'Nov',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      img: hen,
    },
    {
      title: 'Reduce Carbon Footprint With Robots',
      date: '06',
      month: 'Nov',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      img: man,
    },
  ];

  return (
    <div className="bg-white min-h-screen py-16 px-6 md:px-20">
      <div className="grid md:grid-cols-3 gap-8">
        {cards.map((card, index) => (
          <div
            key={index}
            data-aos="fade-up"
            data-aos-delay={index * 200}
            className="bg-[#002920] shadow-lg"
          >
            <div className="relative">
              <img src={card.img} alt={card.title} className="w-full h-64 object-cover" />
              <div className="absolute -bottom-5 left-6 bg-[#72895d] text-white w-14 h-14 rounded-full flex flex-col items-center justify-center text-sm font-bold shadow-md">
                <span>{card.date}</span>
                <span className="text-[11px] font-medium">{card.month}</span>
              </div>
            </div>
            <div className="p-6 text-white">
              <h3 className="text-lg md:text-xl font-semibold leading-tight mb-3">
                {card.title}
              </h3>
              <p className="text-sm text-[#d1d5db] mb-4">{card.text}</p>
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

export default BlogCards;
