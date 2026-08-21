'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function GlassNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { id: '/', label: 'Home' },
    { id: '/government', label: 'Government' },
    { id: '/contractor', label: 'Contractor' },
    { id: '/citizen', label: 'Citizen' },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 h-16 bg-slate-900/70 backdrop-blur-lg border-b border-slate-700/50 flex items-center justify-between px-6">
        
        {/* Brand */}
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="text-2xl group-hover:scale-110 transition-transform">🏗️</div>
          <div className="flex flex-col">
            <span className="font-bold text-white leading-tight tracking-tight">Nirmaan</span>
            <span className="text-[10px] text-blue-400 font-mono tracking-widest">x402 PROTOCOL</span>
          </div>
        </Link>

        {/* Desktop Tabs */}
        <div className="hidden md:flex space-x-2">
          {navLinks.map((link) => (
            <Link
              key={link.id}
              href={link.id}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                pathname === link.id
                  ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30 shadow-[0_0_15px_rgba(37,99,235,0.2)]'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop Right Side */}
        <div className="hidden md:flex items-center space-x-4">
          <div className="flex items-center px-3 py-1 rounded-full bg-emerald-900/30 border border-emerald-800 text-xs font-mono text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse" />
            Live Demo System
          </div>
        </div>

        {/* Mobile Hamburger */}
        <button 
          className="md:hidden flex flex-col space-y-1.5 p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <div className={`w-6 h-0.5 bg-white transition-all ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
          <div className={`w-6 h-0.5 bg-white transition-all ${mobileMenuOpen ? 'opacity-0' : ''}`}></div>
          <div className={`w-6 h-0.5 bg-white transition-all ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
        </button>
      </nav>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed top-16 left-0 right-0 bg-slate-900/95 backdrop-blur-xl border-b border-slate-800 p-4 z-40 flex flex-col space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.id}
              href={link.id}
              onClick={() => setMobileMenuOpen(false)}
              className={`px-4 py-3 rounded-lg text-sm font-semibold text-center transition-all ${
                pathname === link.id
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
