import { Article } from '@/src/server/models/Article';
import { connectDatabase } from '@/src/server/db';
import { errorResponse, json } from '@/src/server/http';

export const runtime = 'nodejs';
export async function GET() {
  try {
    await connectDatabase();
    const articles = await Article.find({ status: 'published' }).sort({ publishedAt: -1 }).lean();
    return json({ articles: articles.map(({ _id, title, slug, coverImage, videoUrl, category, summary, content, author, publishedAt }) => ({ id: String(_id), title, slug, coverImage, videoUrl, category, summary, content, author, publishedAt })) });
  } catch (error) { return errorResponse(error); }
}
