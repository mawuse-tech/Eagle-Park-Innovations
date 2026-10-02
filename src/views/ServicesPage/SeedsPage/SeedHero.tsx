import Image from 'next/image';
import Link from 'next/link';
import photo from '../../../assets/hero section _certified seeds page.jpg';
import Content from './SeedMainSec';

const services = [
  { icon: '◒', title: 'Quality Inputs', detail: 'Inputs for productive farming' },
  { icon: '✣', title: 'Knowledge', detail: 'Practical field support' },
  { icon: '♣', title: 'Climate-Smart Support', detail: 'Resilient, sustainable production' },
  { icon: '▮', title: 'Markets', detail: 'Connections beyond harvest' },
];

export default function SeedHero() {
  return <div className="editorial-page">
    <header className="photo-hero relative isolate !min-h-[850px] !items-stretch !justify-start !px-0 !pb-0 !pt-36 text-white md:!min-h-[760px] md:!pt-40">
      <Image src={photo} alt="Farmer benefiting from EPI bundled services" fill priority sizes="100vw" className="hero-background is-visible" />
      <div className="hero-shade" />
      <div className="editorial-width relative z-10 max-w-[1280px] -translate-y-4 pt-10 md:-translate-y-8 md:pt-16">
        <p className="mb-3 text-xs font-black uppercase tracking-[.18em] !text-[#C99724]">Bundled Services</p>
        <h1 className="max-w-[710px] text-[clamp(44px,6vw,76px)] font-black leading-[.98] tracking-[-.05em] text-white">Farm Challenges Are Connected. Our Support Is Too.</h1>
        <p className="mt-6 max-w-[650px] text-lg leading-relaxed text-[#edf3ee]">Access complementary agricultural services through one connected system, at your convenience and hassle-free, so you can focus on what matters.</p>
        <Link href="#how" className="outline-link mt-7">See How It Works <i className="ri-arrow-down-line" aria-hidden="true" /></Link>
      </div>
      <div className="absolute inset-x-4 bottom-4 z-10 rounded-xl border border-white/25 bg-[#183622c7] p-3 shadow-xl backdrop-blur-xl md:inset-x-8 md:bottom-6 md:p-5">
        <div className="grid grid-cols-1 divide-y divide-white/20 sm:grid-cols-2 sm:divide-y-0 md:grid-cols-4 md:divide-x md:divide-y-0">
          {services.map((service, index) => <div key={service.title} className={`flex items-center gap-3 px-3 py-3 md:px-5 ${index > 1 ? 'sm:border-t sm:border-white/20 md:border-t-0' : ''}`}>
            <span aria-hidden="true" className={`grid size-10 shrink-0 place-items-center rounded-full text-lg font-black ${index % 2 === 0 ? 'bg-[#e3efd8] text-[#41634a]' : 'bg-[#ecdca7] text-[#8a6816]'}`}>{service.icon}</span>
            <span><strong className="block text-sm text-white">{service.title}</strong><span className="mt-0.5 block text-[11px] leading-snug text-[#dce6de]">{service.detail}</span></span>
          </div>)}
        </div>
      </div>
    </header>
    <Content />
  </div>;
}
