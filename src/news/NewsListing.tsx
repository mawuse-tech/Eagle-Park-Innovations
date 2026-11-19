"use client";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";

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
type Event = {
  id: string;
  date: string;
  time: string;
  title: string;
  place: string;
  cost: string;
  audience: string;
  image: string;
  description: string;
  organizer: string;
  capacity: number | null;
};

const trainingRequestUrl =
  "https://wa.me/233243919417?text=Hi%20EPI%2C%20I%E2%80%99d%20like%20to%20request%20training%20for%20my%20group.%20Please%20share%20the%20details.";

function EventCard({ event, index }: { event: Event; index: number }) {
  return (
    <article
      className={`relative flex-[0_0_min(400px,calc((min(100vw_-_64px,_1280px)_-_36px)/3))] overflow-hidden rounded-xl border bg-[#f7faf7] max-[1023px]:basis-[calc((100vw-50px)/2)] max-[767px]:basis-[85vw] max-[767px]:max-w-[calc(100vw-32px)] ${index === 0 ? "border-[#93b49a] shadow-[inset_0_3px_#386347]" : "border-[#dce5de]"}`}
    >
      <Link
        className="group flex h-full flex-col text-inherit"
        href={`/events/${event.id}`}
      >
        {event.image ? (
          <img
            className="block aspect-video w-full bg-[#e8eee8] object-cover"
            src={event.image}
            alt=""
            loading="lazy"
          />
        ) : (
          <div className="grid aspect-video w-full place-items-center bg-[#e8eee8] text-[#709078]">
            <i
              className="ri-calendar-event-line text-[42px]"
              aria-hidden="true"
            />
          </div>
        )}
        <div className="flex flex-1 flex-col items-start px-[22px] pt-5 pb-[22px]">
          <p className="mb-[10px] flex w-full flex-wrap items-center gap-2 text-xs font-bold text-[#31543a]">
            <i className="ri-calendar-line" aria-hidden="true" />
            {new Date(`${event.date}T12:00:00`).toLocaleDateString(undefined, {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
            {index === 0 && (
              <span className="ml-auto rounded-[30px] bg-[#e4efe5] px-[9px] py-[5px]">
                Next event
              </span>
            )}
          </p>
          <h3 className="mb-5 text-xl leading-[1.25]">{event.title}</h3>
          <span className="mt-auto inline-flex items-center gap-[9px] text-xs font-bold uppercase tracking-[.04em] text-[#386347] group-hover:underline group-hover:underline-offset-4">
            Read more <i className="ri-arrow-right-line" aria-hidden="true" />
          </span>
        </div>
      </Link>
    </article>
  );
}

export default function NewsListing() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [eventsStatus, setEventsStatus] = useState<
    "loading" | "ready" | "error"
  >("loading");
  const [category, setCategory] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState("");
  const [page, setPage] = useState(1);
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
  const visible = filtered.slice((page - 1) * pageSize, page * pageSize);
  function updateFilter(setter: (value: string) => void, value: string) {
    setter(value);
    setPage(1);
  }
  return (
    <div className="editorial-page">
      <section
        className="editorial-width scroll-mt-[150px] pt-3 pb-[54px] max-[767px]:pb-[38px]"
        id="events"
        aria-labelledby="events-heading"
      >
        <div className="mb-[22px] flex items-end justify-between">
          <div>
            <p className="eyebrow mb-2">LEARN WITH EPI</p>
            <h2 className="text-[clamp(28px,3.4vw,42px)]" id="events-heading">
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
          <div
            className="w-full overflow-hidden"
            aria-label="Upcoming events carousel"
          >
            <div
              className={`flex w-max ${upcomingEvents.length < 2 ? "animate-none" : "animate-[events-marquee-scroll_40s_linear_infinite] hover:[animation-play-state:paused] focus-within:[animation-play-state:paused] motion-reduce:animate-none"}`}
            >
              <div className="flex flex-none items-stretch gap-[18px] pr-[18px]">
                {upcomingEvents.map((event, index) => (
                  <EventCard key={event.id} event={event} index={index} />
                ))}
              </div>
              {upcomingEvents.length > 1 && (
                <div
                  className="flex flex-none items-stretch gap-[18px] pr-[18px]"
                  aria-hidden="true"
                >
                  {upcomingEvents.map((event, index) => (
                    <EventCard key={event.id} event={event} index={index} />
                  ))}
                </div>
              )}
            </div>
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
      <section
        className="mx-auto w-[min(1280px,calc(100%-64px))] pb-[92px] max-[767px]:w-[calc(100%-32px)] max-[600px]:pb-[60px]"
        aria-label="News and resources"
      >
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
              Get in touch to hear about EPI news and resources.
            </p>
            <a
              className="primary-link"
              href="https://wa.me/233243919417?text=Hi%20EPI%2C%20please%20keep%20me%20updated%20on%20new%20stories%20and%20resources."
              target="_blank"
              rel="noopener noreferrer"
            >
              Get updates on WhatsApp{" "}
              <i className="ri-whatsapp-line" aria-hidden="true" />
            </a>
          </div>
        ) : (
          <>
            <header className="flex flex-col items-center border-0 px-0 pb-8 text-center max-[600px]:pb-6">
              <p className="eyebrow mb-[5px]">EXPLORE EPI</p>
              <h2 className="relative pb-[18px] !text-[clamp(30px,3.4vw,42px)] after:absolute after:bottom-0 after:left-1/2 after:h-1 after:w-[50px] after:-translate-x-1/2 after:rounded-[3px] after:bg-[#C99724]">
                All stories
              </h2>
            </header>
            <div
              className="grid grid-cols-3 gap-4 pb-[34px] max-[600px]:grid-cols-1 max-[600px]:gap-3 max-[600px]:pb-[26px]"
              aria-label="Filter stories"
            >
              {[
                ["Category", category, setCategory, categories],
                ["Author", author, setAuthor, authors],
                ["Year", year, setYear, years.map(String)],
              ].map(([label, value, setter, options]) => (
                <label
                  className="grid gap-[7px] text-xs font-semibold text-[#626c65]"
                  key={label as string}
                >
                  <span>{label as string}</span>
                  <select
                    className="min-h-12 w-full appearance-none rounded-[2px] border border-[#cfd8d1] bg-white bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2214%22 height=%2214%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%23202923%22 stroke-width=%222%22%3E%3Cpath d=%22m6 9 6 6 6-6%22/%3E%3C/svg%3E')] bg-[position:right_14px_center] bg-no-repeat px-[14px] pr-[42px] text-sm text-[#202923]"
                    value={value as string}
                    onChange={(e) =>
                      updateFilter(
                        setter as (value: string) => void,
                        e.target.value,
                      )
                    }
                  >
                    <option value="">All {String(label).toLowerCase()}s</option>
                    {(options as string[]).map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </label>
              ))}
            </div>
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
                <p className="-mt-[10px] mb-[18px] text-xs text-[#747f77]">
                  {filtered.length}{" "}
                  {filtered.length === 1 ? "story" : "stories"}
                </p>
                <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] gap-x-[26px] gap-y-[34px] max-[900px]:gap-x-5 max-[900px]:gap-y-7 max-[600px]:grid-cols-1">
                  {visible.map((a) => (
                    <article className="min-w-0" key={a.id}>
                      <Link
                        href={`/news/${a.slug}`}
                        className="group block h-full text-inherit"
                      >
                        <figure className="flex h-full flex-col gap-[15px] max-[600px]:gap-[13px]">
                          <div className="relative aspect-video max-h-[440px] w-full overflow-hidden bg-[#eef2ee]">
                            <span className="absolute bottom-[18px] left-[18px] z-10 max-w-[calc(100%-36px)] overflow-hidden bg-[#202923] px-[10px] py-[7px] text-ellipsis whitespace-nowrap text-[11px] font-semibold text-white max-[600px]:bottom-3 max-[600px]:left-3">
                              {new Date(a.publishedAt).toLocaleDateString(
                                undefined,
                                {
                                  day: "numeric",
                                  month: "short",
                                  year: "numeric",
                                },
                              )}
                            </span>
                            {a.coverImage ? (
                              <img
                                className="h-full w-full object-cover transition-transform duration-[250ms] ease-out group-hover:scale-[1.045]"
                                src={a.coverImage}
                                alt=""
                                loading="lazy"
                              />
                            ) : (
                              <div className="grid h-full w-full place-items-center bg-[linear-gradient(135deg,#dce9d9,#eef3ea)] text-[#386347]">
                                <i className="ri-leaf-line text-[44px]" />
                              </div>
                            )}
                          </div>
                          <figcaption className="flex flex-1 flex-col items-start gap-[7px]">
                            <span className="text-[10px] font-bold uppercase tracking-[.09em] text-[#386347]">
                              {a.category}
                            </span>
                            <h3 className="text-[22px] leading-[1.25] tracking-[-.02em] group-hover:underline group-hover:decoration-[#C99724] group-hover:underline-offset-4 max-[600px]:text-xl">
                              {a.title}
                            </h3>
                            <p className="text-[13px] leading-[1.6] text-[#626c65]">
                              {a.summary}
                            </p>
                            <span className="mt-auto block border-l-2 border-[#C99724] pl-2 text-[11px] text-[#626c65]">
                              {a.author}
                            </span>
                          </figcaption>
                        </figure>
                      </Link>
                    </article>
                  ))}
                </div>
                <nav
                  className="mt-[42px] flex items-center justify-center gap-[22px] max-[600px]:mt-8"
                  aria-label="Story pages"
                >
                  <button
                    className="grid size-[42px] place-items-center rounded-full bg-[#202923] text-[17px] text-white hover:bg-[#386347] disabled:cursor-default disabled:opacity-[.32]"
                    aria-label="Previous page"
                    disabled={page === 1}
                    onClick={() => setPage((p) => p - 1)}
                  >
                    <i className="ri-arrow-left-line" />
                  </button>
                  <span className="min-w-[74px] text-center text-[13px] text-[#525e55]">
                    Page: {page}/{pageCount}
                  </span>
                  <button
                    className="grid size-[42px] place-items-center rounded-full bg-[#202923] text-[17px] text-white hover:bg-[#386347] disabled:cursor-default disabled:opacity-[.32]"
                    aria-label="Next page"
                    disabled={page === pageCount}
                    onClick={() => setPage((p) => p + 1)}
                  >
                    <i className="ri-arrow-right-line" />
                  </button>
                </nav>
              </>
            )}
          </>
        )}
      </section>
    </div>
  );
}
