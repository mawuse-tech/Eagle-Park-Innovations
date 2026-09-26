'use client';

import { useRef, useState } from 'react';
import Swal from 'sweetalert2';
import logo from '../assets/loggo.png';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/src/auth/AuthProvider';

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
    try { await logout(); }
    catch { await Swal.fire({ icon: 'error', title: 'Logout failed', text: 'Please try again.', confirmButtonColor: '#386347' }); }
  };

  return <header className={`site-header ${hasHero ? 'over-hero' : ''}`} onKeyDown={(event) => {
    if (event.key === 'Escape') {
      if (productsOpen) { setProductsOpen(false); productButton.current?.focus(); }
      else { close(); menuButton.current?.focus(); }
    }
  }}>
    <a href="#main-content" className="skip-link">Skip to content</a>
    <div className="utility-nav"><span>Growing together. Building sustainable futures.</span><div><Link href="/ourstory">Our story</Link><Link href="/contact">Get in touch <i className="ri-arrow-right-up-line" aria-hidden="true" /></Link></div></div>
    <nav className="site-nav" aria-label="Main navigation">
      <Link className="brand" href="/" onClick={close}><Image src={logo} alt="Eagle Park Innovations home" sizes="110px" /></Link>
      <button ref={menuButton} className="nav-toggle" type="button" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} aria-controls="main-navigation" onClick={() => { setMenuOpen(!menuOpen); setProductsOpen(false); }}><i className={menuOpen ? 'ri-close-line' : 'ri-menu-line'} aria-hidden="true" /></button>
      <div id="main-navigation" className={`nav-links ${menuOpen ? 'is-open' : ''}`}>
        <Link href="/" aria-current={current('/')} onClick={close}>Home</Link>
        <Link href="/ourstory" aria-current={current('/ourstory')} onClick={close}>About Us</Link>
        <div className="nav-products" onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setProductsOpen(false); }}>
          <button ref={productButton} type="button" aria-expanded={productsOpen} aria-controls="product-navigation" className={products.some(([href]) => href === pathname) ? 'is-active' : ''} onClick={() => setProductsOpen(!productsOpen)}>Products <i className="ri-arrow-down-s-line" aria-hidden="true" /></button>
          {productsOpen && <div id="product-navigation" className="nav-dropdown">{products.map(([href, label, icon]) => <Link key={href} href={href} aria-current={current(href)} onClick={close}><i className={icon} aria-hidden="true" />{label}</Link>)}</div>}
        </div>
        <Link href="/train" aria-current={current('/train')} onClick={close}>Training & Consultancy</Link>
        <Link href="/shop" aria-current={current('/shop')} onClick={close}>Shop</Link>
        <Link href="/contact" aria-current={current('/contact')} onClick={close}>Contact</Link>
        <div className="nav-account">
          {!isLoading && user ? <>{user.role === 'admin' && <Link href="/admin" onClick={close}>Admin</Link>}<button className="nav-login" onClick={() => void handleLogout()}>Logout <i className="ri-logout-box-r-line" aria-hidden="true" /></button></> : !isLoading ? <Link href="/login" className="nav-login" onClick={close}>Login <i className="ri-user-line" aria-hidden="true" /></Link> : null}
        </div>
      </div>
    </nav>
  </header>;
}
