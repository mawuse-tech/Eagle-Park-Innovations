import { connectDatabase } from '@/src/server/db';
import { safeUser, User } from '@/src/server/models/User';
import { cookieOptions, createSession, SESSION_COOKIE } from '@/src/server/auth';
import { errorResponse, HttpError, json, readBody } from '@/src/server/http';
export const runtime = 'nodejs';
export async function POST(request: Request) {
  try {
    const { email, password } = await readBody(request);
    if (typeof email !== 'string' || !email.trim() || typeof password !== 'string' || !password) throw new HttpError(400, 'Email and password are required');
    await connectDatabase();
    const user = await User.findOne({ email: email.trim().toLowerCase() }).select('+password');
    if (!user || !await user.comparePassword(password)) throw new HttpError(401, 'Invalid email or password');
    const session = createSession(user._id.toString());
    const response = json({ success: true, user: safeUser(user) });
    response.cookies.set(SESSION_COOKIE, session.token, { ...cookieOptions, expires: session.expires });
    return response;
  } catch (error) { return errorResponse(error); }
}
