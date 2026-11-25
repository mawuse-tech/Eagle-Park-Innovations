import { createHash, randomBytes } from "node:crypto";
import { isUnsubscribeToken } from "@/src/news/unsubscribeToken";
import { connectDatabase } from "@/src/server/db";
import { errorResponse, HttpError, json, readBody } from "@/src/server/http";
import { NewsletterSubscriber } from "@/src/server/models/NewsletterSubscriber";

export const runtime = "nodejs";

function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

function normalizeEmail(value: unknown) {
  const email = typeof value === "string" ? value.trim().toLowerCase() : "";
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new HttpError(400, "Enter a valid email address.");
  }
  return email;
}

export async function POST(request: Request) {
  try {
    const body = await readBody(request);
    const email = normalizeEmail(body.email);

    await connectDatabase();
    const token = randomBytes(32).toString("hex");
    const result = await NewsletterSubscriber.updateOne(
      { _id: email },
      {
        $setOnInsert: {
          subscribedAt: new Date(),
          unsubscribeTokenHash: hashToken(token),
        },
      },
      { upsert: true },
    );
    return json({
      success: true,
      ...(result.upsertedCount === 1 && { unsubscribeToken: token }),
    });
  } catch (error) {
    return errorResponse(error);
  }
}

export async function DELETE(request: Request) {
  try {
    const { email, token } = await readBody(request);
    if (token !== undefined && !isUnsubscribeToken(token)) {
      throw new HttpError(400, "A valid unsubscribe link is required.");
    }

    const filter =
      token === undefined
        ? { _id: normalizeEmail(email) }
        : { unsubscribeTokenHash: hashToken(token) };
    await connectDatabase();
    await NewsletterSubscriber.deleteOne(filter);
    return json({ success: true });
  } catch (error) {
    return errorResponse(error);
  }
}
