import React from 'react';
import { ChevronRight, Home, Shield, Layers, Activity, Wallet, Cpu, BarChart3, FileText, Settings, HardHat } from 'lucide-react';
import { useEscrowStore } from '../../store/useEscrowStore';
import { PageRoute } from '../../types';

export const Breadcrumbs: React.FC = () => {
  const { currentPage, setCurrentPage } = useEscrowStore();

  const getRouteInfo = (route: PageRoute): { label: string; parent: string; icon: React.ReactNode } => {
    switch (route) {
      case 'command-center': return { label: 'Command Suite', parent: 'Governance', icon: <Shield className="w-3.5 h-3.5 text-indigo-700" /> };
      case 'projects': return { label: 'Infrastructure Deck', parent: 'Operations', icon: <Layers className="w-3.5 h-3.5 text-indigo-700" /> };
      case 'workspace': return { label: 'Contractor Hub', parent: 'Operations', icon: <HardHat className="w-3.5 h-3.5 text-emerald-700" /> };
      case 'mission-control': return { label: 'Live Telemetry Engine', parent: 'Autonomous Intelligence', icon: <Activity className="w-3.5 h-3.5 text-rose-700" /> };
      case 'treasury': return { label: 'Escrow Vaults & x402', parent: 'Treasury', icon: <Wallet className="w-3.5 h-3.5 text-amber-700" /> };
      case 'explorer': return { label: 'Blockchain Trust Ledger', parent: 'Verification', icon: <Cpu className="w-3.5 h-3.5 text-purple-700" /> };
      case 'architecture': return { label: '4-Tab Showcase Portal', parent: 'System Architecture', icon: <Cpu className="w-3.5 h-3.5 text-blue-700" /> };
      case 'analytics': return { label: 'Compliance & AI Accuracy', parent: 'Analytics', icon: <BarChart3 className="w-3.5 h-3.5 text-violet-700" /> };
      case 'compliance': return { label: 'Regulatory Audits', parent: 'Governance', icon: <FileText className="w-3.5 h-3.5 text-stone-700" /> };
      case 'settings': return { label: 'System Configuration', parent: 'Admin', icon: <Settings className="w-3.5 h-3.5 text-stone-600" /> };
      case 'landing':
      default: return { label: 'Overview Engine', parent: 'Root Platform', icon: <Home className="w-3.5 h-3.5 text-indigo-700" /> };
    }
  };

  const info = getRouteInfo(currentPage);

  return (
    <nav className="flex items-center gap-2 px-4 lg:px-6 py-2 bg-surface-secondary border-b border-subtle text-xs font-mono text-secondary overflow-x-auto no-scrollbar">
      <button 
        onClick={() => setCurrentPage('landing')}
        className="flex items-center gap-1.5 hover:text-primary transition-colors shrink-0 font-extrabold text-primary font-heading"
      >
        <Home className="w-3.5 h-3.5 text-indigo-700" />
        <span>OS v2.4</span>
      </button>

      <ChevronRight className="w-3.5 h-3.5 text-secondary shrink-0" />

      <span className="text-secondary hover:text-primary cursor-default shrink-0 font-bold">
        {info.parent}
      </span>

      <ChevronRight className="w-3.5 h-3.5 text-secondary shrink-0" />

      <span className="flex items-center gap-1.5 text-indigo-900 font-extrabold bg-indigo-100/90 px-2.5 py-0.5 rounded-md border border-indigo-300 shrink-0 shadow-2xs">
        {info.icon}
        <span>{info.label}</span>
      </span>

      <span className="ml-auto hidden sm:flex items-center gap-1.5 text-[10px] text-emerald-900 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-300 font-extrabold">
        <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
        <span>SYNCED TO SOVEREIGN-402</span>
      </span>
    </nav>
  );
};
