'use client';

import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const stats = [
  {
    title: 'Inclusive Sourcing',
    description: 'We source grains from local out-growers and cooperatives, including women and youth.',
    icon: 'ri-community-line',
  },
  {
    title: 'Fair Pricing',
    description: 'Better returns for farmers, affordable grains for users.',
    icon: 'ri-money-dollar-circle-line',
  },
  {
    title: 'Shared Opportunity',
    description: 'Our partnerships with farmers and local actors create jobs, income, and value across farming communities.',
    icon: 'ri-hand-heart-line',
  },
  {
    title: 'Quality Assured',
    description: 'Our grains meet high-quality standards from production to delivery.',
    icon: 'ri-shield-check-line',
  },
];

const WhyGrainPage = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <section className="py-12 px-4 md:px-10 bg-stone-50 text-center overflow-hidden">
      <h2 className="text-2xl md:text-3xl font-bold text-stone-900 mb-10" data-aos="fade-up">
        Why Choose Us
      </h2>

      <div className="flex flex-wrap justify-center items-center gap-6">
        {stats.map((item, index) => (
          <div
            key={index}
            className="bg-transparent w-64 min-h-52 border-t border-stone-200 rounded-none  flex flex-col items-center justify-center p-4"
            data-aos="fade-up"
            data-aos-delay={index * 200}
          >
            <i className={`${item.icon} text-3xl text-green-800 mb-3`}></i>
            <h3 className="text-lg font-semibold text-stone-900 mb-1">{item.title}</h3>
            <p className="text-sm text-gray-600">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyGrainPage;
