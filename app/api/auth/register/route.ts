import { connectDatabase } from '@/src/server/db';
import { safeUser, User } from '@/src/server/models/User';
import { errorResponse, HttpError, json, readBody } from '@/src/server/http';
export const runtime = 'nodejs';
export async function POST(request: Request) {
  try {
    const { name, email, password } = await readBody(request);
    if (typeof name !== 'string' || !name.trim() || typeof email !== 'string' || !/^\S+@\S+\.\S+$/.test(email.trim()) || typeof password !== 'string' || password.length < 8) {
      throw new HttpError(400, 'Name, valid email, and a password of at least 8 characters are required');
    }
    await connectDatabase();
    const normalizedEmail = email.trim().toLowerCase();
    if (await User.exists({ email: normalizedEmail })) throw new HttpError(409, 'A user with that email already exists');
    const user = await User.create({ name: name.trim(), email: normalizedEmail, password, role: 'user' });
    return json({ success: true, message: 'User registered successfully', user: safeUser(user) }, 201);
  } catch (error) { return errorResponse(error); }
}
