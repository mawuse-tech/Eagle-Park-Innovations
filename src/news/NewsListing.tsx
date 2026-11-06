'use client';
import Link from 'next/link';
import { useCallback, useEffect, useMemo, useState } from 'react';

type Article = { id: string; title: string; slug: string; coverImage: string; category: string; summary: string; author: string; publishedAt: string };
type Event = { id: string; date: string; time: string; title: string; place: string; cost: string; audience: string; image: string; description: string; organizer: string; capacity: number | null };

const trainingRequestUrl = 'https://wa.me/233243919417?text=Hi%20EPI%2C%20I%E2%80%99d%20like%20to%20request%20training%20for%20my%20group.%20Please%20share%20the%20details.';

function EventCard({ event, index }: { event: Event; index: number }) {
 return <article className={`event-card${index === 0 ? ' is-next' : ''}`}>
  <Link className="event-card-link" href={`/events/${event.id}`}>
   {event.image ? <img className="event-card-image" src={event.image} alt="" loading="lazy"/> : <div className="event-card-image event-card-image-placeholder"><i className="ri-calendar-event-line" aria-hidden="true"/></div>}
   <div className="event-card-copy"><p className="event-date"><i className="ri-calendar-line" aria-hidden="true" />{new Date(`${event.date}T12:00:00`).toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' })}{index === 0 && <span>Next event</span>}</p><h3>{event.title}</h3><span className="event-read-more">Read more <i className="ri-arrow-right-line" aria-hidden="true" /></span></div>
  </Link>
 </article>;
}

export default function NewsListing() {
 const [articles, setArticles] = useState<Article[]>([]); const [events, setEvents] = useState<Event[]>([]); const [eventsStatus, setEventsStatus] = useState<'loading'|'ready'|'error'>('loading'); const [category, setCategory] = useState(''); const [author, setAuthor] = useState(''); const [year, setYear] = useState(''); const [page, setPage] = useState(1); const [status, setStatus] = useState<'loading'|'ready'|'error'>('loading'); const [attempt, setAttempt] = useState(0); const [isOffline, setIsOffline] = useState(false);
 const loadArticles = useCallback(async (signal: AbortSignal) => {
  setStatus('loading');
  for (let retry = 0; retry < 3; retry += 1) {
   try {
    const response = await fetch('/api/news', { signal, cache: 'no-store' });
    if (!response.ok) throw new Error(`News request failed (${response.status})`);
    const data = await response.json();
    if (!Array.isArray(data.articles)) throw new Error('News response was invalid');
    setArticles(data.articles); setStatus('ready'); return;
   } catch {
    if (signal.aborted) return;
    if (retry < 2) await new Promise(resolve => setTimeout(resolve, 600 * (retry + 1)));
   }
  }
  if (!signal.aborted) setStatus('error');
 }, []);
 const loadEvents = useCallback(async (signal?: AbortSignal) => {
  try {
   const response = await fetch('/api/events', { signal, cache: 'no-store' });
   if (!response.ok) throw new Error('Could not load events');
   const data = await response.json();
   if (!Array.isArray(data.events)) throw new Error('Events response was invalid');
   if (!signal?.aborted) { setEvents(data.events); setEventsStatus('ready'); }
  } catch {
   if (!signal?.aborted) setEventsStatus('error');
  }
 }, []);
 useEffect(() => { const controller = new AbortController(); void loadArticles(controller.signal); return () => controller.abort(); }, [loadArticles, attempt]);
 useEffect(() => {
  const controller = new AbortController();
  void loadEvents(controller.signal);
  const refresh = () => { if (document.visibilityState === 'visible') void loadEvents(); };
  const onStorage = (event: StorageEvent) => { if (event.key === 'epi-events-updated') void loadEvents(); };
  const interval = window.setInterval(() => void loadEvents(), 30000);
  window.addEventListener('focus', refresh);
  window.addEventListener('storage', onStorage);
  document.addEventListener('visibilitychange', refresh);
  return () => { controller.abort(); window.clearInterval(interval); window.removeEventListener('focus', refresh); window.removeEventListener('storage', onStorage); document.removeEventListener('visibilitychange', refresh); };
 }, [loadEvents]);
 useEffect(() => { const update = () => setIsOffline(!navigator.onLine); update(); window.addEventListener('online', update); window.addEventListener('offline', update); return () => { window.removeEventListener('online', update); window.removeEventListener('offline', update); }; }, []);
 const upcomingEvents = useMemo(() => events.filter(event => new Date(`${event.date}T23:59:59`).getTime() >= Date.now()).sort((a, b) => a.date.localeCompare(b.date)), [events]);
 const categories = useMemo(() => [...new Set(articles.map(a => a.category))].sort(), [articles]);
 const authors = useMemo(() => [...new Set(articles.map(a => a.author))].sort(), [articles]);
 const years = useMemo(() => [...new Set(articles.map(a => new Date(a.publishedAt).getFullYear()))].sort((a, b) => b - a), [articles]);
 const filtered = articles.filter(a => (!category || a.category === category) && (!author || a.author === author) && (!year || new Date(a.publishedAt).getFullYear() === Number(year)));
 const pageSize = 3; const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize)); const visible = filtered.slice((page - 1) * pageSize, page * pageSize);
 function updateFilter(setter: (value: string) => void, value: string) { setter(value); setPage(1); }
 return <div className="editorial-page news-page">
  <section className="events-section editorial-width" id="events" aria-labelledby="events-heading"><div className="events-heading"><div><p className="eyebrow">LEARN WITH EPI</p><h2 id="events-heading">Upcoming events</h2></div></div>
   {eventsStatus === 'loading' ? <div className="events-loading" aria-label="Loading upcoming events"/> : eventsStatus === 'error' ? <div className="events-empty"><div><h3>Events are temporarily unavailable</h3><p>You can still contact EPI to request training for your group.</p></div><a className="primary-link" href={trainingRequestUrl} target="_blank" rel="noopener noreferrer">Request training for your group <i className="ri-whatsapp-line" aria-hidden="true" /></a></div> : upcomingEvents.length ? <div className="events-marquee" aria-label="Upcoming events carousel"><div className={`events-marquee-track${upcomingEvents.length < 2 ? ' is-static' : ''}`}><div className="events-marquee-group">{upcomingEvents.map((event, index) => <EventCard key={event.id} event={event} index={index}/>)}</div>{upcomingEvents.length > 1 && <div className="events-marquee-group">{upcomingEvents.map((event, index) => <EventCard key={event.id} event={event} index={index}/>)}</div>}</div></div> : <div className="events-empty"><div><h3>No open sessions right now</h3><p>Training can be arranged for your group. Message us to discuss what you need.</p></div><a className="primary-link" href={trainingRequestUrl} target="_blank" rel="noopener noreferrer">Request training for your group <i className="ri-whatsapp-line" aria-hidden="true" /></a></div>}
  </section>
  <section className="news-directory editorial-width" aria-label="News and resources">{status === 'loading' ? <div className="news-skeleton" aria-label="Loading stories" aria-busy="true"><span/><span/><span/></div> : status === 'error' ? <div className="news-feedback" role="alert">{isOffline && <i className="ri-wifi-off-line" aria-hidden="true"/>}<h2>{isOffline ? 'You appear to be offline' : 'Stories are temporarily unavailable'}</h2><p>Check your connection and try again, or explore these EPI pages.</p><button type="button" className="primary-link" onClick={() => setAttempt(value => value + 1)}>Try again <i className="ri-refresh-line" aria-hidden="true" /></button><nav className="news-fallback-links" aria-label="Other EPI pages"><Link href="/train">Training</Link><Link href="/shop">Shop</Link><a href="https://www.facebook.com/share/1Ahtriscx4/?mibextid=WC7FNe" target="_blank" rel="noopener noreferrer">Facebook</a><a href="https://www.instagram.com/p/DLncarnsdyb/?igsh=MW1nZW92YTR0aHB0bA==" target="_blank" rel="noopener noreferrer">Instagram</a></nav></div> : articles.length === 0 ? <div className="news-feedback"><i className="ri-newspaper-line" aria-hidden="true"/><h2>New stories coming soon</h2><p>Get in touch to hear about EPI news and resources.</p><a className="primary-link" href="https://wa.me/233243919417?text=Hi%20EPI%2C%20please%20keep%20me%20updated%20on%20new%20stories%20and%20resources." target="_blank" rel="noopener noreferrer">Get updates on WhatsApp <i className="ri-whatsapp-line" aria-hidden="true"/></a></div> : <>
   <header className="news-directory-heading"><p className="eyebrow">EXPLORE EPI</p><h2>All stories</h2></header>
   <div className="news-directory-filters" aria-label="Filter stories"><label><span>Category</span><select value={category} onChange={e => updateFilter(setCategory, e.target.value)}><option value="">All categories</option>{categories.map(item => <option key={item} value={item}>{item}</option>)}</select></label><label><span>Author</span><select value={author} onChange={e => updateFilter(setAuthor, e.target.value)}><option value="">All authors</option>{authors.map(item => <option key={item} value={item}>{item}</option>)}</select></label><label><span>Year</span><select value={year} onChange={e => updateFilter(setYear, e.target.value)}><option value="">All years</option>{years.map(item => <option key={item} value={item}>{item}</option>)}</select></label></div>
   {filtered.length === 0 ? <div className="news-filter-empty"><i className="ri-filter-3-line"/><h3>No stories match your filters</h3><p>Choose different filters to see more stories.</p><button onClick={() => { setCategory(''); setAuthor(''); setYear(''); setPage(1); }}>Clear filters</button></div> : <><p className="news-result-count">{filtered.length} {filtered.length === 1 ? 'story' : 'stories'}</p><div className="news-card-grid news-reference-grid">{visible.map(a => <article className="news-reference-card" key={a.id}><Link href={`/news/${a.slug}`} className="news-reference-link"><figure><div className="news-reference-image">{a.coverImage ? <img src={a.coverImage} alt="" loading="lazy"/> : <span className="news-cover-placeholder"><i className="ri-leaf-line"/></span>}<time dateTime={a.publishedAt}>{new Date(a.publishedAt).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}</time></div><figcaption><span className="news-card-category">{a.category}</span><h3>{a.title}</h3><p className="news-reference-summary">{a.summary}</p><span className="news-reference-author">{a.author}</span></figcaption></figure></Link></article>)}</div><nav className="news-reference-pagination" aria-label="Story pages"><button aria-label="Previous page" disabled={page === 1} onClick={() => setPage(p => p - 1)}><i className="ri-arrow-left-line"/></button><span>Page: {page}/{pageCount}</span><button aria-label="Next page" disabled={page === pageCount} onClick={() => setPage(p => p + 1)}><i className="ri-arrow-right-line"/></button></nav></>}
  </>}</section></div>;
}
