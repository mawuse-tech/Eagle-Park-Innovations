import 'server-only';
import mongoose, { Schema, type Model } from 'mongoose';

export interface ArticleFields {
  title: string; slug: string; coverImage: string; videoUrl: string; category: string; summary: string;
  content: string; contentBlocks: { image: string; heading: string; content: string }[];
  galleryImages?: string[]; sections?: { heading: string; content: string }[];
  author: string; publishedAt: Date | null; status: 'draft' | 'published';
  createdAt: Date; updatedAt: Date;
}
const articleSchema = new Schema<ArticleFields>({
  title: { type: String, required: true, trim: true, maxlength: 160 },
  slug: { type: String, required: true, unique: true, index: true },
  coverImage: { type: String, trim: true, default: '' },
  videoUrl: { type: String, trim: true, default: '' },
  category: { type: String, required: true, trim: true, maxlength: 60 },
  summary: { type: String, required: true, trim: true, maxlength: 360 },
  content: { type: String, required: true, trim: true, maxlength: 50000 },
  contentBlocks: { type: [{ image: { type: String, trim: true, maxlength: 1000, default: '' }, heading: { type: String, trim: true, maxlength: 140, default: '' }, content: { type: String, trim: true, maxlength: 15000, default: '' } }], default: [] },
  // Retained to read older articles; updates pair these legacy fields into contentBlocks.
  galleryImages: { type: [String], default: [] },
  sections: { type: [{ heading: { type: String, trim: true, maxlength: 140 }, content: { type: String, trim: true, maxlength: 15000 } }], default: [] },
  author: { type: String, required: true, trim: true, maxlength: 100 },
  publishedAt: { type: Date, default: null },
  status: { type: String, enum: ['draft', 'published'], default: 'draft', index: true },
}, { timestamps: true });
// Recompile when the model was cached by Next.js before a schema field was added.
const cachedArticleModel = mongoose.models.Article as Model<ArticleFields> | undefined;
if (cachedArticleModel && ['videoUrl', 'galleryImages', 'sections', 'contentBlocks'].some(path => !cachedArticleModel.schema.path(path))) delete mongoose.models.Article;
export const Article = (mongoose.models.Article as Model<ArticleFields> | undefined) ?? mongoose.model<ArticleFields>('Article', articleSchema);
