import "server-only";
import mongoose, { Schema, type Model } from "mongoose";

type Subscriber = {
  _id: string;
  subscribedAt: Date;
  unsubscribeTokenHash?: string;
};

const schema = new Schema<Subscriber>({
  _id: { type: String, required: true },
  subscribedAt: { type: Date, required: true },
  unsubscribeTokenHash: {
    type: String,
    index: true,
    unique: true,
    sparse: true,
  },
});

export const NewsletterSubscriber =
  (mongoose.models.NewsletterSubscriber as Model<Subscriber> | undefined) ??
  mongoose.model<Subscriber>("NewsletterSubscriber", schema);
