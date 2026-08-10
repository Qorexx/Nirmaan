'use client';
import React, { useState, useEffect } from 'react';

const FLOW_STEPS = [
  {
    id: 'client',
    icon: '👤',
    label: 'Contractor / Client',
    sub: 'Submits proof of construction work',
    status: 'idle',
  },
  {
    id: 'request',
    icon: '📡',
    label: 'Request',
    sub: 'POST /api/verify-milestone',
    status: 'idle',
  },
  {
    id: 'verification',
    icon: '🧠',
    label: 'AI Verification',
    sub: 'Oracle analyzes structural proof',
    status: 'idle',
  },
  {
    id: 'payment',
    icon: '⚡',
    label: 'x402 Payment',
    sub: 'HTTP 402 → Wallet auto-pays 0.05 USDC',
    status: 'idle',
  },
  {
    id: 'access',
    icon: '🔓',
    label: 'Escrow Release',
    sub: 'Smart contract releases milestone funds',
    status: 'idle',
  },
];

function FlowNode({ step, isLast }) {
  return (
    <>
      <div className={`flow-node glass-card ${step.status}`}>
        <div className="flow-node-icon">{step.icon}</div>
        <div className="flow-node-body">
          <div className="flow-node-label">{step.label}</div>
          <div className="flow-node-sub">{step.sub}</div>
        </div>
        <div className={`flow-node-status status-${step.status === 'active' ? 'active' : step.status === 'completed' ? 'done' : step.status === 'payment' ? 'payment' : 'idle'}`}>
          {step.status === 'idle' && 'WAITING'}
          {step.status === 'active' && 'ACTIVE'}
          {step.status === 'payment' && 'PAYING'}
          {step.status === 'completed' && 'DONE ✓'}
          {step.status === 'error' && 'FAILED ✗'}
        </div>
      </div>
      {!isLast && (
        <div className="flow-connector">
          <div className={`flow-particle-beam ${step.status === 'completed' || step.status === 'active' ? 'traveling' : ''}`} />
        </div>
      )}
    </>
  );
}

export default function HeroSection({ onGetStarted }) {
  const [steps, setSteps] = useState(FLOW_STEPS);
  const [isDemo, setIsDemo] = useState(false);

  const runDemo = async () => {
    if (isDemo) return;
    setIsDemo(true);

    // Reset
    setSteps(FLOW_STEPS.map((s) => ({ ...s, status: 'idle' })));
    await delay(300);

    for (let i = 0; i < FLOW_STEPS.length; i++) {
      setSteps((prev) =>
        prev.map((s, idx) => ({
          ...s,
          status:
            idx < i ? 'completed' :
            idx === i ? (FLOW_STEPS[i].id === 'payment' ? 'payment' : 'active') :
            'idle',
        }))
      );
      await delay(i === 3 ? 1600 : 1200);
    }

    setSteps((prev) => prev.map((s) => ({ ...s, status: 'completed' })));
    await delay(3000);
    setSteps(FLOW_STEPS.map((s) => ({ ...s, status: 'idle' })));
    setIsDemo(false);
  };

  useEffect(() => {
    const timer = setTimeout(runDemo, 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="hero-section main-container page-fade-enter">
      {/* Left: Copy */}
      <div>
        <div className="hero-eyebrow">
          <span className="status-dot-pulse" /> ANTI-CORRUPTION INFRASTRUCTURE PROTOCOL
        </div>

        <h1 className="hero-title">
          Public Infrastructure,{' '}
          <span className="hero-title-accent">Verified On-Chain.</span>
        </h1>

        <p className="hero-description">
          Nirmaan replaces corruptible human inspectors with autonomous AI oracles
          powered by <strong>x402 micro-payments</strong> — ensuring every milestone
          is verified, every rupee is traceable, and every contractor is accountable.
        </p>

        <div className="hero-ctas">
          <button className="btn btn-primary" onClick={onGetStarted}>
            View Dashboard →
          </button>
          <button className="btn btn-ghost" onClick={runDemo} disabled={isDemo}>
            {isDemo ? 'Running Demo…' : 'Run x402 Flow Demo'}
          </button>
        </div>

        <div className="hero-trust-row">
          <div className="trust-item">
            <span>🔒</span> ZK-Bid Commitments
          </div>
          <div className="trust-item-dot" />
          <div className="trust-item">
            <span>⚡</span> x402 Machine Payments
          </div>
          <div className="trust-item-dot" />
          <div className="trust-item">
            <span>🧠</span> AI Oracle Inspection
          </div>
          <div className="trust-item-dot" />
          <div className="trust-item">
            <span>📜</span> On-Chain Audit Trail
          </div>
        </div>
      </div>

      {/* Right: Animated Flow Visualizer with Soft Backdrop Glow */}
      <div className="glow-backdrop-cyan">
        <div className="glass-panel" style={{ padding: '24px' }}>
          <div style={{ marginBottom: 16 }}>
            <div className="section-label">x402 AUTONOMOUS PAYMENT LOOP</div>
            <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>
              Real-time machine-to-machine infrastructure verification
            </div>
          </div>
          <div className="flow-visualizer">
            {steps.map((step, i) => (
              <FlowNode key={step.id} step={step} isLast={i === steps.length - 1} />
            ))}
          </div>
          <div style={{ marginTop: 16, display: 'flex', justifyContent: 'flex-end' }}>
            <button className="btn btn-ghost" style={{ fontSize: 12 }} onClick={runDemo} disabled={isDemo}>
              {isDemo ? '⏳ Running…' : '↺ Replay'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function delay(ms) {
  return new Promise((r) => setTimeout(r, ms));
}
