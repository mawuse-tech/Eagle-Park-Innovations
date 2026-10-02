import Image, { type StaticImageData } from 'next/image';
import Link from 'next/link';
import type { CSSProperties, ReactNode } from 'react';

type Props = { title: ReactNode; description: ReactNode; image: StaticImageData; imageAlt: string; action: string; href: string; eyebrow?: string; actionPlacement?: 'hero' | 'copy'; tallImage?: boolean; };

export default function PageIntro({ title, description, image, imageAlt, action, href, eyebrow, actionPlacement = 'hero', tallImage = false }: Props) {
  return <header className={`photo-hero page-hero ${tallImage ? 'tall-photo-hero' : ''}`} style={tallImage ? { '--hero-photo-height': `${(image.height / image.width) * 92}vw` } as CSSProperties : undefined}>
    {tallImage ? <div className="tall-hero-image"><Image src={image} alt={imageAlt} fill preload sizes="100vw" className="hero-background is-visible" /></div> : <Image src={image} alt={imageAlt} fill preload sizes="100vw" className="hero-background is-visible" />}
    <div className="hero-shade" />
    <div className="hero-copy">{eyebrow && <p className="eyebrow">{eyebrow}</p>}<h1>{title}</h1><div className="hero-description">{description}</div>{actionPlacement === 'copy' && <Link href={href} className="outline-link mt-7">{action}<i className="ri-arrow-right-line" aria-hidden="true" /></Link>}</div>
    {actionPlacement === 'hero' && <div className="hero-controls single-action"><Link href={href} className="outline-link">{action}<i className="ri-arrow-right-line" aria-hidden="true" /></Link></div>}
  </header>;
}

export function PageCallout({ title, action, href = '/contact', secondary }: { title: ReactNode; action: string; href?: string; secondary?: ReactNode }) {
  return <section className="page-callout editorial-width"><div><p className="eyebrow">Let’s grow together</p><h2>{title}</h2></div><div className="hero-actions"><Link href={href} className="primary-link">{action}<i className="ri-arrow-right-line" aria-hidden="true" /></Link>{secondary}</div></section>;
}
