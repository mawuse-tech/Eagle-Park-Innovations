'use client';

import { useRef, useState } from 'react';
import logo from '../assets/loggo.png';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/src/auth/AuthProvider';
import { showToast } from '@/src/lib/alerts';

const products = [
  ['/seed', 'Bundled Services', 'ri-seedling-line'],
  ['/grain', 'Premium Grains', 'ri-plant-line'],
  ['/poultry', 'Poultry Products', 'ri-sun-line'],
];

export default function Navbar() {
  const pathname = usePathname();
  const { user, isLoading, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const productButton = useRef<HTMLButtonElement>(null);
  const hasHero = ['/', '/ourstory', '/seed', '/grain', '/poultry', '/train'].includes(pathname);
  const close = () => { setMenuOpen(false); setProductsOpen(false); };
  const current = (href: string) => pathname === href ? 'page' as const : undefined;
  const handleLogout = async () => {
    close();
    try { await logout(); void showToast('success', 'Successfully signed out'); }
    catch { void showToast('error', 'Sign out failed', 'Please try again.'); }
  };

  return <header className={`sticky top-0 z-50 px-8 py-[18px] max-[767px]:px-3 max-[767px]:pt-3 max-[767px]:pb-0 ${hasHero ? 'mb-[-120px] bg-transparent bg-[linear-gradient(#071c16a6,transparent)] max-[767px]:mb-[-76px]' : 'bg-white'}`} onKeyDown={(event) => {
    if (event.key === 'Escape') {
      if (productsOpen) { setProductsOpen(false); productButton.current?.focus(); }
      else { close(); menuButton.current?.focus(); }
    }
  }}>
    <a href="#main-content" className="fixed -top-[100px] left-5 z-[100] bg-white px-5 py-3 text-[#163e2a] focus:top-3">Skip to content</a>
    <nav className="relative mx-auto flex min-h-[84px] max-w-[1440px] items-center rounded-[5px] bg-[#386347] px-8 py-3 text-white shadow-[0_6px_24px_#10261915] max-[1199px]:px-5 max-[767px]:min-h-16 max-[767px]:px-4 max-[767px]:py-2" aria-label="Main navigation">
      <Link className="flex h-[58px] w-[108px] shrink-0 items-center justify-center rounded bg-white px-[10px] py-1 max-[1199px]:w-[90px] max-[767px]:h-11 max-[767px]:w-[86px]" href="/" onClick={close}><Image className="h-full w-full object-contain" src={logo} alt="Eagle Park Innovations home" sizes="110px" /></Link>
      <button ref={menuButton} className="ml-auto hidden h-11 w-11 place-items-center text-[26px] max-[1199px]:grid" type="button" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} aria-controls="main-navigation" onClick={() => { setMenuOpen(!menuOpen); setProductsOpen(false); }}><i className={menuOpen ? 'ri-close-line' : 'ri-menu-line'} aria-hidden="true" /></button>
      <div id="main-navigation" className={`flex flex-1 items-center justify-center gap-[clamp(14px,1.5vw,24px)] pl-6 text-[13px] max-[1199px]:gap-5 max-[1199px]:pl-6 max-[1199px]:text-[13px] max-[1199px]:absolute max-[1199px]:top-[calc(100%+8px)] max-[1199px]:left-0 max-[1199px]:right-0 max-[1199px]:max-h-[calc(100dvh-150px)] max-[1199px]:flex-col max-[1199px]:items-stretch max-[1199px]:gap-0 max-[1199px]:overflow-y-auto max-[1199px]:rounded-xl max-[1199px]:bg-white max-[1199px]:p-[18px] max-[1199px]:text-[#163e2a] max-[1199px]:shadow-[0_16px_40px_#071c1640] max-[767px]:max-h-[calc(100dvh-100px)] ${menuOpen ? 'max-[1199px]:flex' : 'max-[1199px]:hidden'} `}>
        <Link className="relative whitespace-nowrap py-[18px] after:absolute after:inset-x-0 after:bottom-[7px] after:h-0.5 after:scale-x-0 after:bg-white after:transition-transform hover:after:scale-x-100 aria-[current=page]:after:scale-x-100 max-[1199px]:flex max-[1199px]:w-full max-[1199px]:justify-between max-[1199px]:border-b max-[1199px]:border-[#dce5de] max-[1199px]:px-3 max-[1199px]:py-[15px] max-[1199px]:aria-[current=page]:bg-[#edf5ee]" href="/" aria-current={current('/')} onClick={close}>Home</Link>
        <Link className="relative whitespace-nowrap py-[18px] after:absolute after:inset-x-0 after:bottom-[7px] after:h-0.5 after:scale-x-0 after:bg-white after:transition-transform hover:after:scale-x-100 aria-[current=page]:after:scale-x-100 max-[1199px]:flex max-[1199px]:w-full max-[1199px]:justify-between max-[1199px]:border-b max-[1199px]:border-[#dce5de] max-[1199px]:px-3 max-[1199px]:py-[15px] max-[1199px]:aria-[current=page]:bg-[#edf5ee]" href="/ourstory" aria-current={current('/ourstory')} onClick={close}>About Us</Link>
        <div className="relative" onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setProductsOpen(false); }}>
          <button ref={productButton} type="button" aria-expanded={productsOpen} aria-controls="product-navigation" className={`relative whitespace-nowrap py-[18px] after:absolute after:inset-x-0 after:bottom-[7px] after:h-0.5 after:scale-x-0 after:bg-white after:transition-transform hover:after:scale-x-100 max-[1199px]:flex max-[1199px]:w-full max-[1199px]:justify-between max-[1199px]:border-b max-[1199px]:border-[#dce5de] max-[1199px]:px-3 max-[1199px]:py-[15px] ${products.some(([href]) => href === pathname) ? 'after:scale-x-100' : ''}`} onClick={() => setProductsOpen(!productsOpen)}>Products & Services <i className="ri-arrow-down-s-line" aria-hidden="true" /></button>
          {productsOpen && <div id="product-navigation" className="absolute left-[-20px] top-full min-w-60 rounded-xl bg-white p-[10px] text-[#163e2a] shadow-[0_12px_36px_#071c1626] max-[1199px]:static max-[1199px]:rounded-none max-[1199px]:bg-[#edf5ee] max-[1199px]:p-1.5 max-[1199px]:shadow-none">{products.map(([href, label, icon]) => <Link className="flex items-center gap-3 rounded-md px-3 py-[15px] hover:bg-[#edf5ee] aria-[current=page]:bg-[#edf5ee]" key={href} href={href} aria-current={current(href)} onClick={close}><i className={icon} aria-hidden="true" />{label}</Link>)}</div>}
        </div>
        {['/train', '/news', '/shop', '/contact'].map((href, index) => <Link key={href} className="relative whitespace-nowrap py-[18px] after:absolute after:inset-x-0 after:bottom-[7px] after:h-0.5 after:scale-x-0 after:bg-white after:transition-transform hover:after:scale-x-100 aria-[current=page]:after:scale-x-100 max-[1199px]:flex max-[1199px]:w-full max-[1199px]:justify-between max-[1199px]:border-b max-[1199px]:border-[#dce5de] max-[1199px]:px-3 max-[1199px]:py-[15px] max-[1199px]:aria-[current=page]:bg-[#edf5ee]" href={href} aria-current={current(href)} onClick={close}>{['Training & Consultancy', 'News & Events', 'Shop', 'Contact Us'][index]}</Link>)}
        <div className="ml-auto flex items-center gap-3 max-[1199px]:mt-[14px] max-[1199px]:ml-0">
          {!isLoading && user ? <>{user.role === 'admin' && <Link href="/admin" onClick={close}>Admin</Link>}<button className="flex min-h-11 items-center justify-center gap-[14px] rounded-3xl border border-white/50 bg-[#C99724] px-5 py-[10px] text-white hover:bg-[#ddb04c] hover:text-[#163e2a] max-[1199px]:px-[14px]" onClick={() => void handleLogout()}>Logout <i className="ri-logout-box-r-line" aria-hidden="true" /></button></> : !isLoading ? <Link href="/login" className="flex min-h-11 items-center justify-center gap-[14px] rounded-3xl border border-white/50 bg-[#C99724] px-5 py-[10px] text-white hover:bg-[#ddb04c] hover:text-[#163e2a] max-[1199px]:px-[14px]" onClick={close}>Login <i className="ri-user-line" aria-hidden="true" /></Link> : null}
        </div>
      </div>
    </nav>
  </header>;
}
