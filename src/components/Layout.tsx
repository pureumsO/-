import React from 'react';
import Navbar from './Navbar.tsx';
import Footer from './Footer.tsx';
import { Outlet } from 'react-router-dom';
import { useAppContext } from '../AppContext.tsx';
import { Loader2 } from 'lucide-react';

export default function Layout() {
  const { isLoading } = useAppContext();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-beige">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-10 w-10 text-brand-khaki animate-spin" />
          <p className="text-brand-khaki font-serif italic">도서관 문을 여는 중입니다...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
