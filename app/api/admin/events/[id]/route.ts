import mongoose from 'mongoose';
import { requireAdmin } from '@/src/server/auth';
import { EventModel } from '@/src/server/models/Event';
import { connectDatabase } from '@/src/server/db';
import { errorResponse, HttpError, json, readBody, requireSameOrigin } from '@/src/server/http';
import { eventData } from '../utils';

export const runtime = 'nodejs';
export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try { await requireAdmin(); await connectDatabase(); const { id } = await params; if (!mongoose.isValidObjectId(id)) throw new HttpError(404, 'Event not found'); const event = await EventModel.findByIdAndUpdate(id, eventData(await readBody(request)), { new: true, runValidators: true }); if (!event) throw new HttpError(404, 'Event not found'); return json({ event }); }
  catch (error) { return errorResponse(error); }
}
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try { requireSameOrigin(request); await requireAdmin(); await connectDatabase(); const { id } = await params; if (!mongoose.isValidObjectId(id)) throw new HttpError(404, 'Event not found'); const event = await EventModel.findByIdAndDelete(id); if (!event) throw new HttpError(404, 'Event not found'); return json({ success: true }); }
  catch (error) { return errorResponse(error); }
}
