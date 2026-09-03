'use client';

import { useEffect, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from './AuthProvider';
import type { UserRole } from '@/src/types/auth';

export function RequireAuth({ children, role }: Readonly<{ children: ReactNode; role?: UserRole }>) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const isAllowed = Boolean(user && (!role || user.role === role));

  useEffect(() => {
    if (isLoading) return;
    if (!user) router.replace('/login');
    else if (role && user.role !== role) router.replace('/');
  }, [isLoading, role, router, user]);

  if (isLoading || !isAllowed) {
    return (
      <div className="flex min-h-[55vh] items-center justify-center bg-[#f4f4f4]" role="status" aria-live="polite">
        <div className="flex items-center gap-3 text-green-900">
          <span className="h-6 w-6 animate-spin rounded-full border-2 border-green-800 border-t-transparent" aria-hidden="true" />
          <span className="font-medium">Checking your account…</span>
        </div>
      </div>
    );
  }

  return children;
}
