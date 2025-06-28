import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import team1 from './gloria.JPG';
import team2 from './godfred.jpg';
import team3 from './paul.jpg';
import team4 from './fusena.jpg';
import team5 from './kwame.jpg';
import team6 from './zah.png';

const teamMembers = [
  {
    name: 'Gloria Boakyewaa Adu',
    role: 'PhD, Managing Director',
    image: team1,
  },
  {
    name: 'Godfred Owusu',
    role: 'General Manager /Agronomist',
    image: team2,
  },
  {
    name: 'Paul Berko',
    role: 'Chief Financial Officer',
    image: team3,
  },
  {
    name: 'Fuseini Alhassan',
    role: 'Farm Manager – Crops',
    image: team4,
  },
  {
    name: 'Kwame Darko',
    role: 'Farm Manager – Poultry',
    image: team5,
  },
  {
    name: 'Zaharawu Bashiru',
    role: 'Community Outreach Assistant',
    image: team6,
  },
];

const TeamPage = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <section className="relative py-20 px-6 md:px-20 bg-[#f4f4f4]">
      {/* Header */}
      <div className="text-center mb-16 z-10 relative" data-aos="fade-up">
        <h2 className="text-3xl md:text-4xl font-bold text-[#002920]">Meet The Team</h2>
        <p className="text-gray-700 mt-2 max-w-2xl mx-auto">
          A passionate and experienced team, committed to delivering solutions tailored to your needs and goals.
        </p>
      </div>

      {/* Green Bar Background */}
      <div className="absolute top-44 left-0 w-full h-[200px] bg-[#004d2b] z-0 rounded-xl"></div>

      {/* Cards */}
      <div className="relative z-10 grid sm:grid-cols-2 md:grid-cols-3 gap-10">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="bg-[#eaeaea] rounded-lg shadow-lg p-6 text-center"
            data-aos="fade-up"
          >
            {/* Circle avatar with gray bg */}
            <div className="flex justify-center mb-4">
              <div className="w-28 h-28 rounded-full bg-gray-300 overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <h3 className="text-lg font-semibold text-[#002920]">{member.name}</h3>
            <p className="text-sm text-gray-600 mt-1">{member.role}</p>

            <p className="text-sm text-gray-500 mt-4">
              Sample text. Click to select the text box. Click again or double click to edit.
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TeamPage;
