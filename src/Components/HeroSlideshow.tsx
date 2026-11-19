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
  return <section className="relative isolate flex min-h-[760px] flex-col justify-center bg-[#163e2a] px-[max(8vw,calc((100vw-1200px)/2))] pt-[195px] pb-[154px] text-white max-[1199px]:px-[7%] max-[767px]:min-h-[730px] max-[767px]:justify-center max-[767px]:px-6 max-[767px]:pt-[142px] max-[767px]:pb-40" aria-roledescription="carousel" aria-label="Discover EPI" onFocusCapture={() => setHasFocus(true)} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setHasFocus(false); }}>
    <div className="absolute inset-0 z-[-1]" aria-hidden="true">{slides.map((item, index) => <Image key={item.image.src} src={item.image} alt="" fill preload={index === 0} sizes="100vw" className={`absolute inset-0 z-[-2] h-full w-full object-cover object-top transition-opacity duration-1000 ${index === current ? 'opacity-100' : 'opacity-0'}`} />)}</div>
    <div className="absolute inset-0 z-[-1] bg-[linear-gradient(90deg,#071c16c9,#071c1647_75%),linear-gradient(0deg,#071c1699,transparent_60%)] max-[767px]:bg-[linear-gradient(90deg,#071c16c9,#071c1660),linear-gradient(0deg,#071c16a6,transparent)]" />
    <div className="max-w-[750px] -translate-x-12" aria-live="off"><p className="eyebrow !text-white">{slide.label}</p><h1 className="text-[clamp(42px,4.6vw,66px)] leading-[1.04] tracking-[-.035em] max-[767px]:text-[clamp(36px,9.5vw,48px)] max-[767px]:leading-[1.06]">{slide.title}</h1><p className="mt-6 max-w-[620px] text-[17px] [&_p]:!text-white [&_p+p]:mt-[14px] max-[767px]:mt-[22px] max-[767px]:text-[15px]">{slide.description}</p></div>
    <Link href="/news#events" className="absolute bottom-[118px] left-[max(8vw,calc((100vw-1200px)/2))] mt-0 inline-flex items-center gap-[9px] text-[13px] font-bold text-white underline underline-offset-[5px] hover:text-[#e7c56f] max-[1199px]:left-[7%] max-[767px]:bottom-[138px] max-[767px]:left-6">See upcoming events <i className="ri-arrow-right-line" aria-hidden="true" /></Link>
    <div className="absolute right-8 bottom-[38px] grid min-h-[68px] max-w-[calc(100%-64px)] grid-cols-[auto_auto_auto] items-center gap-5 rounded-[10px] border border-[#ffffff29] bg-[#ffffff21] px-[18px] py-[10px] backdrop-blur-[16px] max-[767px]:right-4 max-[767px]:bottom-[34px] max-[767px]:grid-cols-[1fr_auto] max-[767px]:max-w-[calc(100%-32px)] max-[767px]:min-h-[100px] max-[767px]:gap-2 max-[767px]:px-4 max-[767px]:py-3">
      <div className="flex gap-0.5 max-[767px]:justify-self-start" aria-label="Choose a slide">{slides.map((item, index) => <button key={item.href} type="button" aria-label={`Show slide ${index + 1}: ${item.label}`} aria-pressed={current === index} onClick={() => { setCurrent(index); setPaused(true); }} className="grid h-11 w-[34px] place-items-center rounded-full max-[767px]:h-8"><span className={`block size-[7px] rounded-full ${current === index ? 'bg-white shadow-[0_0_0_5px_#ffffff26]' : 'bg-white/50'}`} /></button>)}</div>
      <Link href={slide.href} className="outline-link max-[767px]:col-span-full max-[767px]:row-start-1 max-[767px]:max-w-full max-[767px]:justify-self-center">{slide.action}<i className="ri-arrow-right-line" aria-hidden="true" /></Link>
      <button type="button" className="grid size-11 justify-self-end place-items-center rounded-full border border-white/50 hover:bg-[#ffffff20] max-[767px]:size-9 motion-reduce:hidden" aria-label={paused ? 'Resume slideshow' : 'Pause slideshow'} onClick={() => setPaused(value => !value)}><i className={paused ? 'ri-play-fill' : 'ri-pause-fill'} aria-hidden="true" /></button>
    </div>
  </section>;
}
