'use client';
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
      bg-surface-secondary backdrop-blur-sm border border-subtle shadow-sm group"
    >
      {/* Subtle background glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent-cyan/5 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative z-10 flex flex-col items-center text-center space-y-3">
        
        {/* Header with animated lock/checkmark */}
        <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-widest text-accent-cyan">
          {isLocked ? (
            <div className="relative flex items-center justify-center w-8 h-8">
              {/* Spinning subtle ring */}
              <div className="absolute inset-0 rounded-full border-2 border-accent-cyan/20 border-t-accent-cyan animate-[spin_3s_linear_infinite]" />
              <div className="bg-accent-cyan/10 p-1.5 rounded-full z-10">
                <Lock className="w-3.5 h-3.5 text-accent-cyan" />
              </div>
            </div>
          ) : (
            <div className="bg-accent-emerald/10 p-1.5 rounded-full animate-[pulse_2s_ease-in-out_infinite]">
              <CheckCircle2 className="w-4 h-4 text-accent-emerald" />
            </div>
          )}
          <span>Escrow Amount Secured</span>
        </div>
        
        {/* Amount */}
        <div className="text-4xl font-black text-primary font-heading tracking-tight flex items-baseline justify-center gap-2 drop-shadow-sm">
          {amount} <span className="text-sm font-mono text-secondary font-bold">{currency}</span>
        </div>
        
        {/* Vault Address */}
        <div className="pt-4 w-full flex justify-center">
          <span className="text-[10px] font-mono text-secondary flex items-center gap-1.5 bg-surface px-2.5 py-1.5 rounded-lg border border-subtle shadow-inner">
            Smart Vault: <strong className="text-accent-cyan select-all">{vaultAddress}</strong>
          </span>
        </div>

      </div>
    </div>
  );
}

