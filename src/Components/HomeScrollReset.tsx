'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function HomeScrollReset() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== '/' || window.location.hash) return;

    // Run after the router's scroll restoration, including cached back navigation.
    const frame = requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    });

    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  return null;
}
