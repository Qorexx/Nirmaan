'use client';

import React from 'react';

export default function Navbar({ activeTab, setActiveTab, escrowBalance }) {
  return (
    <header className="nirmaan-nav">
      <div className="nav-container">
        {/* Brand / Logo */}
        <div className="nav-brand">
          <div className="brand-icon">
            <span className="icon-shield">🏗️</span>
          </div>
          <div>
            <h1 className="brand-title">NIRMAAN PROTOCOL</h1>
            <p className="brand-subtitle">Anti-Corruption Infrastructure Escrow Engine</p>
          </div>
        </div>

        {/* Tab Selector Buttons */}
        <div className="nav-tabs">
          <button
            className={`tab-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <span className="tab-icon">🏛️</span> Government Dashboard
          </button>

          <button
            className={`tab-btn ${activeTab === 'contractor' ? 'active' : ''}`}
            onClick={() => setActiveTab('contractor')}
          >
            <span className="tab-icon">🚜</span> Contractor Portal
          </button>

          <button
            className={`tab-btn ${activeTab === 'autonomous' ? 'active' : ''}`}
            onClick={() => setActiveTab('autonomous')}
          >
            <span className="tab-icon">⚡</span> Autonomous Action Log
            <span className="badge-live">LIVE</span>
          </button>
        </div>

        {/* Wallet & Protocol Status Badges */}
        <div className="nav-status">
          <div className="status-badge network-badge">
            <span className="status-dot green"></span>
            <span>x402 Testnet</span>
          </div>
          <div className="status-badge wallet-badge">
            <span className="wallet-icon">👛</span>
            <div className="wallet-info">
              <span className="wallet-label">Programmatic Escrow</span>
              <span className="wallet-balance">${(escrowBalance || 1250000).toLocaleString()} USDC</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
