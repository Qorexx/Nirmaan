import React from 'react';
import { Home, ShieldCheck, Layers, HardHat, Activity, Wallet, Cpu, BarChart3, FileText, Settings } from 'lucide-react';
import { useEscrowStore } from '../../store/useEscrowStore';
import { PageRoute } from '../../types';

export const TabletNav: React.FC = () => {
  const { currentPage, setCurrentPage } = useEscrowStore();

  const railItems: { id: PageRoute; label: string; icon: React.ReactNode }[] = [
    { id: 'landing', label: 'Home', icon: <Home className="w-5 h-5 text-indigo-700" /> },
    { id: 'architecture', label: 'Architecture', icon: <Cpu className="w-5 h-5 text-blue-700 animate-pulse" /> },
    { id: 'command-center', label: 'Gov Command', icon: <ShieldCheck className="w-5 h-5 text-indigo-700" /> },
    { id: 'projects', label: 'Projects', icon: <Layers className="w-5 h-5 text-indigo-700" /> },
    { id: 'workspace', label: 'Workspace', icon: <HardHat className="w-5 h-5 text-emerald-700" /> },
    { id: 'mission-control', label: 'Mission', icon: <Activity className="w-5 h-5 text-rose-700 animate-pulse" /> },
    { id: 'treasury', label: 'Treasury', icon: <Wallet className="w-5 h-5 text-amber-700" /> },
    { id: 'explorer', label: 'Trust Layer', icon: <Cpu className="w-5 h-5 text-purple-700" /> },
    { id: 'analytics', label: 'Analytics', icon: <BarChart3 className="w-5 h-5 text-violet-700" /> },
    { id: 'compliance', label: 'Compliance', icon: <FileText className="w-5 h-5 text-stone-700" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-5 h-5 text-stone-600" /> },
  ];

  return (
    <aside className="hidden md:flex lg:hidden flex-col items-center bg-[#F7F5F0] border-r border-[#D6D0C4] w-20 py-4 space-y-3 shrink-0 z-40 shadow-[2px_0_20px_rgba(28,25,23,0.03)]">
      <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-700 via-blue-700 to-indigo-800 p-[2px] mb-4 shadow-sm">
        <div className="w-full h-full bg-[#F7F5F0] rounded-[10px] flex items-center justify-center font-black text-[#1C1917] font-sans text-xs">
          OS
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto w-full px-2 space-y-2 no-scrollbar">
        {railItems.map((item) => {
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              title={item.label}
              className={`w-full py-3 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all group relative ${
                isActive ? 'bg-[#EAE5DC] text-indigo-950 border border-[#C9C2B4] shadow-xs font-black' : 'text-[#78716C] hover:text-[#1C1917] hover:bg-[#EAE5DC]/50'
              }`}
            >
              {isActive && <span className="absolute left-1 top-1/2 -translate-y-1/2 w-1.5 h-6 rounded-full bg-indigo-700 shadow-xs" />}
              <span className="group-hover:scale-110 transition-transform">{item.icon}</span>
              <span className="text-[9px] font-mono truncate max-w-[60px] font-bold">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="w-3 h-3 rounded-full bg-emerald-600 animate-pulse ring-4 ring-emerald-100" title="Sovereign Ledger Synced" />
    </aside>
  );
};
