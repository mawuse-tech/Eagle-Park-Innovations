'use client';
import { useState, type FormEvent } from 'react';

export default function ContactUsPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setStatus(null);
    setIsSubmitting(true);
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/mnnvkwly", {
        method: "POST",
        body: data,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setStatus("Message sent successfully!");
        form.reset(); // clear the form
      } else {
        setStatus("Oops! Something went wrong. Please try again.");
      }
    } catch {
      setStatus("There was a network error.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return <div className="editorial-page contact-page">
    <header className="contact-heading editorial-width"><p className="eyebrow">Connect with EPI</p><h1>Let’s grow<br /><span>something lasting.</span></h1><p>From your next harvest to your next partnership, we’re here to help. Tell us what you have in mind.</p></header>
    <section className="contact-layout editorial-width" aria-label="Contact Us">
      <aside className="contact-details"><p className="eyebrow">Contact Us</p><h2>A conversation is<br />a good place to start.</h2>
        <div className="contact-detail"><i className="ri-mail-line" aria-hidden="true" /><div><h3>Email us</h3><a href="mailto:info@eagleparkinnovations.online">info@eagleparkinnovations.online</a><a href="mailto:eagleparkinnovations@yahoo.com">eagleparkinnovations@yahoo.com</a></div></div>
        <div className="contact-detail"><i className="ri-phone-line" aria-hidden="true" /><div><h3>Call or chat</h3><a href="tel:+233244175741">+233 244 175 741</a><a href="https://wa.me/233243919417" target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp at +233 24 391 9417 (opens in a new tab)">WhatsApp: +233 24 391 9417 <i className="ri-arrow-right-up-line" aria-hidden="true" /></a></div></div>
        <div className="contact-detail"><i className="ri-map-pin-line" aria-hidden="true" /><div><h3>Find us</h3><p><strong>Bundled Services & Grains</strong><br />Nyankpala, Northern Region</p><p><strong>Poultry</strong><br />Ankaase, Ashanti Region</p></div></div>
      </aside>
  <form onSubmit={handleSubmit} className="contact-form" aria-busy={isSubmitting}><h2>Send us a message</h2><p>Ask about our products, training, or partnership opportunities.</p><div className="form-pair"><div><label htmlFor="contact-name">Full Name</label><input id="contact-name" name="name" autoComplete="name" placeholder="John Doe" required /></div><div><label htmlFor="contact-email">Email Address</label><input id="contact-email" type="email" name="email" autoComplete="email" placeholder="john@example.com" required /></div></div><label htmlFor="contact-reason">Reason for Contact</label><select id="contact-reason" name="reason"><option value="Class Registration">Class Registration</option><option value="General Inquiry">General Inquiry</option><option value="Partnership or Collaboration">Partnership or Collaboration</option></select><label htmlFor="contact-message">Your Message</label><textarea id="contact-message" name="message" rows={5} placeholder="Type your message here..." required /><div className="contact-submit"><button type="submit" className="primary-link" disabled={isSubmitting}>{isSubmitting ? 'Sending…' : 'Send Message'}<i className="ri-arrow-right-up-line" aria-hidden="true" /></button></div><p role="status" aria-live="polite">{status}</p></form></section></div>;
}
