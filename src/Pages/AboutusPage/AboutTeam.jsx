import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import man from './teamman.avif';

const teamMembers = [
  {
    name: 'Ama Asare',
    role: 'Lead Agronomist',
    image: man,
    socials: {
      linkedin: '#',
      twitter: '#',
      facebook: '#',
    },
  },
  {
    name: 'Kwame Mensah',
    role: 'Training Coordinator',
    image: man,
    socials: {
      linkedin: '#',
      twitter: '#',
      facebook: '#',
    },
  },
  {
    name: 'Afia Boateng',
    role: 'Sustainability Expert',
    image: man,
    socials: {
      linkedin: '#',
      twitter: '#',
      facebook: '#',
    },
  },
  {
    name: 'Kojo Owusu',
    role: 'Farm Tech Advisor',
    image: man,
    socials: {
      linkedin: '#',
      twitter: '#',
      facebook: '#',
    },
  },
  {
    name: 'Akosua Darko',
    role: 'Soil Scientist',
    image: man,
    socials: {
      linkedin: '#',
      twitter: '#',
      facebook: '#',
    },
  },
  {
    name: 'Yaw Agyeman',
    role: 'Community Outreach',
    image: man,
    socials: {
      linkedin: '#',
      twitter: '#',
      facebook: '#',
    },
  },
];

const TeamPage = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="py-16 px-6 md:px-20 bg-white text-[#002920]">
      <div className="text-center mb-12" data-aos="fade-up">
        <h2 className="text-3xl md:text-4xl font-bold">Meet Our Dedicated Team</h2>
        <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
          A passionate team committed to empowering farmers and transforming agriculture across Africa.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="bg-[#f3fdf5] rounded-xl shadow-md hover:shadow-lg transition overflow-hidden"
            data-aos="fade-up"
          >
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-64 object-cover"
            />
            <div className="p-6 text-center">
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className="text-green-800 text-sm mb-4">{member.role}</p>
              <div className="flex justify-center space-x-4 text-xl text-[#002920]">
                <a href={member.socials.linkedin} target="_blank" rel="noreferrer">
                  <i className="ri-linkedin-box-line hover:text-green-900"></i>
                </a>
                <a href={member.socials.twitter} target="_blank" rel="noreferrer">
                  <i className="ri-twitter-x-line hover:text-green-900"></i>
                </a>
                <a href={member.socials.facebook} target="_blank" rel="noreferrer">
                  <i className="ri-facebook-box-fill hover:text-green-900"></i>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamPage;
