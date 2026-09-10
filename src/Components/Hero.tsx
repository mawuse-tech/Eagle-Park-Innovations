import Link from 'next/link';
import HeroSlideshow from './HeroSlideshow';
import Fixed from './Fixed';

export default function Hero() {
  return (
    <div>
      <section className="home-hero">
        <div className="home-hero-copy">
          <h1>Empowering Farmers, Feeding Nations and
            <br />
            <span className="text-green-800">Building Sustainable Futures</span></h1>
          <p className="hero-description">Welcome to Eagle Park Innovations Limited (EPI)</p>
          <div className="hero-actions"><Link href="/ourstory" className="primary-link">Learn More <i className="ri-arrow-right-line" aria-hidden="true" /></Link></div>
        </div>
        <HeroSlideshow />
      </section>
      <Fixed />
    </div>
  );
}
