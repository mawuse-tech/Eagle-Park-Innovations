import { HttpError } from '@/src/server/http';
import { formatText, formatTitle } from '@/src/lib/text-format';

export function eventData(body: Record<string, unknown>) {
  const rawTitle = typeof body.title === 'string' ? body.title.trim() : '';
  const date = typeof body.date === 'string' ? body.date : '';
  const rawPlace = typeof body.place === 'string' ? body.place.trim() : '';
  const cost = typeof body.cost === 'string' ? body.cost.trim() : '';
  const rawAudience = typeof body.audience === 'string' ? body.audience.trim() : '';
  const rawDescription = typeof body.description === 'string' ? body.description.trim() : '';
  const image = typeof body.image === 'string' ? body.image.trim() : '';
  const time = typeof body.time === 'string' ? body.time.trim() : '';
  const organizer = typeof body.organizer === 'string' ? body.organizer.trim() : '';
  const rawCapacity = body.capacity === '' || body.capacity === undefined || body.capacity === null ? null : Number(body.capacity);
  const title = formatTitle(rawTitle);
  const place = formatText(rawPlace);
  const audience = formatText(rawAudience);
  const description = formatText(rawDescription);
  const capacity = rawCapacity;
  const status = body.status === 'draft' ? 'draft' : body.status === 'published' ? 'published' : '';
  const parsedDate = Date.parse(`${date}T00:00:00.000Z`);
  const validDate = /^\d{4}-\d{2}-\d{2}$/.test(date) && Number.isFinite(parsedDate) && new Date(parsedDate).toISOString().slice(0, 10) === date;
  if (!title || !validDate || !place || !cost || !audience || !description || !status) throw new HttpError(400, 'Enter a title, valid date, place, cost, audience, description, and status.');
  if (time && !/^([01]\d|2[0-3]):[0-5]\d$/.test(time)) throw new HttpError(400, 'Enter a valid event time.');
  if (description.length > 10000 || organizer.length > 160 || image.length > 1000) throw new HttpError(400, 'One or more event details exceed the allowed length.');
  if (image && !/^https?:\/\//i.test(image) && !image.startsWith('/')) throw new HttpError(400, 'Event image must be a URL or site path.');
  if (capacity !== null && (!Number.isInteger(capacity) || capacity < 1 || capacity > 1000000)) throw new HttpError(400, 'Capacity must be a positive whole number.');
  return { title, date, time, place, cost: formatText(cost), audience, description, image, organizer: formatText(organizer), capacity, status };
}
