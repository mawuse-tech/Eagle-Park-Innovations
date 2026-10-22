import 'server-only';
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { DatabaseUnavailableError } from './db';

export class HttpError extends Error {
  constructor(public readonly status: number, message: string) { super(message); }
}
export function json(body: unknown, status = 200) {
  return NextResponse.json(body, { status, headers: { 'Cache-Control': 'no-store' } });
}
export function errorResponse(error: unknown) {
  if (error instanceof DatabaseUnavailableError || error instanceof mongoose.mongo.MongoNetworkError || error instanceof mongoose.mongo.MongoServerSelectionError) {
    return json({ success: false, message: 'Database unavailable. Please contact support. No automatic retry will be made.' }, 503);
  }
  if (error instanceof HttpError) return json({ success: false, message: error.message }, error.status);
  if (error && typeof error === 'object' && 'code' in error && error.code === 11000) {
    return json({ success: false, message: 'A user with that email already exists' }, 409);
  }
  if (error instanceof mongoose.Error.ValidationError) {
    return json({ success: false, message: Object.values(error.errors).map(item => item.message).join(', ') }, 400);
  }
  // Never serialize connection errors, credentials, or internal exception messages.
  return json({ success: false, message: 'Internal server error' }, 500);
}
export function requireSameOrigin(request: Request) {
  const origin = request.headers.get('origin');
  const expectedOrigins = new Set([new URL(request.url).origin]);
  const forwardedHost = request.headers.get('x-forwarded-host')?.split(',')[0]?.trim();
  if (forwardedHost) {
    const forwardedProto = request.headers.get('x-forwarded-proto')?.split(',')[0]?.trim();
    const protocol = forwardedProto === 'https' || forwardedProto === 'http'
      ? forwardedProto
      : new URL(request.url).protocol.slice(0, -1);
    try {
      expectedOrigins.add(new URL(`${protocol}://${forwardedHost}`).origin);
    } catch {
      // Ignore malformed proxy headers; the request URL origin remains authoritative.
    }
  }
  if ((origin && !expectedOrigins.has(origin)) || request.headers.get('sec-fetch-site') === 'cross-site') {
    throw new HttpError(403, 'Cross-origin requests are not allowed');
  }
}
export async function readBody(request: Request): Promise<Record<string, unknown>> {
  requireSameOrigin(request);
  if (!request.headers.get('content-type')?.toLowerCase().startsWith('application/json')) throw new HttpError(415, 'JSON content type is required');
  let body: unknown;
  try { body = await request.json(); } catch { throw new HttpError(400, 'Invalid JSON body'); }
  if (!body || typeof body !== 'object' || Array.isArray(body)) throw new HttpError(400, 'Invalid request body');
  return body as Record<string, unknown>;
}
