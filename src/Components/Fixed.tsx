import Image from 'next/image';
import Link from 'next/link';
import training from '../assets/trainfarm.jpg';
import HeroCompo from './HeroCompo';
import Example from './Example';
import PartnersPage from './PartnersPage';

export default function Fixed() {
  return <div className="home-content"><Example /><HeroCompo />
    <section className="training-banner editorial-width">
      <Image src={training} alt="Farmers taking part in practical field training" fill sizes="(max-width: 1280px) 100vw, 1280px" className="object-cover" />
      <div className="banner-shade" /><div className="training-banner-content"><p className="eyebrow">Learn today. Grow tomorrow.</p><h2>Expand your possibilities</h2><p>Learn directly from experienced farmers and agricultural professionals.</p><div className="training-cards">
        <Link href="/train"><i className="ri-graduation-cap-line" aria-hidden="true" /><span>Build your skills</span><h3>Practical training</h3><span>Explore programmes <i className="ri-arrow-right-line" aria-hidden="true" /></span></Link>
        <Link href="/train#programmes"><i className="ri-team-line" aria-hidden="true" /><span>Grow with guidance</span><h3>Expert consultancy</h3><span>Find out more <i className="ri-arrow-right-line" aria-hidden="true" /></span></Link>
        <Link href="/contact"><i className="ri-shake-hands-line" aria-hidden="true" /><span>Take the next step</span><h3>Partner with us</h3><span>Get in touch <i className="ri-arrow-right-line" aria-hidden="true" /></span></Link>
      </div></div>
    </section><PartnersPage />
  </div>;
}
