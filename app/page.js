'use client';

import React from 'react';
import Link from 'next/link';
import { Building2, HardHat, Smartphone } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#e8eef3] text-[#2c3e50] font-sans relative overflow-hidden">
      
      {/* Sweeping Contour Wave Background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <svg 
          viewBox="0 0 1440 800" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="absolute top-1/2 left-0 w-full h-full -translate-y-1/2 object-cover min-w-[1440px]"
        >
          <path d="M-100,500 C200,500 400,200 700,400 C1000,600 1200,300 1500,300" stroke="#7892ab" strokeWidth="0.5" />
          <path d="M-100,510 C200,510 400,210 700,410 C1000,610 1200,310 1500,310" stroke="#7892ab" strokeWidth="0.5" />
          <path d="M-100,520 C200,520 400,220 700,420 C1000,620 1200,320 1500,320" stroke="#7892ab" strokeWidth="0.5" />
          <path d="M-100,530 C200,530 400,230 700,430 C1000,630 1200,330 1500,330" stroke="#7892ab" strokeWidth="0.5" />
          <path d="M-100,540 C200,540 400,240 700,440 C1000,640 1200,340 1500,340" stroke="#7892ab" strokeWidth="0.5" />
          <path d="M-100,550 C200,550 400,250 700,450 C1000,650 1200,350 1500,350" stroke="#7892ab" strokeWidth="0.5" />
          <path d="M-100,560 C200,560 400,260 700,460 C1000,660 1200,360 1500,360" stroke="#7892ab" strokeWidth="0.5" />
          <path d="M-100,570 C200,570 400,270 700,470 C1000,670 1200,370 1500,370" stroke="#7892ab" strokeWidth="0.5" />
          <path d="M-100,580 C200,580 400,280 700,480 C1000,680 1200,380 1500,380" stroke="#7892ab" strokeWidth="0.5" />
          <path d="M-100,590 C200,590 400,290 700,490 C1000,690 1200,390 1500,390" stroke="#7892ab" strokeWidth="0.5" />
          <path d="M-100,600 C200,600 400,300 700,500 C1000,700 1200,400 1500,400" stroke="#7892ab" strokeWidth="0.5" />
          <path d="M-100,610 C200,610 400,310 700,510 C1000,710 1200,410 1500,410" stroke="#7892ab" strokeWidth="0.5" />
          
          {/* Second overlapping wave block */}
          <path d="M-100,600 C300,700 500,200 800,300 C1100,400 1300,100 1500,200" stroke="#7892ab" strokeWidth="0.5" opacity="0.6" />
          <path d="M-100,610 C300,710 500,210 800,310 C1100,410 1300,110 1500,210" stroke="#7892ab" strokeWidth="0.5" opacity="0.6" />
          <path d="M-100,620 C300,720 500,220 800,320 C1100,420 1300,120 1500,220" stroke="#7892ab" strokeWidth="0.5" opacity="0.6" />
          <path d="M-100,630 C300,730 500,230 800,330 C1100,430 1300,130 1500,230" stroke="#7892ab" strokeWidth="0.5" opacity="0.6" />
          <path d="M-100,640 C300,740 500,240 800,340 C1100,440 1300,140 1500,240" stroke="#7892ab" strokeWidth="0.5" opacity="0.6" />
        </svg>
      </div>

      {/* Top Header */}
      <header className="relative z-10 w-full px-12 py-8 flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center gap-3 cursor-pointer">
          <div className="flex flex-col">
            <span className="text-2xl font-black tracking-tight text-[#2c3e50] uppercase leading-none">Nirmaan</span>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-10">
          <a href="#" className="text-sm font-bold text-[#475f77] hover:text-[#2c3e50] uppercase tracking-wide">Home</a>
          <a href="#" className="text-sm font-bold text-[#475f77] hover:text-[#2c3e50] uppercase tracking-wide">Services</a>
          <a href="#" className="text-sm font-bold text-[#475f77] hover:text-[#2c3e50] uppercase tracking-wide">About</a>
          <a href="#" className="text-sm font-bold text-[#475f77] hover:text-[#2c3e50] uppercase tracking-wide">Contact</a>
          <button className="ml-4 flex flex-col gap-1.5 p-2">
            <span className="w-8 h-1 bg-[#2c3e50] block rounded-full"></span>
            <span className="w-8 h-1 bg-[#2c3e50] block rounded-full"></span>
            <span className="w-8 h-1 bg-[#2c3e50] block rounded-full"></span>
          </button>
        </nav>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 pt-12 pb-24">
        <div className="max-w-5xl w-full text-center space-y-12">
          
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-[#1a252f] leading-[1.1]">
              Eradicating Corruption <br/>
              <span className="text-[#34495e]">
                with Mathematical Certainty
              </span>
            </h1>
            <p className="text-lg md:text-xl text-[#5b738b] max-w-2xl mx-auto font-medium mt-6">
              An autonomous escrow protocol that leverages Gemini AI, IoT telemetry, and smart contracts to ensure public funds are only released when verified.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 text-left max-w-4xl mx-auto">
            
            {/* Government Card */}
            <Link href="/government" className="group rounded-2xl bg-white/70 backdrop-blur-md p-8 hover:bg-white border border-white/40 hover:border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all block">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#e8eef3] text-[#2c3e50] group-hover:bg-[#2c3e50] group-hover:text-white transition-colors">
                <Building2 className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-[#1a252f] mb-3">Government Portal</h3>
              <p className="text-sm text-[#5b738b] font-medium leading-relaxed">
                Oversee projects, manage citizen disputes, and authorize Twin-Ledger fiat payouts via PFMS integration.
              </p>
            </Link>

            {/* Contractor Card */}
            <Link href="/contractor" className="group rounded-2xl bg-white/70 backdrop-blur-md p-8 hover:bg-white border border-white/40 hover:border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all block">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#e8eef3] text-[#2c3e50] group-hover:bg-[#2c3e50] group-hover:text-white transition-colors">
                <HardHat className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-[#1a252f] mb-3">Contractor Portal</h3>
              <p className="text-sm text-[#5b738b] font-medium leading-relaxed">
                Submit cryptographic proofs, hardware-signed telemetry, and e-Way bills to unlock milestone payouts.
              </p>
            </Link>

            {/* Citizen Card */}
            <Link href="/citizen" className="group rounded-2xl bg-white/70 backdrop-blur-md p-8 hover:bg-white border border-white/40 hover:border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all block">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#e8eef3] text-[#2c3e50] group-hover:bg-[#2c3e50] group-hover:text-white transition-colors">
                <Smartphone className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-[#1a252f] mb-3">Citizen Portal</h3>
              <p className="text-sm text-[#5b738b] font-medium leading-relaxed">
                Decentralized whistleblower app. Stake ₹500 via UPI to freeze payouts and submit immutable IPFS evidence.
              </p>
            </Link>

          </div>
        </div>
      </main>

    </div>
  );
}
