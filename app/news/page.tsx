import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'News & Resources | EPI',
  description: 'Updates and resources from Eagle Park Innovations.',
};

export default function NewsPage() {
  return <div className="editorial-page news-page">
    <header className="news-heading editorial-width">
      <p className="eyebrow">From EPI</p>
      <h1>News &amp; Resources</h1>
    </header>
    <section className="news-placeholder editorial-width" aria-labelledby="news-placeholder-title">
      <i className="ri-newspaper-line" aria-hidden="true" />
      <h2 id="news-placeholder-title">News and resources will appear here</h2>
      <p>Our team will publish updates and resources here.</p>
    </section>
  </div>;
}
