import Image from 'next/image';
import type { ReactNode } from 'react';
import farmImage from '@/src/assets/happy-farm.jpg';

export function AuthShell({ children, title, text }: Readonly<{
  children: ReactNode;
  title: string;
  text: string;
}>) {
  return (
    <section className="relative min-h-[calc(100vh-4.5rem)] overflow-hidden bg-[#e0e8d9] px-4 py-12 sm:px-6 lg:px-8">
      <Image src={farmImage} alt="Green agricultural field" fill priority className="object-cover opacity-35" />
      <div className="absolute inset-0 bg-gradient-to-br from-[#e0e8d9]/95 via-[#e0e8d9]/70 to-[#e0e8d9]/85" />
      <div className="relative mx-auto grid min-h-[68vh] max-w-5xl items-center gap-10 lg:grid-cols-[1fr_28rem]">
        <div className="hidden max-w-xl text-[#294834] lg:block">
          <h1 className="text-5xl font-bold leading-tight">{title}</h1>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-[#294834]">{text}</p>
          <div className="mt-8 flex items-center gap-3 text-sm text-[#386347]">
            <i className="ri-leaf-line text-2xl text-[#386347]" aria-hidden="true" />
            <span>Growing trusted connections across agriculture.</span>
          </div>
        </div>
        <div className="rounded-2xl border border-white/40 bg-white p-6 shadow-2xl sm:p-9">{children}</div>
      </div>
    </section>
  );
}
