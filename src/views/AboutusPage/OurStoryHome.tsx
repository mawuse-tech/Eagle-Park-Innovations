import Image from 'next/image';
import Link from 'next/link';
import women from '../../assets/about/women.jpg';
import OurStory from './OurStory';
import MissionVision from './MissionVission';

export default function OurStoryHome() {
  return <div className="editorial-page about-page">
    <header className="about-hero editorial-width">
      <div className="about-hero-copy">
        <p className="eyebrow">Our story · Eagle Park Innovations</p>
        <h1>Empowering Farmers <span>Through Integrated Solutions</span></h1>
        <p className="about-hero-description">Our convenient end-to-end solution connects farmers to quality inputs, extension services, and reliable markets, helping them increase yields, earn more, and grow sustainably.</p>
        <div className="about-hero-actions"><a className="primary-link" href="#our-story">Discover our story <i className="ri-arrow-down-line" aria-hidden="true" /></a><Link className="text-link" href="/shop">Shop Now <i className="ri-arrow-right-up-line" aria-hidden="true" /></Link></div>
      </div>
      <figure className="about-hero-visual">
        <div className="about-hero-photo"><Image src={women} alt="Two women holding maize grown in their farming community" fill priority sizes="(max-width: 767px) 100vw, 55vw" className="object-contain" /></div>
        <figcaption><span className="about-caption-mark" aria-hidden="true"><i className="ri-leaf-line" /></span><span>Rooted in community.<br /><strong>Growing together.</strong></span></figcaption>
      </figure>
    </header>
    <div className="about-values editorial-width"><span><i className="ri-seedling-line" aria-hidden="true" />Quality inputs</span><span><i className="ri-user-heart-line" aria-hidden="true" />Expert guidance</span><span><i className="ri-links-line" aria-hidden="true" />Reliable markets</span></div>
    <OurStory /><MissionVision />
  </div>;
}
