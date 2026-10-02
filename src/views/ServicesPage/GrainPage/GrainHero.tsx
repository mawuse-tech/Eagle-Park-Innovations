import PageIntro from '@/src/Components/design/PageIntro';
import photo from '../../../assets/grain/grainLady.jpg';
import Content from './GrainMainSec';

export default function GrainHero() {
  return <div className="editorial-page grain-hero-page"><PageIntro eyebrow="Premium grains" title={<>Grains That Nourish. <span>Partnerships That Empower.</span></>} description={<><p>EPI sources quality grains directly from smallholder farmers and connects them to reliable buyers. Through fair pricing, reduced post-harvest losses, and stronger market linkages, we help farmers earn more while strengthening local food systems.</p></>} tallImage actionPlacement="copy" image={photo} imageAlt="Farmer holding freshly harvested maize" action="Shop Now" href="/shop" /><Content /></div>;
}
