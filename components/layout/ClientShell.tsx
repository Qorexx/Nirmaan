'use client';

import React from 'react';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import { Sidebar } from '@/components/layout/Sidebar';
import { TopNav } from '@/components/layout/TopNav';
import { MobileNav } from '@/components/layout/MobileNav';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Footer } from '@/components/layout/Footer';
import { LoginModal } from '@/components/auth/LoginModal';
import { useEscrowStore } from '@/lib/store';

export const ClientShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isPresentationMode } = useEscrowStore();

  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col sm:flex-row bg-[var(--color-bg-main)] text-[var(--color-text-primary)] antialiased overflow-x-hidden">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0 max-w-full pb-16 md:pb-0 bg-transparent">
          <TopNav />
          {!isPresentationMode && <Breadcrumbs />}

          <main className={`flex-1 w-full mx-auto px-4 sm:px-6 py-6 transition-all duration-500 ${isPresentationMode ? 'max-w-full px-8' : 'max-w-[1700px]'}`}>
            {children}
          </main>

          {!isPresentationMode && <Footer />}
        </div>

        {/* Mobile Nav */}
        <MobileNav />
      </div>

      {/* Global Modals */}
      <LoginModal />
    </ThemeProvider>
  );
};
