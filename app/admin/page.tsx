import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getAuthenticatedUser } from '@/src/server/auth';
import { AdminWelcome } from '@/src/auth/AdminWelcome';

export const metadata: Metadata = { title: 'Admin | Eagle Park Innovations' };

export default async function AdminPage() {
  const user = await getAuthenticatedUser();
  if (!user) redirect('/login?returnTo=/admin');
  if (user.role !== 'admin') redirect('/');
  return <AdminWelcome />;
}
