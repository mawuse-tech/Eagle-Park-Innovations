import Image from 'next/image';
import Link from 'next/link';
import training from '../assets/trainfarm.jpg';
import HeroCompo from './HeroCompo';
import Example from './Example';
import PartnersPage from './PartnersPage';

export default function Fixed() {
  return <div className="relative mt-[-16px] rounded-t-[18px] bg-white pt-px"><Example /><HeroCompo />
    <section className="editorial-width relative isolate mt-16 mb-0 flex min-h-[620px] items-end overflow-hidden rounded-[22px] bg-[#163e2a] p-16 text-white max-[1199px]:px-8 max-[1199px]:py-12 max-[767px]:mt-10 max-[767px]:min-h-[580px] max-[767px]:rounded-2xl max-[767px]:px-5 max-[767px]:pt-10 max-[767px]:pb-6">
      <Image src={training} alt="Farmers taking part in practical field training" fill sizes="(max-width: 1280px) 100vw, 1280px" className="z-[-2] object-cover object-top" />
      <div className="absolute inset-0 z-[-1] bg-[linear-gradient(0deg,#071c16f2,#071c1633)]" />
      <div className="w-full text-center"><p className="eyebrow !text-[#d8eedc]">Learn today. Grow tomorrow.</p><h2 className="text-[clamp(34px,4vw,56px)] leading-[1.1]">Expand your possibilities</h2><p className="mt-5 !text-white">Learn directly from experienced farmers and agricultural professionals.</p>
      <div className="mt-10 grid grid-cols-3 gap-5 max-[767px]:flex max-[767px]:snap-x max-[767px]:gap-4 max-[767px]:overflow-x-auto max-[767px]:pb-4 max-[767px]:text-center [scrollbar-color:#ffffff80_transparent]">
        <Link className="flex snap-center flex-col items-center rounded-[20px] border border-[#ffffff40] bg-[#ffffff18] px-4 py-[26px] backdrop-blur-[16px] transition-colors hover:bg-[#ffffff2e] max-[767px]:basis-[85%] max-[767px]:shrink-0" href="/train"><i className="ri-graduation-cap-line mb-[14px] text-[30px]" aria-hidden="true" /><span className="text-[11px]">Build your skills</span><h3 className="mt-2 mb-5 text-[23px] max-[1199px]:text-xl">Practical training</h3><span className="text-[11px]">Explore programmes <i className="ri-arrow-right-line" aria-hidden="true" /></span></Link>
        <Link className="flex snap-center flex-col items-center rounded-[20px] border border-[#ffffff40] bg-[#ffffff18] px-4 py-[26px] backdrop-blur-[16px] transition-colors hover:bg-[#ffffff2e] max-[767px]:basis-[85%] max-[767px]:shrink-0" href="/train#programmes"><i className="ri-team-line mb-[14px] text-[30px]" aria-hidden="true" /><span className="text-[11px]">Grow with guidance</span><h3 className="mt-2 mb-5 text-[23px] max-[1199px]:text-xl">Expert consultancy</h3><span className="text-[11px]">Find out more <i className="ri-arrow-right-line" aria-hidden="true" /></span></Link>
        <Link className="flex snap-center flex-col items-center rounded-[20px] border border-[#ffffff40] bg-[#ffffff18] px-4 py-[26px] backdrop-blur-[16px] transition-colors hover:bg-[#ffffff2e] max-[767px]:basis-[85%] max-[767px]:shrink-0" href="/contact"><i className="ri-shake-hands-line mb-[14px] text-[30px]" aria-hidden="true" /><span className="text-[11px]">Take the next step</span><h3 className="mt-2 mb-5 text-[23px] max-[1199px]:text-xl">Partner with us</h3><span className="text-[11px]">Get in touch <i className="ri-arrow-right-line" aria-hidden="true" /></span></Link>
      </div></div>
    </section><PartnersPage />
  </div>;
}
