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
  return <section className="editorial-width mb-[88px] rounded-[22px] bg-[#edf5ee] px-12 py-[72px] text-center max-[767px]:mb-14 max-[767px]:px-6 max-[767px]:py-12"><div><h2 className="mb-14 max-[767px]:mb-9">Why Farmers Choose EPI?</h2></div><div className="grid grid-cols-4 gap-9 max-[1199px]:grid-cols-2 max-[1199px]:gap-10 max-[767px]:grid-cols-1 max-[767px]:gap-9">{stats.map((item) => <article key={item.title}><i className={`${item.icon} text-[44px] text-[#386347]`} aria-hidden="true" /><div><h3 className="mt-6 mb-4 text-[21px] leading-[1.2] max-[767px]:mt-4">{item.title}</h3><p className="text-sm">{item.description}</p></div></article>)}</div></section>;
}
