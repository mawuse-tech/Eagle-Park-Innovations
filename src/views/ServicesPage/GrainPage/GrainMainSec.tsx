import Benefits from './WhyGrainPage';
import grain from "../../../assets/grain/maizegrain.jpg";
import soy from "../../../assets/grain/soy.jpg";
import cowpea from "../../../assets/grain/cowpea.webp";
import rice from "../../../assets/grain/rice.jpg";
import nut from "../../../assets/grain/nut.jpeg";
import Image from 'next/image';
import { PageCallout } from '@/src/Components/design/PageIntro';
const grains = [
    {
        name: 'Maize',
        image: grain,
        description: 'Maize is a versatile, nutrient rich grain high in carbohydrates, used for food, feed, and fuel, and a staple for millions.',
    },
    {
        name: 'Cowpea',
        image: cowpea,
        description: 'Cowpea is a protein rich legume, packed with fiber, vitamins, and minerals, perfect for soups, stews, and a wide variety of delicacies.',
    },
    {
        name: 'Rice',
        image: rice,
        description: 'Rice is a vital global crop, providing essential calories to over half the world’s population.',
    },
    {
        name: 'Soyabean',
        image: soy,
        description: 'Soyabean is a multi-purpose crop packed with protein and healthy oils. It is a major source of food, feed, and industrial products.',
    },
    {
        name: 'Groundnut',
        image: nut,
        description: 'Groundnut is a protein-rich legume with healthy oils, commonly used in pastes, snacks, and sauces across many cuisines.',
    },
];

export default function GrainMain() {
  return <>
    <section id="grain-catalogue" className="editorial-width catalogue-section"><div className="section-heading"><h2>Our Focus Grains</h2><p className="gold-text">We transform cereal and legume harvests into higher incomes and stronger food security.</p></div>
      <div className="grain-collection">{grains.map((grain) => <article key={grain.name} className="grain-entry"><div className="grain-photo"><Image src={grain.image} alt={grain.name} fill sizes="(max-width: 767px) 100vw, 40vw" className="object-cover" /></div><div className="grain-copy"><h3>{grain.name}</h3><p>{grain.description}</p></div></article>)}</div>
    </section>
    <Benefits />
    <PageCallout title={<>In need of grains with an excellent nutrient profile for food, feed, or industrial use? <br />
                        Look no further — we’ve got you covered.</>} action="Shop Now" href="/shop" />
  </>;
}
