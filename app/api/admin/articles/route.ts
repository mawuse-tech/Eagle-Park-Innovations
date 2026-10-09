import { requireAdmin } from '@/src/server/auth';
import { Article } from '@/src/server/models/Article';
import { connectDatabase } from '@/src/server/db';
import { errorResponse, HttpError, json, readBody } from '@/src/server/http';
import { articleUpdate } from './[id]/utils';

export const runtime = 'nodejs';
function slugify(value: string) { return value.toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 140); }
export async function GET() {
  try { await requireAdmin(); await connectDatabase(); const articles = await Article.find().sort({ updatedAt: -1 }).lean(); return json({ articles }); }
  catch (error) { return errorResponse(error); }
}
export async function POST(request: Request) {
  try {
    await requireAdmin(); await connectDatabase(); const data = articleUpdate(await readBody(request));
    const base = slugify(data.title) || `article-${Date.now()}`;
    let slug = base; let suffix = 2;
    while (await Article.exists({ slug })) slug = `${base}-${suffix++}`;
    const article = await Article.create({ ...data, slug });
    return json({ article }, 201);
  } catch (error) { return errorResponse(error); }
}
