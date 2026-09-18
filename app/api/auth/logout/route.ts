import { cookieOptions, SESSION_COOKIE } from '@/src/server/auth';
import { errorResponse, json, requireSameOrigin } from '@/src/server/http';
export const runtime = 'nodejs';
export async function POST(request: Request) {
  try {
    requireSameOrigin(request);
    const response = json({ success: true });
    response.cookies.set(SESSION_COOKIE, '', { ...cookieOptions, expires: new Date(0), maxAge: 0 });
    return response;
  } catch (error) { return errorResponse(error); }
}
