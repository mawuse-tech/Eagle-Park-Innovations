import type { Metadata } from "next";
import NewsListing from "@/src/news/NewsListing";
export const metadata: Metadata = {
  title: "News & Events | EPI",
  description:
    "News, training events, and announcements from Eagle Park Innovations.",
};
export default function NewsPage() {
  return <NewsListing />;
}
