import { createHash } from 'node:crypto';
import { requireAdmin } from '@/src/server/auth';
import { errorResponse, HttpError, json, requireSameOrigin } from '@/src/server/http';

export const runtime = 'nodejs';
const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
const ACCEPTED_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/gif']);

export async function POST(request: Request) {
  try {
    requireSameOrigin(request);
    await requireAdmin();
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;
    if (!cloudName || !apiKey || !apiSecret) throw new HttpError(503, 'Image uploads are not configured yet. You can still use an image URL.');

    const contentLength = Number(request.headers.get('content-length') || 0);
    if (contentLength > MAX_IMAGE_BYTES + 128 * 1024) throw new HttpError(413, 'Image must be 5 MB or smaller');
    const form = await request.formData();
    const image = form.get('image');
    if (!(image instanceof File)) throw new HttpError(400, 'Choose an image file to upload');
    if (image.size === 0 || image.size > MAX_IMAGE_BYTES) throw new HttpError(413, 'Image must be between 1 byte and 5 MB');
    if (!ACCEPTED_TYPES.has(image.type)) throw new HttpError(415, 'Use a JPEG, PNG, WebP, AVIF, or GIF image');

    const timestamp = Math.floor(Date.now() / 1000).toString();
    const signature = createHash('sha1').update(`folder=epi-news&timestamp=${timestamp}${apiSecret}`).digest('hex');
    const upload = new FormData();
    upload.append('file', image, image.name || 'article-image');
    upload.append('api_key', apiKey);
    upload.append('timestamp', timestamp);
    upload.append('folder', 'epi-news');
    upload.append('signature', signature);

    let response: Response;
    try {
      response = await fetch(`https://api.cloudinary.com/v1_1/${encodeURIComponent(cloudName)}/image/upload`, { method: 'POST', body: upload, cache: 'no-store' });
    } catch {
      throw new HttpError(502, 'Image storage could not be reached. Please try again.');
    }
    if (!response.ok) throw new HttpError(502, 'Image storage rejected the upload. Check the image and try again.');
    const result: unknown = await response.json().catch(() => null);
    if (!result || typeof result !== 'object' || !('secure_url' in result) || typeof result.secure_url !== 'string') throw new HttpError(502, 'Image storage returned an invalid response');
    return json({ url: result.secure_url });
  } catch (error) { return errorResponse(error); }
}
