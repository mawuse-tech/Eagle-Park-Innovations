"use client";
import { useState, type FormEvent } from "react";

const fieldClass =
  "w-full rounded-[5px] border border-[#b7c6bc] bg-white p-[15px] [font-family:inherit] [font-size:14px] [line-height:normal] min-h-[52px] mb-[26px] [@media(min-width:1024px)_and_(min-height:851px)]:min-h-11 [@media(min-width:1024px)_and_(min-height:851px)]:px-3 [@media(min-width:1024px)_and_(min-height:851px)]:py-[10px] [@media(min-width:1024px)_and_(min-height:851px)]:mb-[14px] [@media(min-width:1024px)_and_(max-height:850px)]:min-h-10 [@media(min-width:1024px)_and_(max-height:850px)]:px-[10px] [@media(min-width:1024px)_and_(max-height:850px)]:py-2 [@media(min-width:1024px)_and_(max-height:850px)]:mb-[10px] [@media(min-width:1024px)_and_(max-height:850px)]:[font-size:13px]";
const labelClass =
  "mb-2 block text-[13px] font-semibold [@media(min-width:1024px)_and_(max-height:850px)]:mb-[5px] [@media(min-width:1024px)_and_(max-height:850px)]:text-xs";

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

  return (
    <div className="editorial-page bg-[#f6f8f5]">
      <header className="editorial-width pt-16 pb-8 max-[767px]:pt-12 [@media(min-width:1024px)_and_(min-height:851px)]:pt-6 [@media(min-width:1024px)_and_(min-height:851px)]:pb-[18px] [@media(min-width:1024px)_and_(max-height:850px)]:pt-[10px] [@media(min-width:1024px)_and_(max-height:850px)]:pb-2">
        <p className="eyebrow mt-6 max-w-[580px] [@media(min-width:1024px)_and_(min-height:700px)]:mt-3">
          Connect with EPI
        </p>
      </header>
      <section
        className="editorial-width grid grid-cols-[minmax(0,.85fr)_minmax(0,1.15fr)] items-stretch gap-8 pb-[72px] max-[1023px]:grid-cols-1 max-[767px]:pb-14 [@media(min-width:1024px)_and_(min-height:851px)]:grid-cols-[minmax(0,.9fr)_minmax(0,1.1fr)] [@media(min-width:1024px)_and_(min-height:851px)]:gap-6 [@media(min-width:1024px)_and_(min-height:851px)]:pb-6 [@media(min-width:1024px)_and_(min-height:700px)_and_(max-height:850px)]:grid-cols-[minmax(0,.9fr)_minmax(0,1.1fr)] [@media(min-width:1024px)_and_(max-height:850px)]:gap-[18px] [@media(min-width:1024px)_and_(max-height:850px)]:pb-3"
        aria-label="Contact Us"
      >
        <aside className="rounded-[22px] bg-[#163e2a] p-10 text-white [@media(min-width:1024px)_and_(min-height:851px)]:p-7 [@media(min-width:1024px)_and_(max-height:850px)]:p-5 max-[767px]:px-[22px] max-[767px]:py-7">
          <p className="eyebrow !text-[#C99724]">Contact Us</p>
          <h2 className="mb-8 !text-[clamp(26px,2.5vw,34px)] [@media(min-width:1024px)_and_(min-height:851px)]:mb-4 [@media(min-width:1024px)_and_(max-height:850px)]:mb-[10px] [@media(min-width:1024px)_and_(max-height:850px)]:!text-[27px]">
            A conversation is
            <br />a good place to start.
          </h2>
          <div className="flex items-start gap-4 border-t border-white/15 py-[22px] [@media(min-width:1024px)_and_(min-height:851px)]:gap-3 [@media(min-width:1024px)_and_(min-height:851px)]:py-[14px] [@media(min-width:1024px)_and_(max-height:850px)]:gap-[10px] [@media(min-width:1024px)_and_(max-height:850px)]:py-[10px]">
            <i
              className="ri-mail-line shrink-0 text-2xl text-[#C99724] [@media(min-width:1024px)_and_(max-height:850px)]:text-[21px]"
              aria-hidden="true"
            />
            <div className="min-w-0">
              <h3 className="mb-[10px] text-base [@media(min-width:1024px)_and_(min-height:851px)]:mb-1.5 [@media(min-width:1024px)_and_(max-height:850px)]:mb-1">
                Email us
              </h3>
              <a
                className="mt-2 block break-words text-sm text-[#e1eee5] hover:underline hover:underline-offset-4 [@media(min-width:1024px)_and_(min-height:851px)]:mt-[5px] [@media(min-width:1024px)_and_(min-height:851px)]:text-[13px] [@media(min-width:1024px)_and_(max-height:850px)]:mt-1 [@media(min-width:1024px)_and_(max-height:850px)]:text-xs"
                href="mailto:info@eagleparkinnovations.online"
              >
                info@eagleparkinnovations.online
              </a>
              <a
                className="mt-2 block break-words text-sm text-[#e1eee5] hover:underline hover:underline-offset-4 [@media(min-width:1024px)_and_(min-height:851px)]:mt-[5px] [@media(min-width:1024px)_and_(min-height:851px)]:text-[13px] [@media(min-width:1024px)_and_(max-height:850px)]:mt-1 [@media(min-width:1024px)_and_(max-height:850px)]:text-xs"
                href="mailto:eagleparkinnovations@yahoo.com"
              >
                eagleparkinnovations@yahoo.com
              </a>
            </div>
          </div>
          <div className="flex items-start gap-4 border-t border-white/15 py-[22px] [@media(min-width:1024px)_and_(min-height:851px)]:gap-3 [@media(min-width:1024px)_and_(min-height:851px)]:py-[14px] [@media(min-width:1024px)_and_(max-height:850px)]:gap-[10px] [@media(min-width:1024px)_and_(max-height:850px)]:py-[10px]">
            <i
              className="ri-phone-line shrink-0 text-2xl text-[#C99724] [@media(min-width:1024px)_and_(max-height:850px)]:text-[21px]"
              aria-hidden="true"
            />
            <div className="min-w-0">
              <h3 className="mb-[10px] text-base [@media(min-width:1024px)_and_(min-height:851px)]:mb-1.5 [@media(min-width:1024px)_and_(max-height:850px)]:mb-1">
                Call or chat
              </h3>
              <a
                className="mt-2 block break-words text-sm text-[#e1eee5] hover:underline hover:underline-offset-4 [@media(min-width:1024px)_and_(min-height:851px)]:mt-[5px] [@media(min-width:1024px)_and_(min-height:851px)]:text-[13px] [@media(min-width:1024px)_and_(max-height:850px)]:mt-1 [@media(min-width:1024px)_and_(max-height:850px)]:text-xs"
                href="tel:+233244175741"
              >
                +233 244 175 741
              </a>
              <a
                className="mt-2 block break-words text-sm text-[#e1eee5] hover:underline hover:underline-offset-4 [@media(min-width:1024px)_and_(min-height:851px)]:mt-[5px] [@media(min-width:1024px)_and_(min-height:851px)]:text-[13px] [@media(min-width:1024px)_and_(max-height:850px)]:mt-1 [@media(min-width:1024px)_and_(max-height:850px)]:text-xs"
                href="https://wa.me/233243919417"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp at +233 24 391 9417 (opens in a new tab)"
              >
                WhatsApp: +233 24 391 9417{" "}
                <i className="ri-arrow-right-up-line" aria-hidden="true" />
              </a>
            </div>
          </div>
          <div className="flex items-start gap-4 border-t border-white/15 py-[22px] [@media(min-width:1024px)_and_(min-height:851px)]:gap-3 [@media(min-width:1024px)_and_(min-height:851px)]:py-[14px] [@media(min-width:1024px)_and_(max-height:850px)]:gap-[10px] [@media(min-width:1024px)_and_(max-height:850px)]:py-[10px]">
            <i
              className="ri-map-pin-line shrink-0 text-2xl text-[#C99724] [@media(min-width:1024px)_and_(max-height:850px)]:text-[21px]"
              aria-hidden="true"
            />
            <div className="min-w-0">
              <h3 className="mb-[10px] text-base [@media(min-width:1024px)_and_(min-height:851px)]:mb-1.5 [@media(min-width:1024px)_and_(max-height:850px)]:mb-1">
                Find us
              </h3>
              <p className="mt-2 block break-words text-sm !text-[#e1eee5] [@media(min-width:1024px)_and_(min-height:851px)]:mt-[5px] [@media(min-width:1024px)_and_(min-height:851px)]:text-[13px] [@media(min-width:1024px)_and_(max-height:850px)]:mt-1 [@media(min-width:1024px)_and_(max-height:850px)]:text-xs">
                <strong>Bundled Services & Grains</strong>
                <br />
                Nyankpala, Northern Region
              </p>
              <p className="mt-2 block break-words text-sm !text-[#e1eee5] [@media(min-width:1024px)_and_(min-height:851px)]:mt-[5px] [@media(min-width:1024px)_and_(min-height:851px)]:text-[13px] [@media(min-width:1024px)_and_(max-height:850px)]:mt-1 [@media(min-width:1024px)_and_(max-height:850px)]:text-xs">
                <strong>Poultry</strong>
                <br />
                Ankaase, Ashanti Region
              </p>
            </div>
          </div>
        </aside>
        <form
          id="contact-form"
          onSubmit={handleSubmit}
          className="flex flex-col rounded-[22px] border border-[#dce5de] bg-white p-10 shadow-[0_12px_40px_#163e2a06] [@media(min-width:1024px)_and_(min-height:851px)]:p-7 [@media(min-width:1024px)_and_(max-height:850px)]:p-5 max-[767px]:px-[22px] max-[767px]:py-7"
          aria-busy={isSubmitting}
        >
          <h2 className="!text-[28px] [@media(min-width:1024px)_and_(min-height:851px)]:!text-[25px] [@media(min-width:1024px)_and_(max-height:850px)]:!text-[23px]">
            Send us a message
          </h2>
          <p className="mt-3 mb-7 text-sm [@media(min-width:1024px)_and_(min-height:851px)]:mt-2 [@media(min-width:1024px)_and_(min-height:851px)]:mb-4 [@media(min-width:1024px)_and_(max-height:850px)]:mt-1.5 [@media(min-width:1024px)_and_(max-height:850px)]:mb-3 [@media(min-width:1024px)_and_(max-height:850px)]:text-[13px]">
            Ask about our products, training, or partnership opportunities.
          </p>
          <div className="grid grid-cols-2 gap-6 max-[767px]:grid-cols-1 max-[767px]:gap-0 [@media(min-width:1024px)_and_(min-height:851px)]:gap-4 [@media(min-width:1024px)_and_(max-height:850px)]:gap-3">
            <div>
              <label className={labelClass} htmlFor="contact-name">
                Full Name
              </label>
              <input
                className={fieldClass}
                id="contact-name"
                name="name"
                autoComplete="name"
                placeholder="John Doe"
                required
              />
            </div>
            <div>
              <label className={labelClass} htmlFor="contact-email">
                Email Address
              </label>
              <input
                className={fieldClass}
                id="contact-email"
                type="email"
                name="email"
                autoComplete="email"
                placeholder="john@example.com"
                required
              />
            </div>
          </div>
          <label className={labelClass} htmlFor="contact-reason">
            Reason for Contact
          </label>
          <select className={fieldClass} id="contact-reason" name="reason">
            <option value="Class Registration">Class Registration</option>
            <option value="General Inquiry">General Inquiry</option>
            <option value="Partnership or Collaboration">
              Partnership or Collaboration
            </option>
          </select>
          <label className={labelClass} htmlFor="contact-message">
            Your Message
          </label>
          <textarea
            className={`${fieldClass} resize-y [@media(min-width:1024px)_and_(min-height:851px)]:h-[88px] [@media(min-width:1024px)_and_(min-height:851px)]:min-h-[88px] [@media(min-width:1024px)_and_(max-height:850px)]:h-[68px] [@media(min-width:1024px)_and_(max-height:850px)]:min-h-[68px]`}
            id="contact-message"
            name="message"
            rows={5}
            placeholder="Type your message here..."
            required
          />
          <div className="mt-auto pt-2">
            <button
              type="submit"
              className="primary-link min-w-[230px] max-[767px]:w-full [@media(min-width:1024px)_and_(min-height:851px)]:min-w-[190px] [@media(min-width:1024px)_and_(max-height:850px)]:min-w-[170px] [@media(min-width:1024px)_and_(max-height:850px)]:min-h-11"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending…" : "Send Message"}
              <i className="ri-arrow-right-up-line" aria-hidden="true" />
            </button>
          </div>
          <p className="mt-5 text-sm [@media(min-width:1024px)_and_(min-height:851px)]:mt-2 [@media(min-width:1024px)_and_(max-height:850px)]:mt-1">
            {status}
          </p>
        </form>
      </section>
    </div>
  );
}
