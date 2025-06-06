import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import AOS from 'aos';
import 'aos/dist/aos.css';

const stats = [
  { title: 'Years', count: 12, icon: 'ri-time-line' },
  { title: 'Farmers', count: 5400, icon: 'ri-user-heart-line' },
  { title: 'Projects', count: 320, icon: 'ri-seedling-line' },
  { title: 'Countries', count: 15, icon: 'ri-earth-line' },
];

const StatsSection = () => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const { ref, inView } = useInView({ triggerOnce: true });

  useEffect(() => {
    AOS.init({ duration: 1000 });
    if (inView) {
      setHasAnimated(true);
    }
  }, [inView]);

  return (
    <section ref={ref} className="bg-white py-10 px-4 md:px-16 text-[#06360b]">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {stats.map((item, index) => (
          <div
            key={index}
            className="bg-white w-40 h-40 mx-auto rounded-full shadow-md flex flex-col items-center justify-center transition hover:shadow-green-300"
            data-aos="zoom-in"
          >
            <i className={`${item.icon} text-2xl text-green-800 mb-2`}></i>
            <h3 className="text-xl font-bold text-green-900">
              {hasAnimated ? <CountUp end={item.count} duration={2} /> : '0'}
              {item.title === 'Countries' ? '+' : ''}
            </h3>
            <p className="text-xs mt-1 text-gray-600">{item.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsSection;
