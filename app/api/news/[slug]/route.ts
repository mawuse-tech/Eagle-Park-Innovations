import { Article } from '@/src/server/models/Article';
import { connectDatabase } from '@/src/server/db';
import { errorResponse, HttpError, json } from '@/src/server/http';

export const runtime = 'nodejs';
export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    await connectDatabase();
    const { slug } = await params;
    const article = await Article.findOne({ slug, status: 'published' }).lean();
    if (!article) throw new HttpError(404, 'Article not found');
    const { _id, ...fields } = article;
    return json({ article: { id: String(_id), ...fields } });
  } catch (error) { return errorResponse(error); }
}
