'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Building2, HardHat, Smartphone } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans">
      
      {/* Top Header - Logo Only */}
      <header className="absolute top-0 w-full p-6">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-indigo-600 shadow-sm">
            <Building2 className="h-4 w-4 text-white" strokeWidth={2.5} />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold tracking-tight text-zinc-900 leading-none">Nirmaan</span>
            <span className="text-[10px] font-bold text-zinc-500 tracking-widest uppercase mt-0.5">x402 Protocol</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 pt-32 pb-20 min-h-screen">
        <div className="max-w-5xl w-full text-center space-y-8">
          
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-zinc-900 leading-tight">
              Eradicating Corruption with <br/>
              <span className="text-indigo-600">
                Mathematical Certainty
              </span>
            </h1>
            <p className="text-lg md:text-xl text-zinc-500 max-w-2xl mx-auto leading-relaxed mt-6">
              Nirmaan x402 is an autonomous escrow protocol that leverages Gemini AI, IoT telemetry, and smart contracts to ensure public funds are only released when infrastructure is physically verified.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 text-left max-w-4xl mx-auto">
            
            {/* Government Card */}
            <Link href="/government" className="group rounded-xl border border-zinc-200 bg-white p-6 hover:border-zinc-300 hover:shadow-sm transition-all block">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50">
                <Building2 className="h-5 w-5 text-indigo-600" />
              </div>
              <h3 className="text-lg font-semibold text-zinc-900 mb-2 group-hover:text-indigo-600 transition-colors">Government Portal</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">
                Oversee projects, manage citizen disputes, and authorize Twin-Ledger fiat payouts via PFMS integration.
              </p>
            </Link>

            {/* Contractor Card */}
            <Link href="/contractor" className="group rounded-xl border border-zinc-200 bg-white p-6 hover:border-zinc-300 hover:shadow-sm transition-all block">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50">
                <HardHat className="h-5 w-5 text-indigo-600" />
              </div>
              <h3 className="text-lg font-semibold text-zinc-900 mb-2 group-hover:text-indigo-600 transition-colors">Contractor Portal</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">
                Submit cryptographic proofs, hardware-signed telemetry, and e-Way bills to unlock milestone payouts.
              </p>
            </Link>

            {/* Citizen Card */}
            <Link href="/citizen" className="group rounded-xl border border-zinc-200 bg-white p-6 hover:border-zinc-300 hover:shadow-sm transition-all block">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50">
                <Smartphone className="h-5 w-5 text-indigo-600" />
              </div>
              <h3 className="text-lg font-semibold text-zinc-900 mb-2 group-hover:text-indigo-600 transition-colors">Citizen Portal</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">
                Decentralized whistleblower app. Stake ₹500 via UPI to freeze payouts and submit immutable IPFS evidence.
              </p>
            </Link>

          </div>
        </div>
      </main>

    </div>
  );
}
