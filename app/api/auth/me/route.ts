import { requireAuthentication } from '@/src/server/auth';
import { safeUser } from '@/src/server/models/User';
import { errorResponse, json } from '@/src/server/http';
export const runtime = 'nodejs';
export async function GET() {
  try { return json({ success: true, user: safeUser(await requireAuthentication()) }); }
  catch (error) { return errorResponse(error); }
}
