"use client";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  NewsConnections,
  NewsHero,
  type FeaturedEvent,
} from "./NewsHighlights";

type Article = {
  id: string;
  title: string;
  slug: string;
  coverImage: string;
  category: string;
  summary: string;
  author: string;
  publishedAt: string;
};

const trainingRequestUrl =
  "https://wa.me/233243919417?text=Hi%20EPI%2C%20I%E2%80%99d%20like%20to%20request%20training%20for%20my%20group.%20Please%20share%20the%20details.";

function EventCard({ event }: { event: FeaturedEvent }) {
  return (
    <article className="min-w-0">
      <Link
        className="group flex h-full items-center gap-4 rounded-2xl border border-[#dce5de] bg-[#f7faf7] p-4 hover:border-[#91ad94]"
        href={`/events/${event.id}`}
      >
        {event.image ? (
          <img
            className="size-14 shrink-0 rounded-lg bg-[#e4efda] object-cover"
            src={event.image}
            alt=""
            loading="lazy"
          />
        ) : (
          <i
            className="ri-calendar-event-line grid size-14 shrink-0 place-items-center rounded-lg bg-[#e4efda] text-2xl text-[#226732]"
            aria-hidden="true"
          />
        )}
        <div className="min-w-0 flex-1">
          <time
            dateTime={event.date}
            className="text-[13px] font-medium text-[#31543a]"
          >
            {new Date(`${event.date}T12:00:00`).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </time>
          <h3 className="mt-1 text-lg leading-tight break-words group-hover:underline">
            {event.title}
          </h3>
          {event.place && <p className="mt-1 text-sm">{event.place}</p>}
        </div>
        <i
          className="ri-arrow-right-line shrink-0 text-lg text-[#155421]"
          aria-hidden="true"
        />
      </Link>
    </article>
  );
}

function ArticleCard({
  article,
  showSummary,
}: {
  article: Article;
  showSummary: boolean;
}) {
  const date = new Date(article.publishedAt);
  return (
    <article className="min-w-0 rounded-2xl border border-[#e1e8df] bg-[#f8faf6] shadow-sm">
      <Link
        href={`/news/${article.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-2xl"
      >
        <div className="aspect-[2.15] w-full overflow-hidden bg-[#e4efda]">
          {article.coverImage ? (
            <img
              className="size-full object-cover transition-transform duration-300 group-hover:scale-[1.04] motion-reduce:transition-none"
              src={article.coverImage}
              alt=""
              loading="lazy"
            />
          ) : (
            <div className="grid size-full place-items-center text-[#386347]">
              <i className="ri-newspaper-line text-4xl" aria-hidden="true" />
            </div>
          )}
        </div>
        <div className="flex flex-1 flex-col items-start gap-2.5 p-4">
          <div className="flex w-full flex-wrap items-center justify-between gap-x-3 gap-y-2">
            <span className="max-w-full rounded-full bg-[#155421] px-2.5 py-1 text-xs font-bold break-words text-white">
              {article.category}
            </span>
            {article.publishedAt && !Number.isNaN(date.getTime()) && (
              <time
                dateTime={article.publishedAt}
                className="inline-flex items-center gap-1.5 text-[13px] text-[#344b3b]"
              >
                <i className="ri-calendar-line" aria-hidden="true" />
                {date.toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </time>
            )}
          </div>
          <h3 className="text-xl leading-tight break-words">{article.title}</h3>
          {showSummary && (
            <>
              <p className="text-sm leading-relaxed">{article.summary}</p>
              <span className="text-[13px] text-[#526259]">
                {article.author}
              </span>
            </>
          )}
          <span className="mt-auto inline-flex items-center gap-2 pt-2 text-sm font-bold text-[#155421] group-hover:underline">
            Read more <i className="ri-arrow-right-line" aria-hidden="true" />
          </span>
        </div>
      </Link>
    </article>
  );
}

export default function NewsListing() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [events, setEvents] = useState<FeaturedEvent[]>([]);
  const [eventsStatus, setEventsStatus] = useState<
    "loading" | "ready" | "error"
  >("loading");
  const [category, setCategory] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState("");
  const [page, setPage] = useState(1);
  const [showAll, setShowAll] = useState(false);
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading",
  );
  const [attempt, setAttempt] = useState(0);
  const [isOffline, setIsOffline] = useState(false);
  const loadArticles = useCallback(async (signal: AbortSignal) => {
    setStatus("loading");
    for (let retry = 0; retry < 3; retry += 1) {
      try {
        const response = await fetch("/api/news", {
          signal,
          cache: "no-store",
        });
        if (!response.ok)
          throw new Error(`News request failed (${response.status})`);
        const data = await response.json();
        if (!Array.isArray(data.articles))
          throw new Error("News response was invalid");
        setArticles(data.articles);
        setStatus("ready");
        return;
      } catch {
        if (signal.aborted) return;
        if (retry < 2)
          await new Promise((resolve) =>
            setTimeout(resolve, 600 * (retry + 1)),
          );
      }
    }
    if (!signal.aborted) setStatus("error");
  }, []);
  const loadEvents = useCallback(async (signal?: AbortSignal) => {
    try {
      const response = await fetch("/api/events", {
        signal,
        cache: "no-store",
      });
      if (!response.ok) throw new Error("Could not load events");
      const data = await response.json();
      if (!Array.isArray(data.events))
        throw new Error("Events response was invalid");
      if (!signal?.aborted) {
        setEvents(data.events);
        setEventsStatus("ready");
      }
    } catch {
      if (!signal?.aborted) setEventsStatus("error");
    }
  }, []);
  useEffect(() => {
    const controller = new AbortController();
    void loadArticles(controller.signal);
    return () => controller.abort();
  }, [loadArticles, attempt]);
  useEffect(() => {
    const controller = new AbortController();
    void loadEvents(controller.signal);
    const refresh = () => {
      if (document.visibilityState === "visible") void loadEvents();
    };
    const onStorage = (event: StorageEvent) => {
      if (event.key === "epi-events-updated") void loadEvents();
    };
    const interval = window.setInterval(() => void loadEvents(), 30000);
    window.addEventListener("focus", refresh);
    window.addEventListener("storage", onStorage);
    document.addEventListener("visibilitychange", refresh);
    return () => {
      controller.abort();
      window.clearInterval(interval);
      window.removeEventListener("focus", refresh);
      window.removeEventListener("storage", onStorage);
      document.removeEventListener("visibilitychange", refresh);
    };
  }, [loadEvents]);
  useEffect(() => {
    const update = () => setIsOffline(!navigator.onLine);
    update();
    window.addEventListener("online", update);
    window.addEventListener("offline", update);
    return () => {
      window.removeEventListener("online", update);
      window.removeEventListener("offline", update);
    };
  }, []);
  const upcomingEvents = useMemo(
    () =>
      events
        .filter(
          (event) => new Date(`${event.date}T23:59:59`).getTime() >= Date.now(),
        )
        .sort((a, b) => a.date.localeCompare(b.date)),
    [events],
  );
  const categories = useMemo(
    () => [...new Set(articles.map((a) => a.category))].sort(),
    [articles],
  );
  const authors = useMemo(
    () => [...new Set(articles.map((a) => a.author))].sort(),
    [articles],
  );
  const years = useMemo(
    () =>
      [
        ...new Set(articles.map((a) => new Date(a.publishedAt).getFullYear())),
      ].sort((a, b) => b - a),
    [articles],
  );
  const filtered = articles.filter(
    (a) =>
      (!category || a.category === category) &&
      (!author || a.author === author) &&
      (!year || new Date(a.publishedAt).getFullYear() === Number(year)),
  );
  const pageSize = 3;
  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const visible = showAll
    ? filtered
    : articles.slice((page - 1) * pageSize, page * pageSize);
  const announcements = articles.filter(({ category }) =>
    /\bannouncements?\b/i.test(category),
  );
  function toggleAllStories() {
    setShowAll((value) => !value);
    setCategory("");
    setAuthor("");
    setYear("");
    setPage(1);
  }
  return (
    <div className="editorial-page">
      <NewsHero event={upcomingEvents[0]} />
      <section
        className="editorial-width pt-8 pb-10 md:pt-10 md:pb-12"
        id="latest-news"
        aria-labelledby="latest-news-heading"
      >
        <header className="mb-6 flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
          <div>
            <p className="mb-2 text-sm font-bold uppercase tracking-wide !text-[#174327]">
              Latest News and Events
            </p>
            <h2
              id="latest-news-heading"
              className="!text-[clamp(1.9rem,3.4vw,2.8rem)]"
            >
              What’s Happening at EPI
            </h2>
          </div>
          {status === "ready" && articles.length > 0 && (
            <button
              type="button"
              className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-[#155421] hover:underline"
              aria-expanded={showAll}
              onClick={toggleAllStories}
            >
              {showAll ? "Show latest news" : "View all news"}
              <i
                className={showAll ? "ri-arrow-up-line" : "ri-arrow-right-line"}
                aria-hidden="true"
              />
            </button>
          )}
        </header>
        {status === "loading" ? (
          <div
            className="grid min-h-[290px] grid-cols-3 gap-6 py-[30px] max-[767px]:grid-cols-1 max-[767px]:min-h-[240px]"
            aria-label="Loading stories"
            aria-busy="true"
          >
            <span className="min-h-[260px] animate-[news-shimmer_1.2s_ease-in-out_infinite] rounded-lg bg-[linear-gradient(100deg,#eef2ee_25%,#f8faf8_40%,#eef2ee_65%)] bg-[length:200%_100%] max-[767px]:hidden max-[767px]:first:block max-[767px]:min-h-[240px]" />
            <span className="min-h-[260px] animate-[news-shimmer_1.2s_ease-in-out_infinite] rounded-lg bg-[linear-gradient(100deg,#eef2ee_25%,#f8faf8_40%,#eef2ee_65%)] bg-[length:200%_100%] max-[767px]:hidden" />
            <span className="min-h-[260px] animate-[news-shimmer_1.2s_ease-in-out_infinite] rounded-lg bg-[linear-gradient(100deg,#eef2ee_25%,#f8faf8_40%,#eef2ee_65%)] bg-[length:200%_100%] max-[767px]:hidden" />
          </div>
        ) : status === "error" ? (
          <div
            className="flex min-h-[300px] flex-col items-center justify-center text-center text-[#626c65]"
            role="alert"
          >
            {isOffline && (
              <i
                className="ri-wifi-off-line mb-[18px] text-[38px] text-[#386347]"
                aria-hidden="true"
              />
            )}
            <h2 className="!text-[32px] font-bold text-[#202923]">
              {isOffline
                ? "You appear to be offline"
                : "Stories are temporarily unavailable"}
            </h2>
            <p className="my-[10px] mb-[18px]">
              Check your connection and try again, or explore these EPI pages.
            </p>
            <button
              type="button"
              className="primary-link cursor-pointer border-0 [font:inherit]"
              onClick={() => setAttempt((value) => value + 1)}
            >
              Try again <i className="ri-refresh-line" aria-hidden="true" />
            </button>
            <nav
              className="mt-[22px] flex flex-wrap justify-center gap-[18px]"
              aria-label="Other EPI pages"
            >
              <Link
                className="text-[13px] font-bold text-[#31543a] underline underline-offset-4"
                href="/train"
              >
                Training
              </Link>
              <Link
                className="text-[13px] font-bold text-[#31543a] underline underline-offset-4"
                href="/shop"
              >
                Shop
              </Link>
              <a
                className="text-[13px] font-bold text-[#31543a] underline underline-offset-4"
                href="https://www.facebook.com/share/1Ahtriscx4/?mibextid=WC7FNe"
                target="_blank"
                rel="noopener noreferrer"
              >
                Facebook
              </a>
              <a
                className="text-[13px] font-bold text-[#31543a] underline underline-offset-4"
                href="https://www.instagram.com/p/DLncarnsdyb/?igsh=MW1nZW92YTR0aHB0bA=="
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
            </nav>
          </div>
        ) : articles.length === 0 ? (
          <div className="flex min-h-[300px] flex-col items-center justify-center text-center text-[#626c65]">
            <i
              className="ri-newspaper-line mb-[18px] text-[38px] text-[#386347]"
              aria-hidden="true"
            />
            <h2 className="!text-[32px] font-bold text-[#202923]">
              New stories coming soon
            </h2>
            <p className="my-[10px] mb-[18px]">
              Subscribe to hear about EPI news and resources.
            </p>
            <a className="primary-link" href="#subscribe">
              Subscribe for updates
              <i className="ri-mail-line" aria-hidden="true" />
            </a>
          </div>
        ) : (
          <>
            {showAll && (
              <div
                className="mb-6 grid grid-cols-3 gap-4 rounded-2xl bg-[#f1f6ed] p-4 max-[600px]:grid-cols-1 max-[600px]:gap-3"
                aria-label="Filter stories"
              >
                {(
                  [
                    [
                      "Category",
                      "All categories",
                      category,
                      setCategory,
                      categories,
                    ],
                    ["Author", "All authors", author, setAuthor, authors],
                    ["Year", "All years", year, setYear, years.map(String)],
                  ] as const
                ).map(([label, placeholder, value, setter, options]) => (
                  <label
                    className="grid gap-[7px] text-xs font-semibold text-[#626c65]"
                    key={label}
                  >
                    <span>{label}</span>
                    <select
                      className="min-h-12 w-full appearance-none rounded-[2px] border border-[#cfd8d1] bg-white bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2214%22 height=%2214%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%23202923%22 stroke-width=%222%22%3E%3Cpath d=%22m6 9 6 6 6-6%22/%3E%3C/svg%3E')] bg-[position:right_14px_center] bg-no-repeat px-[14px] pr-[42px] text-sm text-[#202923]"
                      value={value}
                      onChange={(event) => setter(event.target.value)}
                    >
                      <option value="">{placeholder}</option>
                      {options.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </label>
                ))}
              </div>
            )}
            {filtered.length === 0 ? (
              <div className="grid min-h-[250px] justify-items-center px-5 py-[60px] text-center text-[#748078]">
                <i className="ri-filter-3-line mb-[14px] text-[30px] text-[#386347]" />
                <h3 className="text-[21px] text-[#202923]">
                  No stories match your filters
                </h3>
                <p className="mt-1 text-[13px]">
                  Choose different filters to see more stories.
                </p>
                <button
                  className="mt-4 text-xs font-bold text-[#386347] underline underline-offset-4"
                  onClick={() => {
                    setCategory("");
                    setAuthor("");
                    setYear("");
                    setPage(1);
                  }}
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <>
                <div className="relative">
                  <div
                    className={`grid gap-5 sm:grid-cols-2 lg:grid-cols-3 ${!showAll && pageCount > 1 ? "lg:px-12" : ""}`}
                  >
                    {visible.map((article) => (
                      <ArticleCard
                        key={article.id}
                        article={article}
                        showSummary={showAll}
                      />
                    ))}
                  </div>
                  {!showAll && pageCount > 1 && (
                    <nav
                      className="mt-5 flex items-center justify-center gap-3"
                      aria-label="News pages"
                    >
                      <button
                        type="button"
                        className="grid size-10 place-items-center rounded-full border border-[#c9d6c8] bg-white text-xl text-[#173f23] hover:bg-[#edf5e9] disabled:cursor-default lg:absolute lg:top-1/2 lg:left-0 lg:-translate-y-1/2"
                        aria-label="Previous news page"
                        disabled={page === 1}
                        onClick={() => setPage((value) => value - 1)}
                      >
                        <i
                          className="ri-arrow-left-s-line"
                          aria-hidden="true"
                        />
                      </button>
                      {pageCount <= 7 ? (
                        <div className="flex" aria-label="Choose a news page">
                          {Array.from(
                            { length: pageCount },
                            (_, index) => index + 1,
                          ).map((number) => (
                            <button
                              key={number}
                              type="button"
                              className="grid size-8 place-items-center rounded-full"
                              aria-label={`News page ${number}`}
                              aria-current={
                                page === number ? "page" : undefined
                              }
                              onClick={() => setPage(number)}
                            >
                              <span
                                aria-hidden="true"
                                className={`size-3 rounded-full ${page === number ? "bg-[#155421]" : "bg-[#dce5da] hover:bg-[#96af99]"}`}
                              />
                            </button>
                          ))}
                        </div>
                      ) : (
                        <span className="text-sm">
                          Page {page} of {pageCount}
                        </span>
                      )}
                      <button
                        type="button"
                        className="grid size-10 place-items-center rounded-full border border-[#c9d6c8] bg-white text-xl text-[#173f23] hover:bg-[#edf5e9] disabled:cursor-default lg:absolute lg:top-1/2 lg:right-0 lg:-translate-y-1/2"
                        aria-label="Next news page"
                        disabled={page === pageCount}
                        onClick={() => setPage((value) => value + 1)}
                      >
                        <i
                          className="ri-arrow-right-s-line"
                          aria-hidden="true"
                        />
                      </button>
                    </nav>
                  )}
                </div>
              </>
            )}
          </>
        )}
      </section>
      <section
        className="editorial-width pb-10 md:pb-12"
        id="events"
        aria-labelledby="events-heading"
      >
        <div className="mb-[22px] flex items-end justify-between">
          <div>
            <p className="eyebrow mb-2">LEARN WITH EPI</p>
            <h2
              className="!text-[clamp(1.75rem,3vw,2.5rem)]"
              id="events-heading"
            >
              Upcoming events
            </h2>
          </div>
        </div>
        {eventsStatus === "loading" ? (
          <div
            className="min-h-28 rounded-lg bg-[linear-gradient(100deg,#eef2ee_25%,#f8faf8_40%,#eef2ee_65%)] bg-[length:200%_100%] animate-[news-shimmer_1.2s_ease-in-out_infinite]"
            aria-label="Loading upcoming events"
          />
        ) : eventsStatus === "error" ? (
          <div className="flex items-center justify-between gap-6 overflow-hidden rounded-xl border border-[#dce5de] bg-[#f7faf7] px-[30px] py-[26px] max-[767px]:items-start max-[767px]:flex-col max-[767px]:p-[22px]">
            <div>
              <h3 className="text-[22px]">
                Events are temporarily unavailable
              </h3>
              <p className="mt-[5px] text-sm">
                You can still contact EPI to request training for your group.
              </p>
            </div>
            <a
              className="primary-link shrink-0 gap-[10px] max-[767px]:w-full"
              href={trainingRequestUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Request training for your group{" "}
              <i className="ri-whatsapp-line" aria-hidden="true" />
            </a>
          </div>
        ) : upcomingEvents.length ? (
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-3">
            {upcomingEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-between gap-6 overflow-hidden rounded-xl border border-[#dce5de] bg-[#f7faf7] px-[30px] py-[26px] max-[767px]:items-start max-[767px]:flex-col max-[767px]:p-[22px]">
            <div>
              <h3 className="text-[22px]">No open sessions right now</h3>
              <p className="mt-[5px] text-sm">
                Training can be arranged for your group. Message us to discuss
                what you need.
              </p>
            </div>
            <a
              className="primary-link shrink-0 gap-[10px] max-[767px]:w-full"
              href={trainingRequestUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Request training for your group{" "}
              <i className="ri-whatsapp-line" aria-hidden="true" />
            </a>
          </div>
        )}
      </section>
      {announcements.length > 0 ? (
        <section
          id="announcements"
          aria-labelledby="announcements-heading"
          className="editorial-width pb-10 md:pb-12"
        >
          <div className="rounded-2xl border border-[#e4ebe0] bg-[#f6f8f4] p-5 md:p-6">
            <h2
              id="announcements-heading"
              className="flex items-center gap-3 !text-2xl"
            >
              <i
                className="ri-megaphone-line text-[#226732]"
                aria-hidden="true"
              />
              Announcements
            </h2>
            <ul className="mt-3 divide-y divide-[#dce5de]">
              {announcements.map((article) => (
                <li key={article.id}>
                  <Link
                    href={`/news/${article.slug}`}
                    className="inline-flex min-h-11 items-center gap-2 py-2 font-bold text-[#155421] hover:underline"
                  >
                    {article.title}
                    <i className="ri-arrow-right-line" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : (
        <div id="announcements" />
      )}
      <NewsConnections />
    </div>
  );
}
