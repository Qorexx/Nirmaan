import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Terminal, ArrowRight, ShieldCheck, Zap, Layers, Activity, Wallet, BarChart3 } from 'lucide-react';
import { useEscrowStore } from '../../store/useEscrowStore';

export interface CommandOption {
  id: string;
  label: string;
  category: 'Navigation' | 'Governance' | 'Simulation' | 'x402 Protocol';
  icon: React.ReactNode;
  shortcut?: string;
  action: () => void;
}

export const CommandPalette: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const { setCurrentPage, runLiveSimulation } = useEscrowStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open palette handler
        }
      }
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const commands: CommandOption[] = [
    { id: 'nav-home', label: 'Go to Home (Landing Engine)', category: 'Navigation', icon: <Layers className="w-4 h-4 text-indigo-600" />, shortcut: 'H', action: () => { setCurrentPage('landing'); onClose(); } },
    { id: 'nav-arch', label: 'Open 4-Tab Architecture Portal', category: 'Navigation', icon: <Activity className="w-4 h-4 text-emerald-600" />, shortcut: 'A', action: () => { setCurrentPage('architecture'); onClose(); } },
    { id: 'nav-gov', label: 'Launch Government Command Suite', category: 'Navigation', icon: <ShieldCheck className="w-4 h-4 text-blue-600" />, shortcut: 'G', action: () => { setCurrentPage('command-center'); onClose(); } },
    { id: 'nav-treasury', label: 'Inspect Escrow Vault Treasury', category: 'Navigation', icon: <Wallet className="w-4 h-4 text-amber-600" />, shortcut: 'T', action: () => { setCurrentPage('treasury'); onClose(); } },
    { id: 'nav-analytics', label: 'View Audit & AI Analytics Suite', category: 'Navigation', icon: <BarChart3 className="w-4 h-4 text-purple-600" />, shortcut: 'S', action: () => { setCurrentPage('analytics'); onClose(); } },
    { id: 'sim-run', label: '▶ Trigger 6-Stage Autonomous Demo Simulation', category: 'Simulation', icon: <Terminal className="w-4 h-4 text-rose-600 animate-pulse" />, shortcut: '▶', action: () => { runLiveSimulation(); onClose(); } },
    { id: 'x402-test', label: 'Generate $0.05 USDC x402 Micropayment Proof', category: 'x402 Protocol', icon: <Zap className="w-4 h-4 text-amber-600 fill-current" />, shortcut: '402', action: () => { runLiveSimulation(); onClose(); } },
  ];

  const filtered = commands.filter(cmd => 
    cmd.label.toLowerCase().includes(query.toLowerCase()) || cmd.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#EAE5DC]/40 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="relative w-full max-w-2xl bg-[#F7F5F0] border border-[#D6D0C4] rounded-2xl shadow-[0_20px_60px_rgba(28,25,23,0.18)] z-10 overflow-hidden font-mono divide-y divide-[#D6D0C4]"
          >
            {/* Search Input */}
            <div className="flex items-center px-5 py-4 bg-[#EAE5DC] gap-3">
              <Search className="w-5 h-5 text-indigo-600 shrink-0" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a command or search OS portals... (e.g. simulation, architecture)"
                className="w-full bg-transparent text-[#1C1917] placeholder-[#78716C] text-sm font-mono focus:outline-none"
              />
              <span className="text-[10px] uppercase bg-[#D6D0C4] px-2 py-0.5 rounded text-[#44403C] font-extrabold font-sans">ESC</span>
            </div>

            {/* Results List */}
            <div className="max-h-80 overflow-y-auto p-2 space-y-1 bg-[#F7F5F0]">
              {filtered.length > 0 ? (
                filtered.map((cmd) => (
                  <button
                    key={cmd.id}
                    onClick={cmd.action}
                    className="w-full p-3 rounded-xl hover:bg-[#EAE5DC] text-left flex items-center justify-between group transition-colors border border-transparent hover:border-[#C9C2B4]"
                  >
                    <div className="flex items-center gap-3">
                      <span className="p-2 rounded-lg bg-[#EAE5DC] border border-[#D6D0C4] group-hover:bg-indigo-100 transition-colors">
                        {cmd.icon}
                      </span>
                      <div>
                        <span className="text-sm font-black text-[#1C1917] group-hover:text-indigo-700 block font-sans">
                          {cmd.label}
                        </span>
                        <span className="text-[10px] text-[#57534E] uppercase font-mono font-extrabold">{cmd.category}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {cmd.shortcut && (
                        <span className="px-2 py-1 rounded bg-[#EAE5DC] text-[#44403C] font-mono text-[10px] font-black border border-[#D6D0C4]">
                          {cmd.shortcut}
                        </span>
                      )}
                      <ArrowRight className="w-4 h-4 text-[#78716C] group-hover:text-indigo-700 group-hover:translate-x-1 transition-all" />
                    </div>
                  </button>
                ))
              ) : (
                <div className="py-10 text-center text-[#57534E] text-xs font-sans font-bold">
                  No commands found matching "{query}".
                </div>
              )}
            </div>

            <div className="px-4 py-2 bg-[#EAE5DC] text-[10px] text-[#57534E] font-bold flex items-center justify-between">
              <span>PRO TIP: Use ↑↓ arrows to navigate, ENTER to execute</span>
              <span className="text-indigo-700 font-extrabold">Sovereign OS v2.4</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
