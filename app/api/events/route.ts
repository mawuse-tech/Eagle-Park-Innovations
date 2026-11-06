import { EventModel } from '@/src/server/models/Event';
import { connectDatabase } from '@/src/server/db';
import { errorResponse, json } from '@/src/server/http';

export const runtime = 'nodejs';
export async function GET() {
  try {
    await connectDatabase();
    const today = new Date().toISOString().slice(0, 10);
    const events = await EventModel.find({ status: 'published', date: { $gte: today } }).sort({ date: 1 }).lean();
    return json({ events: events.map(({ _id, title, date, time, place, cost, audience, image, description, organizer, capacity }) => ({ id: String(_id), title, date, time, place, cost, audience, image, description, organizer, capacity })) });
  } catch (error) { return errorResponse(error); }
}
