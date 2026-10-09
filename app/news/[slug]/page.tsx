import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { connectDatabase } from '@/src/server/db';
import { Article } from '@/src/server/models/Article';
import ShareArticle from '@/src/news/ShareArticle';
import ArticleVideo from '@/src/news/ArticleVideo';
import ArticleContentBlocks from '@/src/news/ArticleContentBlocks';
import { getVideoEmbedUrl } from '@/src/news/video';
export const dynamic = 'force-dynamic';
type Props = { params: Promise<{ slug: string }> };
async function getArticle(slug: string) { await connectDatabase(); return Article.findOne({ slug, status: 'published' }).lean(); }
export async function generateMetadata({ params }: Props): Promise<Metadata> { const { slug } = await params; try { const article = await getArticle(slug); return article ? { title: `${article.title} | EPI News`, description: article.summary } : { title: 'Story not found | EPI' }; } catch { return { title: 'News & Resources | EPI' }; } }
export default async function NewsArticlePage({ params }: Props) { const { slug } = await params; let article; try { article = await getArticle(slug); } catch { return <main className="news-detail editorial-width"><Link href="/news" className="text-link">← Back to News &amp; Resources</Link><div className="news-feedback"><h1>Story temporarily unavailable</h1><p>Please try again in a moment.</p></div></main>; } if (!article) notFound();
 const videoEmbed = getVideoEmbedUrl(article.videoUrl || '');
 const legacyImages = Array.isArray(article.galleryImages) ? article.galleryImages : [];
 const legacySections = Array.isArray(article.sections) ? article.sections : [];
 const legacyBlocks = Array.from({ length: Math.max(legacyImages.length, legacySections.length) }, (_, index) => ({ image: legacyImages[index] || article.coverImage || '', heading: legacySections[index]?.heading || '', content: legacySections[index]?.content || '' }));
 const contentBlocks = Array.isArray(article.contentBlocks) && article.contentBlocks.length ? article.contentBlocks : legacyBlocks;
 return <article className="news-story editorial-width">
  <Link href="/news" className="news-story-back"><i className="ri-arrow-left-line"/> News &amp; Resources</Link>
  <header className="news-story-header news-story-title-header"><p className="eyebrow">{article.category}</p><h1>{article.title}</h1></header>
  <div className="news-story-hero">{article.coverImage ? <img src={article.coverImage} alt={article.title} fetchPriority="high"/> : <div className="news-story-placeholder"><i className="ri-leaf-line" aria-hidden="true"/></div>}<section className="news-story-summary" aria-label="Article information"><p className="eyebrow">FROM EPI</p><p className="news-story-summary-deck">{article.summary}</p><div className="news-story-meta"><span><i className="ri-user-3-line" aria-hidden="true"/> By {article.author}</span><span><i className="ri-bookmark-3-line" aria-hidden="true"/> {article.category}</span><time dateTime={article.publishedAt?.toISOString()}><i className="ri-calendar-line" aria-hidden="true"/> {article.publishedAt?.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</time></div><ShareArticle/></section></div>
  <div className="news-story-content">{article.content.split(/\n\s*\n/).filter(Boolean).map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div>
  {contentBlocks.length > 0 && <ArticleContentBlocks title={article.title} blocks={contentBlocks}/>}
  {videoEmbed && <section className="news-story-video-section"><header><h2>Watch the highlights from {article.title}</h2></header><ArticleVideo url={article.videoUrl || ''} title={`${article.title} video`}/></section>}
  <footer className="news-story-footer"><Link href="/news" className="news-read-link"><i className="ri-arrow-left-line"/> Back to all stories</Link></footer>
 </article>;
}
