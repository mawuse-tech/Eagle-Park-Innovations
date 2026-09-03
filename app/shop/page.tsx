import ShopItems from '@/src/views/ShopPage/ShopItems';
import { Suspense } from 'react';

export default function ShopPage() {
  return <Suspense fallback={<div className="min-h-screen bg-white" />}><ShopItems /></Suspense>;
}
