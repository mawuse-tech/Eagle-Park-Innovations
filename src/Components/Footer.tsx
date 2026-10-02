import Link from 'next/link';

export default function Footer() {
  return <footer className="site-footer"><div className="editorial-width">
    <div className="footer-columns">
      <div><h2>Explore EPI</h2><Link href="/ourstory">Our story</Link><Link href="/train">Training & Consultancy</Link><Link href="/shop">Shop our products</Link><Link href="/news">News & Resources</Link><Link href="/contact">Contact us</Link></div>
      <div><h2>Our solutions</h2><Link href="/seed">Bundled Services</Link><Link href="/grain">Premium Grains</Link><Link href="/poultry">Poultry Products</Link></div>
      <div><h2>Visit us</h2><p>Bundled Services / Grains<br />Nyankpala, Northern Region</p><p>Poultry<br />Ankaase, Ashanti Region</p></div>
      <div><h2>Stay connected</h2><a href="tel:+233244175741">+233 244 175 741</a><a href="mailto:info@eagleparkinnovations.online">info@eagleparkinnovations.online</a><a href="mailto:eagleparkinnovations@yahoo.com">eagleparkinnovations@yahoo.com</a><div className="footer-socials">
        <a href="https://www.facebook.com/share/1Ahtriscx4/?mibextid=WC7FNe" target="_blank" rel="noopener noreferrer" aria-label="EPI on Facebook"><i className="ri-facebook-fill" aria-hidden="true" /></a>
        <a href="https://www.instagram.com/p/DLncarnsdyb/?igsh=MW1nZW92YTR0aHB0bA==" target="_blank" rel="noopener noreferrer" aria-label="EPI on Instagram"><i className="ri-instagram-line" aria-hidden="true" /></a>
        <a href="https://www.linkedin.com/company/eagle-park-innovations-limited/?viewAsMember=true" target="_blank" rel="noopener noreferrer" aria-label="EPI on LinkedIn"><i className="ri-linkedin-fill" aria-hidden="true" /></a>
      </div></div>
    </div><div className="footer-bottom"><span>© {new Date().getFullYear()} EPI. All rights reserved.</span><span>Rooted in Ghana. Growing together.</span></div>
  </div></footer>;
}
