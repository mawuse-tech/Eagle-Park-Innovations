import type { Metadata } from "next";
import NewsletterUnsubscribe from "@/src/news/NewsletterUnsubscribe";

export const metadata: Metadata = {
  title: "Unsubscribe from EPI updates",
  robots: { index: false, follow: false },
};

export default function UnsubscribePage() {
  return (
    <div className="editorial-page bg-[#f6f8f5] px-4 py-12 sm:py-20">
      <NewsletterUnsubscribe />
    </div>
  );
}
