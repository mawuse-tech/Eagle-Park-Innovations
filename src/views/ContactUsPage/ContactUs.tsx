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

  return <div className="editorial-page"><header className="contact-heading editorial-width"><h1>Contact Us</h1><p>Got a question, want to register for a class, or collaborate with us? Reach out—we’d love to hear from you!</p></header>
  <section className="contact-layout editorial-width"><aside><ul className="contact-original-info"><li>Bundled Services/Grains: Nyankpala, Northern Region</li><li>Poultry: Ankaase, Ashanti Region</li><li><a href="tel:+233244175741">+233244175741</a></li><li>
    <a href="https://wa.me/233243919417" target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp at +233 24 391 9417 (opens in a new tab)" className="inline-flex items-center gap-3 hover:text-green-800 transition-colors">
      <i className="ri-whatsapp-line text-2xl text-green-700" aria-hidden="true" />
      <span>WhatsApp: +233 24 391 9417</span>
    </a>
  </li><li><a href="mailto:eagleparkinnovations@yahoo.com">eagleparkinnovations@yahoo.com</a></li></ul></aside>
  <form onSubmit={handleSubmit} className="contact-form"><div className="form-pair"><div><label htmlFor="contact-name">Full Name</label><input id="contact-name" name="name" autoComplete="name" placeholder="John Doe" required /></div><div><label htmlFor="contact-email">Email Address</label><input id="contact-email" type="email" name="email" autoComplete="email" placeholder="john@example.com" required /></div></div><label htmlFor="contact-reason">Reason for Contact</label><select id="contact-reason" name="reason"><option value="Class Registration">Class Registration</option><option value="General Inquiry">General Inquiry</option><option value="Partnership or Collaboration">Partnership or Collaboration</option></select><label htmlFor="contact-message">Your Message</label><textarea id="contact-message" name="message" rows={5} placeholder="Type your message here..." required /><div className="contact-submit"><button type="submit" className="primary-link" disabled={isSubmitting}>Send Message<i className="ri-arrow-right-up-line" aria-hidden="true" /></button></div><p role="status" aria-live="polite">{status}</p></form></section></div>;
}
