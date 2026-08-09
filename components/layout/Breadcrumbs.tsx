'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home, Shield, Layers, Activity, Wallet, Cpu, BarChart3, FileText, Settings, HardHat } from 'lucide-react';

export const Breadcrumbs: React.FC = () => {
  const pathname = usePathname();

  const getRouteInfo = (path: string): { label: string; parent: string; icon: React.ReactNode } => {
    switch (path) {
      case '/command': return { label: 'Command Suite', parent: 'Governance', icon: <Shield className="w-3.5 h-3.5" /> };
      case '/projects': return { label: 'Infrastructure Deck', parent: 'Operations', icon: <Layers className="w-3.5 h-3.5" /> };
      case '/contractors': return { label: 'Contractor Hub', parent: 'Operations', icon: <HardHat className="w-3.5 h-3.5" /> };
      case '/mission-control': return { label: 'Live Telemetry Engine', parent: 'Intelligence', icon: <Activity className="w-3.5 h-3.5" /> };
      case '/treasury': return { label: 'Escrow Vaults & x402', parent: 'Treasury', icon: <Wallet className="w-3.5 h-3.5" /> };
      case '/ledger': return { label: 'Trust Ledger', parent: 'Verification', icon: <Cpu className="w-3.5 h-3.5" /> };
      case '/architecture': return { label: 'Architecture Showcase', parent: 'System', icon: <Cpu className="w-3.5 h-3.5" /> };
      case '/analytics': return { label: 'AI Analytics', parent: 'Analytics', icon: <BarChart3 className="w-3.5 h-3.5" /> };
      case '/audits': return { label: 'Regulatory Audits', parent: 'Governance', icon: <FileText className="w-3.5 h-3.5" /> };
      case '/settings': return { label: 'System Configuration', parent: 'Admin', icon: <Settings className="w-3.5 h-3.5" /> };
      default: return { label: 'Overview', parent: 'Platform', icon: <Home className="w-3.5 h-3.5" /> };
    }
  };

  const info = getRouteInfo(pathname);

  return (
    <nav className="flex items-center gap-2 px-4 lg:px-6 py-2 bg-[var(--color-bg-surface-secondary)] border-b border-[var(--color-border-subtle)] text-xs font-mono text-[var(--color-text-secondary)] overflow-x-auto no-scrollbar">
      <Link
        href="/"
        className="flex items-center gap-1.5 hover:text-[var(--color-text-primary)] transition-colors shrink-0 font-bold text-[var(--color-text-primary)] font-heading"
      >
        <Home className="w-3.5 h-3.5 text-[var(--color-accent-indigo)]" />
        <span>Platform v2.4</span>
      </Link>

      <ChevronRight className="w-3.5 h-3.5 text-[var(--color-text-secondary)] shrink-0" />

      <span className="text-[var(--color-text-secondary)] shrink-0 font-medium">
        {info.parent}
      </span>

      <ChevronRight className="w-3.5 h-3.5 text-[var(--color-text-secondary)] shrink-0" />

      <span className="flex items-center gap-1.5 text-[var(--color-accent-indigo)] font-bold bg-[var(--color-accent-indigo)]/10 px-2.5 py-0.5 rounded-md border border-[var(--color-accent-indigo)]/20 shrink-0">
        {info.icon}
        <span>{info.label}</span>
      </span>

      <span className="ml-auto hidden sm:flex items-center gap-1.5 text-[10px] text-[var(--color-accent-emerald)] bg-[var(--color-accent-emerald)]/10 px-2.5 py-0.5 rounded-full border border-[var(--color-accent-emerald)]/20 font-bold">
        <span className="w-2 h-2 rounded-full bg-[var(--color-accent-emerald)] animate-pulse" />
        <span>SYNCED TO SOVEREIGN-402</span>
      </span>
    </nav>
  );
};
