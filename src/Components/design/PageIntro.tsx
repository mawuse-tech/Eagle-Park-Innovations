import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

type Props = {
  title: ReactNode;
  description: ReactNode;
  image: StaticImageData;
  imageAlt: string;
  action: string;
  href: string;
  eyebrow?: string;
  actionPlacement?: "hero" | "copy";
  tallImage?: boolean;
};

export default function PageIntro({
  title,
  description,
  image,
  imageAlt,
  action,
  href,
  eyebrow,
  actionPlacement = "hero",
  tallImage = false,
}: Props) {
  return (
    <header
      className={`relative isolate flex min-h-[760px] flex-col justify-center bg-[#163e2a] px-[max(8vw,calc((100vw-1200px)/2))] pt-[195px] pb-[154px] text-white [&_p]:!text-white max-[1199px]:px-[7%] max-[767px]:min-h-[730px] max-[767px]:justify-center max-[767px]:px-6 max-[767px]:pt-[142px] max-[767px]:pb-40 ${tallImage ? "min-h-[760px] pt-[145px] pb-[100px] max-[767px]:min-h-[730px] max-[767px]:px-6 max-[767px]:pt-[110px] max-[767px]:pb-[90px]" : ""}`}
    >
      {tallImage ? (
        <div className="absolute inset-0 z-[-2]">
          <Image
            src={image}
            alt={imageAlt}
            fill
            preload
            sizes="100vw"
            className="absolute inset-0 h-full w-full object-cover object-top opacity-100 transition-opacity duration-1000 max-[767px]:object-[60%_center]"
          />
        </div>
      ) : (
        <Image
          src={image}
          alt={imageAlt}
          fill
          preload
          sizes="100vw"
          className="absolute inset-0 z-[-2] h-full w-full object-cover object-top opacity-100 transition-opacity duration-1000 max-[767px]:object-[50%_top]"
        />
      )}
      <div className="absolute inset-0 z-[-1] bg-[linear-gradient(90deg,#071c16c9,#071c1647_75%),linear-gradient(0deg,#071c1699,transparent_60%)] max-[767px]:bg-[linear-gradient(90deg,#071c16c9,#071c1660),linear-gradient(0deg,#071c16a6,transparent)]" />
      <div
        className={`max-w-[750px] ${tallImage ? "translate-y-8 max-[767px]:translate-y-[18px]" : ""}`}
      >
        {eyebrow && (
          <p className={`eyebrow !text-white ${tallImage ? "text-xs" : ""}`}>
            {eyebrow}
          </p>
        )}
        <h1
          className={`text-[clamp(42px,4.6vw,66px)] leading-[1.04] tracking-[-.035em] max-[767px]:text-[clamp(36px,9.5vw,48px)] max-[767px]:leading-[1.06] ${tallImage ? "text-[clamp(44px,6vw,76px)] max-[767px]:text-[clamp(44px,9.5vw,76px)] max-[767px]:leading-[1.06]" : ""}`}
        >
          {title}
        </h1>
        <div
          className={`mt-6 max-w-[620px] text-[17px] [&_p]:!text-white [&_p+p]:mt-[14px] max-[767px]:mt-[22px] max-[767px]:text-[15px] ${tallImage ? "text-lg max-[767px]:text-lg" : ""}`}
        >
          {description}
        </div>
        {actionPlacement === "copy" && (
          <Link href={href} className="outline-link mt-7">
            {action}
            <i className="ri-arrow-right-line" aria-hidden="true" />
          </Link>
        )}
      </div>
      {actionPlacement === "hero" && (
        <div className="absolute right-8 bottom-[38px] flex min-h-[68px] max-w-[calc(100%-64px)] items-center justify-center rounded-[10px] border border-white/15 bg-white/15 px-[18px] py-[10px] backdrop-blur-2xl max-[767px]:right-4 max-[767px]:bottom-[34px] max-[767px]:min-h-[76px] max-[767px]:max-w-[calc(100%-32px)] max-[767px]:px-4 max-[767px]:py-3">
          <Link href={href} className="outline-link max-w-full">
            {action}
            <i className="ri-arrow-right-line" aria-hidden="true" />
          </Link>
        </div>
      )}
    </header>
  );
}

export function PageCallout({
  title,
  action,
  href = "/contact",
  secondary,
}: {
  title: ReactNode;
  action: string;
  href?: string;
  secondary?: ReactNode;
}) {
  return (
    <section className="editorial-width mb-[88px] flex items-center justify-between gap-12 rounded-[22px] bg-[#183b29] p-14 text-white max-[1199px]:flex-col max-[1199px]:items-start max-[767px]:mb-14 max-[767px]:gap-7 max-[767px]:px-[26px] max-[767px]:py-9">
      <div className="max-w-[740px]">
        <p className="eyebrow !text-[#e0eee4]">Let’s grow together</p>
        <h2 className="!text-[clamp(28px,2.8vw,38px)]">{title}</h2>
      </div>
      <div className="hero-actions shrink-0 flex-col [&_.text-link]:!text-white max-[1199px]:flex-row max-[767px]:shrink">
        <Link
          href={href}
          className="primary-link !border-[#C99724] !bg-[#C99724] !text-center !text-white hover:!border-[#ddb04c] hover:!bg-[#ddb04c] hover:!text-[#163e2a]"
        >
          {action}
          <i className="ri-arrow-right-line" aria-hidden="true" />
        </Link>
        {secondary}
      </div>
    </section>
  );
}
