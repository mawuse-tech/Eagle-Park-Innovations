'use client';

import { useEffect, useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from './AuthProvider';
import { ApiError } from '@/src/lib/api';

interface RegisterErrors { name?: string; email?: string; password?: string; form?: string; }

export function RegisterForm() {
  const router = useRouter();
  const { register, user, isLoading: isCheckingAuth } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<RegisterErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isCheckingAuth && user) router.replace(user.role === 'admin' ? '/admin' : '/');
  }, [isCheckingAuth, router, user]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors: RegisterErrors = {};
    if (!name.trim()) nextErrors.name = 'Name is required.';
    else if (name.trim().length < 2) nextErrors.name = 'Name must contain at least 2 characters.';
    if (!email.trim()) nextErrors.email = 'Email is required.';
    else if (!/^\S+@\S+\.\S+$/.test(email)) nextErrors.email = 'Enter a valid email address.';
    if (!password) nextErrors.password = 'Password is required.';
    else if (password.length < 8) nextErrors.password = 'Password must contain at least 8 characters.';
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);
    try {
      await register({ name: name.trim(), email: email.trim().toLowerCase(), password });
      router.push('/login?registered=true');
    } catch (error) {
      setErrors({ form: error instanceof ApiError || error instanceof Error ? error.message : 'Registration failed. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  }

  const fieldClass = "w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-green-700 focus:ring-2 focus:ring-green-700/20";
  return (
    <div>
      <div className="mb-7">
        <p className="text-sm font-semibold uppercase tracking-wider text-green-700">Join the marketplace</p>
        <h2 className="mt-1 text-3xl font-bold text-green-950">Create your account</h2>
      </div>
      {errors.form && <p className="mb-5 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700" role="alert">{errors.form}</p>}
      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <div>
          <label htmlFor="register-name" className="mb-1.5 block text-sm font-semibold text-green-950">Full name</label>
          <input id="register-name" type="text" autoComplete="name" value={name} onChange={(event) => setName(event.target.value)} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'register-name-error' : undefined} className={fieldClass} placeholder="Your full name" />
          {errors.name && <p id="register-name-error" className="mt-1.5 text-sm text-red-700">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="register-email" className="mb-1.5 block text-sm font-semibold text-green-950">Email address</label>
          <input id="register-email" type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'register-email-error' : undefined} className={fieldClass} placeholder="you@example.com" />
          {errors.email && <p id="register-email-error" className="mt-1.5 text-sm text-red-700">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="register-password" className="mb-1.5 block text-sm font-semibold text-green-950">Password</label>
          <div className="relative">
            <input id="register-password" type={showPassword ? 'text' : 'password'} autoComplete="new-password" value={password} onChange={(event) => setPassword(event.target.value)} aria-invalid={Boolean(errors.password)} aria-describedby={errors.password ? 'register-password-error' : 'register-password-hint'} className={`${fieldClass} pr-12`} placeholder="At least 8 characters" />
            <button type="button" onClick={() => setShowPassword((visible) => !visible)} aria-label={showPassword ? 'Hide password' : 'Show password'} aria-pressed={showPassword} className="absolute inset-y-0 right-0 grid w-12 place-items-center rounded-r-lg text-gray-600 hover:text-green-800 focus-visible:outline-green-700">
              <i className={showPassword ? 'ri-eye-off-line' : 'ri-eye-line'} aria-hidden="true" />
            </button>
          </div>
          <p id="register-password-hint" className="mt-1.5 text-xs text-gray-500">Use at least 8 characters.</p>
          {errors.password && <p id="register-password-error" className="mt-1.5 text-sm text-red-700">{errors.password}</p>}
        </div>
        <button type="submit" disabled={isSubmitting || isCheckingAuth} className="flex w-full items-center justify-center gap-2 rounded-full bg-green-900 px-5 py-3 font-semibold text-white transition hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60">
          {isSubmitting && <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" aria-hidden="true" />}
          {isSubmitting ? 'Creating account…' : 'Register'}
        </button>
      </form>
      <p className="mt-6 text-center text-sm text-gray-600">Already registered? <Link href="/login" className="font-semibold text-green-800 underline-offset-4 hover:underline">Sign in</Link></p>
    </div>
  );
}
