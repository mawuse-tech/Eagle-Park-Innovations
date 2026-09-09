import Image from 'next/image';
import Link from 'next/link';
import connectedServices from '../assets/hero section.jpg';
import Fixed from './Fixed';

export default function Hero() {
  return (
    <div>
      <section className="home-hero">
        <div className="home-hero-copy">
          <p className="eyebrow">Rooted in Ghana. Growing together.</p>
          <h1>Empowering farmers.<br />Feeding nations.<br /><span>Growing futures.</span></h1>
          <p className="hero-description">Connected solutions for a more sustainable future. We bring quality inputs, practical expertise, and reliable markets closer to the people who grow our food.</p>
          <div className="hero-actions">
            <Link href="/seed" className="primary-link">Explore our solutions <i className="ri-arrow-right-up-line" aria-hidden="true" /></Link>
            <Link href="/ourstory" className="text-link">Our story <i className="ri-arrow-right-line" aria-hidden="true" /></Link>
          </div>
          <p className="hero-footnote">Eagle Park Innovations Limited · People, planet, and possibility.</p>
        </div>
        <div className="home-hero-image">
          <Image src={connectedServices} alt="Agriculture and farming at Eagle Park Innovations" fill priority placeholder="blur" sizes="(max-width: 767px) 100vw, 50vw" className="object-cover" />
          <div className="hero-caption"><span>From the ground up.</span><span>A stronger future for agriculture.</span></div>
        </div>
      </section>
      <Fixed />
    </div>
  );
}
