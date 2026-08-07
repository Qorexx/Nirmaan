import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wallet, Zap, ArrowDownUp, CheckCircle2, Lock, ShieldCheck, ExternalLink, ArrowUpRight, ShieldAlert, DollarSign, Layers, RefreshCw, Activity } from 'lucide-react';
import { useEscrowStore } from '../store/useEscrowStore';
import { Button, GlassCard, KPICard, Badge, Card, StatCard, AnimatedBorder } from '../components/ui';

export const EscrowTreasuryPage: React.FC = () => {
  const { totalProtectedValue, projects, runLiveSimulation } = useEscrowStore();
  const [selectedVault, setSelectedVault] = useState<string | null>(null);

  const totalLocked = projects.reduce((acc, p) => acc + (p.lockedAmount || p.budget * 0.5), 0);
  const totalReleased = projects.reduce((acc, p) => acc + (p.releasedAmount || p.budget * 0.5), 0);

  return (
    <div className="space-y-10 font-mono pb-24 text-primary max-w-[1750px] mx-auto">
      
      {/* 1. HERO TREASURY COMMAND DECK */}
      <GlassCard intensity="high" className="relative overflow-hidden border-2 border-amber-500/40 shadow-[0_0_80px_rgba(245,158,11,0.15)] bg-gradient-to-r from-[#141008] via-[#101420] to-[#0A0D18]">
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-4xl">
            <div className="flex flex-wrap items-center gap-2.5">
              <Badge variant="amber" icon={<Wallet className="w-3.5 h-3.5 text-amber-400" />}>
                💰 MULTI-ASSET SOVEREIGN TREASURY // L402 PROTOCOL
              </Badge>
              <span className="text-[11px] font-mono text-accent-emerald font-extrabold bg-emerald-500/10 px-3 py-1 rounded-md border border-emerald-500/30 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                SMART CONTRACT VAULTS: ZERO HUMAN OVERRIDE
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-primary font-heading tracking-tight leading-tight">
              Sovereign Escrow Treasury & x402 Allowance Hub
            </h1>

            <p className="text-xs sm:text-sm text-primary font-mono leading-relaxed">
              Real-time multi-asset liquidity supervision managing cryptographic infrastructure reserves, automated HTTP 402 machine-to-machine allowances, and instantaneous yield distributions.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto shrink-0">
            <div className="px-5 py-3 rounded-2xl bg-surface border-2 border-amber-500/40 text-center sm:text-right shadow-2xl w-full sm:w-auto">
              <span className="text-[10px] text-secondary uppercase font-bold block">Total Value Protected (TVL)</span>
              <span className="text-3xl font-black text-amber-400 font-heading tracking-tight">₹{(totalProtectedValue / 10000000).toFixed(2)} <span className="text-xs font-mono text-primary">Cr</span></span>
            </div>
            <Button
              variant="x402"
              size="lg"
              onClick={() => runLiveSimulation()}
              icon={<Zap className="w-5 h-5 fill-current animate-bounce" />}
              className="w-full sm:w-auto shadow-2xl font-heading font-black tracking-wider px-6 py-4"
            >
              ▶ Test Payout Tranche
            </Button>
          </div>
        </div>

        {/* Ambient background glow */}
        <div className="absolute right-0 top-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      </GlassCard>

      {/* 2. OVERVIEW LIQUIDITY MATRIX */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <KPICard
          title="Active Locked Vaults"
          value={`₹${(totalLocked / 10000000).toFixed(2)} Cr`}
          change="128 Active Tranches"
          isPositive={true}
          subValue="Governed exclusively by AI Vision"
          icon={<Lock className="w-4 h-4 text-amber-400" />}
          glowColor="amber"
        />
        <KPICard
          title="Successfully Disbursed"
          value={`₹${(totalReleased / 10000000).toFixed(2)} Cr`}
          change="84ms Avg Clearance"
          isPositive={true}
          subValue="Direct Contractor Banking Transfer"
          icon={<CheckCircle2 className="w-4 h-4 text-emerald-400" />}
          glowColor="emerald"
        />
        <KPICard
          title="x402 Machine Allowance"
          value="$50,000 USDC"
          change="L402 Challenge Pool"
          isPositive={true}
          subValue="Automated verification gas layer"
          icon={<Activity className="w-4 h-4 text-cyan-400" />}
          glowColor="cyan"
        />
      </div>

      {/* 3. MASTER SOVEREIGN VAULT REGISTRY TABLE */}
      <Card className="p-6 bg-surface border border-amber-500/40 shadow-2xl space-y-6">
        <div className="flex items-center justify-between border-b border-subtle pb-4 flex-wrap gap-2">
          <div>
            <h3 className="text-lg font-black text-primary font-heading uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-5 h-5 text-amber-400" />
              <span>National Escrow Smart Vault Register</span>
            </h3>
            <span className="text-xs text-secondary font-mono">Real-time inspection of active multi-crore project liquidity tranches</span>
          </div>
          <Badge variant="emerald" size="md">✔ 100% LEDGER SYNCED</Badge>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead>
              <tr className="border-b border-subtle text-secondary uppercase text-[10px]">
                <th className="py-3 px-3 font-bold">Project & Vault Address</th>
                <th className="py-3 px-3 font-bold">Contractor Recipient</th>
                <th className="py-3 px-3 font-bold">Total Budget Pool</th>
                <th className="py-3 px-3 font-bold">Locked Tranche Vault</th>
                <th className="py-3 px-3 font-bold">Released Liquidity</th>
                <th className="py-3 px-3 font-bold text-right">Escrow Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D6D0C4]">
              {projects.map((p, index) => (
                <tr key={p.id} className="hover:bg-amber-500/5 transition-colors group cursor-pointer" onClick={() => setSelectedVault(p.id)}>
                  <td className="py-4 px-3">
                    <span className="font-heading font-extrabold text-primary text-sm block group-hover:text-accent-gold transition-colors">{p.name}</span>
                    <span className="text-[10px] text-cyan-400 font-mono block">0x7a8...E39{index + 1} // ID: {p.id}</span>
                  </td>
                  <td className="py-4 px-3">
                    <span className="font-bold text-emerald-400 block">{p.contractor}</span>
                    <span className="text-[10px] text-secondary block">Bank verified L402 target</span>
                  </td>
                  <td className="py-4 px-3 font-heading font-black text-primary text-sm">
                    ₹{(p.budget / 100000).toFixed(1)} Lakhs
                  </td>
                  <td className="py-4 px-3">
                    <span className="text-amber-400 font-extrabold block">₹{((p.lockedAmount || p.budget * 0.5) / 100000).toFixed(1)} Lakhs</span>
                    <span className="text-[9px] text-secondary uppercase">Awaiting AI Proof</span>
                  </td>
                  <td className="py-4 px-3">
                    <span className="text-emerald-400 font-extrabold block">₹{((p.releasedAmount || p.budget * 0.5) / 100000).toFixed(1)} Lakhs</span>
                    <span className="text-[9px] text-emerald-500/80">Disbursed On-Chain</span>
                  </td>
                  <td className="py-4 px-3 text-right">
                    <Button variant="outline" size="sm" icon={<ExternalLink className="w-3 h-3 text-amber-400" />}>
                      Inspect Vault
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

    </div>
  );
};
