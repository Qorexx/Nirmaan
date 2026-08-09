'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, CheckCircle2, Zap, Check, ExternalLink } from 'lucide-react';
import { useEscrowStore } from '@/lib/store';

export const NotificationCenter: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(3);
  const { logs } = useEscrowStore();
  const menuRef = useRef<HTMLDivElement>(null);

  const defaultAlerts = [
    { id: '1', title: 'x402 Settlement Executed', msg: '$0.05 USDC verification gas settled via machine wallet in 84ms.', type: 'x402', time: '12s ago' },
    { id: '2', title: 'Vision AI Score: 97.2%', msg: 'NH-44 Highway evidence passed boundary geo-sync verification.', type: 'success', time: '2 mins ago' },
    { id: '3', title: 'Smart Contract Vault Unlocked', msg: 'Tx: 0x7ab982... executed on sovereign ledger without manual hold.', type: 'chain', time: '14 mins ago' },
  ];

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
        onClick={() => { setIsOpen(!isOpen); if (!isOpen) setUnreadCount(0); }}
        className="relative p-2.5 rounded-xl bg-[var(--color-bg-surface-secondary)] hover:bg-[var(--color-border-subtle)] border border-[var(--color-border-subtle)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-all shadow-sm group"
        title="View Alerts"
      >
        <Bell className="w-4 h-4 group-hover:scale-110 transition-transform" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-rose-600 to-amber-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-[var(--color-bg-surface)] animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-3 w-80 sm:w-96 bg-[var(--color-bg-surface)] border border-[var(--color-border-subtle)] rounded-2xl shadow-2xl z-50 overflow-hidden divide-y divide-[var(--color-border-subtle)]"
          >
            <div className="p-4 bg-[var(--color-bg-surface-secondary)] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-[var(--color-text-primary)] uppercase tracking-wider font-heading">Mission Alerts</span>
                <span className="px-2 py-0.5 rounded-full bg-[var(--color-accent-indigo)]/10 text-[var(--color-accent-indigo)] text-[10px] font-bold border border-[var(--color-accent-indigo)]/20">
                  LIVE FEED
                </span>
              </div>
              <button onClick={() => setUnreadCount(0)} className="text-xs text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] flex items-center gap-1 transition-colors font-medium">
                <Check className="w-3.5 h-3.5" />
                <span>Clear All</span>
              </button>
            </div>

            <div className="max-h-80 overflow-y-auto divide-y divide-[var(--color-border-subtle)] bg-[var(--color-bg-surface)]">
              {defaultAlerts.map((alt) => (
                <div key={alt.id} className="p-4 hover:bg-[var(--color-bg-surface-secondary)] transition-colors space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-2 font-bold text-[var(--color-text-primary)]">
                      {alt.type === 'x402' ? <Zap className="w-4 h-4 text-[var(--color-accent-orange)] fill-current" /> : <CheckCircle2 className="w-4 h-4 text-[var(--color-accent-emerald)]" />}
                      <span className="font-heading font-bold">{alt.title}</span>
                    </span>
                    <span className="text-[var(--color-text-secondary)] text-[10px]">{alt.time}</span>
                  </div>
                  <p className="text-xs text-[var(--color-text-secondary)] font-mono leading-relaxed pl-6">{alt.msg}</p>
                </div>
              ))}

              {logs.slice(0, 4).map((lg, idx) => (
                <div key={lg.id || idx} className="p-3 bg-[var(--color-bg-surface-secondary)] text-xs font-mono space-y-1 text-[var(--color-text-secondary)] border-t border-[var(--color-border-subtle)]">
                  <span className="text-[var(--color-accent-indigo)] font-bold uppercase">[{lg.stage}]</span> <span className="text-[var(--color-text-primary)]">{lg.message}</span>
                </div>
              ))}
            </div>

            <div className="p-3 bg-[var(--color-bg-surface-secondary)] text-center border-t border-[var(--color-border-subtle)]">
              <Link
                href="/mission-control"
                onClick={() => setIsOpen(false)}
                className="text-xs font-bold text-[var(--color-accent-indigo)] hover:opacity-80 tracking-wider flex items-center justify-center gap-1 mx-auto uppercase font-heading"
              >
                <span>View Full Telemetry Dashboard</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
