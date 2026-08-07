import React, { useState, useEffect } from 'react';
import { AnimatedSidebar } from './AnimatedSidebar';
import { TabletNav } from './TabletNav';
import { MobileNav } from './MobileNav';
import { Navbar } from './Navbar';
import { Breadcrumbs } from './Breadcrumbs';
import { Footer } from './Footer';
import { AnimatedRouteTransition } from './AnimatedRouteTransition';
import { CommandPalette } from '../ui/CommandPalette';

import { useEscrowStore } from '../../store/useEscrowStore';

export interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const { isPresentationMode, setPresentationMode } = useEscrowStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsPaletteOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen flex flex-col sm:flex-row bg-main text-primary antialiased overflow-x-hidden transition-colors duration-300">
      {/* Sidebar Navigation for Desktop & Tablet Rails */}
      <AnimatedSidebar />
      {!isPresentationMode && <TabletNav />}

      {/* Main Execution Viewport */}
      <div className="flex-1 flex flex-col min-w-0 max-w-full pb-16 md:pb-0 bg-transparent">
        {/* Sticky Header & Route Path Indicator */}
        <Navbar onOpenPalette={() => setIsPaletteOpen(true)} />
        {!isPresentationMode && <Breadcrumbs />}
        
        {/* Animated Page Renderer */}
        <main className={`flex-1 w-full mx-auto px-4 sm:px-6 py-6 transition-all duration-500 ${isPresentationMode ? 'max-w-full px-8' : 'max-w-[1700px]'}`}>
          <AnimatedRouteTransition>
            {children}
          </AnimatedRouteTransition>
        </main>

        {/* Sovereign Enterprise Footer */}
        {!isPresentationMode && <Footer />}
      </div>

      {/* Mobile Sticky Navigation and Drawer */}
      <MobileNav />

      {/* Global Cmd+K / Ctrl+K Command Palette Modal */}
      <CommandPalette isOpen={isPaletteOpen} onClose={() => setIsPaletteOpen(false)} />
    </div>
  );
};

export const ResponsiveLayout: React.FC<DashboardLayoutProps> = ({ children }) => (
  <DashboardLayout>{children}</DashboardLayout>
);
