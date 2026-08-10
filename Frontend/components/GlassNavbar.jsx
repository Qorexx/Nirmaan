'use client';
import React from 'react';

export default function GlassNavbar({ activeTab, setActiveTab, escrowBalance, theme, onToggleTheme }) {
  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'dashboard', label: 'Gov Dashboard' },
    { id: 'contractor', label: 'Contractor Portal' },
    { id: 'autonomous', label: 'Autonomous Log' },
  ];

  return (
    <nav className="nirmaan-navbar glass-navbar">
      {/* Brand */}
      <a className="nav-brand" href="#" onClick={(e) => { e.preventDefault(); setActiveTab('overview'); }}>
        <div className="nav-brand-icon">🏗️</div>
        <div>
          <div className="nav-brand-name">Nirmaan</div>
          <div className="nav-brand-tag">x402 PROTOCOL</div>
        </div>
      </a>

      {/* Tabs */}
      <div className="nav-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`nav-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Right Side */}
      <div className="nav-right">
        {/* Theme Toggle Button */}
        <button className="theme-toggle-btn" onClick={onToggleTheme} title="Toggle Dark / Bright Glass Theme">
          <span>{theme === 'dark' ? '☀️ Bright' : '🌙 Dark'}</span>
        </button>

        <div className="nav-status-pill">
          <span className="status-dot pulsing" />
          x402 Testnet
        </div>

        <div className="nav-wallet">
          <span style={{ fontSize: 14 }}>👛</span>
          <div>
            <div className="nav-wallet-address">0x8920...F4B1</div>
            <div className="nav-wallet-balance">${(escrowBalance || 1250000).toLocaleString('en-US')} USDC</div>
          </div>
        </div>
      </div>
    </nav>
  );
}
