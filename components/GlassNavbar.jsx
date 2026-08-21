'use client';
import React, { useState } from 'react';

export default function GlassNavbar({ activeTab, setActiveTab, escrowBalance, theme, onToggleTheme }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'dashboard', label: 'Gov Dashboard' },
    { id: 'contractor', label: 'Contractor Portal' },
    { id: 'autonomous', label: 'Autonomous Log' },
  ];

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false); // Close menu on selection
  };

  return (
    <>
      <nav className="nirmaan-navbar glass-navbar">
        {/* Brand */}
        <a className="nav-brand" href="#" onClick={(e) => { e.preventDefault(); handleTabClick('overview'); }}>
          <div className="nav-brand-icon">🏗️</div>
          <div>
            <div className="nav-brand-name">Nirmaan</div>
            <div className="nav-brand-tag">x402 PROTOCOL</div>
          </div>
        </a>

        {/* Desktop Tabs */}
        <div className="nav-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`nav-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => handleTabClick(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Desktop Right Side */}
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

        <button 
          className="hamburger-btn" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <div className="hamburger-line" style={{ transform: mobileMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }}></div>
          <div className="hamburger-line" style={{ opacity: mobileMenuOpen ? 0 : 1 }}></div>
          <div className="hamburger-line" style={{ transform: mobileMenuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }}></div>
        </button>
      </nav>

      {/* Mobile Menu Dropdown */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`mobile-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => handleTabClick(tab.id)}
          >
            {tab.label}
          </button>
        ))}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-[rgba(255,255,255,0.1)]">
          <button className="theme-toggle-btn" onClick={onToggleTheme}>
            {theme === 'dark' ? '☀️ Bright' : '🌙 Dark'}
          </button>
          <div className="nav-status-pill">
            <span className="status-dot pulsing" />
            x402 Testnet
          </div>
        </div>
      </div>
    </>
  );
}
