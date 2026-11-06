import 'server-only';
import mongoose, { Schema, type Model } from 'mongoose';

export interface EventFields {
  title: string;
  date: string;
  time: string;
  place: string;
  cost: string;
  audience: string;
  description: string;
  image: string;
  organizer: string;
  capacity: number | null;
  status: 'draft' | 'published';
  createdAt: Date;
  updatedAt: Date;
}

const eventSchema = new Schema<EventFields>({
  title: { type: String, required: true, trim: true, maxlength: 160 },
  date: { type: String, required: true, match: /^\d{4}-\d{2}-\d{2}$/ },
  time: { type: String, trim: true, maxlength: 80, default: '' },
  place: { type: String, required: true, trim: true, maxlength: 180 },
  cost: { type: String, required: true, trim: true, maxlength: 80, default: 'Free' },
  audience: { type: String, required: true, trim: true, maxlength: 240 },
  description: { type: String, required: true, trim: true, maxlength: 10000 },
  image: { type: String, trim: true, maxlength: 1000, default: '' },
  organizer: { type: String, trim: true, maxlength: 160, default: '' },
  capacity: { type: Number, min: 1, default: null },
  status: { type: String, enum: ['draft', 'published'], default: 'published', index: true },
}, { timestamps: true });

const cachedEventModel = mongoose.models.EpiEvent as Model<EventFields> | undefined;
if (cachedEventModel && ['time', 'description', 'image', 'organizer', 'capacity'].some(path => !cachedEventModel.schema.path(path))) delete mongoose.models.EpiEvent;
export const EventModel = (mongoose.models.EpiEvent as Model<EventFields> | undefined) ?? mongoose.model<EventFields>('EpiEvent', eventSchema);
