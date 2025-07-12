import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const stats = [
  {
    title: 'Expertise You Can Trust',
    description: 'Led by a poultry expert with 10+ years of quality-focused experience',
    icon: 'ri-user-star-line',
  },
  {
    title: 'Eco-Friendly Waste Management',
    description: 'Poultry waste transformed into valuable organic fertilizer',
    icon: 'ri-recycle-line',
  },
  {
    title: 'Reliable Supply with Consistent Quality',
    description: 'Dependable products with timely delivery',
    icon: 'ri-truck-line',
  },
  {
    title: 'Professional Partnerships That Grow With You',
    description: 'Flexible, client-focused relationships',
    icon: 'ri-team-line',
  },
];


const WhyPoultryPage = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <section className="py-12 px-4 md:px-10 bg-[#f4f4f4] text-center overflow-hidden">
  <h2 className="text-2xl md:text-3xl font-bold text-green-900 mb-10" data-aos="fade-up">
    Why Choose Us
  </h2>

  <div className="flex flex-wrap justify-center items-center gap-6">
    {stats.map((item, index) => (
      <div
        key={index}
        className="bg-white w-64 h-52 rounded-xl shadow-md flex flex-col items-center justify-center p-4"
        data-aos="fade-up"
        data-aos-delay={index * 200}
      >
        <i className={`${item.icon} text-3xl text-green-800 mb-3`}></i>
        <h3 className="text-lg font-semibold text-green-900 mb-1">{item.title}</h3>
        <p className="text-sm text-gray-600">{item.description}</p>
      </div>
    ))}
  </div>
</section>

  );
};

export default WhyPoultryPage;
