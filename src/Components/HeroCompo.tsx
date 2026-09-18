import farm from '../assets/corn.webp';
import hens from '../assets/cage.jpg';
import seeds from '../assets/seeds.jpg';
import trainfarm from '../assets/trainfarm.jpg';
import Link from 'next/link';
import Image from 'next/image';

const promoCardsData = [
  {
    id: 1,
    title: "Bundled Services",
    description:
      "Discover our end-to-end solution, built to help farmers achieve higher yields, increased incomes, and sustainable growth.",
    imageSrc: seeds,
    imageAlt: "seeds page",
    link: '/seed',
  },

  {
    id: 3,
    title: "Premium Grains",
    description:
      "Discover our premium selection of grains including maize, soyabean, rice and cowpea",
    imageSrc: farm,
    imageAlt: "grain page",
    link: '/shop',

  },
  
  {
    id: 2,
    title: "Poultry Products",
    description:
      "Explore our healthy and well-raised poultry products, including farm-fresh eggs and organic compost",
    imageSrc: hens,
    imageAlt: "poultry page",
    link: '/shop',
  },
  
  {
    id: 4,
    title: "Training and Consultancy Hub",
    description:
      "Tap practical skills and proven strategies to boost yields, income, climate resilience, and sustainability",
    imageSrc: trainfarm,
    imageAlt: "training page",
    link: '/train',

  },

];

export default function HeroCompo() {
  return (
    <section className="services-section">
      <div className="section-heading"><h2>Our Main Products and Services</h2></div>
      <div className="services-grid">
        {promoCardsData.map((card) => (
          <Link href={card.link} key={card.id} className="service-feature">
            <div className="service-photo"><Image src={card.imageSrc} alt={card.imageAlt} fill sizes="(max-width: 767px) 100vw, 50vw" className="object-cover" /></div>
            <h3>{card.title}<i className="ri-arrow-right-up-line" aria-hidden="true" /></h3>
            <p>{card.description}</p><span className="text-link">View Page <i className="ri-arrow-right-line" aria-hidden="true" /></span>
          </Link>
        ))}
      </div>
    </section>
  );
}
