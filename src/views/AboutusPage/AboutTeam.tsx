import Image from 'next/image';

import team1 from '../../assets/about/gloria.png';
import team2 from '../../assets/about/godfred.jpg';
import team3 from '../../assets/about/paul.jpg';

const teamMembers = [
  {
    name: 'Dr. Gloria Boakyewaa Adu',
    role: 'Managing Director',
    quali: "Ph.D. Plant Breeding, MSc. Agronomy, BSc. Agric",
    expertise: "16+ years in plant breeding, seed systems, product commercialization and project management, and 4+ years in business management.",
    image: team1,
  },
  {
    name: 'Mr. Godfred Owusu',
    role: 'General Manager',
    quali: "MSc. Soil Science, BSc. Agriculture, Dip. Education.",
    expertise: "7+ years in seed production, and team leadership, plus 3 years in commodity aggregation and sales.",
    image: team2,
  },
  {
    name: 'Mr. Paul Berko',
    role: 'Chief Financial Officer',
    quali: "Chartered Accountant with CEMBA, BEd. Accounting, C.Dip. Forensic Audit (ICAG)",
    expertise: "23+ years in financial management, project accounts, and team training.",
    image: team3,
  },

];

const TeamPage = () => {

  return <section id="our-team" className="team-section editorial-width">
    <div className="center-heading"><p className="eyebrow">The people behind our purpose</p><h2>Meet our management team</h2><p>A passionate and experienced team, committed to delivering solutions tailored to your needs and goals.</p></div>
    <div className="team-grid">{teamMembers.map(member => <article className="team-card" key={member.name}><Image src={member.image} alt={member.name} sizes="(max-width: 767px) 100vw, 33vw" /><div><p className="eyebrow">{member.role}</p><h3>{member.name}</h3><p>{member.quali}</p><p>{member.expertise}</p></div></article>)}</div>
  </section>;
};

export default TeamPage;
