import Link from 'next/link';
import Benefits from './WhySeedsPage';
import { PageCallout } from '@/src/Components/design/PageIntro';

const services = [
    {
        name: 'Timely, High-Quality Inputs',
        icon: 'ri-seedling-line',
        description: 'No delays, no guesswork. We deliver premium inputs directly to farmers at fair prices and on schedule, ensuring a strong start to every season.'
    },
    {
        name: 'Practical Training & Field Support',
        icon: 'ri-graduation-cap-line',
        description: 'Knowledge drives results. Through practical training and continuous field guidance, we empower farmers to strengthen decision-making, increase productivity, and grow their income.',
    },
    {
        name: 'Climate-Smart Production',
        icon: 'ri-earth-line',
        description: 'We equip farmers to adopt practices that increase yields and reduce climate risks while protecting soil and other natural resources for future generations.',
    },
    {
        name: 'Reliable Market Access',
        icon: 'ri-store-2-line',
        description: 'We connect farmers directly to trusted buyers, helping them secure fair prices, reduce post-harvest losses, and earn stable incomes.',
    },
];

export default function SeedMainSec() {
  return <>
    <section id="growth-bundle" className="journey-section editorial-width">
      <div className="section-aside"><h2>Our Integrated Farmer Growth Bundle</h2><p>Everything farmers need to build resilient, profitable agribusinesses—connected in one practical system.</p></div>
      <div className="journey-list">{services.map((service, index) => <article key={service.name}><span className="step-number">{index + 1}.</span><div><i className={service.icon} aria-hidden="true" /><h3>{service.name}</h3><p>{service.description}</p></div></article>)}</div>
    </section>
    <Benefits />
    <PageCallout title={<>Whether Transforming Your Farm or Empowering Smallholder Farmers, EPI Gets You There</>} action="Get Your Custom Bundle Today" secondary={<Link href="/contact" className="text-link">Partner with Us <i className="ri-arrow-right-line" aria-hidden="true" /></Link>} />
  </>;
}
