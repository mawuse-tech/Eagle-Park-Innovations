'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import connectedServices from '../assets/hero section.jpg';
import happyfarmers from '../assets/happy-farm.jpg';
import maizefarm from '../assets/cornharvest.jpg';
import poultry from '../assets/poultry.jpg';

const slides = [
  { image: connectedServices, alt: 'Farmers working together at EPI', label: 'Welcome to Eagle Park Innovations Limited (EPI).', title: 'Empowering Farmers, Feeding Nations and Building Sustainable Futures', description: 'Connected solutions. Stronger communities. A better tomorrow.', action: 'Discover EPI', href: '/ourstory' },
  { image: happyfarmers, alt: 'Farmers in their community', label: 'Bundled services', title: 'One System. Unlimited Growth for Farmers.', description: 'Quality inputs, expert guidance, and reliable markets. All connected.', action: 'Explore our services', href: '/seed' },
  { image: maizefarm, alt: 'A thriving maize harvest', label: 'Premium grains', title: 'Grains That Nourish. Partnerships That Empower.', description: 'Quality harvests. Fair prices. Stronger local food systems.', action: 'Explore our grains', href: '/grain' },
  { image: poultry, alt: 'Poultry raised at EPI', label: 'Responsible farming', title: 'Quality Poultry Products for Every Home.', description: 'Farm-fresh eggs, healthy birds, and a circular approach to agriculture.', action: 'Discover our poultry', href: '/poultry' },
];

export default function HeroSlideshow() {
  const pathname = usePathname();
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hasFocus, setHasFocus] = useState(false);
  useEffect(() => {
    setCurrent(0);
    setPaused(false);
    setHasFocus(false);
  }, [pathname]);
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let timer: ReturnType<typeof setInterval> | undefined;
    const update = () => {
      clearInterval(timer);
      if (!paused && !hasFocus && !preference.matches) timer = setInterval(() => setCurrent(value => (value + 1) % slides.length), 7000);
    };
    update();
    preference.addEventListener('change', update);
    return () => { clearInterval(timer); preference.removeEventListener('change', update); };
  }, [paused, hasFocus]);
  const slide = slides[current];
  return <section className="photo-hero home-hero" aria-roledescription="carousel" aria-label="Discover EPI" onFocusCapture={() => setHasFocus(true)} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setHasFocus(false); }}>
    <div className="hero-images" aria-hidden="true">{slides.map((item, index) => <Image key={item.image.src} src={item.image} alt="" fill preload={index === 0} sizes="100vw" className={`hero-background ${index === current ? 'is-visible' : ''}`} />)}</div>
    <div className="hero-shade" />
    <div className="hero-copy" aria-live="off"><p className={`eyebrow ${current === 0 ? 'gold-text' : ''}`}>{slide.label}</p><h1>{slide.title}</h1><p className="hero-description">{slide.description}</p></div>
    <div className="hero-controls">
      <div className="slide-dots" aria-label="Choose a slide">{slides.map((item, index) => <button key={item.href} type="button" aria-label={`Show slide ${index + 1}: ${item.label}`} aria-pressed={current === index} onClick={() => { setCurrent(index); setPaused(true); }}><span /></button>)}</div>
      <Link href={slide.href} className="outline-link">{slide.action}<i className="ri-arrow-right-line" aria-hidden="true" /></Link>
      <button type="button" className="slideshow-toggle" aria-label={paused ? 'Resume slideshow' : 'Pause slideshow'} onClick={() => setPaused(value => !value)}><i className={paused ? 'ri-play-fill' : 'ri-pause-fill'} aria-hidden="true" /></button>
    </div>
  </section>;
}
