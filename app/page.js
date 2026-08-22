'use client';

import React from 'react';
import Link from 'next/link';
import { Building2, HardHat, Smartphone } from 'lucide-react';

export default function LandingPage() {
  const cardStyle = {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 1)',
    borderRadius: '2rem',
    padding: '48px 32px',
    boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    minHeight: '320px',
    transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    textDecoration: 'none',
  };

  const iconContainerStyle = (bg, color) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '80px',
    width: '80px',
    borderRadius: '1.5rem',
    background: bg,
    color: color,
    marginBottom: '32px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
    transition: 'background 0.3s, color 0.3s',
  });

  return (
    <div style={{ minHeight: '100vh', background: '#f4f7f9', position: 'relative', overflowX: 'hidden', display: 'flex', flexDirection: 'column' }}>
      
      {/* Background Waves */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', opacity: 0.6 }}>
        <svg viewBox="0 0 1440 800" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', top: '50%', left: 0, width: '100%', height: '120%', transform: 'translateY(-50%)' }}>
          <path d="M-100,600 C200,400 400,300 700,500 C1000,700 1200,500 1500,400" stroke="#cbd5e1" strokeWidth="1" opacity="0.6" />
          <path d="M-100,620 C200,420 400,320 700,520 C1000,720 1200,520 1500,420" stroke="#cbd5e1" strokeWidth="1" opacity="0.5" />
          <path d="M-100,640 C200,440 400,340 700,540 C1000,740 1200,540 1500,440" stroke="#cbd5e1" strokeWidth="1" opacity="0.4" />
          <path d="M-100,300 C300,500 600,600 800,400 C1100,100 1300,300 1500,500" stroke="#94a3b8" strokeWidth="1.5" opacity="0.4" />
        </svg>
      </div>

      {/* Header with perfectly positioned branding */}
      <header style={{ position: 'relative', zIndex: 10, width: '100%', padding: '32px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ height: '48px', width: '48px', borderRadius: '14px', background: 'linear-gradient(135deg, #3b82f6, #4f46e5)', boxShadow: '0 6px 16px rgba(59,130,246,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Building2 style={{ height: '24px', width: '24px', color: '#fff' }} strokeWidth={2.5} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '24px', fontWeight: 900, color: '#0f172a', letterSpacing: '-0.02em', lineHeight: 1 }}>NIRMAAN</span>
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#3b82f6', letterSpacing: '0.15em', marginTop: '4px', textTransform: 'uppercase' }}>x402 Protocol</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ position: 'relative', zIndex: 10, flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', padding: '40px 24px 80px' }}>
        
        {/* Absolutely centered text container */}
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', marginBottom: '80px' }}>
          <h1 style={{ fontSize: 'clamp(3rem, 6vw, 5.5rem)', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.03em', lineHeight: 1.1, margin: '0 0 24px' }}>
            Eradicating Corruption <br/>
            <span style={{ background: 'linear-gradient(to right, #2563eb, #4f46e5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', color: 'transparent' }}>
              with Mathematical Certainty
            </span>
          </h1>
          
          <p style={{ fontSize: 'clamp(1.1rem, 2vw, 1.35rem)', color: '#475569', maxWidth: '800px', width: '100%', fontWeight: 500, lineHeight: 1.6, margin: 0 }}>
            An autonomous escrow protocol leveraging Gemini AI, IoT telemetry, and smart contracts to ensure public funds are only released when infrastructure is physically verified.
          </p>
        </div>

        {/* Grid Container */}
        <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
            
            {/* Government Card */}
            <Link 
              href="/government" 
              style={cardStyle}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.boxShadow = '0 25px 60px rgba(0,0,0,0.15)'; e.currentTarget.querySelector('.icon-bg').style.background = '#2563eb'; e.currentTarget.querySelector('.icon-svg').style.color = '#fff'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 10px 40px rgba(0,0,0,0.08)'; e.currentTarget.querySelector('.icon-bg').style.background = '#eff6ff'; e.currentTarget.querySelector('.icon-svg').style.color = '#2563eb'; }}
            >
              <div className="icon-bg" style={iconContainerStyle('#eff6ff', '#2563eb')}>
                <Building2 className="icon-svg" style={{ width: '36px', height: '36px' }} strokeWidth={2} />
              </div>
              <h3 style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', margin: '0 0 16px', letterSpacing: '-0.02em' }}>Government</h3>
              <p style={{ fontSize: '16px', color: '#475569', fontWeight: 500, lineHeight: 1.6, margin: 0 }}>
                Oversee projects, manage citizen disputes, and authorize Twin-Ledger fiat payouts via PFMS integration.
              </p>
            </Link>

            {/* Contractor Card */}
            <Link 
              href="/contractor" 
              style={cardStyle}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.boxShadow = '0 25px 60px rgba(0,0,0,0.15)'; e.currentTarget.querySelector('.icon-bg').style.background = '#4f46e5'; e.currentTarget.querySelector('.icon-svg').style.color = '#fff'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 10px 40px rgba(0,0,0,0.08)'; e.currentTarget.querySelector('.icon-bg').style.background = '#eef2ff'; e.currentTarget.querySelector('.icon-svg').style.color = '#4f46e5'; }}
            >
              <div className="icon-bg" style={iconContainerStyle('#eef2ff', '#4f46e5')}>
                <HardHat className="icon-svg" style={{ width: '36px', height: '36px' }} strokeWidth={2} />
              </div>
              <h3 style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', margin: '0 0 16px', letterSpacing: '-0.02em' }}>Contractor</h3>
              <p style={{ fontSize: '16px', color: '#475569', fontWeight: 500, lineHeight: 1.6, margin: 0 }}>
                Submit cryptographic proofs, hardware-signed telemetry, and e-Way bills to unlock milestone payouts.
              </p>
            </Link>

            {/* Citizen Card */}
            <Link 
              href="/citizen" 
              style={cardStyle}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.boxShadow = '0 25px 60px rgba(0,0,0,0.15)'; e.currentTarget.querySelector('.icon-bg').style.background = '#059669'; e.currentTarget.querySelector('.icon-svg').style.color = '#fff'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 10px 40px rgba(0,0,0,0.08)'; e.currentTarget.querySelector('.icon-bg').style.background = '#ecfdf5'; e.currentTarget.querySelector('.icon-svg').style.color = '#059669'; }}
            >
              <div className="icon-bg" style={iconContainerStyle('#ecfdf5', '#059669')}>
                <Smartphone className="icon-svg" style={{ width: '36px', height: '36px' }} strokeWidth={2} />
              </div>
              <h3 style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', margin: '0 0 16px', letterSpacing: '-0.02em' }}>Citizen</h3>
              <p style={{ fontSize: '16px', color: '#475569', fontWeight: 500, lineHeight: 1.6, margin: 0 }}>
                Decentralized whistleblower app. Stake ₹500 via UPI to freeze payouts and submit immutable IPFS evidence.
              </p>
            </Link>

          </div>
        </div>

      </main>
    </div>
  );
}
