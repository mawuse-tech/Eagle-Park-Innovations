import type { Metadata } from 'next';
import NewsListing from '@/src/news/NewsListing';
export const metadata: Metadata = { title: 'News & Resources | EPI', description: 'Updates and resources from Eagle Park Innovations.' };
export default function NewsPage() { return <NewsListing />; }
