'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  ShieldCheck,
  Layers,
  HardHat,
  Activity,
  Wallet,
  Cpu,
  BarChart3,
  FileText,
  Settings,
  ChevronLeft,
  ChevronRight,
  Globe2,
} from 'lucide-react';
import { useEscrowStore } from '@/lib/store';

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
  badge?: string;
}

export const Sidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { totalProtectedValue, aiAccuracyRate, isPresentationMode } = useEscrowStore();
  const pathname = usePathname();

  const collapsed = isCollapsed || isPresentationMode;

  const navItems: NavItem[] = [
    { href: '/', label: 'Overview', icon: <Home className="w-5 h-5" /> },
    { href: '/architecture', label: 'Architecture', icon: <Cpu className="w-5 h-5" />, badge: 'NEW' },
    { href: '/command', label: 'Command Suite', icon: <ShieldCheck className="w-5 h-5" />, badge: 'Gov' },
    { href: '/projects', label: 'Projects', icon: <Layers className="w-5 h-5" /> },
    { href: '/contractors', label: 'Contractor Hub', icon: <HardHat className="w-5 h-5" /> },
    { href: '/mission-control', label: 'Mission Control', icon: <Activity className="w-5 h-5" />, badge: 'LIVE' },
    { href: '/treasury', label: 'Treasury', icon: <Wallet className="w-5 h-5" /> },
    { href: '/ledger', label: 'Trust Ledger', icon: <Cpu className="w-5 h-5" />, badge: 'x402' },
    { href: '/analytics', label: 'Analytics', icon: <BarChart3 className="w-5 h-5" /> },
    { href: '/audits', label: 'Regulatory Audit', icon: <FileText className="w-5 h-5" /> },
    { href: '/settings', label: 'Settings', icon: <Settings className="w-5 h-5" /> },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <aside
      className={`hidden lg:flex flex-col bg-[var(--color-bg-surface)] border-r border-[var(--color-border-subtle)] transition-all duration-300 relative shrink-0 z-40 select-none ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Collapse Toggle */}
      {!isPresentationMode && (
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-[var(--color-bg-surface)] border border-[var(--color-border-subtle)] text-[var(--color-text-secondary)] hover:text-[var(--color-accent-indigo)] hover:scale-110 flex items-center justify-center shadow-md z-50 transition-all"
          title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      )}

      {/* Branding */}
      <div className={`p-5 flex items-center gap-3 border-b border-[var(--color-border-subtle)] ${collapsed ? 'justify-center' : ''}`}>
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[var(--color-accent-indigo)] to-indigo-800 p-[2px] shrink-0 shadow-md">
          <div className="w-full h-full bg-[var(--color-bg-surface)] rounded-[10px] flex items-center justify-center">
            <Globe2 className="w-5 h-5 text-[var(--color-accent-indigo)] animate-[spin_20s_linear_infinite]" />
          </div>
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <span className="font-black text-[var(--color-text-primary)] text-sm tracking-tight block truncate font-heading">AI ESCROW OS</span>
            <span className="text-[10px] font-mono font-bold text-[var(--color-accent-indigo)] block uppercase">Platform v2.4</span>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 overflow-y-auto space-y-1 no-scrollbar">
        {!collapsed && (
          <span className="text-[10px] uppercase font-bold text-[var(--color-text-secondary)] px-3 py-1.5 block tracking-wider font-heading">
            Navigation
          </span>
        )}

        {navItems.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              title={collapsed ? item.label : undefined}
              className={`w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl transition-all relative group ${
                collapsed ? 'justify-center' : ''
              } ${
                active
                  ? 'bg-[var(--color-bg-surface-secondary)] text-[var(--color-accent-indigo)] font-bold shadow-sm border border-[var(--color-border-subtle)]'
                  : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-surface-secondary)] font-medium'
              }`}
            >
              {/* Active Indicator */}
              {active && (
                <span className="absolute left-0 top-2 bottom-2 w-1.5 rounded-r-full bg-[var(--color-accent-indigo)]" />
              )}

              <span className={`shrink-0 transition-transform group-hover:scale-110 ${active ? 'scale-110 text-[var(--color-accent-indigo)]' : ''}`}>
                {item.icon}
              </span>

              {!collapsed && (
                <>
                  <span className="truncate flex-1 text-left text-xs font-sans tracking-tight">{item.label}</span>
                  {item.badge && (
                    <span
                      className={`text-[9px] uppercase font-mono font-bold px-2 py-0.5 rounded-full shrink-0 ${
                        item.badge === 'LIVE'
                          ? 'bg-rose-500/15 text-rose-500 border border-rose-500/30 animate-pulse'
                          : item.badge === 'Gov'
                          ? 'bg-[color:var(--color-accent-indigo)]/15 text-[var(--color-accent-indigo)] border border-[color:var(--color-accent-indigo)]/30'
                          : 'bg-amber-500/15 text-amber-500 border border-amber-500/30'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Status */}
      {!collapsed && !isPresentationMode && (
        <div className="p-4 m-3 rounded-2xl bg-[var(--color-bg-surface-secondary)] border border-[var(--color-border-subtle)] font-mono text-xs space-y-2 shrink-0">
          <div className="flex items-center justify-between text-[var(--color-text-secondary)] text-[10px]">
            <span>Vault Liquidity:</span>
            <span className="text-[var(--color-accent-emerald)] font-bold bg-[var(--color-accent-emerald)]/10 px-1.5 py-0.5 rounded border border-[var(--color-accent-emerald)]/30">
              100% Secured
            </span>
          </div>
          <div className="text-sm font-bold text-[var(--color-text-primary)] font-heading">
            ₹{(totalProtectedValue / 1000000).toFixed(1)}M USDC
          </div>
          <div className="h-2 w-full rounded-full bg-[var(--color-border-subtle)] overflow-hidden">
            <div className="h-full bg-[var(--color-accent-emerald)] w-full" />
          </div>
          <span className="text-[10px] text-[var(--color-text-secondary)] block text-center">
            AI Precision Rate: <strong className="text-[var(--color-accent-indigo)]">{aiAccuracyRate}%</strong>
          </span>
        </div>
      )}
    </aside>
  );
};
