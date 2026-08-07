import React from 'react';
import { Home, ShieldCheck, Layers, HardHat, Activity, Wallet, Cpu, BarChart3, FileText, Settings } from 'lucide-react';
import { useEscrowStore } from '../../store/useEscrowStore';
import { PageRoute } from '../../types';

export const DesktopNav: React.FC = () => {
  const { currentPage, setCurrentPage } = useEscrowStore();

  const items: { id: PageRoute; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'landing', label: 'Home', icon: <Home className="w-3.5 h-3.5" /> },
    { id: 'architecture', label: 'Architecture', icon: <Cpu className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />, badge: 'NEW' },
    { id: 'command-center', label: 'Command Center', icon: <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />, badge: 'Gov' },
    { id: 'projects', label: 'Projects', icon: <Layers className="w-3.5 h-3.5 text-cyan-400" /> },
    { id: 'workspace', label: 'Workspace', icon: <HardHat className="w-3.5 h-3.5 text-sky-400" /> },
    { id: 'mission-control', label: 'Mission Control', icon: <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />, badge: 'LIVE' },
    { id: 'treasury', label: 'Treasury', icon: <Wallet className="w-3.5 h-3.5 text-amber-400" /> },
    { id: 'explorer', label: 'Trust Layer', icon: <Cpu className="w-3.5 h-3.5 text-yellow-400" />, badge: 'x402' },
    { id: 'analytics', label: 'Analytics', icon: <BarChart3 className="w-3.5 h-3.5 text-purple-400" /> },
    { id: 'compliance', label: 'Compliance', icon: <FileText className="w-3.5 h-3.5 text-primary" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-3.5 h-3.5 text-secondary" /> },
  ];

  return (
    <div className="hidden lg:flex items-center gap-1 overflow-x-auto no-scrollbar py-1">
      {items.map((it) => {
        const isActive = currentPage === it.id;
        return (
          <button
            key={it.id}
            onClick={() => setCurrentPage(it.id)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all whitespace-nowrap ${
              isActive
                ? 'bg-gradient-to-r from-blue-600/30 to-cyan-500/25 text-cyan-300 border border-cyan-400/50 shadow-md shadow-cyan-500/10'
                : 'text-secondary hover:text-primary hover:bg-surface-secondary'
            }`}
          >
            {it.icon}
            <span>{it.label}</span>
            {it.badge && (
              <span className={`text-[9px] uppercase font-mono font-extrabold px-1.5 py-0.2 rounded ${
                it.badge === 'LIVE' ? 'bg-emerald-500/20 text-emerald-400 animate-pulse border border-emerald-500/30' :
                it.badge === 'Gov' ? 'bg-blue-600/20 text-blue-300 border border-blue-500/30' :
                'bg-amber-500/20 text-amber-300 border border-amber-500/30'
              }`}>
                {it.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
