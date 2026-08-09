'use client';

import React from 'react';
import Link from 'next/link';
import { Globe2, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[var(--color-bg-surface-secondary)] border-t border-[var(--color-border-subtle)] text-[var(--color-text-secondary)] font-mono text-xs py-12 px-6 mt-20">
      <div className="max-w-[1700px] mx-auto space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Branding */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[var(--color-accent-indigo)] to-indigo-800 p-[2px] shadow-sm">
                <div className="w-full h-full bg-[var(--color-bg-surface)] rounded-[6px] flex items-center justify-center">
                  <Globe2 className="w-4 h-4 text-[var(--color-accent-indigo)]" />
                </div>
              </div>
              <span className="font-bold text-[var(--color-text-primary)] text-sm tracking-wide font-heading">AI ESCROW ORCHESTRATOR</span>
            </div>
            <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed font-mono">
              Autonomous Infrastructure Operating System v2.4. AI-assisted verification and automated escrow operations for transparent infrastructure governance.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <span className="w-2 h-2 rounded-full bg-[var(--color-accent-emerald)] animate-pulse" />
              <span className="text-[var(--color-accent-emerald)] text-[10px] font-bold">SOVEREIGN-402 LEDGER: ONLINE (4ms)</span>
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-3">
            <h4 className="text-[var(--color-text-primary)] font-bold text-xs uppercase tracking-widest font-heading">Platform Modules</h4>
            <ul className="space-y-2 font-mono text-[var(--color-text-secondary)]">
              <li><Link href="/" className="hover:text-[var(--color-accent-indigo)] transition-colors">▶ Overview (Home)</Link></li>
              <li><Link href="/architecture" className="hover:text-[var(--color-accent-indigo)] transition-colors font-bold text-[var(--color-accent-indigo)]">◉ Architecture Showcase</Link></li>
              <li><Link href="/command" className="hover:text-[var(--color-accent-indigo)] transition-colors">🏛 Government Command Suite</Link></li>
              <li><Link href="/projects" className="hover:text-[var(--color-accent-indigo)] transition-colors">📁 Project Infrastructure Hub</Link></li>
              <li><Link href="/mission-control" className="hover:text-[var(--color-accent-indigo)] transition-colors">⚡ Live Mission Control</Link></li>
            </ul>
          </div>

          {/* Core Technologies */}
          <div className="space-y-3">
            <h4 className="text-[var(--color-text-primary)] font-bold text-xs uppercase tracking-widest font-heading">Core Technologies</h4>
            <ul className="space-y-2 font-mono text-[var(--color-text-secondary)]">
              <li className="flex items-center gap-2"><span>• HTTP 402 / L402 Macaroon Wallets</span> <span className="text-[10px] text-amber-600 bg-amber-500/10 px-1.5 py-0.5 rounded font-bold border border-amber-500/20">84ms</span></li>
              <li className="flex items-center gap-2"><span>• Computer Vision Feature Extraction</span> <span className="text-[10px] text-purple-500 bg-purple-500/10 px-1.5 py-0.5 rounded font-bold border border-purple-500/20">1.3s</span></li>
              <li className="flex items-center gap-2"><span>• Satellite GIS Boundary Cross-Sync</span> <span className="text-[10px] text-[var(--color-accent-indigo)] bg-[var(--color-accent-indigo)]/10 px-1.5 py-0.5 rounded font-bold border border-[var(--color-accent-indigo)]/20">&gt;95%</span></li>
              <li className="flex items-center gap-2"><span>• Deterministic Smart Contract Escrow</span> <span className="text-[10px] text-[var(--color-accent-emerald)] bg-[var(--color-accent-emerald)]/10 px-1.5 py-0.5 rounded font-bold border border-[var(--color-accent-emerald)]/20">0 Hold</span></li>
            </ul>
          </div>

          {/* Status Widget */}
          <div className="bg-[var(--color-bg-surface)] p-5 rounded-2xl border border-[var(--color-border-subtle)] space-y-3 flex flex-col justify-between shadow-sm">
            <div>
              <span className="text-[10px] font-bold uppercase text-[var(--color-text-secondary)] block font-heading">Treasury Vault Status:</span>
              <div className="text-2xl font-bold text-[var(--color-text-primary)] font-heading mt-1">₹52,400,000</div>
              <span className="text-[var(--color-accent-emerald)] text-xs font-mono font-bold block">100% Fully Collateralized & Protected</span>
            </div>
            <div className="pt-3 border-t border-[var(--color-border-subtle)] flex items-center justify-between text-[10px] text-[var(--color-text-secondary)] font-medium">
              <span>Enterprise Platform</span>
              <span className="text-[var(--color-accent-indigo)] font-bold">v2.4 LTS</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-[var(--color-border-subtle)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--color-text-secondary)]">
          <p>© 2026 AI Escrow Orchestrator · Autonomous Infrastructure Operations</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-[var(--color-text-primary)] cursor-pointer transition-colors">Privacy & Security</span>
            <span className="hover:text-[var(--color-text-primary)] cursor-pointer transition-colors">Documentation</span>
            <span className="hover:text-[var(--color-text-primary)] cursor-pointer transition-colors">API Reference</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
