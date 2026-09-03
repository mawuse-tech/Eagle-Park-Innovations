'use client';

import { useAuth } from './AuthProvider';

export function AdminWelcome() {
  const { user } = useAuth();
  return (
    <section className="min-h-[60vh] bg-[#f4f4f4] px-6 py-16">
      <div className="mx-auto max-w-4xl rounded-2xl border border-green-100 bg-white p-8 shadow-lg sm:p-12">
        <span className="inline-flex rounded-full bg-yellow-300 px-4 py-1 text-sm font-semibold text-green-950">Administrator</span>
        <h1 className="mt-5 text-3xl font-bold text-green-950 sm:text-4xl">Welcome to the Admin Area</h1>
        <p className="mt-3 text-gray-600">Hello {user?.name}. Product, category, inventory, order, and store management tools will be added here later.</p>
      </div>
    </section>
  );
}
