const stats = [
    {
        title: 'All-in-One Convenience',
        description: 'Quality inputs, expert guidance, and market access bundled in one package.',
        icon: 'ri-box-3-line',
    },
    {
        title: 'Tailored Solutions',
        description: 'Services designed around the needs and realities of each customer.',
        icon: 'ri-chat-smile-2-line',
    },
    {
        title: 'Fair Prices, Every Step',
        description: 'Fair pricing from inputs to markets, with no margins lost to middlemen.',
        icon: 'ri-money-dollar-circle-line',
    },
    {
        title: 'Built for Resilience',
        description: 'Climate-smart practices and reliable buyers mean more predictable seasons and stable incomes.',
        icon: 'ri-shield-check-line',
    },
];


export default function WhySeedsPage() {
  return <section className="benefit-section editorial-width"><div><h2>Why Farmers Choose EPI?</h2></div><div className="benefit-list">{stats.map((item) => <article key={item.title}><i className={item.icon} aria-hidden="true" /><div><h3>{item.title}</h3><p>{item.description}</p></div></article>)}</div></section>;
}
