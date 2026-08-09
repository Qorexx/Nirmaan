'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ShieldCheck, LogOut, LogIn, Lock } from 'lucide-react';
import { useEscrowStore } from '@/lib/store';

export const ProfileMenu: React.FC = () => {
  const { currentUser, setLoginModalOpen, logoutUser } = useEscrowStore();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative font-mono" ref={menuRef}>
      <button
        onClick={() => {
          if (!currentUser.isAuthenticated) {
            setLoginModalOpen(true);
          } else {
            setIsOpen(!isOpen);
          }
        }}
        className="flex items-center gap-2.5 p-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-[var(--color-bg-surface)] hover:bg-[var(--color-bg-surface-secondary)] border border-[var(--color-border-subtle)] transition-all text-left group shadow-sm"
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--color-accent-indigo)] to-purple-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
          {currentUser.avatarInitials}
        </div>
        <div className="hidden xl:flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-heading font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-accent-indigo)] transition-colors leading-snug">
              {currentUser.name}
            </span>
            {currentUser.isAuthenticated && (
              <span className="w-2 h-2 rounded-full bg-[var(--color-accent-emerald)] animate-pulse" />
            )}
          </div>
          <span className="text-[10px] font-mono text-[var(--color-text-secondary)] truncate max-w-[150px]">
            {currentUser.role}
          </span>
        </div>
        <ChevronDown className={`w-4 h-4 text-[var(--color-text-secondary)] transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180 text-[var(--color-accent-indigo)]' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="absolute right-0 top-full mt-3 w-80 bg-[var(--color-bg-surface)] border border-[var(--color-border-subtle)] rounded-2xl shadow-2xl z-50 overflow-hidden divide-y divide-[var(--color-border-subtle)]"
          >
            <div className="p-4 bg-[var(--color-bg-surface-secondary)] space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-accent-indigo)] font-heading">Active Session</span>
                <span className="px-2 py-0.5 rounded-full bg-[var(--color-accent-emerald)]/10 text-[var(--color-accent-emerald)] text-[9px] font-bold border border-[var(--color-accent-emerald)]/20">
                  {currentUser.isAuthenticated ? 'AUTHENTICATED' : 'GUEST MODE'}
                </span>
              </div>
              <div className="space-y-0.5">
                <div className="text-sm font-bold font-heading text-[var(--color-text-primary)]">{currentUser.name}</div>
                <div className="text-xs text-[var(--color-text-primary)] font-mono font-bold">{currentUser.role}</div>
                <div className="text-[10px] text-[var(--color-text-secondary)] font-mono">{currentUser.department}</div>
              </div>
              <div className="flex items-center justify-between gap-2 bg-[var(--color-bg-surface)] px-3 py-2 rounded-xl border border-[var(--color-border-subtle)] text-xs mt-2">
                <span className="text-[var(--color-text-secondary)]">Wallet:</span>
                <span className="text-[var(--color-accent-indigo)] font-bold select-all font-mono">{currentUser.address}</span>
              </div>
            </div>

            <div className="p-2 space-y-1 bg-[var(--color-bg-surface)]">
              <button
                onClick={() => { setIsOpen(false); setLoginModalOpen(true); }}
                className="w-full p-3 rounded-xl text-left flex items-center justify-between transition-colors bg-[var(--color-bg-surface-secondary)] hover:bg-[var(--color-border-subtle)] text-[var(--color-text-primary)] border border-[var(--color-border-subtle)] font-bold font-heading text-xs group"
              >
                <div className="flex items-center gap-2.5">
                  <LogIn className="w-4 h-4 text-[var(--color-accent-indigo)] group-hover:scale-110 transition-transform" />
                  <span>Switch Persona / Login</span>
                </div>
                <span className="text-[10px] font-mono bg-[var(--color-bg-surface)] text-[var(--color-accent-indigo)] font-bold px-2 py-0.5 rounded-full border border-[var(--color-border-subtle)]">
                  4 ROLES
                </span>
              </button>

              {currentUser.isAuthenticated ? (
                <button
                  onClick={() => { setIsOpen(false); logoutUser(); }}
                  className="w-full p-2.5 rounded-xl text-left flex items-center gap-2.5 transition-colors text-[var(--color-accent-rose)] hover:bg-[var(--color-accent-rose)]/10 font-medium text-xs font-sans"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Disconnect & Exit to Guest Mode</span>
                </button>
              ) : (
                <button
                  onClick={() => { setIsOpen(false); setLoginModalOpen(true); }}
                  className="w-full p-2.5 rounded-xl text-left flex items-center gap-2.5 transition-colors text-[var(--color-accent-emerald)] hover:bg-[var(--color-accent-emerald)]/10 font-medium text-xs font-sans"
                >
                  <Lock className="w-4 h-4" />
                  <span>Sign In with Sovereign ID</span>
                </button>
              )}
            </div>

            <div className="p-2.5 bg-[var(--color-bg-surface-secondary)] border-t border-[var(--color-border-subtle)] text-center text-[10px] font-mono text-[var(--color-text-secondary)] flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[var(--color-accent-indigo)]" />
              <span>Infrastructure Governance Tier</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
