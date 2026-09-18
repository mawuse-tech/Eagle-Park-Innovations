import PageIntro from '@/src/Components/design/PageIntro';
import photo from '../../../assets/poultry/poultryLady.jpg';
import Content from './PoultryMainSec';

export default function PoultryHero() {
  return <div className="editorial-page"><PageIntro variant="split" eyebrow="Poultry products" title={<>Quality Poultry Products <span>for Every Home</span></>} description={<><p>At EPI, we provide high-quality eggs produced through responsible and scalable farming practices. Our circular economy model transforms poultry by-products into organic fertilizer, creating a closed-loop system that boosts sustainability and product quality.</p></>} image={photo} imageAlt="Eagle Park poultry farming" action="Shop Now" href="/shop" /><Content /></div>;
}
