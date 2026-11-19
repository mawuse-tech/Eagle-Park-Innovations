import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { connectDatabase } from "@/src/server/db";
import { Article } from "@/src/server/models/Article";
import ShareArticle from "@/src/news/ShareArticle";
import ArticleVideo from "@/src/news/ArticleVideo";
import ArticleContentBlocks from "@/src/news/ArticleContentBlocks";
import { getVideoEmbedUrl } from "@/src/news/video";
export const dynamic = "force-dynamic";
type Props = { params: Promise<{ slug: string }> };
async function getArticle(slug: string) {
  await connectDatabase();
  return Article.findOne({ slug, status: "published" }).lean();
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const article = await getArticle(slug);
    return article
      ? { title: `${article.title} | EPI News`, description: article.summary }
      : { title: "Story not found | EPI" };
  } catch {
    return { title: "News & Resources | EPI" };
  }
}
export default async function NewsArticlePage({ params }: Props) {
  const { slug } = await params;
  let article;
  try {
    article = await getArticle(slug);
  } catch {
    return (
      <main className="mx-auto w-[min(900px,calc(100%-64px))] py-6 pb-24 max-[767px]:w-[calc(100%-32px)]">
        <Link href="/news" className="text-link">
          ← Back to News &amp; Resources
        </Link>
        <div className="flex min-h-[300px] flex-col items-center justify-center text-center text-[#626c65]">
          <h1 className="text-[32px] font-bold text-[#202923]">
            Story temporarily unavailable
          </h1>
          <p className="my-[10px] mb-[18px]">Please try again in a moment.</p>
        </div>
      </main>
    );
  }
  if (!article) notFound();
  const videoEmbed = getVideoEmbedUrl(article.videoUrl || "");
  const legacyImages = Array.isArray(article.galleryImages)
    ? article.galleryImages
    : [];
  const legacySections = Array.isArray(article.sections)
    ? article.sections
    : [];
  const legacyBlocks = Array.from(
    { length: Math.max(legacyImages.length, legacySections.length) },
    (_, index) => ({
      image: legacyImages[index] || article.coverImage || "",
      heading: legacySections[index]?.heading || "",
      content: legacySections[index]?.content || "",
    }),
  );
  // Mongoose lean() keeps BSON ObjectIds on embedded subdocuments. Strip those
  // internal fields and pass only strings across the Server/Client boundary.
  const contentBlocks = (
    Array.isArray(article.contentBlocks) && article.contentBlocks.length
      ? article.contentBlocks
      : legacyBlocks
  ).map((block) => ({
    image: String(block.image || ""),
    heading: String(block.heading || ""),
    content: String(block.content || ""),
  }));
  return (
    <article className="mx-auto w-[min(1280px,calc(100%-64px))] pt-7 pb-[100px] max-[767px]:w-[calc(100%-32px)] max-[700px]:pt-5 max-[700px]:pb-16">
      <Link
        href="/news"
        className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#386347] hover:underline hover:underline-offset-4"
      >
        <i className="ri-arrow-left-line" /> News &amp; Resources
      </Link>
      <header className="mx-auto mb-[38px] flex max-w-[980px] flex-col items-center text-center max-[700px]:mb-6 max-[700px]:items-start max-[700px]:text-left">
        <p className="eyebrow mb-[14px]">{article.category}</p>
        <h1 className="text-[clamp(38px,5.4vw,66px)] font-bold leading-[1.08] text-[#202923] max-[700px]:text-[clamp(34px,9vw,48px)]">
          {article.title}
        </h1>
      </header>
      <div className="flex flex-col items-start">
        {article.coverImage ? (
          <img
            className="max-h-[650px] w-full aspect-[16/8.5] bg-[linear-gradient(135deg,#dce9de,#f1f4ed)] object-cover max-[700px]:aspect-[4/3]"
            src={article.coverImage}
            alt={article.title}
            fetchPriority="high"
          />
        ) : (
          <div className="grid max-h-[650px] w-full aspect-[16/8.5] place-items-center bg-[linear-gradient(135deg,#dce9de,#f1f4ed)] max-[700px]:aspect-[4/3]">
            <i
              className="ri-leaf-line text-[64px] text-[#55785c]"
              aria-hidden="true"
            />
          </div>
        )}
        <section
          className="relative z-[1] -mt-[120px] ml-[5%] w-[min(780px,72%)] bg-[#f0f5f0] p-[clamp(26px,3.5vw,48px)] shadow-[14px_14px_0_#386347] max-[700px]:-mt-8 max-[700px]:ml-3 max-[700px]:w-[calc(100%-24px)] max-[700px]:p-6 max-[700px]:shadow-[7px_7px_0_#386347]"
          aria-label="Article information"
        >
          <p className="eyebrow mb-[10px]">FROM EPI</p>
          <p className="m-0 text-[17px] leading-[1.6] text-[#334138] max-[700px]:text-base">
            {article.summary}
          </p>
          <div className="mt-[18px] flex flex-wrap gap-x-6 gap-y-[10px] text-[13px] text-[#58665c] max-[700px]:flex-col max-[700px]:gap-[10px] max-[700px]:text-xs">
            <span className="inline-flex items-center gap-2">
              <i
                className="ri-user-3-line text-base text-[#386347]"
                aria-hidden="true"
              />{" "}
              By {article.author}
            </span>
            <span className="inline-flex items-center gap-2">
              <i
                className="ri-bookmark-3-line text-base text-[#386347]"
                aria-hidden="true"
              />{" "}
              {article.category}
            </span>
            <time
              className="inline-flex items-center gap-2"
              dateTime={article.publishedAt?.toISOString()}
            >
              <i
                className="ri-calendar-line text-base text-[#386347]"
                aria-hidden="true"
              />{" "}
              {article.publishedAt?.toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>
          <ShareArticle />
        </section>
      </div>
      <div className="mx-auto mt-[68px] max-w-[790px] max-[700px]:mt-[38px]">
        {article.content
          .split(/\n\s*\n/)
          .filter(Boolean)
          .map((paragraph, index) => (
            <p
              className="mb-[22px] whitespace-pre-wrap text-[17px] leading-[1.85] text-[#3b473e] max-[700px]:text-base max-[700px]:leading-[1.75]"
              key={index}
            >
              {paragraph}
            </p>
          ))}
      </div>
      {contentBlocks.length > 0 && (
        <ArticleContentBlocks title={article.title} blocks={contentBlocks} />
      )}
      {videoEmbed && (
        <section className="mt-[132px] grid w-full grid-cols-[minmax(280px,.8fr)_minmax(0,1.5fr)] items-center gap-[clamp(36px,6vw,90px)] max-[700px]:mt-16 max-[700px]:grid-cols-1 max-[700px]:gap-[22px]">
          <header className="flex flex-col items-start gap-7 before:block before:h-1 before:w-[90px] before:rounded before:bg-[#ef6a2c] max-[700px]:gap-4">
            <h2 className="max-w-[450px] !text-[clamp(32px,3.4vw,48px)] font-bold leading-[1.16] tracking-[-.025em] max-[700px]:max-w-none max-[700px]:text-[30px]">
              Watch the highlights from {article.title}
            </h2>
          </header>
          <ArticleVideo
            url={article.videoUrl || ""}
            title={`${article.title} video`}
          />
        </section>
      )}
      <footer className="mx-auto mt-[42px] max-w-[790px] border-t border-[#dfe7e0] pt-[22px]">
        <Link
          href="/news"
          className="inline-flex items-center gap-2 font-bold text-[#386347]"
        >
          <i className="ri-arrow-left-line" /> Back to all stories
        </Link>
      </footer>
    </article>
  );
}
