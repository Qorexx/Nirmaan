import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, CheckCircle2, Zap, ShieldAlert, Check, ExternalLink } from 'lucide-react';
import { useEscrowStore } from '../../store/useEscrowStore';

export const NotificationCenter: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(3);
  const { logs, setCurrentPage } = useEscrowStore();
  const menuRef = useRef<HTMLDivElement>(null);

  const defaultAlerts = [
    { id: '1', title: 'x402 Settlement Executed', msg: '$0.05 USDC verification gas settled via machine wallet in 84ms.', type: 'x402', time: '12s ago', unread: true },
    { id: '2', title: 'Vision AI Score: 97.2%', msg: 'NH-44 Highway Resurfacing evidence passed boundary geo-sync.', type: 'success', time: '2 mins ago', unread: true },
    { id: '3', title: 'Smart Contract Vault Unlocked', msg: 'Tx: 0x7ab982... executed on sovereign ledger without manual hold.', type: 'chain', time: '14 mins ago', unread: true },
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
      {/* Bell Trigger */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          if (!isOpen) setUnreadCount(0);
        }}
        className="relative p-2.5 rounded-xl bg-surface-secondary hover:bg-surface-secondary border border-subtle text-secondary hover:text-primary transition-all shadow-xs group"
        title="View Real-Time System Telemetry & Alerts"
      >
        <Bell className="w-4 h-4 group-hover:scale-110 transition-transform text-primary" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-rose-600 to-amber-600 text-white text-[10px] font-extrabold rounded-full flex items-center justify-center border-2 border-[#F7F5F0] animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Notifications Drawer Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-3 w-80 sm:w-96 bg-surface border border-subtle rounded-2xl shadow-[0_20px_60px_rgba(28,25,23,0.18)] z-50 overflow-hidden divide-y divide-[#D6D0C4]"
          >
            {/* Header */}
            <div className="p-4 bg-surface-secondary flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm font-black text-primary uppercase tracking-wider font-heading">Mission Alerts</span>
                <span className="px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-900 text-[10px] font-black border border-indigo-300">
                  LIVE FEED
                </span>
              </div>
              <button 
                onClick={() => setUnreadCount(0)}
                className="text-xs text-secondary hover:text-primary flex items-center gap-1 transition-colors font-bold"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Clear All</span>
              </button>
            </div>

            {/* List */}
            <div className="max-h-80 overflow-y-auto divide-y divide-[#D6D0C4] bg-surface">
              {defaultAlerts.map((alt) => (
                <div key={alt.id} className="p-4 hover:bg-surface-secondary transition-colors space-y-1.5 relative group">
                  <div className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-2 font-extrabold text-primary">
                      {alt.type === 'x402' ? <Zap className="w-4 h-4 text-amber-700 fill-current" /> : <CheckCircle2 className="w-4 h-4 text-emerald-700" />}
                      <span className="font-heading font-black">{alt.title}</span>
                    </span>
                    <span className="text-secondary text-[10px] font-bold">{alt.time}</span>
                  </div>
                  <p className="text-xs text-secondary font-mono leading-relaxed pl-6 font-semibold">{alt.msg}</p>
                </div>
              ))}

              {logs.slice(0, 4).map((lg, idx) => (
                <div key={lg.id || idx} className="p-3 bg-surface-secondary text-xs font-mono space-y-1 text-secondary border-t border-subtle">
                  <span className="text-indigo-700 font-extrabold uppercase">[{lg.stage}]</span> <span className="text-primary font-semibold">{lg.message}</span>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="p-3 bg-surface-secondary text-center border-t border-subtle">
              <button
                onClick={() => {
                  setCurrentPage('mission-control');
                  setIsOpen(false);
                }}
                className="text-xs font-black text-indigo-700 hover:text-indigo-900 tracking-wider flex items-center justify-center gap-1 mx-auto uppercase font-heading"
              >
                <span>View Full Telemetry Dashboard</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
