'use client';
import React, { useRef, useEffect } from 'react';

const STEP_CONFIG = [
  { num: 1, label: 'PING ORACLE',    icon: '📡' },
  { num: 2, label: 'HTTP 402',       icon: '🛑' },
  { num: 3, label: 'AUTO-PAY',       icon: '💸' },
  { num: 4, label: 'AI ANALYSIS',    icon: '🧠' },
  { num: 5, label: 'ESCROW RELEASE', icon: '🔓' },
];

export default function AutonomousActionLog({
  currentStep,
  logs,
  isExecuting,
  onRunDemo,
  onClearLogs,
  lastResult,
}) {
  const bodyRef = useRef(null);

  // Auto-scroll terminal to bottom
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="page-fade-enter">
      <div className="section-header-row mb-6">
        <div>
          <div className="section-label">Autonomous Execution</div>
          <div className="section-title">x402 Verification Pipeline</div>
          <div className="section-subtitle">
            Watch the Escrow Manager Daemon run the full machine-to-machine payment & AI verification loop in real time.
          </div>
        </div>
        <div className="flex gap-2">
          <button
            className="btn btn-cyan"
            onClick={onRunDemo}
            disabled={isExecuting}
            style={{ padding: '10px 20px' }}
          >
            {isExecuting ? '⏳ Running…' : '🚀 Run Presentation Demo'}
          </button>
          <button
            className="btn btn-ghost"
            onClick={onClearLogs}
            disabled={isExecuting}
          >
            Clear
          </button>
        </div>
      </div>

      {/* Pipeline Step Indicators */}
      <div className="pipeline-steps mb-6">
        {STEP_CONFIG.map((step) => {
          const isDone   = currentStep > step.num;
          const isActive = currentStep === step.num;
          return (
            <div
              key={step.num}
              className={`pipeline-step ${isActive ? 'active' : ''} ${isDone ? 'done' : ''}`}
            >
              <div className="pipeline-step-num">
                {isDone ? '✓' : step.icon}
              </div>
              <div className="pipeline-step-label">{step.label}</div>
            </div>
          );
        })}
      </div>

      {/* Main layout: Terminal + Certificate */}
      <div className="autonomous-layout">
        {/* Terminal */}
        <div className="terminal-panel">
          <div className="terminal-topbar">
            <div className="terminal-dots-row">
              <span className="terminal-dot dot-red" />
              <span className="terminal-dot dot-yellow" />
              <span className="terminal-dot dot-green" />
            </div>
            <span className="terminal-title-text">
              ESCROW_MANAGER_DAEMON v1.0.4 — x402 Autonomous Worker
            </span>
            <span style={{ fontSize: 11 }}>
              {isExecuting ? (
                <span style={{ color: 'var(--emerald)' }}>● EXECUTING</span>
              ) : (
                <span style={{ color: 'var(--text-muted)' }}>● IDLE</span>
              )}
            </span>
          </div>

          <div className="terminal-body" ref={bodyRef}>
            {logs.length === 0 ? (
              <div className="terminal-empty">
                <div>&gt; Escrow Manager Daemon is listening for milestone submissions…</div>
                <div>&gt; Click <span style={{ color: 'var(--cyan)' }}>"Run Presentation Demo"</span> or submit a proof from the Contractor Portal.</div>
                <div>&gt; <span style={{ color: 'var(--text-muted)' }}>_</span></div>
              </div>
            ) : (
              logs.map((log, idx) => (
                <div key={idx} className={`term-line term-${log.type || 'info'}`}>
                  <span className="term-time">[{log.timestamp}]</span>
                  <span className="term-msg">{log.message}</span>
                </div>
              ))
            )}
            {isExecuting && (
              <div className="term-line term-info">
                <span className="term-time">[…]</span>
                <span className="term-msg" style={{ opacity: 0.5 }}>
                  <span style={{ animation: 'label-pulse 1s infinite' }}>█</span>
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Certificate / result panel */}
        <div className="cert-panel">
          <div className="section-label">AI Verification Certificate</div>

          {!lastResult ? (
            <div className="cert-empty">
              <span className="cert-empty-icon">🛡️</span>
              <p className="cert-empty-text">
                No certificate generated yet. Run a proof submission to inspect the cryptographically signed output.
              </p>
            </div>
          ) : (
            <>
              {/* Status banner */}
              <div className={`cert-status-block ${lastResult.verified ? 'pass' : 'fail'}`}>
                <span className="cert-status-icon">
                  {lastResult.verified ? '✅' : '❌'}
                </span>
                <div>
                  <div className="cert-status-title">
                    {lastResult.verified ? 'MILESTONE VERIFIED' : 'MILESTONE REJECTED'}
                  </div>
                  <div className="cert-status-sub">
                    {lastResult.verified
                      ? 'Smart contract authorized escrow release'
                      : 'Anti-corruption shield triggered — escrow locked'}
                  </div>
                </div>
              </div>

              {/* Confidence score */}
              <div className="cert-field">
                <div className="cert-field-label">AI Confidence Score</div>
                <div className="score-bar-wrap">
                  <div className="score-bar-track">
                    <div
                      className="score-bar-fill"
                      style={{ width: `${((lastResult.confidenceScore || 0.95) * 100).toFixed(0)}%` }}
                    />
                  </div>
                  <div className="score-bar-value">
                    {((lastResult.confidenceScore || 0.95) * 100).toFixed(1)}%
                  </div>
                </div>
              </div>

              {/* Fields */}
              <div className="cert-field">
                <div className="cert-field-label">x402 Payment Status</div>
                <div className="cert-field-value" style={{ fontSize: 12, color: 'var(--cyan)' }}>
                  HTTP 402 Micro-Transaction Processed ✓
                </div>
              </div>

              <div className="cert-field">
                <div className="cert-field-label">Timestamp</div>
                <div className="cert-field-value" style={{ fontSize: 12 }}>
                  {new Date(lastResult.timestamp || Date.now()).toLocaleString()}
                </div>
              </div>

              <div className="cert-field">
                <div className="cert-field-label">On-Chain Audit Hash</div>
                <div className="cert-hash">{lastResult.auditHash || '0x402f9a1c…'}</div>
              </div>

              <div className="cert-field">
                <div className="cert-field-label">AI Neural Analysis Output</div>
                <div className="cert-message-box">{lastResult.message}</div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
