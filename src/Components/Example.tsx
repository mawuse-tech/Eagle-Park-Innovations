import Link from 'next/link';

const services = [
  { title: 'Bundled Services', icon: 'ri-seedling-line', text: 'Timely access to quality inputs, expert extension services, and reliable markets to increase yields and grow sustainably.', href: '/seed' },
  { title: 'Grain Aggregation', icon: 'ri-plant-line', text: 'Quality grains, fair prices, and reliable markets. Connecting farmers to opportunity with every harvest.', href: '/grain' },
  { title: 'Poultry Farming', icon: 'ri-sun-line', text: 'Farm-fresh eggs and responsible production. Turning poultry waste into organic fertilizer for healthier soils.', href: '/poultry' },
  { title: 'Training & Consultancy', icon: 'ri-graduation-cap-line', text: 'Practical skills and personalized strategies to boost productivity, build resilience, and grow your income.', href: '/train' },
];

export default function Example() {
  return <section className="solutions-section editorial-width" aria-labelledby="solutions-heading">
    <div className="center-heading"><p className="eyebrow">Connected solutions. Lasting growth.</p><h2 id="solutions-heading">Grow your future with Eagle Park</h2></div>
    <div className="solutions-grid">{services.map(service => <Link className="solution-item" key={service.href} href={service.href}><i className={service.icon} aria-hidden="true" /><h3>{service.title}</h3><p>{service.text}</p><span className="solution-arrow" aria-hidden="true"><i className="ri-arrow-right-line" /></span></Link>)}</div>
  </section>;
}
