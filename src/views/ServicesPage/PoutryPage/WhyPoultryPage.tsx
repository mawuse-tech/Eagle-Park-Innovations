const stats = [
  {
    title: 'Expertise You Can Trust',
    description: 'Led by a poultry expert with 10+ years of quality-focused experience',
    icon: 'ri-user-star-line',
  },
  {
    title: 'Eco-Friendly Waste Management',
    description: 'Poultry waste transformed into valuable organic fertilizer',
    icon: 'ri-recycle-line',
  },
  {
    title: 'Reliable Supply with Consistent Quality',
    description: 'Dependable products with timely delivery',
    icon: 'ri-truck-line',
  },
  {
    title: 'Professional Partnerships That Grow With You',
    description: 'Flexible, client-focused relationships',
    icon: 'ri-team-line',
  },
];


export default function WhyPoultryPage() {
  return <section className="benefit-section editorial-width"><div><h2>Why Choose Us</h2></div><div className="benefit-list">{stats.map((item) => <article key={item.title}><i className={item.icon} aria-hidden="true" /><div><h3>{item.title}</h3><p>{item.description}</p></div></article>)}</div></section>;
}
