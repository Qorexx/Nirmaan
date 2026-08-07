import React from 'react';
import { Lock, CheckCircle2 } from 'lucide-react';

interface EscrowCardProps {
  amount?: string;
  currency?: string;
  vaultAddress?: string;
  isLocked?: boolean;
}

export function EscrowCard({ 
  amount = "₹14,50,000", 
  currency = "USDC",
  vaultAddress = "0x7a89...E391",
  isLocked = true 
}: EscrowCardProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl p-6 transition-all duration-300
      /* Light Mode: White/glass with teal accents */
      bg-white/90 backdrop-blur-sm border border-teal-200/60 shadow-sm
      /* Dark Mode: Dark gray with cyan glow */
      dark:bg-slate-900/95 dark:border-cyan-500/30 dark:shadow-[0_0_20px_rgba(6,182,212,0.12)]
      group"
    >
      {/* Subtle background glow effect on hover in dark mode */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative z-10 flex flex-col items-center text-center space-y-3">
        
        {/* Header with animated lock/checkmark */}
        <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-widest text-teal-700 dark:text-cyan-400">
          {isLocked ? (
            <div className="relative flex items-center justify-center w-8 h-8">
              {/* Spinning subtle ring */}
              <div className="absolute inset-0 rounded-full border-2 border-teal-100 dark:border-cyan-500/20 border-t-teal-500 dark:border-t-cyan-400 animate-[spin_3s_linear_infinite]" />
              <div className="bg-teal-50 dark:bg-cyan-950/40 p-1.5 rounded-full z-10">
                <Lock className="w-3.5 h-3.5 text-teal-600 dark:text-cyan-400" />
              </div>
            </div>
          ) : (
            <div className="bg-emerald-50 dark:bg-emerald-950/40 p-1.5 rounded-full animate-[pulse_2s_ease-in-out_infinite]">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            </div>
          )}
          <span>Escrow Amount Secured</span>
        </div>
        
        {/* Amount */}
        <div className="text-4xl font-black text-slate-900 dark:text-white font-heading tracking-tight flex items-baseline justify-center gap-2 drop-shadow-sm">
          {amount} <span className="text-sm font-mono text-slate-500 dark:text-slate-400 font-bold">{currency}</span>
        </div>
        
        {/* Vault Address */}
        <div className="pt-4 w-full flex justify-center">
          <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 flex items-center gap-1.5 bg-slate-50 dark:bg-slate-800/80 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700/60 shadow-inner">
            Smart Vault: <strong className="text-teal-700 dark:text-cyan-400 select-all">{vaultAddress}</strong>
          </span>
        </div>

      </div>
    </div>
  );
}
