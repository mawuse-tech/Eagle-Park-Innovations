import farm from '../assets/corn.webp';
import hens from '../assets/cage.jpg';
import seeds from '../assets/bowlseeds.jpg';
import Link from 'next/link';
import Image from 'next/image';

const services = [
  { title: 'Everything you need. Connected.', label: 'Bundled services', description: 'Discover our end-to-end solution, built to help farmers achieve higher yields, increased incomes, and sustainable growth.', image: seeds, href: '/seed' },
  { title: 'Good harvests. Greater possibilities.', label: 'Premium grains', description: 'Discover our premium selection of grains including maize, soyabean, rice and cowpea.', image: farm, href: '/grain' },
  { title: 'Fresh from our farm to your home.', label: 'Poultry products', description: 'Explore our healthy and well-raised poultry products, including farm-fresh eggs and organic compost.', image: hens, href: '/poultry' },
];

export default function HeroCompo() {
  return <section className="feature-banners editorial-width" aria-label="Our main products and services">{services.map(service => <article className="image-banner" key={service.href}>
    <Image src={service.image} alt={service.label} fill sizes="(max-width: 1280px) 100vw, 1280px" className="object-cover" />
    <div className="banner-shade" /><div className="banner-copy"><p className="eyebrow">{service.label}</p><h2>{service.title}</h2><p>{service.description}</p><Link href={service.href} className="outline-link">Find out more <i className="ri-arrow-right-line" aria-hidden="true" /></Link></div>
  </article>)}</section>;
}
