import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import mongoose from 'mongoose';
import { connectDatabase } from '@/src/server/db';
import { EventModel } from '@/src/server/models/Event';

export const dynamic = 'force-dynamic';
type Props = { params: Promise<{ id: string }> };

async function getEvent(id: string) {
  if (!mongoose.isValidObjectId(id)) return null;
  await connectDatabase();
  return EventModel.findOne({ _id: id, status: 'published' }).lean();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  try {
    const event = await getEvent(id);
    return event ? { title: `${event.title} | EPI Events`, description: event.description || `Event details for ${event.title}.` } : { title: 'Event not found | EPI' };
  } catch {
    return { title: 'Events & Announcements | EPI' };
  }
}

export default async function EventDetailsPage({ params }: Props) {
  const { id } = await params;
  let event;
  try { event = await getEvent(id); } catch { notFound(); }
  if (!event) notFound();

  const date = new Date(`${event.date}T12:00:00`);
  const formattedDate = date.toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  const formattedTime = event.time ? new Date(`1970-01-01T${event.time}:00`).toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' }) : 'To be announced';
  const joinUrl = `https://wa.me/233243919417?text=${encodeURIComponent(`Hi EPI, I’d like to join ${event.title} on ${event.date}. Please send me the details.`)}`;
  const paragraphs = (event.description || 'Please contact EPI for more information about this event.').split(/\n\s*\n/).filter(Boolean);

  return <main className="event-details-page editorial-width">
    <Link href="/news#events" className="event-details-back"><i className="ri-arrow-left-line" aria-hidden="true"/> Back to events</Link>
    <article className="event-details-card">
      {event.image ? <img className="event-details-image" src={event.image} alt={event.title}/> : <div className="event-details-image event-card-image-placeholder"><i className="ri-calendar-event-line" aria-hidden="true"/></div>}
      <div className="event-details-content">
        <p className="eyebrow">EPI EVENT</p>
        <h1>{event.title}</h1>
        <div className="event-details-facts">
          <p><i className="ri-calendar-line" aria-hidden="true"/><span><strong>Date</strong>{formattedDate}</span></p>
          <p><i className="ri-time-line" aria-hidden="true"/><span><strong>Time</strong>{formattedTime}</span></p>
          <p><i className="ri-map-pin-line" aria-hidden="true"/><span><strong>Location</strong>{event.place}</span></p>
          <p><i className="ri-money-dollar-circle-line" aria-hidden="true"/><span><strong>Cost</strong>{event.cost || 'Free'}</span></p>
          <p><i className="ri-group-line" aria-hidden="true"/><span><strong>Who it is for</strong>{event.audience}</span></p>
          {event.organizer && <p><i className="ri-user-3-line" aria-hidden="true"/><span><strong>Organizer</strong>{event.organizer}</span></p>}
          {event.capacity && <p><i className="ri-team-line" aria-hidden="true"/><span><strong>Capacity</strong>{event.capacity} attendees</span></p>}
        </div>
        <section className="event-details-description"><h2>About this event</h2>{paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}</section>
        <div className="event-details-actions"><a className="primary-link" href={joinUrl} target="_blank" rel="noopener noreferrer">Join on WhatsApp <i className="ri-whatsapp-line" aria-hidden="true"/></a><Link className="outline-link" href={`/contact?event=${encodeURIComponent(event.title)}`}>Register <i className="ri-arrow-right-line" aria-hidden="true"/></Link></div>
      </div>
    </article>
  </main>;
}
