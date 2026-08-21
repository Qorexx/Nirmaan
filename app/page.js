'use client';

import React from 'react';
import Link from 'next/link';
import GlassNavbar from '@/components/GlassNavbar';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col">
      <GlassNavbar />
      
      <main className="flex-1 flex flex-col items-center justify-center px-6 pt-20 pb-12">
        <div className="max-w-4xl w-full text-center space-y-8">
          
          <div className="space-y-4">
            <div className="inline-block px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 font-mono text-sm mb-4 animate-pulse">
              Built for Brainwave Hackathon
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
              Eradicating Corruption with <br/>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-emerald-400 to-teal-400">
                Mathematical Certainty
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Nirmaan x402 is an autonomous escrow protocol that leverages Gemini AI, IoT telemetry, and smart contracts to ensure public funds are only released when infrastructure is physically verified.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 text-left">
            
            {/* Government Card */}
            <Link href="/government" className="group relative bg-slate-800/50 hover:bg-slate-800 border border-slate-700 hover:border-blue-500/50 p-8 rounded-3xl transition-all hover:-translate-y-1 shadow-lg hover:shadow-blue-900/20">
              <div className="w-12 h-12 bg-blue-900/50 text-blue-400 rounded-xl flex items-center justify-center text-2xl mb-6">🏛️</div>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">Government Portal</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Oversee projects, manage citizen disputes, and authorize Twin-Ledger fiat payouts via PFMS integration.
              </p>
            </Link>

            {/* Contractor Card */}
            <Link href="/contractor" className="group relative bg-slate-800/50 hover:bg-slate-800 border border-slate-700 hover:border-emerald-500/50 p-8 rounded-3xl transition-all hover:-translate-y-1 shadow-lg hover:shadow-emerald-900/20">
              <div className="w-12 h-12 bg-emerald-900/50 text-emerald-400 rounded-xl flex items-center justify-center text-2xl mb-6">👷‍♂️</div>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">Contractor Portal</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Submit cryptographic proofs, hardware-signed telemetry, and e-Way bills to unlock milestone payouts.
              </p>
            </Link>

            {/* Citizen Card */}
            <Link href="/citizen" className="group relative bg-slate-800/50 hover:bg-slate-800 border border-slate-700 hover:border-amber-500/50 p-8 rounded-3xl transition-all hover:-translate-y-1 shadow-lg hover:shadow-amber-900/20">
              <div className="w-12 h-12 bg-amber-900/50 text-amber-400 rounded-xl flex items-center justify-center text-2xl mb-6">📱</div>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">Citizen Portal</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Decentralized whistleblower app. Stake ₹500 via UPI to freeze payouts and submit immutable IPFS evidence.
              </p>
            </Link>

          </div>
        </div>
      </main>

    </div>
  );
}
