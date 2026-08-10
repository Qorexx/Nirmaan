'use client';
import React from 'react';

export default function GovernmentDashboard({ projects, ledger, onVerifyClick }) {
  const totalBudget   = projects.reduce((s, p) => s + p.totalBudget, 0);
  const totalLocked   = projects.reduce((s, p) => s + p.escrowLocked, 0);
  const totalReleased = projects.reduce((s, p) => s + p.escrowReleased, 0);

  return (
    <div className="page-fade-enter">
      {/* KPI Metrics */}
      <div className="metrics-row">
        <MetricCard
          label="Escrow Locked"
          value={`$${(totalLocked / 1e6).toFixed(2)}M`}
          unit="USDC"
          sub="🔒 Protected by smart contract"
          accent="cyan"
        />
        <MetricCard
          label="Released Payouts"
          value={`$${(totalReleased / 1e3).toFixed(0)}K`}
          unit="USDC"
          sub="⚡ Via x402 AI oracles"
          accent="emerald"
        />
        <MetricCard
          label="Active Tenders"
          value={projects.length}
          unit="Projects"
          sub="🔐 ZK-bid verified"
          accent="blue"
        />
        <MetricCard
          label="Total Budget"
          value={`$${(totalBudget / 1e6).toFixed(2)}M`}
          unit="USDC"
          sub="🏛️ 100% on-chain transparent"
          accent="violet"
        />
      </div>

      {/* Projects */}
      <div className="section-header-row mb-6">
        <div>
          <div className="section-label">Infrastructure Projects</div>
          <div className="section-title">Active Escrow Vaults</div>
          <div className="section-subtitle">Zero-knowledge bid commitment — verified on-chain</div>
        </div>
        <div className="trust-badge">
          <span>🛡️</span> Anti-Corruption Shield Active
        </div>
      </div>

      <div className="projects-grid mb-8">
        {projects.map((proj) => (
          <ProjectCard key={proj.id} project={proj} onVerifyClick={onVerifyClick} />
        ))}
      </div>

      {/* Audit Ledger */}
      <div className="section-header-row mb-6">
        <div>
          <div className="section-label">On-Chain Audit Trail</div>
          <div className="section-title">Escrow Release Ledger</div>
          <div className="section-subtitle">Autonomous x402 execution history — cryptographically signed</div>
        </div>
      </div>

      <div className="ledger-section">
        <table className="ledger-table">
          <thead>
            <tr>
              <th>TIMESTAMP</th>
              <th>PROJECT / MILESTONE</th>
              <th>AMOUNT</th>
              <th>STATUS</th>
              <th>AI SCORE</th>
              <th>TX HASH</th>
            </tr>
          </thead>
          <tbody>
            {ledger.map((item) => (
              <tr key={item.id}>
                <td style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)' }}>
                  {new Date(item.timestamp).toLocaleString('en-US')}
                </td>
                <td>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{item.projectName}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Milestone {item.milestoneId}</div>
                </td>
                <td style={{ fontWeight: 600, color: item.status === 'RELEASED' ? 'var(--emerald)' : 'var(--text-muted)' }}>
                  {item.status === 'RELEASED' ? `+$${item.amount.toLocaleString('en-US')} USDC` : '—'}
                </td>
                <td>
                  <span className={`badge ${item.status === 'RELEASED' ? 'badge-active' : 'badge-error'}`}>
                    {item.status === 'RELEASED' ? '✓ Released' : '✗ Rejected'}
                  </span>
                </td>
                <td style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--cyan)' }}>
                  {item.aiConfidence}
                </td>
                <td className="ledger-tx-hash">{item.txHash}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function MetricCard({ label, value, unit, sub, accent = 'cyan' }) {
  const accentColor = {
    cyan:   'var(--cyan)',
    emerald:'var(--emerald)',
    blue:   'var(--blue)',
    violet: 'var(--violet)',
  }[accent];

  return (
    <div className="metric-card" style={{ borderColor: `rgba(${accentRGB(accent)}, 0.15)` }}>
      <div className="metric-card-label">{label}</div>
      <div className="metric-card-value" style={{ color: accentColor }}>
        {value}
        {unit && <span className="metric-unit">{unit}</span>}
      </div>
      <div className="metric-card-sub">{sub}</div>
    </div>
  );
}

function accentRGB(accent) {
  const map = {
    cyan: '0,220,255',
    emerald: '16,185,129',
    blue: '59,130,246',
    violet: '139,92,246',
  };
  return map[accent] || '0,220,255';
}

function ProjectCard({ project, onVerifyClick }) {
  return (
    <div className="project-card">
      <div className="project-card-top">
        <div style={{ minWidth: 0 }}>
          <div className="project-title">{project.name}</div>
          <div className="project-contractor">{project.contractor}</div>
        </div>
        <span className="badge badge-active">Active</span>
      </div>

      {/* ZK-Bid Hash */}
      <div className="zk-badge">
        <span className="zk-label">ZK</span>
        <span className="zk-hash">{project.zkBidHash}</span>
      </div>

      {/* Progress */}
      <div className="progress-bar-wrap">
        <div className="progress-bar-meta">
          <span>Completion</span>
          <span style={{ color: 'var(--cyan)', fontWeight: 600 }}>{project.progress}%</span>
        </div>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${project.progress}%` }} />
        </div>
      </div>

      {/* Escrow cells */}
      <div className="escrow-row">
        <div className="escrow-cell">
          <div className="escrow-cell-label">Total Budget</div>
          <div className="escrow-cell-value">${project.totalBudget.toLocaleString('en-US')}</div>
        </div>
        <div className="escrow-cell">
          <div className="escrow-cell-label">Locked</div>
          <div className="escrow-cell-value color-cyan">${project.escrowLocked.toLocaleString('en-US')}</div>
        </div>
        <div className="escrow-cell">
          <div className="escrow-cell-label">Released</div>
          <div className="escrow-cell-value color-emerald">${project.escrowReleased.toLocaleString('en-US')}</div>
        </div>
      </div>

      {/* Milestones */}
      <div>
        <div className="section-label" style={{ marginBottom: 8 }}>Milestone Roadmap</div>
        <div className="milestone-list">
          {project.milestones.map((m) => (
            <div className="milestone-item" key={m.id}>
              <div className="milestone-left">
                <span className="milestone-icon">
                  {m.status === 'VERIFIED' ? '✅' : m.status === 'PENDING' ? '⏳' : '🔒'}
                </span>
                <div className="milestone-info">
                  <div className="milestone-name">{m.title}</div>
                  <div className="milestone-amount font-mono">${m.payout.toLocaleString('en-US')} USDC</div>
                </div>
              </div>
              {m.status === 'VERIFIED' ? (
                <span className="badge badge-verified">{Math.round((m.score || 0.97) * 100)}% ✓</span>
              ) : m.status === 'PENDING' ? (
                <button className="btn-verify-sm" onClick={() => onVerifyClick(project.id, m.id)}>
                  Verify ⚡
                </button>
              ) : (
                <span className="badge badge-locked">Locked</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
