import Image from "next/image";

import team1 from "../../assets/about/gloria.png";
import team2 from "../../assets/about/godfred.jpg";
import team3 from "../../assets/about/paul.jpg";

const teamMembers = [
  {
    name: "Dr. Gloria Boakyewaa Adu",
    role: "Managing Director",
    quali: "Ph.D. Plant Breeding, MSc. Agronomy, BSc. Agric",
    expertise:
      "16+ years in plant breeding, seed systems, product commercialization and project management, and 4+ years in business management.",
    image: team1,
  },
  {
    name: "Mr. Godfred Owusu",
    role: "General Manager",
    quali: "MSc. Soil Science, BSc. Agriculture, Dip. Education.",
    expertise:
      "7+ years in seed production, and team leadership, plus 3 years in commodity aggregation and sales.",
    image: team2,
  },
  {
    name: "Mr. Paul Berko",
    role: "Chief Financial Officer",
    quali:
      "Chartered Accountant with CEMBA, BEd. Accounting, C.Dip. Forensic Audit (ICAG)",
    expertise:
      "23+ years in financial management, project accounts, and team training.",
    image: team3,
  },
];

const TeamPage = () => {
  return (
    <section id="our-team" className="editorial-width py-24 max-[767px]:py-14">
      <div className="center-heading">
        <p className="eyebrow">The people behind our purpose</p>
        <h2>Meet our management team</h2>
        <p>
          A passionate and experienced team, committed to delivering solutions
          tailored to your needs and goals.
        </p>
      </div>
      <div className="grid grid-cols-3 gap-7 max-[767px]:grid-cols-1 max-[767px]:gap-8">
        {teamMembers.map((member) => (
          <article key={member.name}>
            <Image
              className="h-[320px] w-full rounded-[20px] bg-[#edf5ee] object-cover object-top max-[767px]:h-[360px]"
              src={member.image}
              alt={member.name}
              sizes="(max-width: 767px) 100vw, 33vw"
            />
            <div className="relative mx-3 -mt-7 border-b-[3px] border-[#386347] bg-white p-7 rounded-2xl shadow-[0_10px_28px_#163e2a14] max-[1199px]:mx-1.5 max-[1199px]:p-5 max-[767px]:mx-4 max-[767px]:p-6">
              <p className="eyebrow text-[10px]">{member.role}</p>
              <h3 className="mb-4 text-[23px]">{member.name}</h3>
              <p className="mt-3 text-[13px]">{member.quali}</p>
              <p className="mt-3 text-[13px]">{member.expertise}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default TeamPage;
