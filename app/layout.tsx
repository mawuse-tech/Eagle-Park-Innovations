import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import Script from 'next/script';
import type { ReactNode } from 'react';
import Navbar from '@/src/Components/Navbar';
import Footer from '@/src/Components/Footer';
import { AuthProvider } from '@/src/auth/AuthProvider';
import './globals.css';

const roboto = Roboto({ subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  title: 'Eagle Park Innovations',
  description: 'Empowering farmers, feeding nations, and building sustainable futures.',
  icons: { icon: '/favicon.png' },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <AuthProvider>
          <Navbar />
          <main id="main-content" tabIndex={-1}>{children}</main>
          <Footer />
        </AuthProvider>
        <Script src="https://js.paystack.co/v1/inline.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
