"use client";
import { useState } from "react";

export type ContentBlock = { image: string; heading: string; content: string };
const PREVIEW_LENGTH = 190;
function excerpt(text: string) {
  const trimmed = text.trim();
  if (trimmed.length <= PREVIEW_LENGTH) return trimmed;
  const preview = trimmed.slice(0, PREVIEW_LENGTH);
  const lastSpace = preview.lastIndexOf(" ");
  return `${preview.slice(0, lastSpace > 130 ? lastSpace : PREVIEW_LENGTH).trimEnd()}…`;
}

export default function ArticleContentBlocks({
  title,
  blocks,
}: {
  title: string;
  blocks: ContentBlock[];
}) {
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});
  return (
    <section
      className="mx-auto my-[88px] mb-[92px] grid max-w-[1120px] grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] items-start gap-x-6 gap-y-[46px] max-[900px]:gap-x-[18px] max-[900px]:gap-y-9 max-[600px]:my-[52px] max-[600px]:mb-[60px] max-[600px]:grid-cols-1 max-[600px]:gap-[34px]"
      aria-label="Article images and sections"
    >
      {blocks.map((block, index) => {
        const isExpanded = Boolean(expanded[index]);
        const hasMore = block.content.trim().length > PREVIEW_LENGTH;
        const paragraphs = block.content.split(/\n\s*\n/).filter(Boolean);
        return (
          <section className="min-w-0" key={`${block.image}-${index}`}>
            {block.image && (
              <img
                className="mb-5 block max-h-[440px] w-full aspect-video bg-[#edf1ed] object-cover max-[600px]:mb-[14px]"
                src={block.image}
                alt={`${title} — image ${index + 1}`}
                loading="lazy"
              />
            )}
            {block.heading && (
              <h2 className="mb-3 !text-[clamp(20px,2vw,26px)] font-bold leading-[1.25] tracking-[-.015em] text-[#202923] max-[600px]:text-[22px]">
                {block.heading}
              </h2>
            )}
            {isExpanded
              ? paragraphs.map((paragraph, paragraphIndex) => (
                  <p
                    className="mb-3 whitespace-pre-wrap text-[15px] leading-[1.65] text-[#3b473e]"
                    key={paragraphIndex}
                  >
                    {paragraph}
                  </p>
                ))
              : block.content.trim() && (
                  <p className="mb-3 whitespace-pre-wrap text-[15px] leading-[1.65] text-[#3b473e]">
                    {hasMore ? excerpt(block.content) : block.content}
                  </p>
                )}
            {hasMore && (
              <button
                className="mt-0.5 inline-flex items-center gap-[7px] p-0 text-sm font-bold text-[#386347] hover:underline hover:underline-offset-4 focus-visible:outline-2 focus-visible:outline-[#386347] focus-visible:outline-offset-1"
                type="button"
                aria-expanded={isExpanded}
                onClick={() =>
                  setExpanded((current) => ({
                    ...current,
                    [index]: !current[index],
                  }))
                }
              >
                {isExpanded ? "Read less" : "Read more"}
                <i
                  className={
                    isExpanded ? "ri-arrow-up-line" : "ri-arrow-right-line"
                  }
                  aria-hidden="true"
                />
              </button>
            )}
          </section>
        );
      })}
    </section>
  );
}
