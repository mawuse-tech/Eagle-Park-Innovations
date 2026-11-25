"use client";

import Link from "next/link";
import { useState } from "react";
import {
  isUnsubscribeToken,
  readUnsubscribeToken,
  saveUnsubscribeToken,
} from "./unsubscribeToken";

export default function NewsletterUnsubscribe() {
  const [status, setStatus] = useState<
    "idle" | "submitting" | "done" | "missing" | "error"
  >("idle");

  async function unsubscribe() {
    const token = window.location.hash
      ? new URLSearchParams(window.location.hash.slice(1)).get("token")
      : readUnsubscribeToken();
    if (!isUnsubscribeToken(token)) {
      setStatus("missing");
      return;
    }

    setStatus("submitting");
    try {
      const response = await fetch("/api/newsletter", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      if (!response.ok) {
        setStatus("error");
        return;
      }
      if (readUnsubscribeToken() === token) saveUnsubscribeToken(null);
      window.history.replaceState(
        window.history.state,
        "",
        window.location.pathname,
      );
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="mx-auto max-w-xl rounded-3xl border border-[#dce5de] bg-white p-6 sm:p-10">
      <h1 className="text-3xl leading-tight">Unsubscribe from EPI updates</h1>
      <p className="mt-3" role="status">
        {status === "done"
          ? "You’re unsubscribed from EPI email updates."
          : "Confirm below to stop receiving EPI news and event updates."}
      </p>
      <div className="mt-6 flex flex-wrap items-center gap-4">
        {status !== "done" && (
          <button
            type="button"
            className="primary-link"
            disabled={status === "submitting"}
            onClick={unsubscribe}
          >
            {status === "submitting" ? "Unsubscribing…" : "Confirm unsubscribe"}
          </button>
        )}
        <Link
          href="/news#subscribe"
          className="font-bold text-[#386347] underline underline-offset-4"
        >
          Back to News &amp; Events
        </Link>
      </div>
      <p role="status" className="text-sm">
        {status === "missing" && (
          <span className="mt-5 block">
            Open your saved unsubscribe link or{" "}
            <Link
              href="/contact#contact-form"
              className="font-bold underline underline-offset-4"
            >
              contact EPI
            </Link>{" "}
            to request removal.
          </span>
        )}
        {status === "error" && (
          <span className="mt-5 block">
            We couldn’t complete your request. Please try again.
          </span>
        )}
      </p>
    </section>
  );
}
