'use client';

import { useCallback, useEffect, useState, type FormEvent } from 'react';
import Link from 'next/link';
import Swal from 'sweetalert2';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from './AuthProvider';
import { ApiError } from '@/src/lib/api';

interface LoginErrors { email?: string; password?: string; form?: string; }

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, user, isLoading: isCheckingAuth } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<LoginErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const requestedDestination = searchParams.get('returnTo');
  const safeReturnTo = requestedDestination?.startsWith('/') && !requestedDestination.startsWith('//')
    ? requestedDestination
    : '/';

  const destinationFor = useCallback((role: 'user' | 'admin'): string => {
    return role === 'admin' ? '/admin' : safeReturnTo;
  }, [safeReturnTo]);

  useEffect(() => {
    if (!isCheckingAuth && user) router.replace(destinationFor(user.role));
  }, [destinationFor, isCheckingAuth, router, user]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors: LoginErrors = {};
    if (!email.trim()) nextErrors.email = 'Email is required.';
    else if (!/^\S+@\S+\.\S+$/.test(email)) nextErrors.email = 'Enter a valid email address.';
    if (!password) nextErrors.password = 'Password is required.';
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);
    try {
      const authenticatedUser = await login({ email: email.trim().toLowerCase(), password });
      router.replace(destinationFor(authenticatedUser.role));
    } catch (error) {
      setErrors({ form: error instanceof ApiError || error instanceof Error ? error.message : 'Login failed. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div>
      <div className="mb-7">
        <p className="text-sm font-semibold uppercase tracking-wider text-green-700">Welcome back</p>
        <h2 className="mt-1 text-3xl font-bold text-green-950">Sign in to your account</h2>
      </div>

      {searchParams.get('registered') === 'true' && (
        <p className="mb-5 rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-800" role="status">Registration successful. You can now sign in.</p>
      )}
      {errors.form && <p className="mb-5 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700" role="alert">{errors.form}</p>}

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <div>
          <label htmlFor="login-email" className="mb-1.5 block text-sm font-semibold text-green-950">Email address</label>
          <input id="login-email" type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'login-email-error' : undefined} className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-green-700 focus:ring-2 focus:ring-green-700/20" placeholder="you@example.com" />
          {errors.email && <p id="login-email-error" className="mt-1.5 text-sm text-red-700">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="login-password" className="mb-1.5 block text-sm font-semibold text-green-950">Password</label>
          <input id="login-password" type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} aria-invalid={Boolean(errors.password)} aria-describedby={errors.password ? 'login-password-error' : undefined} className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-green-700 focus:ring-2 focus:ring-green-700/20" placeholder="Enter your password" />
          {errors.password && <p id="login-password-error" className="mt-1.5 text-sm text-red-700">{errors.password}</p>}
        </div>
        <div className="flex flex-wrap items-center justify-end gap-2 text-sm">
          <button type="button" onClick={() => { void Swal.fire({ icon: 'info', title: 'Coming soon', text: 'Password reset is not available yet. Please check back soon.', confirmButtonText: 'Got it', confirmButtonColor: '#386347' }); }} className="cursor-pointer font-medium text-green-800 underline-offset-4 hover:underline">Forgot password?</button>
        </div>
        <button type="submit" disabled={isSubmitting || isCheckingAuth} className="flex w-full items-center justify-center gap-2 rounded-full bg-green-900 px-5 py-3 font-semibold text-white transition hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60">
          {isSubmitting && <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" aria-hidden="true" />}
          {isSubmitting ? 'Signing in…' : 'Login'}
        </button>
      </form>
      <p className="mt-6 text-center text-sm text-gray-600">New to Eagle Park? <Link href="/register" className="font-semibold text-green-800 underline-offset-4 hover:underline">Create an account</Link></p>
    </div>
  );
}
