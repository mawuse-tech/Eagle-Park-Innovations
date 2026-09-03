import type { Metadata } from 'next';
import { RequireAuth } from '@/src/auth/RequireAuth';
import { AdminWelcome } from '@/src/auth/AdminWelcome';

export const metadata: Metadata = { title: 'Admin | Eagle Park Innovations' };

export default function AdminPage() {
  return <RequireAuth role="admin"><AdminWelcome /></RequireAuth>;
}
