'use client';

import React from 'react';
import Link from 'next/link';
import { Building2, HardHat, Smartphone } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#F5F5F7] text-[#1d1d1f] font-sans relative overflow-hidden selection:bg-blue-200">
      
      {/* Ultra-subtle Apple-style background gradient */}
      <div className="absolute inset-0 z-0 pointer-events-none flex justify-center">
        <div className="w-[140%] h-[800px] absolute -top-[200px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-[#F5F5F7] to-[#F5F5F7] opacity-100 rounded-[100%]" />
      </div>

      {/* Minimal Header */}
      <header className="relative z-10 w-full px-8 py-8 flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center gap-2 cursor-pointer">
          <span className="text-xl font-bold tracking-tight text-[#1d1d1f] leading-none">Nirmaan</span>
          <span className="text-xs font-semibold text-[#86868b] tracking-wide bg-[#e8e8ed] px-2 py-0.5 rounded-md">x402</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 pt-16 pb-24">
        <div className="max-w-[1000px] w-full text-center space-y-10">
          
          <div className="space-y-6">
            <h1 className="text-[3.5rem] md:text-[5rem] font-semibold tracking-tighter text-[#1d1d1f] leading-[1.05]">
              Eradicating Corruption. <br/>
              <span className="text-[#86868b]">
                Mathematical Certainty.
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-[#86868b] max-w-3xl mx-auto font-medium leading-relaxed tracking-tight">
              An autonomous escrow protocol leveraging Gemini AI and IoT telemetry to ensure public funds are only released when infrastructure is physically verified.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 text-left max-w-[1000px] mx-auto pt-8">
            
            {/* Government Card */}
            <Link href="/government" className="group rounded-[2rem] bg-white p-8 hover:scale-[1.02] border border-[#e8e8ed] shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] transition-all duration-300 block">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f5f5f7] text-[#1d1d1f] group-hover:bg-[#1d1d1f] group-hover:text-white transition-colors duration-300">
                <Building2 className="h-6 w-6" strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-semibold tracking-tight text-[#1d1d1f] mb-3">Government</h3>
              <p className="text-[15px] text-[#86868b] font-medium leading-relaxed">
                Oversee projects, manage citizen disputes, and authorize Twin-Ledger fiat payouts via PFMS integration.
              </p>
            </Link>

            {/* Contractor Card */}
            <Link href="/contractor" className="group rounded-[2rem] bg-white p-8 hover:scale-[1.02] border border-[#e8e8ed] shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] transition-all duration-300 block">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f5f5f7] text-[#1d1d1f] group-hover:bg-[#1d1d1f] group-hover:text-white transition-colors duration-300">
                <HardHat className="h-6 w-6" strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-semibold tracking-tight text-[#1d1d1f] mb-3">Contractor</h3>
              <p className="text-[15px] text-[#86868b] font-medium leading-relaxed">
                Submit cryptographic proofs, hardware-signed telemetry, and e-Way bills to unlock milestone payouts.
              </p>
            </Link>

            {/* Citizen Card */}
            <Link href="/citizen" className="group rounded-[2rem] bg-white p-8 hover:scale-[1.02] border border-[#e8e8ed] shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] transition-all duration-300 block">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f5f5f7] text-[#1d1d1f] group-hover:bg-[#1d1d1f] group-hover:text-white transition-colors duration-300">
                <Smartphone className="h-6 w-6" strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-semibold tracking-tight text-[#1d1d1f] mb-3">Citizen</h3>
              <p className="text-[15px] text-[#86868b] font-medium leading-relaxed">
                Decentralized whistleblower app. Stake ₹500 via UPI to freeze payouts and submit immutable IPFS evidence.
              </p>
            </Link>

          </div>
        </div>
      </main>

    </div>
  );
}
