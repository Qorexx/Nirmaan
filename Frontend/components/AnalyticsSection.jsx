'use client';
import React from 'react';

const WEEKLY_DATA = [
  { day: 'Mon', value: 60 },
  { day: 'Tue', value: 85 },
  { day: 'Wed', value: 45 },
  { day: 'Thu', value: 92 },
  { day: 'Fri', value: 70 },
  { day: 'Sat', value: 38 },
  { day: 'Sun', value: 55 },
];

const LATENCY_DATA = [
  { label: 'AI Ping', value: 80 },
  { label: '402 Pay', value: 55 },
  { label: 'Analysis', value: 100 },
  { label: 'Contract', value: 40 },
  { label: 'Total',   value: 75 },
];

const OVERVIEW_METRICS = [
  { label: 'Verifications This Week', value: '47', unit: '', delta: '+12%', up: true },
  { label: 'x402 Fees Collected',     value: '2.35', unit: 'USDC', delta: '+8%', up: true },
  { label: 'Avg Oracle Latency',      value: '2.8',  unit: 's',    delta: '-0.4s', up: true },
  { label: 'Verification Success',    value: '94.7', unit: '%',    delta: '+2.1%', up: true },
  { label: 'Rejected (Corruption)',   value: '3',    unit: '',     delta: '', up: false },
  { label: 'Avg Escrow Release Time', value: '8.2',  unit: 's',    delta: '', up: false },
];

export default function AnalyticsSection() {
  const maxVal = Math.max(...WEEKLY_DATA.map((d) => d.value));

  return (
    <div className="page-fade-enter glow-backdrop-violet">
      <div className="section-header-row mb-6">
        <div>
          <div className="section-label">Protocol Analytics</div>
          <div className="section-title">x402 Performance Overview</div>
          <div className="section-subtitle">
            Real-time telemetry on AI oracle performance, micro-payment throughput, and escrow release velocity.
          </div>
        </div>
        <div className="trust-badge">
          <span className="status-dot-pulse" /> Live Testnet Data
        </div>
      </div>

      {/* Overview Metric Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '16px',
          marginBottom: '32px',
        }}
      >
        {OVERVIEW_METRICS.map((m) => (
          <div className="glass-card" style={{ padding: 20 }} key={m.label}>
            <div className="metric-card-label">{m.label}</div>
            <div className="metric-card-value">
              {m.value}
              {m.unit && <span className="metric-unit">{m.unit}</span>}
            </div>
            {m.delta && (
              <div className="metric-card-sub" style={{ color: m.up ? 'var(--emerald)' : 'var(--text-muted)' }}>
                {m.up ? '↑' : ''} {m.delta}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Chart Section */}
      <div className="analytics-grid">
        {/* Weekly Verifications Bar Chart */}
        <div className="glass-panel" style={{ padding: 24, gridColumn: 'span 2' }}>
          <div className="analytics-card-title">Verification Activity — Last 7 Days</div>
          <div className="bar-chart bar-chart-animated">
            {WEEKLY_DATA.map((d) => (
              <div className="bar-chart-col" key={d.day}>
                <div
                  className="bar"
                  style={{ height: `${(d.value / maxVal) * 100}%` }}
                />
                <div className="bar-label">{d.day}</div>
              </div>
            ))}
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '16px',
              fontSize: 11,
              color: 'var(--text-muted)',
            }}
          >
            <span>Total: 47 verifications</span>
            <span style={{ color: 'var(--cyan)' }}>3 rejections (fraud detected)</span>
          </div>
        </div>

        {/* Oracle Latency Breakdown */}
        <div className="glass-panel" style={{ padding: 24 }}>
          <div className="analytics-card-title">Oracle Step Latency</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 8 }}>
            {LATENCY_DATA.map((item) => (
              <div key={item.label}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: 11,
                    color: 'var(--text-muted)',
                    marginBottom: 4,
                  }}
                >
                  <span>{item.label}</span>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      color: item.label === 'Total' ? 'var(--cyan)' : 'var(--text-secondary)',
                    }}
                  >
                    ~{((item.value / 100) * 3).toFixed(1)}s
                  </span>
                </div>
                <div className="progress-track">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${item.value}%`,
                      background:
                        item.label === 'Total'
                          ? 'linear-gradient(90deg, var(--violet), var(--cyan))'
                          : undefined,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Protocol Stats Banner */}
      <div
        className="glass-panel"
        style={{
          marginTop: '24px',
          padding: '24px',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '16px',
        }}
      >
        {[
          { label: 'Total Funds Protected', value: '$8.55M USDC', icon: '🔒' },
          { label: 'AI Oracle Uptime', value: '99.97%', icon: '🧠' },
          { label: 'x402 Payments Processed', value: '847', icon: '⚡' },
          { label: 'Corrupt Submissions Blocked', value: '23', icon: '🛡️' },
        ].map((stat) => (
          <div key={stat.label} style={{ textAlign: 'center', padding: '12px 0' }}>
            <div style={{ fontSize: 22, marginBottom: 6 }}>{stat.icon}</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>
              {stat.value}
            </div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
