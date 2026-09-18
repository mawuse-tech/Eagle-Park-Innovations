import { requireAdmin } from '@/src/server/auth';
import { errorResponse, json } from '@/src/server/http';
export const runtime = 'nodejs';
export async function GET() {
  try { await requireAdmin(); return json({ message: 'Admin' }); }
  catch (error) { return errorResponse(error); }
}
