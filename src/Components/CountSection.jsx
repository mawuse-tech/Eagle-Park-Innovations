import React, { useEffect, useRef, useState } from 'react';
import CountUp from 'react-countup';
import AOS from 'aos';
import 'aos/dist/aos.css';

const stats = [
  {
    title: 'Years of Experience',
    count: 10,
    icon: 'ri-time-line',
  },
  {
    title: 'Projects Completed',
    count: 200,
    icon: 'ri-leaf-line',
  },
  {
    title: 'Happy Clients',
    count: 150,
    icon: 'ri-user-smile-line',
  },
  {
    title: 'Trained Farmers',
    count: 500,
    icon: 'ri-group-line',
  },
];

const CountSection = () => {
  const sectionRef = useRef();
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000 });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [hasAnimated]);

  return (
    <section
      className="py-12 px-4 md:px-10 bg-[#f4f4f4] text-center overflow-hidden"
      ref={sectionRef}
    >
      <h2 className="text-2xl md:text-3xl font-bold text-green-900 mb-8" data-aos="fade-up">
        Why Choose Us
      </h2>
      <div className="flex flex-wrap justify-center items-center gap-6">
        {stats.map((item, index) => (
          <div
            key={index}
            className="bg-white w-40 h-40 rounded-xl shadow-md flex flex-col items-center justify-center"
            data-aos="fade-right"
            data-aos-delay={index * 200}
          >
            <i className={`${item.icon} text-2xl text-green-800 mb-2`}></i>
            <h3 className="text-xl font-bold text-green-900">
              {hasAnimated ? <CountUp end={item.count} duration={2} /> : '0'}
            </h3>
            <p className="text-xs mt-1 text-gray-600">{item.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CountSection;
