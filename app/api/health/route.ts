import { json } from '@/src/server/http';
export function GET() { return json({ success: true, message: 'E-commerce API is running' }); }
