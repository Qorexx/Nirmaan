'use client';

import React from 'react';
import Link from 'next/link';
import { Building2, HardHat, Smartphone } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#eaf0f6] text-[#1e293b] font-sans relative overflow-hidden">
      
      {/* 
        Beautiful Icy Blue Wavy Background (From their second reference)
      */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-80">
        <svg 
          viewBox="0 0 1440 800" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="absolute top-1/2 left-0 w-full h-[120%] -translate-y-1/2 object-cover"
        >
          {/* Subtle sweeping lines */}
          <path d="M-100,600 C200,400 400,300 700,500 C1000,700 1200,500 1500,400" stroke="#b0c4de" strokeWidth="1" opacity="0.6" />
          <path d="M-100,620 C200,420 400,320 700,520 C1000,720 1200,520 1500,420" stroke="#b0c4de" strokeWidth="1" opacity="0.5" />
          <path d="M-100,640 C200,440 400,340 700,540 C1000,740 1200,540 1500,440" stroke="#b0c4de" strokeWidth="1" opacity="0.4" />
          <path d="M-100,660 C200,460 400,360 700,560 C1000,760 1200,560 1500,460" stroke="#b0c4de" strokeWidth="1" opacity="0.3" />
          <path d="M-100,680 C200,480 400,380 700,580 C1000,780 1200,580 1500,480" stroke="#b0c4de" strokeWidth="1" opacity="0.2" />

          {/* Overlapping opposite wave */}
          <path d="M-100,300 C300,500 600,600 800,400 C1100,100 1300,300 1500,500" stroke="#94a3b8" strokeWidth="1.5" opacity="0.4" />
          <path d="M-100,320 C300,520 600,620 800,420 C1100,120 1300,320 1500,520" stroke="#94a3b8" strokeWidth="1" opacity="0.3" />
          <path d="M-100,340 C300,540 600,640 800,440 C1100,140 1300,340 1500,540" stroke="#94a3b8" strokeWidth="1" opacity="0.2" />
        </svg>
      </div>

      {/* Clean Uncluttered Header */}
      <header className="relative z-10 w-full px-8 py-8 md:px-12 md:py-10 flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center gap-3 cursor-pointer">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/20">
            <Building2 className="h-5 w-5 text-white" strokeWidth={2.5} />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-black tracking-tight text-[#1e293b] uppercase leading-none">Nirmaan</span>
            <span className="text-xs font-bold text-blue-600 tracking-widest uppercase mt-0.5">x402 Protocol</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 pt-8 pb-24">
        <div className="max-w-[1100px] w-full text-center space-y-12">
          
          <div className="space-y-6 relative">
            <h1 className="text-5xl md:text-[5.5rem] font-extrabold tracking-tight text-[#0f172a] leading-[1.05]">
              Eradicating Corruption. <br/>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                Mathematical Certainty.
              </span>
            </h1>
            <p className="text-xl md:text-[1.35rem] text-[#475569] max-w-3xl mx-auto font-medium leading-relaxed mt-12 text-center text-balance">
              An autonomous escrow protocol leveraging Gemini AI, IoT telemetry, and smart contracts to ensure public funds are only released when infrastructure is physically verified.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 text-left max-w-5xl mx-auto pt-4">
            
            {/* Government Card */}
            <Link href="/government" className="group rounded-[1.5rem] bg-white/80 backdrop-blur-xl p-8 border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:bg-white hover:shadow-[0_20px_40px_rgb(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 shrink-0">
                <Building2 className="h-7 w-7" strokeWidth={2} />
              </div>
              <h3 className="text-2xl font-bold tracking-tight text-[#0f172a] mb-3">Government</h3>
              <p className="text-[15px] text-[#475569] font-medium leading-[1.6] break-words text-pretty">
                Oversee projects, manage citizen disputes, and authorize Twin-Ledger fiat payouts via PFMS integration.
              </p>
            </Link>

            {/* Contractor Card */}
            <Link href="/contractor" className="group rounded-[1.5rem] bg-white/80 backdrop-blur-xl p-8 border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:bg-white hover:shadow-[0_20px_40px_rgb(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300 shrink-0">
                <HardHat className="h-7 w-7" strokeWidth={2} />
              </div>
              <h3 className="text-2xl font-bold tracking-tight text-[#0f172a] mb-3">Contractor</h3>
              <p className="text-[15px] text-[#475569] font-medium leading-[1.6] break-words text-pretty">
                Submit cryptographic proofs, hardware-signed telemetry, and e-Way bills to unlock milestone payouts.
              </p>
            </Link>

            {/* Citizen Card */}
            <Link href="/citizen" className="group rounded-[1.5rem] bg-white/80 backdrop-blur-xl p-8 border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:bg-white hover:shadow-[0_20px_40px_rgb(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300 shrink-0">
                <Smartphone className="h-7 w-7" strokeWidth={2} />
              </div>
              <h3 className="text-2xl font-bold tracking-tight text-[#0f172a] mb-3">Citizen</h3>
              <p className="text-[15px] text-[#475569] font-medium leading-[1.6] break-words text-pretty">
                Decentralized whistleblower app. Stake ₹500 via UPI to freeze payouts and submit immutable IPFS evidence.
              </p>
            </Link>

          </div>
        </div>
      </main>

    </div>
  );
}
