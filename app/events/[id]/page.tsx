import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import mongoose from "mongoose";
import { connectDatabase } from "@/src/server/db";
import { EventModel } from "@/src/server/models/Event";

export const dynamic = "force-dynamic";
type Props = { params: Promise<{ id: string }> };

async function getEvent(id: string) {
  if (!mongoose.isValidObjectId(id)) return null;
  await connectDatabase();
  return EventModel.findOne({ _id: id, status: "published" }).lean();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  try {
    const event = await getEvent(id);
    return event
      ? {
          title: `${event.title} | EPI Events`,
          description: event.description || `Event details for ${event.title}.`,
        }
      : { title: "Event not found | EPI" };
  } catch {
    return { title: "Events & Announcements | EPI" };
  }
}

export default async function EventDetailsPage({ params }: Props) {
  const { id } = await params;
  let event;
  try {
    event = await getEvent(id);
  } catch {
    notFound();
  }
  if (!event) notFound();

  const date = new Date(`${event.date}T12:00:00`);
  const formattedDate = date.toLocaleDateString(undefined, {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const formattedTime = event.time
    ? new Date(`1970-01-01T${event.time}:00`).toLocaleTimeString(undefined, {
        hour: "numeric",
        minute: "2-digit",
      })
    : "To be announced";
  const joinUrl = `https://wa.me/233243919417?text=${encodeURIComponent(`Hi EPI, I’d like to join ${event.title} on ${event.date}. Please send me the details.`)}`;
  const paragraphs = (
    event.description ||
    "Please contact EPI for more information about this event."
  )
    .split(/\n\s*\n/)
    .filter(Boolean);

  return (
    <main className="mx-auto min-h-[70vh] w-[min(1280px,calc(100%-64px))] py-[34px] pb-[92px] max-[767px]:w-[calc(100%-32px)] max-[767px]:py-6 max-[767px]:pb-[60px]">
      <Link
        href="/news#events"
        className="mb-6 inline-flex items-center gap-[9px] text-[13px] font-bold text-[#386347] hover:underline hover:underline-offset-4"
      >
        <i className="ri-arrow-left-line" aria-hidden="true" /> Back to events
      </Link>
      <article className="flex flex-col overflow-hidden rounded-[18px] border border-[#dce5de] bg-[#f7faf7] shadow-[0_20px_60px_#163e2a0d]">
        {event.image ? (
          <img
            className="h-[clamp(260px,42vw,500px)] min-h-0 max-h-[500px] w-full bg-[#e8eee8] object-cover max-[1023px]:min-h-[360px] max-[1023px]:max-h-[480px] max-[767px]:min-h-[250px] max-[767px]:max-h-[320px]"
            src={event.image}
            alt={event.title}
          />
        ) : (
          <div className="grid h-[clamp(260px,42vw,500px)] min-h-0 max-h-[500px] w-full place-items-center bg-[#e8eee8] text-[#709078] max-[1023px]:min-h-[360px] max-[1023px]:max-h-[480px] max-[767px]:min-h-[250px] max-[767px]:max-h-[320px]">
            <i
              className="ri-calendar-event-line text-[42px]"
              aria-hidden="true"
            />
          </div>
        )}
        <div className="p-[clamp(28px,5vw,64px)] max-[767px]:px-5 max-[767px]:py-6">
          <p className="eyebrow">EPI EVENT</p>
          <h1 className="mb-7 text-[clamp(34px,4.2vw,56px)] font-[750] leading-[1.04] tracking-[-.035em] text-[#202923] max-[767px]:mb-[22px] max-[767px]:text-[34px]">
            {event.title}
          </h1>
          <div className="grid grid-cols-2 gap-x-5 gap-y-[18px] border-y border-[#dce5de] py-[22px] max-[767px]:grid-cols-1 max-[767px]:gap-[14px]">
            <p className="flex items-start gap-[11px] text-[13px] leading-[1.45] text-[#526158]">
              <i
                className="mt-0.5 flex-[0_0_auto] text-[18px] text-[#386347] ri-calendar-line"
                aria-hidden="true"
              />
              <span className="block">
                <strong className="mb-1 block text-[11px] tracking-[.06em] text-[#27372d]">
                  Date
                </strong>
                {formattedDate}
              </span>
            </p>
            <p className="flex items-start gap-[11px] text-[13px] leading-[1.45] text-[#526158]">
              <i
                className="mt-0.5 flex-[0_0_auto] text-[18px] text-[#386347] ri-time-line"
                aria-hidden="true"
              />
              <span className="block">
                <strong className="mb-1 block text-[11px] tracking-[.06em] text-[#27372d]">
                  Time
                </strong>
                {formattedTime}
              </span>
            </p>
            <p className="flex items-start gap-[11px] text-[13px] leading-[1.45] text-[#526158]">
              <i
                className="mt-0.5 flex-[0_0_auto] text-[18px] text-[#386347] ri-map-pin-line"
                aria-hidden="true"
              />
              <span className="block">
                <strong className="mb-1 block text-[11px] tracking-[.06em] text-[#27372d]">
                  Location
                </strong>
                {event.place}
              </span>
            </p>
            <p className="flex items-start gap-[11px] text-[13px] leading-[1.45] text-[#526158]">
              <i
                className="mt-0.5 flex-[0_0_auto] text-[18px] text-[#386347] ri-money-dollar-circle-line"
                aria-hidden="true"
              />
              <span className="block">
                <strong className="mb-1 block text-[11px] tracking-[.06em] text-[#27372d]">
                  Cost
                </strong>
                {event.cost || "Free"}
              </span>
            </p>
            <p className="flex items-start gap-[11px] text-[13px] leading-[1.45] text-[#526158]">
              <i
                className="mt-0.5 flex-[0_0_auto] text-[18px] text-[#386347] ri-group-line"
                aria-hidden="true"
              />
              <span className="block">
                <strong className="mb-1 block text-[11px] tracking-[.06em] text-[#27372d]">
                  Who it is for
                </strong>
                {event.audience}
              </span>
            </p>
            {event.organizer && (
              <p className="flex items-start gap-[11px] text-[13px] leading-[1.45] text-[#526158]">
                <i
                  className="mt-0.5 flex-[0_0_auto] text-[18px] text-[#386347] ri-user-3-line"
                  aria-hidden="true"
                />
                <span className="block">
                  <strong className="mb-1 block text-[11px] tracking-[.06em] text-[#27372d]">
                    Organizer
                  </strong>
                  {event.organizer}
                </span>
              </p>
            )}
            {event.capacity && (
              <p className="flex items-start gap-[11px] text-[13px] leading-[1.45] text-[#526158]">
                <i
                  className="mt-0.5 flex-[0_0_auto] text-[18px] text-[#386347] ri-team-line"
                  aria-hidden="true"
                />
                <span className="block">
                  <strong className="mb-1 block text-[11px] tracking-[.06em] text-[#27372d]">
                    Capacity
                  </strong>
                  {event.capacity} attendees
                </span>
              </p>
            )}
          </div>
          <section className="pt-6">
            <h2 className="mb-3 !text-[21px]">About this event</h2>
            {paragraphs.map((paragraph, index) => (
              <p
                className="mt-[10px] whitespace-pre-wrap text-[14px] leading-[1.75] text-[#526158]"
                key={index}
              >
                {paragraph}
              </p>
            ))}
          </section>
          <div className="mt-7 flex flex-wrap gap-3 max-[767px]:flex-col">
            <a
              className="primary-link !gap-[10px] max-[767px]:w-full"
              href={joinUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Message us to join{" "}
              <i className="ri-whatsapp-line" aria-hidden="true" />
            </a>
            <Link
              className="outline-link !gap-[10px] !border-[#386347] !text-[#386347] hover:!bg-[#386347] hover:!text-white max-[767px]:w-full"
              href={`/contact?event=${encodeURIComponent(event.title)}`}
            >
              Register <i className="ri-arrow-right-line" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
}
