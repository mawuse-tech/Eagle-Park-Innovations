import { randomUUID } from 'node:crypto';
import nextEnv from '@next/env';
import mongoose from 'mongoose';
import { connectDatabase } from '../src/server/db';
import { User } from '../src/server/models/User';
import { Article } from '../src/server/models/Article';

nextEnv.loadEnvConfig(process.cwd());
const base = process.env.NEWS_TEST_URL || 'http://localhost:3000';
const marker = randomUUID();
const email = `news-flow-${marker}@example.invalid`;
const password = randomUUID();
let articleId = '';
function assert(value: unknown, message: string): asserts value { if (!value) throw new Error(message); }
async function request(path: string, method = 'GET', body?: unknown, cookie = '') {
  return fetch(`${base}${path}`, { method, headers: { Origin: base, ...(body ? { 'Content-Type': 'application/json' } : {}), ...(cookie ? { Cookie: cookie } : {}) }, ...(body ? { body: JSON.stringify(body) } : {}) });
}
try {
  await connectDatabase();
  await User.create({ name: 'News flow test', email, password, role: 'admin' });
  const login = await request('/api/auth/login', 'POST', { email, password });
  assert(login.ok, 'Temporary admin login failed');
  const cookie = login.headers.get('set-cookie')?.split(';')[0] || '';
  assert(cookie, 'Admin session cookie was not set');
  const article = { title: `News flow ${marker}`, category: 'Integration check', coverImage: '', videoUrl: 'https://youtu.be/dQw4w9WgXcQ', summary: 'Temporary flow check.', content: 'Opening paragraph.\n\nSecond paragraph.\n\nRemaining content.', author: 'Test Admin', publishedAt: new Date().toISOString(), status: 'published' };
  const created = await request('/api/admin/articles', 'POST', article, cookie);
  assert(created.status === 201, `Article publish failed with ${created.status}`);
  const createdBody = await created.json();
  articleId = createdBody.article._id;
  assert(createdBody.article.videoUrl === article.videoUrl, 'Video URL was not returned after saving');
  const storedArticle = await Article.findById(articleId).lean();
  assert(storedArticle?.videoUrl === article.videoUrl, 'Video URL was not persisted to MongoDB');
  const listing = await request('/api/news');
  const publicArticles = (await listing.json()).articles as Array<{ slug: string; title: string }>;
  assert(publicArticles.some(item => item.slug === createdBody.article.slug && item.title === article.title), 'Published article missing from public listing');
  const detail = await request(`/api/news/${createdBody.article.slug}`);
  const detailBody = (await detail.json()).article;
  assert(detail.ok && detailBody.content === article.content && detailBody.videoUrl === article.videoUrl, 'Published article content or video URL was not returned by the detail endpoint');
  const unpublished = await request(`/api/admin/articles/${articleId}`, 'PATCH', { ...article, status: 'draft' }, cookie);
  assert(unpublished.ok, 'Unpublish action failed');
  const afterUnpublish = (await (await request('/api/news')).json()).articles as Array<{ slug: string }>;
  assert(!afterUnpublish.some(item => item.slug === createdBody.article.slug), 'Draft leaked into public listing');
  assert((await request(`/api/news/${createdBody.article.slug}`)).status === 404, 'Unpublished article detail was still public');
  console.log('PASS: video URL persisted in MongoDB → public detail → unpublish privacy flow.');
} catch (error) {
  console.error(error instanceof Error ? error.message : 'News flow check failed');
  process.exitCode = 1;
} finally {
  if (articleId) await Article.findByIdAndDelete(articleId).catch(() => null);
  await User.deleteOne({ email }).catch(() => null);
  if (mongoose.connection.readyState) await mongoose.disconnect();
}
