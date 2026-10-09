'use client';
import { useState } from 'react';

export type ContentBlock = { image: string; heading: string; content: string };
const PREVIEW_LENGTH = 190;
function excerpt(text: string) {
  const trimmed = text.trim();
  if (trimmed.length <= PREVIEW_LENGTH) return trimmed;
  const preview = trimmed.slice(0, PREVIEW_LENGTH);
  const lastSpace = preview.lastIndexOf(' ');
  return `${preview.slice(0, lastSpace > 130 ? lastSpace : PREVIEW_LENGTH).trimEnd()}…`;
}

export default function ArticleContentBlocks({ title, blocks }: { title: string; blocks: ContentBlock[] }) {
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});
  return <section className="news-story-blocks" aria-label="Article images and sections">
    {blocks.map((block, index) => {
      const isExpanded = Boolean(expanded[index]);
      const hasMore = block.content.trim().length > PREVIEW_LENGTH;
      const paragraphs = block.content.split(/\n\s*\n/).filter(Boolean);
      return <section className="news-story-block" key={`${block.image}-${index}`}>
        {block.image && <img src={block.image} alt={`${title} — image ${index + 1}`} loading="lazy"/>}
        {block.heading && <h2>{block.heading}</h2>}
        {isExpanded ? paragraphs.map((paragraph, paragraphIndex) => <p key={paragraphIndex}>{paragraph}</p>) : block.content.trim() && <p>{hasMore ? excerpt(block.content) : block.content}</p>}
        {hasMore && <button className="news-story-read-more" type="button" aria-expanded={isExpanded} onClick={() => setExpanded(current => ({ ...current, [index]: !current[index] }))}>{isExpanded ? 'Read less' : 'Read more'}<i className={isExpanded ? 'ri-arrow-up-line' : 'ri-arrow-right-line'} aria-hidden="true"/></button>}
      </section>;
    })}
  </section>;
}
