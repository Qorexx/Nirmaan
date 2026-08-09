'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Terminal, ArrowRight, ShieldCheck, Zap, Layers, Activity, Wallet, BarChart3 } from 'lucide-react';
import { useEscrowStore } from '@/lib/store';

export interface CommandOption {
  id: string;
  label: string;
  category: 'Navigation' | 'Governance' | 'Simulation' | 'x402 Protocol';
  icon: React.ReactNode;
  shortcut?: string;
  action: () => void;
}

export const CommandPalette: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const { runLiveSimulation } = useEscrowStore();
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) setQuery('');
  }, [isOpen]);

  const navigateTo = (path: string) => { router.push(path); onClose(); };

  const commands: CommandOption[] = [
    { id: 'nav-home', label: 'Go to Overview', category: 'Navigation', icon: <Layers className="w-4 h-4 text-[var(--color-accent-indigo)]" />, shortcut: 'H', action: () => navigateTo('/') },
    { id: 'nav-arch', label: 'Open Architecture Portal', category: 'Navigation', icon: <Activity className="w-4 h-4 text-[var(--color-accent-emerald)]" />, shortcut: 'A', action: () => navigateTo('/architecture') },
    { id: 'nav-gov', label: 'Launch Command Suite', category: 'Navigation', icon: <ShieldCheck className="w-4 h-4 text-blue-500" />, shortcut: 'G', action: () => navigateTo('/command') },
    { id: 'nav-treasury', label: 'Inspect Escrow Vault Treasury', category: 'Navigation', icon: <Wallet className="w-4 h-4 text-amber-500" />, shortcut: 'T', action: () => navigateTo('/treasury') },
    { id: 'nav-analytics', label: 'View AI Analytics Suite', category: 'Navigation', icon: <BarChart3 className="w-4 h-4 text-purple-500" />, shortcut: 'S', action: () => navigateTo('/analytics') },
    { id: 'sim-run', label: '▶ Trigger Autonomous Demo Simulation', category: 'Simulation', icon: <Terminal className="w-4 h-4 text-rose-500 animate-pulse" />, shortcut: '▶', action: () => { runLiveSimulation(); onClose(); } },
    { id: 'x402-test', label: 'Generate $0.05 USDC x402 Micropayment Proof', category: 'x402 Protocol', icon: <Zap className="w-4 h-4 text-amber-500 fill-current" />, shortcut: '402', action: () => { runLiveSimulation(); onClose(); } },
  ];

  const filtered = commands.filter(
    (cmd) => cmd.label.toLowerCase().includes(query.toLowerCase()) || cmd.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/30 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="relative w-full max-w-2xl bg-[var(--color-bg-surface)] border border-[var(--color-border-subtle)] rounded-2xl shadow-2xl z-10 overflow-hidden font-mono divide-y divide-[var(--color-border-subtle)]"
          >
            <div className="flex items-center px-5 py-4 bg-[var(--color-bg-surface-secondary)] gap-3">
              <Search className="w-5 h-5 text-[var(--color-accent-indigo)] shrink-0" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a command or search modules..."
                className="w-full bg-transparent text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] text-sm font-mono focus:outline-none"
              />
              <span className="text-[10px] uppercase bg-[var(--color-bg-surface)] px-2 py-0.5 rounded text-[var(--color-text-primary)] font-bold font-heading border border-[var(--color-border-subtle)]">ESC</span>
            </div>

            <div className="max-h-80 overflow-y-auto p-2 space-y-1 bg-[var(--color-bg-surface)]">
              {filtered.length > 0 ? (
                filtered.map((cmd) => (
                  <button
                    key={cmd.id}
                    onClick={cmd.action}
                    className="w-full p-3 rounded-xl hover:bg-[var(--color-bg-surface-secondary)] text-left flex items-center justify-between group transition-colors border border-transparent hover:border-[var(--color-border-subtle)]"
                  >
                    <div className="flex items-center gap-3">
                      <span className="p-2 rounded-lg bg-[var(--color-bg-surface-secondary)] border border-[var(--color-border-subtle)] group-hover:border-[var(--color-accent-indigo)]/30 transition-colors">
                        {cmd.icon}
                      </span>
                      <div>
                        <span className="text-sm font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-accent-indigo)] block font-heading">
                          {cmd.label}
                        </span>
                        <span className="text-[10px] text-[var(--color-text-secondary)] uppercase font-mono font-bold">{cmd.category}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {cmd.shortcut && (
                        <span className="px-2 py-1 rounded bg-[var(--color-bg-surface-secondary)] text-[var(--color-text-primary)] font-mono text-[10px] font-bold border border-[var(--color-border-subtle)]">
                          {cmd.shortcut}
                        </span>
                      )}
                      <ArrowRight className="w-4 h-4 text-[var(--color-text-secondary)] group-hover:text-[var(--color-accent-indigo)] group-hover:translate-x-1 transition-all" />
                    </div>
                  </button>
                ))
              ) : (
                <div className="py-10 text-center text-[var(--color-text-secondary)] text-xs font-sans font-medium">
                  No commands found matching &quot;{query}&quot;.
                </div>
              )}
            </div>

            <div className="px-4 py-2 bg-[var(--color-bg-surface-secondary)] text-[10px] text-[var(--color-text-secondary)] font-medium flex items-center justify-between">
              <span>PRO TIP: Use ↑↓ arrows to navigate, ENTER to execute</span>
              <span className="text-[var(--color-accent-indigo)] font-bold">Platform v2.4</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
