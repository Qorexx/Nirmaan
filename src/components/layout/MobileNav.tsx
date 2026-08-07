import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Activity, Layers, Cpu, Shield, Menu, X, Wallet, BarChart3, FileText, Settings, HardHat } from 'lucide-react';
import { useEscrowStore } from '../../store/useEscrowStore';
import { PageRoute } from '../../types';

export const MobileNav: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentPage, setCurrentPage } = useEscrowStore();

  const primaryItems = [
    { id: 'landing' as PageRoute, label: 'Home', icon: <Home className="w-5 h-5" /> },
    { id: 'architecture' as PageRoute, label: 'Architecture', icon: <Cpu className="w-5 h-5 text-blue-700 animate-pulse" /> },
    { id: 'command-center' as PageRoute, label: 'Gov Command', icon: <Shield className="w-5 h-5 text-indigo-700" /> },
    { id: 'mission-control' as PageRoute, label: 'Telemetry', icon: <Activity className="w-5 h-5 text-rose-700" /> },
  ];

  const secondaryItems: { id: PageRoute; label: string; icon: React.ReactNode; desc: string }[] = [
    { id: 'projects', label: 'Projects Hub', icon: <Layers className="w-5 h-5 text-indigo-700" />, desc: 'Explore infrastructure digital twins' },
    { id: 'workspace', label: 'Contractor Workspace', icon: <HardHat className="w-5 h-5 text-emerald-700" />, desc: 'Submit GPS video & evidence scans' },
    { id: 'treasury', label: 'Escrow Treasury', icon: <Wallet className="w-5 h-5 text-amber-700" />, desc: 'Monitor multi-million dollar liquidity' },
    { id: 'explorer', label: 'Blockchain Explorer', icon: <Cpu className="w-5 h-5 text-purple-700" />, desc: 'Verify on-chain immutable receipts' },
    { id: 'analytics', label: 'AI Analytics', icon: <BarChart3 className="w-5 h-5 text-violet-700" />, desc: 'Review computer vision latency specs' },
    { id: 'compliance', label: 'Regulatory Audits', icon: <FileText className="w-5 h-5 text-stone-700" />, desc: 'Anti-corruption tamper records' },
    { id: 'settings', label: 'System Settings', icon: <Settings className="w-5 h-5 text-stone-600" />, desc: 'Configure simulation loop interval' },
  ];

  return (
    <>
      {/* Bottom Bar for Smartphone Thumb Reach */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-surface/95 backdrop-blur-xl border-t border-subtle py-2 px-4 flex items-center justify-around z-50 shadow-[0_-6px_25px_rgba(28,25,23,0.08)]">
        {primaryItems.map((item) => {
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className={`flex flex-col items-center gap-1 px-3 py-1 rounded-xl transition-all select-none ${
                isActive ? 'text-indigo-700 font-black scale-105' : 'text-secondary hover:text-primary'
              }`}
            >
              <span className="relative">
                {item.icon}
                {isActive && <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-indigo-700 shadow-xs" />}
              </span>
              <span className="text-[10px] font-mono tracking-wide font-extrabold">{item.label}</span>
            </button>
          );
        })}

        {/* More Menu Flyout Trigger */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`flex flex-col items-center gap-1 px-3 py-1 rounded-xl transition-all ${
            isMenuOpen ? 'text-amber-700 font-black scale-105' : 'text-secondary hover:text-primary'
          }`}
        >
          <Menu className="w-5 h-5" />
          <span className="text-[10px] font-mono font-extrabold">More OS</span>
        </button>
      </nav>

      {/* Slide-up Drawer for Secondary Pages */}
      <AnimatePresence>
        {isMenuOpen && (
          <div className="md:hidden fixed inset-0 z-50 flex flex-col justify-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-surface-secondary/40 backdrop-blur-sm"
            />

            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="relative bg-surface border-t-2 border-subtle rounded-t-3xl p-6 shadow-[0_0_50px_rgba(28,25,23,0.2)] z-10 space-y-4 max-h-[85vh] overflow-y-auto font-mono text-primary"
            >
              <div className="flex items-center justify-between pb-3 border-b border-subtle">
                <span className="text-sm font-black text-primary uppercase tracking-wider font-heading">All OS Portals</span>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-1.5 rounded-xl bg-surface-secondary border border-subtle text-secondary hover:text-primary"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-2">
                {secondaryItems.map((sItem) => (
                  <button
                    key={sItem.id}
                    onClick={() => {
                      setCurrentPage(sItem.id);
                      setIsMenuOpen(false);
                    }}
                    className={`w-full p-3.5 rounded-2xl border flex items-center gap-4 text-left transition-colors ${
                      currentPage === sItem.id
                        ? 'bg-indigo-100 border-indigo-300 text-indigo-950 font-black'
                        : 'bg-surface-secondary border-subtle text-primary hover:bg-surface-secondary'
                    }`}
                  >
                    <span className="p-2 rounded-xl bg-surface border border-subtle shrink-0">
                      {sItem.icon}
                    </span>
                    <div>
                      <span className="text-sm font-black block font-heading">{sItem.label}</span>
                      <span className="text-[11px] text-secondary font-mono block font-medium">{sItem.desc}</span>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
