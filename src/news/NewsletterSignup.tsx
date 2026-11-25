"use client";

import { useState, useSyncExternalStore, type FormEvent } from "react";
import {
  isUnsubscribeToken,
  readUnsubscribeToken,
  saveUnsubscribeToken,
  watchUnsubscribeToken,
} from "./unsubscribeToken";

function getServerToken() {
  return null;
}

export default function NewsletterSignup() {
  const token = useSyncExternalStore(
    watchUnsubscribeToken,
    readUnsubscribeToken,
    getServerToken,
  );
  const subscribed = isUnsubscribeToken(token);
  const [existingAddress, setExistingAddress] = useState(false);
  const shouldUnsubscribe = subscribed || existingAddress;
  const [status, setStatus] = useState<
    "idle" | "saving" | "subscribed" | "unsubscribed" | "error"
  >("idle");

  async function toggleSubscription(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "saving") return;

    const form = event.currentTarget;
    const body = subscribed
      ? { token }
      : { email: new FormData(form).get("email") };
    setStatus("saving");

    try {
      const response = await fetch("/api/newsletter", {
        method: shouldUnsubscribe ? "DELETE" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        setStatus("error");
        return;
      }

      if (shouldUnsubscribe) {
        if (subscribed && readUnsubscribeToken() === token) {
          saveUnsubscribeToken(null);
        }
        form.reset();
        setExistingAddress(false);
        setStatus("unsubscribed");
        return;
      }

      const { unsubscribeToken } = await response.json();
      if (isUnsubscribeToken(unsubscribeToken)) {
        form.reset();
        saveUnsubscribeToken(unsubscribeToken);
        setStatus("subscribed");
      } else {
        setExistingAddress(true);
        setStatus("idle");
      }
    } catch {
      setStatus("error");
    }
  }

  const buttonLabel = shouldUnsubscribe ? "Unsubscribe" : "Subscribe";

  return (
    <form
      className="min-w-0 flex-1 basis-[340px] md:max-w-[430px] lg:ml-auto"
      onSubmit={toggleSubscription}
    >
      <div className="flex items-center gap-1 rounded-full bg-white p-1 max-[379px]:flex-col max-[379px]:items-stretch max-[379px]:rounded-2xl">
        {subscribed ? (
          <span className="flex min-h-11 min-w-0 flex-1 items-center px-3 text-sm font-medium text-[#173322]">
            Subscribed to EPI updates
          </span>
        ) : (
          <>
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              name="email"
              type="email"
              autoComplete="email"
              className="min-h-11 min-w-0 flex-1 rounded-full px-3 py-2 text-base text-[#173322] placeholder:text-[#5c675f] md:text-sm"
              placeholder="Enter your email address"
              maxLength={254}
              onChange={() => {
                setExistingAddress(false);
                setStatus("idle");
              }}
              readOnly={status === "saving"}
              required
            />
          </>
        )}
        <button
          type="submit"
          disabled={status === "saving"}
          aria-busy={status === "saving"}
          className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-[#397809] px-3 text-sm font-bold text-white hover:bg-[#2d6107] sm:px-4"
        >
          {buttonLabel}
          <i className="ri-arrow-right-line" aria-hidden="true" />
        </button>
      </div>
      <p role="status" className="text-sm leading-normal !text-white">
        {status === "subscribed" && subscribed && (
          <span className="mt-2 block">You’re subscribed to EPI updates.</span>
        )}
        {status === "unsubscribed" && !subscribed && (
          <span className="mt-2 block">
            You’re unsubscribed from EPI updates.
          </span>
        )}
        {status === "idle" && existingAddress && !subscribed && (
          <span className="mt-2 block">
            This address is subscribed. Select Unsubscribe to remove it.
          </span>
        )}
        {status === "error" && (
          <span className="mt-2 block">
            We couldn’t update your subscription. Please try again.
          </span>
        )}
      </p>
    </form>
  );
}
