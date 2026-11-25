import Image from "next/image";
import Link from "next/link";
import training from "../assets/trainfarm.jpg";
import HeroCompo from "./HeroCompo";
import Example from "./Example";
import PartnersPage from "./PartnersPage";

const trainingLinks = [
  {
    title: "Practical training",
    subtitle: "Build your skills",
    action: "Explore programmes",
    href: "/train",
    icon: "ri-graduation-cap-line",
  },
  {
    title: "Expert consultancy",
    subtitle: "Grow with guidance",
    action: "Find out more",
    href: "/train#programmes",
    icon: "ri-team-line",
  },
  {
    title: "Partner with us",
    subtitle: "Take the next step",
    action: "Get in touch",
    href: "/contact",
    icon: "ri-shake-hands-line",
  },
];

export default function Fixed() {
  return (
    <div className="relative mt-[-16px] rounded-t-[18px] bg-white pt-px">
      <Example />
      <HeroCompo />
      <section
        aria-labelledby="training-promotion-title"
        className="editorial-width relative isolate mt-16 grid min-h-[clamp(500px,48vw,620px)] grid-rows-[1fr_auto] gap-10 overflow-hidden rounded-[22px] bg-[#163e2a] px-[clamp(24px,3.4vw,44px)] pt-[clamp(104px,13vw,166px)] pb-6 text-white max-[767px]:mt-10 max-[767px]:min-h-[580px] max-[767px]:rounded-2xl max-[767px]:px-4 max-[767px]:pt-16 max-[767px]:pb-4"
      >
        <Image
          src={training}
          alt="Farmers taking part in practical field training"
          fill
          sizes="(max-width: 767px) calc(100vw - 32px), (max-width: 1344px) calc(100vw - 64px), 1280px"
          className="z-[-2] object-cover object-top max-[767px]:object-[50%_36%]"
        />
        <div className="absolute inset-0 z-[-1] bg-[linear-gradient(180deg,#071c163d_0%,#071c1680_40%,#071c16b3_75%,#071c16e6_100%)]" />
        <div className="mx-auto max-w-[680px] text-center">
          <p className="eyebrow !text-[#d8eedc]">Learn today. Grow tomorrow.</p>
          <h2
            id="training-promotion-title"
            className="text-[clamp(32px,4.4vw,58px)] leading-[1.08]"
          >
            Expand your possibilities
          </h2>
          <p className="mt-4 text-base">
            Learn directly from experienced farmers and agricultural
            professionals.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-[clamp(12px,1.8vw,24px)] max-[767px]:grid-cols-1 max-[767px]:gap-2">
          {trainingLinks.map(({ title, subtitle, action, href, icon }) => (
            <Link
              key={title}
              href={href}
              className="grid min-h-[68px] grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-x-4 rounded-[18px] border border-white/25 bg-[#31463880] px-5 py-3 backdrop-blur-md transition-colors hover:bg-[#3d5948e6] focus-visible:outline-offset-2 max-[1079px]:grid-cols-[auto_minmax(0,1fr)] max-[1079px]:gap-x-3 max-[1079px]:gap-y-1 max-[1079px]:px-3 min-[430px]:max-[767px]:grid-cols-[auto_minmax(0,1fr)_auto]"
            >
              <i
                className={`${icon} row-span-2 self-center border-r border-white/20 pr-4 text-[28px] leading-none min-[1080px]:row-span-1 min-[430px]:max-[767px]:row-span-1 max-[1079px]:pr-3`}
                aria-hidden="true"
              />
              <span className="flex flex-col gap-0.5 leading-tight">
                <span className="text-xs text-[#e6eee8]">{subtitle}</span>
                <span className="text-base font-bold">{title}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 text-[13px] font-medium max-[1079px]:col-start-2 min-[430px]:max-[767px]:col-start-3">
                {action}
                <i className="ri-arrow-right-line" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </section>
      <PartnersPage />
    </div>
  );
}
