import Image, { type StaticImageData } from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';

type Props = { title: ReactNode; description: ReactNode; image: StaticImageData; imageAlt: string; action: string; href: string; eyebrow?: string; };

export default function PageIntro({ title, description, image, imageAlt, action, href, eyebrow }: Props) {
  return <header className="photo-hero page-hero">
    <Image src={image} alt={imageAlt} fill preload sizes="100vw" className="hero-background is-visible" />
    <div className="hero-shade" />
    <div className="hero-copy">{eyebrow && <p className="eyebrow">{eyebrow}</p>}<h1>{title}</h1><div className="hero-description">{description}</div></div>
    <div className="hero-controls single-action"><Link href={href} className="outline-link">{action}<i className="ri-arrow-right-line" aria-hidden="true" /></Link></div>
  </header>;
}

export function PageCallout({ title, action, href = '/contact', secondary }: { title: ReactNode; action: string; href?: string; secondary?: ReactNode }) {
  return <section className="page-callout editorial-width"><div><p className="eyebrow">Let’s grow together</p><h2>{title}</h2></div><div className="hero-actions"><Link href={href} className="primary-link">{action}<i className="ri-arrow-right-line" aria-hidden="true" /></Link>{secondary}</div></section>;
}
