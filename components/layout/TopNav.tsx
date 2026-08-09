'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Play, RefreshCw, Globe2, Sparkles, Search, Command } from 'lucide-react';
import { useEscrowStore } from '@/lib/store';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { NotificationCenter } from './NotificationCenter';
import { ProfileMenu } from './ProfileMenu';
import { CommandPalette } from '@/components/ui/CommandPalette';

export const TopNav: React.FC = () => {
  const { isSimulating, runLiveSimulation, resetSimulation, setLoginModalOpen, currentUser } = useEscrowStore();
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);

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
    <>
      <header className="sticky top-0 z-50 bg-[var(--color-bg-surface)]/92 backdrop-blur-2xl border-b border-[var(--color-border-subtle)] px-4 lg:px-6 py-3 transition-all">
        <div className="flex flex-wrap items-center justify-between gap-3 max-w-[1700px] mx-auto">
          {/* Mobile Logo */}
          <Link href="/" className="lg:hidden flex items-center gap-3 group select-none">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[var(--color-accent-indigo)] to-indigo-800 p-[2px] shadow-md">
              <div className="w-full h-full bg-[var(--color-bg-surface)] rounded-[10px] flex items-center justify-center">
                <Globe2 className="w-4 h-4 text-[var(--color-accent-indigo)]" />
              </div>
            </div>
            <span className="font-black text-[var(--color-text-primary)] text-sm font-heading tracking-tight">AI ESCROW OS</span>
          </Link>

          {/* Search Trigger */}
          <div className="flex-1 flex justify-center max-w-md mx-auto">
            <button
              onClick={() => setIsPaletteOpen(true)}
              className="group relative flex items-center justify-between gap-4 w-full max-w-xs md:max-w-md bg-[var(--color-bg-surface-secondary)] hover:bg-[var(--color-border-subtle)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] px-3.5 py-2 rounded-xl border border-[var(--color-border-subtle)] hover:border-[var(--color-accent-indigo)] transition-all duration-200 shadow-sm select-none"
            >
              <div className="flex items-center gap-2.5 truncate">
                <Search className="w-4 h-4 text-[var(--color-accent-indigo)] shrink-0 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-mono font-medium truncate">Search vaults, transactions, commands...</span>
              </div>
              <div className="hidden sm:flex items-center gap-1 bg-[var(--color-bg-surface)] px-2 py-0.5 rounded text-[10px] font-mono font-bold text-[var(--color-accent-indigo)] border border-[var(--color-border-subtle)] shrink-0">
                <Command className="w-3 h-3" />
                <span>K</span>
              </div>
            </button>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-2.5 ml-auto">
            {/* Switch Persona */}
            <button
              onClick={() => setLoginModalOpen(true)}
              className="hidden md:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[var(--color-bg-surface-secondary)] hover:bg-[var(--color-border-subtle)] border border-[var(--color-border-subtle)] text-[var(--color-accent-indigo)] font-heading font-bold text-xs transition-all shadow-sm hover:scale-105 active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5 text-[var(--color-accent-orange)]" />
              <span>{currentUser.isAuthenticated ? 'Switch Persona' : '🔐 Sign In'}</span>
            </button>

            {/* Run Demo */}
            <button
              onClick={() => runLiveSimulation()}
              disabled={isSimulating}
              className={`relative overflow-hidden px-5 sm:px-6 py-2 rounded-xl font-bold font-heading text-xs flex items-center gap-2 transition-all shadow-md select-none uppercase tracking-wider border ${
                isSimulating
                  ? 'bg-amber-500/20 text-amber-500 border-amber-500/30 cursor-not-allowed animate-pulse'
                  : 'bg-[var(--color-accent-indigo)] text-white hover:opacity-90 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 border-[var(--color-accent-indigo)]'
              }`}
            >
              <Play className={`w-3.5 h-3.5 fill-current ${isSimulating ? 'text-amber-500' : ''}`} />
              <span>{isSimulating ? 'Simulating...' : 'Run Demo'}</span>
            </button>

            {/* Reset */}
            <button
              onClick={() => resetSimulation()}
              title="Reset Simulation"
              className="p-2.5 rounded-xl bg-[var(--color-bg-surface-secondary)] hover:bg-[var(--color-border-subtle)] border border-[var(--color-border-subtle)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-all hover:rotate-180 shrink-0 shadow-sm"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>

            <div className="h-6 w-[1px] bg-[var(--color-border-subtle)] hidden sm:block mx-1" />

            <div className="hidden sm:block">
              <ThemeToggle />
            </div>

            <NotificationCenter />
            <ProfileMenu />
          </div>
        </div>
      </header>

      <CommandPalette isOpen={isPaletteOpen} onClose={() => setIsPaletteOpen(false)} />
    </>
  );
};
