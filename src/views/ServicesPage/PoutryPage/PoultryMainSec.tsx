import Benefits from './WhyPoultryPage';
import eggs from "../../../assets/poultry/eggs.webp";
import man from "../../../assets/poultry/cmp.jpg";
import hens from "../../../assets/poultry/redhenn.jpg";
import Image from 'next/image';
import { PageCallout } from '@/src/Components/design/PageIntro';
const grains = [
    {
        name: 'Fresh Eggs',
        image: eggs,
        description: 'We produce premium-grade eggs with a focus on freshness, consistency, and food safety. Our hens are raised in a clean, controlled environment with a nutrition-focused diet, ensuring top-tier egg quality for every batch.',
    },
    {
        name: 'Compost – Waste to Wealth',
        image: man,
        description: 'As part of our sustainable farming system, EPI converts poultry waste into nutrient-rich organic fertilizer that enhances soil health and boosts crop yields. Our compost is carefully handled to meet the needs of farmers and gardeners.',
    },
    {
        name: 'Live Birds for Chicken Meat',
        image: hens,
        description: 'We supply healthy, well-raised live chickens ideal for meat. Our birds are raised and managed under strict hygiene, nutrition, and welfare standards, ensuring excellent body weight and meat yield, and taste.',
    },

];

export default function PoultryMainSec() {
  return <>
    <section id="poultry-products" className="editorial-width poultry-stories"><div className="section-heading"><h2>Our Poultry Products</h2><p>We provide high-quality poultry products and strengthen nutrition in our communities.</p></div>
    {grains.map((product) => <article className="poultry-story" key={product.name}><div className="poultry-photo"><Image src={product.image} alt={product.name} fill sizes="(max-width: 767px) 100vw, 50vw" className="object-cover" /></div><div><h3>{product.name}</h3><p>{product.description}</p></div></article>)}
    </section>
    <Benefits />
    <PageCallout title={<>Looking for healthy, high-quality poultry products for food or farming?<br />
                        Look no further — we’ve got you covered.</>} action="Shop Now" href="/shop" />
  </>;
}
