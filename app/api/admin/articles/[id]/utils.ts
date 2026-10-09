import { HttpError } from '@/src/server/http';
import { getVideoEmbedUrl } from '@/src/news/video';
const fields = ['title', 'coverImage', 'videoUrl', 'category', 'summary', 'content', 'contentBlocks', 'galleryImages', 'sections', 'author', 'publishedAt', 'status'] as const;
export function articleUpdate(body: Record<string, unknown>) {
  const value = Object.fromEntries(fields.map(key => [key, body[key]])) as Record<(typeof fields)[number], unknown>;
  for (const key of ['title', 'category', 'summary', 'content', 'author'] as const) if (typeof value[key] !== 'string' || !value[key].trim()) throw new HttpError(400, `${key} is required`);
  if (String(value.title).length > 160 || String(value.summary).length > 360 || String(value.content).length > 50000) throw new HttpError(400, 'One or more fields exceed the allowed length');
  if (value.status !== 'draft' && value.status !== 'published') throw new HttpError(400, 'Status must be draft or published');
  const image = value.coverImage || '';
  if (typeof image !== 'string' || (image && !/^https?:\/\//i.test(image) && !image.startsWith('/')) || image.length > 1000) throw new HttpError(400, 'Cover image must be a URL or site path');
  const videoUrl = value.videoUrl || '';
  if (typeof videoUrl !== 'string' || videoUrl.length > 1000 || (videoUrl && !getVideoEmbedUrl(videoUrl))) throw new HttpError(400, 'Video link must be a valid YouTube or Vimeo URL');
  const legacyImages = Array.isArray(value.galleryImages) ? value.galleryImages : [];
  const legacySections = Array.isArray(value.sections) ? value.sections : [];
  const legacyBlocks = Array.from({ length: Math.max(legacyImages.length, legacySections.length) }, (_, index) => ({ image: legacyImages[index] ?? image, ...(legacySections[index] && typeof legacySections[index] === 'object' ? legacySections[index] as object : {}) }));
  const submittedBlocks = value.contentBlocks === undefined ? legacyBlocks : value.contentBlocks;
  if (!Array.isArray(submittedBlocks) || submittedBlocks.length > 8) throw new HttpError(400, 'Add up to 8 paired image and text blocks');
  const contentBlocks = submittedBlocks.map((block, index) => {
    if (!block || typeof block !== 'object' || Array.isArray(block)) throw new HttpError(400, `Content block ${index + 1} is invalid`);
    const item = block as Record<string, unknown>;
    const blockImage = item.image ?? '';
    const heading = item.heading ?? '';
    const blockContent = item.content ?? '';
    if (typeof blockImage !== 'string' || blockImage.length > 1000 || (blockImage && !/^https?:\/\//i.test(blockImage) && !blockImage.startsWith('/'))) throw new HttpError(400, `Content block ${index + 1} needs a valid image URL`);
    if (typeof heading !== 'string' || heading.length > 140 || typeof blockContent !== 'string' || blockContent.length > 15000) throw new HttpError(400, `Content block ${index + 1} exceeds the allowed text length`);
    if (value.status === 'published' && (!blockImage || !heading.trim() || !blockContent.trim())) throw new HttpError(400, `Published content block ${index + 1} needs an image, heading and description`);
    return { image: blockImage, heading: heading.trim(), content: blockContent.trim() };
  });
  const date = value.publishedAt ? new Date(String(value.publishedAt)) : new Date();
  if (Number.isNaN(date.getTime())) throw new HttpError(400, 'Publication date is invalid');
  return { title: String(value.title).trim(), coverImage: image, videoUrl, category: String(value.category).trim(), summary: String(value.summary).trim(), content: String(value.content).trim(), contentBlocks, galleryImages: [], sections: [], author: String(value.author).trim(), status: value.status as 'draft' | 'published', publishedAt: value.status === 'published' ? date : null };
}
