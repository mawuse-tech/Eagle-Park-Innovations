import type { Metadata } from 'next';
import { Suspense } from 'react';
import { AuthShell } from '@/src/auth/AuthShell';
import { LoginForm } from '@/src/auth/LoginForm';

export const metadata: Metadata = { title: 'Login | Eagle Park Innovations' };

export default function LoginPage() {
  return (
    <AuthShell title="Your agricultural marketplace, rooted in trust." text="Sign in to connect with quality agricultural products, training, and services designed to help farms and businesses grow.">
      <Suspense fallback={<p className="py-12 text-center text-green-900">Loading…</p>}><LoginForm /></Suspense>
    </AuthShell>
  );
}
