import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import team1 from './gloria.png';
import team2 from './godfred.jpg';
import team3 from './paul.jpg';

const teamMembers = [
  {
    name: 'Dr. Gloria Boakyewaa Adu',
    role: 'Managing Director',
    quali: "Ph.D. Plant Breeding, MSc. Agronomy, BSc. Agric",
    expertise: "16+ years in plant breeding, seed systems, product commercialization and project management, and 4+ years in business management.",
    image: team1,
  },
  {
    name: 'Godfred Owusu',
    role: 'General Manager',
    quali: "MSc. Soil Science, BSc. Agriculture, Dip. Education.",
    expertise: "7+ years in seed production, and team leadership, plus 3 years in commodity aggregation and sales.",
    image: team2,
  },
  {
    name: 'Paul Berko',
    role: 'Chief Financial Officer',
    quali: "Chartered Accountant with CEMBA, BEd. Accounting, C.Dip. Forensic Audit (ICAG)",
    expertise: "23+ years in financial management, project accounts, and team training.",
    image: team3,
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
        <h2 className="text-3xl md:text-4xl font-bold text-[#002920]">Meet Our Dedicated Management Team</h2>
        <p className="text-gray-700 mt-2 max-w-2xl mx-auto ">
          A passionate and experienced team, committed to delivering solutions tailored to your needs and goals.
        </p>
      </div>

      {/* Green Bar Background */}
      <div className="absolute top-44 left-0 w-full h-[200px] bg-[#004d2b] z-0 rounded-xl lg:mt-10 mt-20"></div>

      {/* Cards */}
      <div className="relative z-10 grid sm:grid-cols-2 md:grid-cols-3 gap-10">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="bg-[#eaeaea] rounded-lg shadow-lg p-6 "
            data-aos="fade-up"
          >
            {/* Circle avatar with gray bg */}
            <div className="flex justify-center mb-4">
              <div className="w-40 h-40 rounded-full bg-gray-300 overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <h3 className="text-lg font-bold text-[#002920]">Name: {member.name}</h3>

            <p className="text-sm text-gray-600 mt-1">
              <span className="font-bold">Position:</span> {member.role}
            </p>

            <p className="text-sm text-gray-500 mt-4">
              <span className="font-bold">Qualification:</span> {member.quali}
            </p>

            <p className="text-sm text-gray-500 mt-4">
              <span className="font-bold">Expertise:</span> {member.expertise}
            </p>

          </div>
        ))}
      </div>
    </section>
  );
};

export default TeamPage;
