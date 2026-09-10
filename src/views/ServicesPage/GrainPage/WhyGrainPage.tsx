const stats = [
  {
    title: 'Inclusive Sourcing',
    description: 'We source grains from local out-growers and cooperatives, including women and youth.',
    icon: 'ri-community-line',
  },
  {
    title: 'Fair Pricing',
    description: 'Better returns for farmers, affordable grains for users.',
    icon: 'ri-money-dollar-circle-line',
  },
  {
    title: 'Shared Opportunity',
    description: 'Our partnerships with farmers and local actors create jobs, income, and value across farming communities.',
    icon: 'ri-hand-heart-line',
  },
  {
    title: 'Quality Assured',
    description: 'Our grains meet high-quality standards from production to delivery.',
    icon: 'ri-shield-check-line',
  },
];

export default function WhyGrainPage() {
  return <section className="benefit-section editorial-width"><div><h2>Why Choose Us</h2></div><div className="benefit-list">{stats.map((item) => <article key={item.title}><i className={item.icon} aria-hidden="true" /><div><h3>{item.title}</h3><p>{item.description}</p></div></article>)}</div></section>;
}
