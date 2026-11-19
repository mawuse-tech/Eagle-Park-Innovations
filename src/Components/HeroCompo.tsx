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
  return <section className="editorial-width grid gap-8 max-[767px]:gap-6" aria-label="Our main products and services">{services.map(service => <article className="relative isolate flex min-h-[440px] items-center overflow-hidden rounded-[22px] bg-[#163e2a] px-[7%] py-[60px] text-white max-[767px]:min-h-[500px] max-[767px]:items-end max-[767px]:rounded-2xl max-[767px]:px-[26px] max-[767px]:py-8" key={service.href}>
    <Image src={service.image} alt={service.label} fill sizes="(max-width: 1280px) 100vw, 1280px" className="z-[-2] object-cover object-top" />
    <div className="absolute inset-0 z-[-1] bg-[linear-gradient(90deg,#071c16e0,#071c1626)] max-[767px]:bg-[linear-gradient(0deg,#071c16f0,#071c1633)]" /><div className="max-w-[500px]"><p className="eyebrow !text-[#d8eedc]">{service.label}</p><h2 className="text-[clamp(32px,3.5vw,50px)] leading-[1.08] max-[767px]:text-[34px]">{service.title}</h2><p className="mt-5 mb-7 text-[15px] !text-[#fffffff0] max-[767px]:text-sm">{service.description}</p><Link href={service.href} className="outline-link">Find out more <i className="ri-arrow-right-line" aria-hidden="true" /></Link></div>
  </article>)}</section>;
}
