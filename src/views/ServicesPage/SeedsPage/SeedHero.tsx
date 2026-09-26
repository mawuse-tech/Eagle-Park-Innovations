import PageIntro from '@/src/Components/design/PageIntro';
import photo from '../../../assets/hero section _certified seeds page.jpg';
import Content from './SeedMainSec';

export default function SeedHero() {
  return <div className="editorial-page"><PageIntro eyebrow="Bundled services" title={<>One System. <span>Unlimited Growth for Farmers</span></>} description={<><p>Millions of farmers often face poor yields, climate shocks, and unstable incomes because essential agricultural services are fragmented and difficult to access.</p><p>EPI brings these services together in one convenient, integrated system, connecting farmers to quality inputs, extension services, and reliable markets to build resilient and profitable agribusinesses.</p></>} image={photo} imageAlt="Farmer benefiting from EPI bundled services" action="Shop Now" href="/shop" /><Content /></div>;
}
