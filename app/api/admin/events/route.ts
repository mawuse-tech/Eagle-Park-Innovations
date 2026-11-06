import { requireAdmin } from '@/src/server/auth';
import { EventModel } from '@/src/server/models/Event';
import { connectDatabase } from '@/src/server/db';
import { errorResponse, json, readBody } from '@/src/server/http';
import { eventData } from './utils';

export const runtime = 'nodejs';
export async function GET() {
  try { await requireAdmin(); await connectDatabase(); const events = await EventModel.find().sort({ date: 1 }).lean(); return json({ events }); }
  catch (error) { return errorResponse(error); }
}
export async function POST(request: Request) {
  try { await requireAdmin(); await connectDatabase(); const event = await EventModel.create(eventData(await readBody(request))); return json({ event }, 201); }
  catch (error) { return errorResponse(error); }
}
