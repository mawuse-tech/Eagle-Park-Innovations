import Image from "next/image";
import Link from "next/link";
import corn from "@/src/assets/corn.webp";
import field from "@/src/assets/grain/grainf.jpg";
import NewsletterSignup from "./NewsletterSignup";

export type FeaturedEvent = {
  id: string;
  title: string;
  date: string;
  place: string;
  audience: string;
  image: string;
};

const sections = [
  ["#latest-news", "Latest News", "ri-newspaper-line"],
  ["#events", "Upcoming Events", "ri-calendar-event-line"],
  ["#announcements", "Announcements", "ri-megaphone-line"],
  ["#connect", "Connect With Us", "ri-team-line"],
];

const socialLinks = [
  {
    name: "Facebook",
    icon: "ri-facebook-circle-fill",
    color: "text-[#0866ff]",
    href: "https://www.facebook.com/share/1Ahtriscx4/?mibextid=WC7FNe",
  },
  {
    name: "Instagram",
    icon: "ri-instagram-line",
    color: "text-[#c02684]",
    href: "https://www.instagram.com/p/DLncarnsdyb/?igsh=MW1nZW92YTR0aHB0bA==",
  },
  {
    name: "LinkedIn",
    icon: "ri-linkedin-box-fill",
    color: "text-[#0a66c2]",
    href: "https://www.linkedin.com/company/eagle-park-innovations-limited/?viewAsMember=true",
  },
];

export function NewsHero({ event }: { event?: FeaturedEvent }) {
  return (
    <header className="relative isolate overflow-hidden bg-[#dceecb]">
      <Image
        src={field}
        alt=""
        fill
        preload
        sizes="100vw"
        className="-z-20 object-cover object-[50%_48%]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,#bde8f4f2,#e8f4d538_70%,#447a1770)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-y-0 left-0 -z-10 w-[44%] bg-[linear-gradient(140deg,white_24%,#f6f9eddf_70%,#f6f9ed00)] [clip-path:polygon(0_0,100%_0,72%_100%,0_100%)] max-[767px]:w-full max-[767px]:[clip-path:none]"
      />
      <div className="editorial-width py-6 md:py-8">
        <div className="grid items-center gap-7 md:grid-cols-[.9fr_1.1fr] md:gap-8">
          <div className="py-3 md:py-8 md:pl-6">
            <p className="mb-3 text-sm font-bold uppercase tracking-wide !text-[#174327]">
              News &amp; Events
            </p>
            <h1 className="max-w-[15ch] text-[clamp(2.45rem,4.75vw,4rem)] leading-[1.02] text-[#112e1a]">
              Stay Informed and Engaged
            </h1>
            <p className="mt-4 max-w-[31ch] !text-[#192d21]">
              Get updates on EPI’s training, field activities, projects, and
              partnerships.
            </p>
          </div>
          <article className="grid min-h-[245px] overflow-hidden rounded-3xl border-4 border-white bg-[#fbfcfa] shadow-[0_8px_28px_#172b2526] sm:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
            <div className="self-center p-5 md:p-6">
              <span className="inline-flex rounded-full bg-[#155421] px-3 py-1 text-xs font-bold uppercase text-white">
                {event ? "Upcoming event" : "Events & training"}
              </span>
              <h2 className="mt-3 !text-[clamp(1.35rem,2.05vw,1.8rem)]">
                {event?.title ?? "Learn with EPI"}
              </h2>
              {event ? (
                <ul className="mt-3 space-y-1.5 text-sm">
                  <li className="flex gap-2">
                    <i
                      className="ri-calendar-line text-[#155421]"
                      aria-hidden="true"
                    />
                    <time dateTime={event.date}>
                      {new Date(`${event.date}T12:00:00`).toLocaleDateString(
                        "en-GB",
                        {
                          weekday: "short",
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        },
                      )}
                    </time>
                  </li>
                  {event.place && (
                    <li className="flex gap-2">
                      <i
                        className="ri-map-pin-line text-[#155421]"
                        aria-hidden="true"
                      />
                      <span>{event.place}</span>
                    </li>
                  )}
                  {event.audience && (
                    <li className="flex gap-2">
                      <i
                        className="ri-team-line text-[#155421]"
                        aria-hidden="true"
                      />
                      <span>{event.audience}</span>
                    </li>
                  )}
                </ul>
              ) : (
                <p className="mt-3 text-sm">
                  Find upcoming sessions and practical training for your group.
                </p>
              )}
              <Link
                href={event ? `/events/${event.id}` : "#events"}
                className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-full bg-[#155421] px-4 text-sm font-bold text-white hover:bg-[#0c3b16]"
              >
                {event ? "View details" : "Explore events"}
                <i className="ri-arrow-right-line" aria-hidden="true" />
              </Link>
            </div>
            <div className="relative min-h-32 bg-[#e4efda] sm:[clip-path:polygon(14%_0,100%_0,100%_100%,0_100%)]">
              {event?.image ? (
                <img
                  src={event.image}
                  alt=""
                  className="absolute inset-0 size-full object-cover"
                />
              ) : (
                <Image
                  src={corn}
                  alt=""
                  fill
                  sizes="(max-width: 639px) 100vw, 30vw"
                  className="object-cover"
                />
              )}
            </div>
          </article>
        </div>
        <nav
          aria-label="News and events sections"
          className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-[#c9e2a0] shadow-sm md:grid-cols-4"
        >
          {sections.map(([href, label, icon]) => (
            <a
              key={href}
              href={href}
              className="flex min-h-14 items-center justify-center gap-2 bg-[#eff9d3] px-2 py-3 text-center text-sm font-bold leading-tight text-[#13291a] hover:bg-[#e1f2ba] focus-visible:outline-offset-[-4px] md:gap-3 md:text-base"
            >
              <i
                className={`${icon} shrink-0 text-[1.5rem] text-[#226732] md:text-[1.75rem]`}
                aria-hidden="true"
              />
              {label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

const serviceLinks = [
  {
    title: "Request Training or Consultancy Services",
    description:
      "Get practical, tailored support in crop production, poultry, and agribusiness.",
    action: "Request now",
    href: "/train",
    icon: "ri-plant-line",
    panelColor: "bg-[#f0f6ec]",
    iconColor: "bg-[#dcf1c1] text-[#2c721e]",
    linkColor: "bg-[#155421] text-white hover:bg-[#0c3b16]",
  },
  {
    title: "Partner With Us",
    description:
      "Collaborate with EPI on agricultural innovation, training, and agribusiness development.",
    action: "Partner now",
    href: "/contact",
    icon: "ri-shake-hands-line",
    panelColor: "bg-[#fbf5e8]",
    iconColor: "bg-[#fae9c0] text-[#8a5000]",
    linkColor: "bg-[#ecad30] text-[#2c210a] hover:bg-[#fac355]",
  },
];

export function NewsConnections() {
  return (
    <div className="editorial-width space-y-6 pb-16">
      <div className="grid gap-4 md:grid-cols-2">
        {serviceLinks.map(
          ({
            title,
            description,
            action,
            href,
            icon,
            panelColor,
            iconColor,
            linkColor,
          }) => (
            <article
              key={title}
              className={`flex flex-wrap items-center gap-4 rounded-2xl p-5 xl:flex-nowrap ${panelColor}`}
            >
              <i
                className={`${icon} ${iconColor} grid size-14 shrink-0 place-items-center rounded-full text-3xl`}
                aria-hidden="true"
              />
              <div className="min-w-0 flex-1 basis-40">
                <h2 className="!text-xl">{title}</h2>
                <p className="mt-2 text-sm leading-normal">{description}</p>
              </div>
              <Link
                href={href}
                className={`inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full px-4 text-sm font-bold ${linkColor}`}
              >
                {action}
                <i className="ri-arrow-right-line" aria-hidden="true" />
              </Link>
            </article>
          ),
        )}
      </div>
      <section
        id="connect"
        aria-labelledby="connect-heading"
        className="grid gap-5 rounded-2xl bg-[#f1f6ed] p-5 lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:p-7"
      >
        <div className="flex items-center gap-4">
          <i
            className="ri-team-line grid size-14 shrink-0 place-items-center rounded-full bg-[#dcf1c1] text-3xl text-[#226732]"
            aria-hidden="true"
          />
          <div>
            <h2 id="connect-heading" className="!text-2xl">
              Connect With EPI
            </h2>
            <p className="mt-2 max-w-[44ch] text-sm leading-normal">
              Follow our field activities, agricultural insights, and training
              opportunities.
            </p>
          </div>
        </div>
        <ul className="flex flex-wrap gap-x-5 gap-y-1 lg:justify-around lg:border-l lg:border-[#d4e3d3] lg:pl-5">
          {socialLinks.map(({ name, icon, color, href }) => (
            <li key={name}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 text-sm font-bold hover:underline"
              >
                <i className={`${icon} ${color} text-2xl`} aria-hidden="true" />
                {name}
              </a>
            </li>
          ))}
        </ul>
      </section>
      <section
        id="subscribe"
        aria-labelledby="updates-heading"
        className="flex flex-wrap items-center gap-x-6 gap-y-4 rounded-2xl bg-[#12491e] px-5 py-4 text-white lg:px-7"
      >
        <div className="flex items-center gap-3">
          <i
            className="ri-mail-line text-3xl text-[#d7efa7]"
            aria-hidden="true"
          />
          <h2 id="updates-heading" className="!text-xl">
            Subscribe for Updates
          </h2>
        </div>
        <p className="max-w-[48ch] flex-1 basis-56 text-sm leading-normal !text-white">
          Get the latest news, events, and opportunities from EPI straight to
          your inbox.
        </p>
        <NewsletterSignup />
      </section>
    </div>
  );
}
