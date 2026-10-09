import { HttpError } from '@/src/server/http';
import { getVideoEmbedUrl } from '@/src/news/video';
const fields = ['title', 'coverImage', 'videoUrl', 'category', 'summary', 'content', 'author', 'publishedAt', 'status'] as const;
export function articleUpdate(body: Record<string, unknown>) {
  const value = Object.fromEntries(fields.map(key => [key, body[key]])) as Record<(typeof fields)[number], unknown>;
  for (const key of ['title', 'category', 'summary', 'content', 'author'] as const) if (typeof value[key] !== 'string' || !value[key].trim()) throw new HttpError(400, `${key} is required`);
  if (String(value.title).length > 160 || String(value.summary).length > 360 || String(value.content).length > 50000) throw new HttpError(400, 'One or more fields exceed the allowed length');
  if (value.status !== 'draft' && value.status !== 'published') throw new HttpError(400, 'Status must be draft or published');
  const image = value.coverImage || '';
  if (typeof image !== 'string' || (image && !/^https?:\/\//i.test(image) && !image.startsWith('/')) || image.length > 1000) throw new HttpError(400, 'Cover image must be a URL or site path');
  const videoUrl = value.videoUrl || '';
  if (typeof videoUrl !== 'string' || videoUrl.length > 1000 || (videoUrl && !getVideoEmbedUrl(videoUrl))) throw new HttpError(400, 'Video link must be a valid YouTube or Vimeo URL');
  const date = value.publishedAt ? new Date(String(value.publishedAt)) : new Date();
  if (Number.isNaN(date.getTime())) throw new HttpError(400, 'Publication date is invalid');
  return { title: String(value.title).trim(), coverImage: image, videoUrl, category: String(value.category).trim(), summary: String(value.summary).trim(), content: String(value.content).trim(), author: String(value.author).trim(), status: value.status as 'draft' | 'published', publishedAt: value.status === 'published' ? date : null };
}
