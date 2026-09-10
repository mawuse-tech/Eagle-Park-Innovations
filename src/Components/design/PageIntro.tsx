import Image, { type StaticImageData } from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';

type Props = { title: ReactNode; description: ReactNode; image: StaticImageData; imageAlt: string; action: string; href: string; variant?: 'standard' | 'split'; eyebrow?: string; };

export default function PageIntro({ title, description, image, imageAlt, action, href, variant = 'standard', eyebrow }: Props) {
  if (variant === 'split') {
    return <header className="service-hero">
      <div className="about-hero editorial-width">
        <div className="about-hero-copy">
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h1>{title}</h1>
          <div className="about-hero-description">{description}</div>
          <div className="about-hero-actions"><Link href={href} className="primary-link">{action}<i className="ri-arrow-right-line" aria-hidden="true" /></Link></div>
        </div>
        <figure className="about-hero-visual">
          <div className="about-hero-photo" style={{ aspectRatio: '3 / 2' }}>
            <Image src={image} alt={imageAlt} fill priority sizes="(max-width: 767px) 100vw, 55vw" className="object-cover" style={{ objectPosition: 'center 25%' }} />
          </div>
        </figure>
      </div>
    </header>;
  }
  return <header className="page-intro editorial-width">
    <div className="page-intro-heading"><h1>{title}</h1><div>{description}<Link href={href} className="text-link">{action}<i className="ri-arrow-right-up-line" aria-hidden="true" /></Link></div></div>
    <figure className="page-intro-photo"><Image src={image} alt={imageAlt} fill priority sizes="(max-width: 1280px) 100vw, 1280px" className="object-cover" /></figure>
  </header>;
}

export function PageCallout({ title, action, href = '/contact', secondary }: { title: ReactNode; action: string; href?: string; secondary?: ReactNode }) {
  return <section className="page-callout editorial-width"><div><h2>{title}</h2></div><div className="hero-actions"><Link href={href} className="primary-link">{action}<i className="ri-arrow-right-up-line" aria-hidden="true" /></Link>{secondary}</div></section>;
}
