import 'server-only';
import { cookies } from 'next/headers';
import jwt, { type JwtPayload, type SignOptions } from 'jsonwebtoken';
import mongoose from 'mongoose';
import { connectDatabase } from './db';
import { User } from './models/User';
import { HttpError } from './http';

export const SESSION_COOKIE = 'eagle_park_session';
export const cookieOptions = { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax' as const, path: '/' };
interface SessionPayload extends JwtPayload { userId: string; exp: number; }
function secret(): string {
  if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET is not defined');
  return process.env.JWT_SECRET;
}
export function createSession(userId: string) {
  const token = jwt.sign({ userId }, secret(), { algorithm: 'HS256', expiresIn: (process.env.JWT_EXPIRES_IN || '7d') as SignOptions['expiresIn'] });
  const payload = jwt.decode(token) as SessionPayload;
  return { token, expires: new Date(payload.exp * 1000) };
}
export async function getAuthenticatedUser() {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token) return null;
  const key = secret();
  let payload: JwtPayload | string;
  try { payload = jwt.verify(token, key, { algorithms: ['HS256'] }); } catch { return null; }
  if (typeof payload === 'string' || typeof payload.userId !== 'string' || !mongoose.isValidObjectId(payload.userId) || typeof payload.exp !== 'number') return null;
  await connectDatabase();
  return User.findById(payload.userId);
}
export async function requireAuthentication() {
  const user = await getAuthenticatedUser();
  if (!user) throw new HttpError(401, 'Authentication is required');
  return user;
}
export async function requireAdmin() {
  const user = await requireAuthentication();
  if (user.role !== 'admin') throw new HttpError(403, 'You do not have permission to access this resource');
  return user;
}
