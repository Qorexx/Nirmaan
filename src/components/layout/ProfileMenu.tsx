import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ShieldCheck, Cpu, HardHat, Wallet, Check, LogOut, ExternalLink, User, Lock, Key, RefreshCw, LogIn } from 'lucide-react';
import { useEscrowStore } from '../../store/useEscrowStore';
import { Avatar } from '../ui/Avatar';

export const ProfileMenu: React.FC = () => {
  const { currentUser, setLoginModalOpen, logoutUser } = useEscrowStore();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

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
      {/* Trigger Button */}
      <button
        onClick={() => {
          if (!currentUser.isAuthenticated) {
            setLoginModalOpen(true);
          } else {
            setIsOpen(!isOpen);
          }
        }}
        className="flex items-center gap-2.5 p-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-surface hover:bg-surface-secondary border border-subtle hover:border-subtle transition-all text-left group shadow-xs"
      >
        <Avatar
          initials={currentUser.avatarInitials}
          size="sm"
          status={currentUser.isAuthenticated ? 'online' : 'busy'}
          className="shrink-0 ring-2 ring-indigo-500/30"
        />
        <div className="hidden xl:flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-heading font-black text-primary group-hover:text-[#3730A3] transition-colors leading-snug">
              {currentUser.name}
            </span>
            {currentUser.isAuthenticated && (
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
            )}
          </div>
          <span className="text-[10px] font-mono text-secondary truncate max-w-[150px]">
            {currentUser.role}
          </span>
        </div>
        <ChevronDown className={`w-4 h-4 text-secondary transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180 text-[#3730A3]' : ''}`} />
      </button>

      {/* Profile Switcher & Auth Dropdown Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="absolute right-0 top-full mt-3 w-80 bg-surface border border-subtle rounded-2xl shadow-[0_20px_60px_rgba(28,25,23,0.16)] z-50 overflow-hidden divide-y divide-[#D6D0C4]"
          >
            {/* Active Wallet Header */}
            <div className="p-4 bg-surface-secondary space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#3730A3] font-heading">Active Session</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 text-[9px] font-black border border-emerald-300">
                  {currentUser.isAuthenticated ? 'L402 AUTHENTICATED' : 'GUEST MODE'}
                </span>
              </div>
              <div className="space-y-0.5">
                <div className="text-sm font-black font-heading text-primary">{currentUser.name}</div>
                <div className="text-xs text-primary font-mono font-black">{currentUser.role}</div>
                <div className="text-[10px] text-secondary font-mono italic">{currentUser.department}</div>
              </div>
              <div className="flex items-center justify-between gap-2 bg-surface px-3 py-2 rounded-xl border border-subtle text-xs mt-2 shadow-xs">
                <span className="text-secondary">Wallet:</span>
                <span className="text-[#3730A3] font-black select-all font-mono">{currentUser.address}</span>
              </div>
            </div>

            {/* Switch Role Section */}
            <div className="p-2 space-y-1 bg-surface">
              <button
                onClick={() => {
                  setIsOpen(false);
                  setLoginModalOpen(true);
                }}
                className="w-full p-3 rounded-xl text-left flex items-center justify-between transition-colors bg-surface-secondary hover:bg-[#DCD5C7] text-primary border border-subtle font-black font-heading text-xs group shadow-2xs"
              >
                <div className="flex items-center gap-2.5">
                  <LogIn className="w-4 h-4 text-[#3730A3] group-hover:scale-110 transition-transform" />
                  <span>Switch Persona / Login Portal</span>
                </div>
                <span className="text-[10px] font-mono bg-surface text-[#3730A3] font-black px-2 py-0.5 rounded-full border border-subtle">
                  4 ROLES
                </span>
              </button>

              {currentUser.isAuthenticated ? (
                <button
                  onClick={() => {
                    setIsOpen(false);
                    logoutUser();
                  }}
                  className="w-full p-2.5 rounded-xl text-left flex items-center gap-2.5 transition-colors text-rose-700 hover:bg-rose-50 font-bold text-xs font-sans"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Disconnect & Exit to Citizen Mode</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setLoginModalOpen(true);
                  }}
                  className="w-full p-2.5 rounded-xl text-left flex items-center gap-2.5 transition-colors text-emerald-800 hover:bg-emerald-50 font-bold text-xs font-sans"
                >
                  <Lock className="w-4 h-4" />
                  <span>Sign In with Sovereign ID</span>
                </button>
              )}
            </div>

            {/* Footer Notice */}
            <div className="p-2.5 bg-surface-secondary border-t border-subtle text-center text-[10px] font-mono text-secondary flex items-center justify-center gap-1.5 font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-[#3730A3]" />
              <span>MoRTH Infrastructure Governance Tier</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
