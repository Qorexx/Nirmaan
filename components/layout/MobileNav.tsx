'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Activity, Layers, Cpu, Shield, Menu, X, Wallet, BarChart3, FileText, Settings, HardHat } from 'lucide-react';

export const MobileNav: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const primaryItems = [
    { href: '/', label: 'Home', icon: <Home className="w-5 h-5" /> },
    { href: '/architecture', label: 'Architecture', icon: <Cpu className="w-5 h-5" /> },
    { href: '/command', label: 'Command', icon: <Shield className="w-5 h-5" /> },
    { href: '/mission-control', label: 'Telemetry', icon: <Activity className="w-5 h-5" /> },
  ];

  const secondaryItems = [
    { href: '/projects', label: 'Projects Hub', icon: <Layers className="w-5 h-5" />, desc: 'Explore infrastructure digital twins' },
    { href: '/contractors', label: 'Contractor Workspace', icon: <HardHat className="w-5 h-5" />, desc: 'Submit GPS video & evidence scans' },
    { href: '/treasury', label: 'Escrow Treasury', icon: <Wallet className="w-5 h-5" />, desc: 'Monitor multi-million dollar liquidity' },
    { href: '/ledger', label: 'Trust Ledger', icon: <Cpu className="w-5 h-5" />, desc: 'Verify on-chain immutable receipts' },
    { href: '/analytics', label: 'AI Analytics', icon: <BarChart3 className="w-5 h-5" />, desc: 'Review AI verification analytics' },
    { href: '/audits', label: 'Regulatory Audits', icon: <FileText className="w-5 h-5" />, desc: 'Anti-corruption tamper records' },
    { href: '/settings', label: 'System Settings', icon: <Settings className="w-5 h-5" />, desc: 'Configure system parameters' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Bottom Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[var(--color-bg-surface)]/95 backdrop-blur-xl border-t border-[var(--color-border-subtle)] py-2 px-4 flex items-center justify-around z-50 shadow-[0_-4px_16px_rgba(0,0,0,0.06)]">
        {primaryItems.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 px-3 py-1 rounded-xl transition-all select-none ${
                active ? 'text-[var(--color-accent-indigo)] font-bold scale-105' : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
              }`}
            >
              <span className="relative">
                {item.icon}
                {active && <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[var(--color-accent-indigo)]" />}
              </span>
              <span className="text-[10px] font-mono tracking-wide font-bold">{item.label}</span>
            </Link>
          );
        })}

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`flex flex-col items-center gap-1 px-3 py-1 rounded-xl transition-all ${
            isMenuOpen ? 'text-[var(--color-accent-orange)] font-bold scale-105' : 'text-[var(--color-text-secondary)]'
          }`}
        >
          <Menu className="w-5 h-5" />
          <span className="text-[10px] font-mono font-bold">More</span>
        </button>
      </nav>

      {/* Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <div className="md:hidden fixed inset-0 z-50 flex flex-col justify-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm"
            />

            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="relative bg-[var(--color-bg-surface)] border-t-2 border-[var(--color-border-subtle)] rounded-t-3xl p-6 shadow-2xl z-10 space-y-4 max-h-[85vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-3 border-b border-[var(--color-border-subtle)]">
                <span className="text-sm font-bold text-[var(--color-text-primary)] uppercase tracking-wider font-heading">All Modules</span>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-1.5 rounded-xl bg-[var(--color-bg-surface-secondary)] border border-[var(--color-border-subtle)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-2">
                {secondaryItems.map((sItem) => (
                  <Link
                    key={sItem.href}
                    href={sItem.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`w-full p-3.5 rounded-2xl border flex items-center gap-4 text-left transition-colors ${
                      isActive(sItem.href)
                        ? 'bg-[var(--color-accent-indigo)]/10 border-[var(--color-accent-indigo)]/30 text-[var(--color-text-primary)] font-bold'
                        : 'bg-[var(--color-bg-surface-secondary)] border-[var(--color-border-subtle)] text-[var(--color-text-primary)] hover:bg-[var(--color-bg-surface-secondary)]'
                    }`}
                  >
                    <span className="p-2 rounded-xl bg-[var(--color-bg-surface)] border border-[var(--color-border-subtle)] shrink-0">
                      {sItem.icon}
                    </span>
                    <div>
                      <span className="text-sm font-bold block font-heading">{sItem.label}</span>
                      <span className="text-[11px] text-[var(--color-text-secondary)] font-mono block">{sItem.desc}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
