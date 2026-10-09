import mongoose from 'mongoose';
import { requireAdmin } from '@/src/server/auth';
import { Article } from '@/src/server/models/Article';
import { connectDatabase } from '@/src/server/db';
import { errorResponse, HttpError, json, readBody, requireSameOrigin } from '@/src/server/http';
import { articleUpdate } from './utils';

export const runtime = 'nodejs';
export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin(); await connectDatabase(); const { id } = await params;
    if (!mongoose.isValidObjectId(id)) throw new HttpError(404, 'Article not found');
    const data = articleUpdate(await readBody(request));
    const article = await Article.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    if (!article) throw new HttpError(404, 'Article not found');
    return json({ article });
  } catch (error) { return errorResponse(error); }
}
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try { requireSameOrigin(request); await requireAdmin(); await connectDatabase(); const { id } = await params; if (!mongoose.isValidObjectId(id)) throw new HttpError(404, 'Article not found'); const article = await Article.findByIdAndDelete(id); if (!article) throw new HttpError(404, 'Article not found'); return json({ success: true }); }
  catch (error) { return errorResponse(error); }
}
