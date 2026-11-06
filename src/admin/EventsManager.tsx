'use client';
import { useCallback, useEffect, useState, type FormEvent } from 'react';
import { apiRequest } from '@/src/lib/api';
import { confirmAdminDelete, showAdminAlert } from './alerts';

type EventItem = { _id: string; title: string; date: string; time: string; place: string; cost: string; audience: string; description: string; image: string; organizer: string; capacity: number | null; status: 'draft' | 'published' };
type EventForm = Omit<EventItem, '_id'>;
const blank: EventForm = { title: '', date: '', time: '', place: '', cost: 'Free', audience: '', description: '', image: '', organizer: '', capacity: null, status: 'published' };
function notifyPublicEventsChanged() {
  window.dispatchEvent(new Event('epi-events-updated'));
  try { window.localStorage.setItem('epi-events-updated', String(Date.now())); } catch { /* Storage can be unavailable in private browsing. */ }
}

export default function EventsManager() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [form, setForm] = useState<EventForm>(blank);
  const [editing, setEditing] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [uploading, setUploading] = useState(false);
  const load = useCallback(async () => {
    setLoading(true);
    try { const result = await apiRequest<{ events: EventItem[] }>('/api/admin/events'); setEvents(result.events); }
    catch (e) { void showAdminAlert('error', 'Could not load events', e instanceof Error ? e.message : 'Unable to load events'); }
    finally { setLoading(false); }
  }, []);
  useEffect(() => { void load(); }, [load]);
  function reset() { setForm(blank); setEditing(null); }
  async function uploadImage(file?: File) {
    if (!file) return;
    setUploading(true);
    try {
      const upload = new FormData(); upload.append('image', file);
      const result = await apiRequest<{ url: string }>('/api/admin/articles/upload', { method: 'POST', body: upload });
      setForm(current => ({ ...current, image: result.url }));
      void showAdminAlert('success', 'Event image uploaded', 'Save the event to keep this image.');
    } catch (error) { void showAdminAlert('error', 'Image upload failed', error instanceof Error ? error.message : 'Please try again.'); }
    finally { setUploading(false); }
  }
  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true);
    try {
      if (editing) await apiRequest(`/api/admin/events/${editing}`, { method: 'PATCH', body: JSON.stringify(form) });
      else await apiRequest('/api/admin/events', { method: 'POST', body: JSON.stringify(form) });
      notifyPublicEventsChanged();
      void showAdminAlert('success', form.status === 'published' ? 'Event published' : 'Draft saved'); reset(); await load();
    } catch (e) { void showAdminAlert('error', 'Could not save event', e instanceof Error ? e.message : 'Please try again.'); }
    finally { setBusy(false); }
  }
  async function remove(item: EventItem) {
    if (!await confirmAdminDelete(item.title)) return;
    try { await apiRequest(`/api/admin/events/${item._id}`, { method: 'DELETE' }); notifyPublicEventsChanged(); void showAdminAlert('success', 'Event deleted'); await load(); }
    catch (e) { void showAdminAlert('error', 'Delete failed', e instanceof Error ? e.message : 'Please try again.'); }
  }
  const update = (key: keyof EventForm, value: string) => setForm(current => ({ ...current, [key]: value }));

  return <>
    <div className="admin-title-row"><div><p className="eyebrow">PUBLISHING WORKSPACE</p><h1>Events &amp; Announcements</h1><p>Schedule open sessions and share joining details with your community.</p></div><button className="admin-primary" onClick={() => { reset(); document.getElementById('event-editor')?.scrollIntoView({ behavior: 'smooth' }); }}><i className="ri-add-line" /> New event</button></div>
    <div className="admin-stats"><div><small>TOTAL EVENTS</small><strong>{events.length}</strong><span>Across your schedule</span></div><div><small>PUBLISHED</small><strong>{events.filter(item => item.status === 'published').length}</strong><span>Visible before their date</span></div><div><small>DRAFTS</small><strong>{events.filter(item => item.status === 'draft').length}</strong><span>Only in your workspace</span></div></div>
    <section className="admin-panel"><div className="admin-panel-heading"><div><h2>Your events</h2><p>Published events disappear from the public page after their date.</p></div></div>
      {loading ? <p className="admin-state">Loading events…</p> : events.length ? <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>EVENT</th><th>DATE</th><th>PLACE</th><th>STATUS</th><th><span className="sr-only">Actions</span></th></tr></thead><tbody>{events.map(item => <tr key={item._id}><td><div className="admin-event-cell"><strong>{item.title}</strong><small>{item.audience} · {item.cost}</small></div></td><td>{new Date(`${item.date}T12:00:00`).toLocaleDateString()}</td><td>{item.place}</td><td><span className={`admin-status ${item.status}`}>● {item.status === 'published' ? 'Published' : 'Draft'}</span>{new Date(`${item.date}T23:59:59`).getTime() < Date.now() && <small className="admin-event-past">Past date · hidden publicly</small>}</td><td><div className="admin-actions"><button title="Edit" onClick={() => { setForm({ title: item.title, date: item.date, time: item.time || '', place: item.place, cost: item.cost, audience: item.audience, description: item.description || '', image: item.image || '', organizer: item.organizer || '', capacity: item.capacity ?? null, status: item.status }); setEditing(item._id); document.getElementById('event-editor')?.scrollIntoView({ behavior: 'smooth' }); }}><i className="ri-edit-line" /></button><button title="Delete" onClick={() => void remove(item)}><i className="ri-delete-bin-line" /></button></div></td></tr>)}</tbody></table></div> : <div className="admin-state"><i className="ri-calendar-event-line"/><strong>No events added yet</strong><span>Add an open session here; it will appear separately from your stories.</span></div>}
    </section>
    <section id="event-editor" className="admin-panel admin-editor"><div className="admin-panel-heading"><div><h2>{editing ? 'Edit event' : 'Add an event'}</h2><p>Add the full event information for the public details page.</p></div>{editing && <button className="admin-quiet" onClick={reset}>Cancel editing</button>}</div><form onSubmit={save}><div className="admin-form-grid">
      <label className="wide">Event title<input required maxLength={160} value={form.title} onChange={e => update('title', e.target.value)} placeholder="e.g. Open poultry health training" /></label>
      <div className="wide admin-image-field"><label>Event image</label><div className="admin-image-upload"><label htmlFor="event-image-file" className="admin-quiet">{uploading ? 'Uploading…' : form.image ? 'Replace event image' : 'Choose event image'}</label><input id="event-image-file" type="file" accept="image/jpeg,image/png,image/webp,image/avif,image/gif" disabled={uploading} onChange={e => { void uploadImage(e.target.files?.[0]); e.currentTarget.value = ''; }}/><small>Optional · JPEG, PNG, WebP, AVIF or GIF · up to 5 MB</small></div>{form.image && <img className="admin-cover-preview" src={form.image} alt="Event preview"/>}</div>
      <label>Date<input required type="date" value={form.date} onChange={e => update('date', e.target.value)} /></label><label>Time<input type="time" value={form.time} onChange={e => update('time', e.target.value)} /></label>
      <label>Place or format<input required maxLength={180} value={form.place} onChange={e => update('place', e.target.value)} placeholder="e.g. Nyankpala or Online" /></label><label>Cost<input required maxLength={80} value={form.cost} onChange={e => update('cost', e.target.value)} placeholder="Free or GHS amount" /></label>
      <label>Who it is for<input required maxLength={240} value={form.audience} onChange={e => update('audience', e.target.value)} placeholder="e.g. Smallholder poultry farmers" /></label><label>Organizer<input maxLength={160} value={form.organizer} onChange={e => update('organizer', e.target.value)} placeholder="Eagle Park Innovations" /></label>
      <label>Capacity<input type="number" min="1" max="1000000" value={form.capacity ?? ''} onChange={e => setForm(current => ({ ...current, capacity: e.target.value ? Number(e.target.value) : null }))} placeholder="Optional" /></label><label>Status<select value={form.status} onChange={e => update('status', e.target.value)}><option value="published">Published</option><option value="draft">Draft</option></select></label>
      <label className="wide">Full description<textarea required maxLength={10000} rows={7} value={form.description} onChange={e => update('description', e.target.value)} placeholder="Share what attendees will learn, do, or need to bring." /></label>
      </div><div className="admin-form-footer"><span>Past events are hidden from the public schedule automatically.</span><div><button type="button" className="admin-quiet" onClick={reset}>Clear</button><button type="submit" className="admin-primary" disabled={busy || uploading}>{busy ? 'Saving…' : editing ? 'Save changes' : 'Save event'}</button></div></div></form></section>
  </>;
}
