import React, { useState } from 'react';
import { motion } from 'framer-motion';
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
  Lock
} from 'lucide-react';
import { useEscrowStore } from '../../store/useEscrowStore';
import { PageRoute } from '../../types';

export const AnimatedSidebar: React.FC = () => {
  const [isManualCollapsed, setIsManualCollapsed] = useState(false);
  const { currentPage, setCurrentPage, totalProtectedValue, aiAccuracyRate, isPresentationMode } = useEscrowStore();
  
  const isCollapsed = isManualCollapsed || isPresentationMode;

  const navItems: { id: PageRoute; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'landing', label: 'Home Engine', icon: <Home className="w-5 h-5 text-accent-indigo" /> },
    { id: 'architecture', label: 'Architecture Demo', icon: <Cpu className="w-5 h-5 text-blue-500 animate-pulse" />, badge: 'NEW' },
    { id: 'command-center', label: 'Command Suite', icon: <ShieldCheck className="w-5 h-5 text-accent-indigo" />, badge: 'Gov' },
    { id: 'projects', label: 'Project Deck', icon: <Layers className="w-5 h-5 text-accent-indigo" /> },
    { id: 'workspace', label: 'Contractor Hub', icon: <HardHat className="w-5 h-5 text-accent-emerald" /> },
    { id: 'mission-control', label: 'Mission Control', icon: <Activity className="w-5 h-5 text-rose-500 animate-pulse" />, badge: 'LIVE' },
    { id: 'treasury', label: 'Vault Treasury', icon: <Wallet className="w-5 h-5 text-accent-gold" /> },
    { id: 'explorer', label: 'Trust Ledger', icon: <Cpu className="w-5 h-5 text-purple-500" />, badge: 'x402' },
    { id: 'analytics', label: 'AI Analytics', icon: <BarChart3 className="w-5 h-5 text-violet-500" /> },
    { id: 'compliance', label: 'Regulatory Audit', icon: <FileText className="w-5 h-5 text-secondary" /> },
    { id: 'settings', label: 'System Config', icon: <Settings className="w-5 h-5 text-secondary" /> },
  ];

  return (
    <aside
      className={`hidden lg:flex flex-col bg-surface border-r border-subtle transition-all duration-300 relative shrink-0 z-40 select-none shadow-[2px_0_25px_rgba(0,0,0,0.03)] ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Collapse Toggle Handle */}
      {!isPresentationMode && (
        <button
          onClick={() => setIsManualCollapsed(!isManualCollapsed)}
          className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-surface border border-subtle text-secondary hover:text-accent-indigo hover:scale-110 flex items-center justify-center shadow-md z-50 transition-all"
          title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      )}

      {/* Top Branding Section */}
      <div className={`p-5 flex items-center gap-3 border-b border-subtle ${isCollapsed ? 'justify-center' : ''}`}>
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-accent-indigo via-blue-600 to-indigo-800 p-[2px] shrink-0 shadow-md shadow-accent-indigo/20">
          <div className="w-full h-full bg-surface rounded-[10px] flex items-center justify-center">
            <Globe2 className="w-5 h-5 text-accent-indigo animate-spin" style={{ animationDuration: '20s' }} />
          </div>
        </div>
        {!isCollapsed && (
          <div className="overflow-hidden">
            <span className="font-black text-primary text-sm tracking-tight block truncate font-heading">AI ESCROW OS</span>
            <span className="text-[10px] font-mono font-extrabold text-accent-indigo block uppercase">Sovereign Deck v2.4</span>
          </div>
        )}
      </div>

      {/* Navigation List */}
      <nav className="flex-1 p-3 overflow-y-auto space-y-1.5 no-scrollbar font-mono">
        {!isCollapsed && <span className="text-[10px] uppercase font-extrabold text-secondary px-3 py-1.5 block tracking-wider font-heading">Sovereign Portals:</span>}

        {navItems.map((item) => {
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              title={isCollapsed ? item.label : undefined}
              className={`w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl transition-all relative group ${
                isCollapsed ? 'justify-center' : ''
              } ${
                isActive
                  ? 'bg-surface-secondary text-accent-indigo font-black shadow-xs border border-subtle'
                  : 'text-secondary hover:text-primary hover:bg-surface-secondary/80 font-bold'
              }`}
            >
              {/* Active Indicator Neon Pill */}
              {isActive && (
                <span className="absolute left-0 top-2 bottom-2 w-1.5 rounded-r-full bg-accent-indigo shadow-[0_0_10px_rgba(79,70,229,0.4)]" />
              )}

              <span className={`shrink-0 transition-transform group-hover:scale-110 ${isActive ? 'scale-110 text-accent-indigo' : ''}`}>
                {item.icon}
              </span>

              {!isCollapsed && (
                <>
                  <span className="truncate flex-1 text-left text-xs font-sans tracking-tight">{item.label}</span>
                  {item.badge && (
                    <span className={`text-[9px] uppercase font-mono font-black px-2 py-0.5 rounded-full shrink-0 shadow-2xs ${
                      item.badge === 'LIVE' ? 'bg-rose-500/15 text-rose-500 border border-rose-500/30 animate-pulse' :
                      item.badge === 'Gov' ? 'bg-accent-indigo/15 text-accent-indigo border border-accent-indigo/30' :
                      'bg-accent-gold/15 text-accent-gold border border-accent-gold/30'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom Health & Vault Status Widget */}
      {!isCollapsed && !isPresentationMode && (
        <div className="p-4 m-3 rounded-2xl bg-surface-secondary border border-subtle font-mono text-xs space-y-2 shrink-0 shadow-xs">
          <div className="flex items-center justify-between text-secondary text-[10px]">
            <span>Vault Liquidity:</span>
            <span className="text-accent-emerald font-extrabold bg-accent-emerald/10 px-1.5 py-0.5 rounded border border-accent-emerald/30">100% Secured</span>
          </div>
          <div className="text-sm font-black text-primary font-heading">₹{(totalProtectedValue / 1000000).toFixed(1)}M USDC</div>
          <div className="h-2 w-full rounded-full bg-subtle overflow-hidden">
            <div className="h-full bg-accent-emerald w-full shadow-xs" />
          </div>
          <span className="text-[10px] text-secondary block text-center">AI Precision Rate: <strong className="text-accent-indigo">{aiAccuracyRate}%</strong></span>
        </div>
      )}
    </aside>
  );
};
