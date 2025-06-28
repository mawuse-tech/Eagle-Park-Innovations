import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';



const stats = [
    {
        title: 'Expertise You Can Trust',
        description: 'Led by a seasoned expert with 16+ years in plant breeding, seed systems, and agronomy.',
        icon: 'ri-microscope-line',
    },
    {
        title: 'Customer-Centric Solutions',
        description: 'Beyond quality seeds, we offer farming advisories and market access you can count on.',
        icon: 'ri-chat-smile-2-line',
    },
    {
        title: 'Job Creation',
        description: 'Ethically sourced from youth- and women-led out-growers, creating jobs and shared value.',
        icon: 'ri-community-line',
    },
    {
        title: 'Sustainability',
        description: 'Climate-smart, eco-friendly solutions for responsible production and land use.',
        icon: 'ri-earth-line',
    },
];


const WhySeedsPage = () => {
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

export default WhySeedsPage;