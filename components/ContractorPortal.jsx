'use client';
import React, { useState } from 'react';

const PRESETS = [
  {
    title: '✅ Perfect Highway Section',
    desc: 'Grade-A concrete, zero structural defects',
    type: 'image',
    payload: 'https://nirmaan.gov/proofs/highway-grade-a-asphalt-complete.jpg',
    result: 'PASS',
  },
  {
    title: '❌ Road Pothole Section',
    desc: 'Pothole & crack anomaly detected',
    type: 'image',
    payload: 'https://nirmaan.gov/proofs/highway-section-b-pothole-crack.jpg',
    result: 'FAIL',
  },
  {
    title: '❌ Substandard Material Report',
    desc: 'Substandard concrete batch defect flagged',
    type: 'document',
    payload: 'https://nirmaan.gov/proofs/concrete-substandard-batch-defect.pdf',
    result: 'FAIL',
  },
  {
    title: '📡 IoT Asphalt Telemetry',
    desc: 'Sensor log with verified compaction data',
    type: 'sensor',
    payload: 'sensor://asphalt-truck-992/weight-temp-ok',
    result: 'PASS',
  },
];

export default function ContractorPortal({ projects, onSubmitProof }) {
  const [projectId, setProjectId] = useState(projects[0]?.id || '');
  const [milestoneId, setMilestoneId] = useState(2);
  const [proofType, setProofType] = useState('image');
  const [proofPayload, setProofPayload] = useState('https://nirmaan.gov/proofs/highway-grade-a-asphalt-complete.jpg');
  const [customFile, setCustomFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedProject = projects.find((p) => p.id === projectId) || projects[0];

  const applyPreset = (preset) => {
    setProofType(preset.type);
    setProofPayload(preset.payload);
    setCustomFile(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!proofPayload.trim() || isSubmitting) return;
    setIsSubmitting(true);
    
    let finalPayload = proofPayload;
    if (customFile) {
      // Read the file as base64 so Gemini can actually see the pixels!
      finalPayload = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(customFile);
      });
    } else if (customFile === null && proofType === 'image' && proofPayload.startsWith('http')) {
       // If it's a dummy preset URL, just let it fail or the backend will handle it.
       finalPayload = proofPayload;
    }

    await onSubmitProof({
      projectId,
      milestoneId: Number(milestoneId),
      proofType,
      proofPayload: finalPayload,
    });
    setIsSubmitting(false);
  };

  return (
    <div className="page-fade-enter">
      <div className="section-header-row mb-6">
        <div>
          <div className="section-label">Contractor Portal</div>
          <div className="section-title">Submit Proof of Work</div>
          <div className="section-subtitle">
            Trigger the autonomous x402 AI verification loop — upload milestone proof for on-chain inspection.
          </div>
        </div>
      </div>

      <div className="portal-layout">
        {/* Form */}
        <div className="form-section">
          <form onSubmit={handleSubmit}>
            <div className="form-field">
              <label>Infrastructure Project</label>
              <select
                className="form-select"
                value={projectId}
                onChange={(e) => setProjectId(e.target.value)}
              >
                {projects.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-field">
              <label>Target Milestone</label>
              <select
                className="form-select"
                value={milestoneId}
                onChange={(e) => setMilestoneId(e.target.value)}
              >
                {selectedProject?.milestones.map((m) => (
                  <option key={m.id} value={m.id}>
                    Milestone {m.id}: {m.title} — ${m.payout.toLocaleString('en-US')} USDC
                  </option>
                ))}
              </select>
            </div>

            <div className="form-field">
              <label>Proof Category</label>
              <div className="radio-pill-group">
                {['image', 'sensor', 'document'].map((t) => (
                  <button
                    key={t}
                    type="button"
                    className={`radio-pill ${proofType === t ? 'active' : ''}`}
                    onClick={() => setProofType(t)}
                  >
                    {t === 'image' ? '📸 Image' : t === 'sensor' ? '📡 Sensor' : '📄 Document'}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-field">
              <label>Proof Payload URL</label>
              <input
                type="text"
                className="form-input"
                value={proofPayload}
                onChange={(e) => { setProofPayload(e.target.value); setCustomFile(null); }}
                placeholder="https://nirmaan.gov/proofs/road-section.jpg"
                required
              />
            </div>

            <div className="form-field">
              <label>Or Upload File</label>
              <div className="dropzone">
                <input
                  type="file"
                  id="proof-file"
                  className="dropzone-input"
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      setCustomFile(e.target.files[0]);
                      setProofPayload(`https://nirmaan.gov/uploads/${e.target.files[0].name}`);
                    }
                  }}
                />
                <label htmlFor="proof-file" style={{ cursor: 'pointer' }}>
                  <span className="dropzone-icon">📁</span>
                  <span className="dropzone-label">
                    {customFile ? `✓ ${customFile.name}` : 'Drag & drop drone photos / IoT exports, or click to browse'}
                  </span>
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full"
              style={{ justifyContent: 'center', padding: '14px', marginTop: 8 }}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span style={{ width: 16, height: 16, borderRadius: '50%', background: 'var(--cyan)' }} />
                  Triggering x402 Verification…
                </>
              ) : (
                <>⚡ Submit for Autonomous AI Inspection</>
              )}
            </button>
          </form>

          {/* Info banner */}
          <div style={{
            marginTop: 16,
            padding: '12px 14px',
            borderRadius: '10px',
            background: 'var(--cyan-dim)',
            border: '1px solid var(--border-accent)',
            fontSize: 12,
            color: 'var(--text-muted)',
            lineHeight: 1.6,
          }}>
            <strong style={{ color: 'var(--cyan)' }}>How this works:</strong> Submission triggers the Escrow Manager Daemon →
            AI Oracle issues HTTP 402 → wallet auto-pays 0.05 USDC via x402 → AI inspects proof → smart contract
            releases or locks escrow funds autonomously.
          </div>
        </div>

        {/* Presets */}
        <div>
          <div className="section-label mb-4">Hackathon Demo Presets</div>
          <div className="preset-list">
            {PRESETS.map((preset, i) => (
              <div className="preset-item" key={i} onClick={() => applyPreset(preset)}>
                <div className="preset-item-top">
                  <span className="preset-item-title">{preset.title}</span>
                  <span className={`badge ${preset.result === 'PASS' ? 'badge-active' : 'badge-error'}`}>
                    {preset.result}
                  </span>
                </div>
                <div className="preset-item-desc">{preset.desc}</div>
                <div className="preset-item-url">{preset.payload}</div>
              </div>
            ))}
          </div>

          {/* x402 protocol overview */}
          <div style={{
            marginTop: 16,
            padding: '20px',
            borderRadius: '14px',
            background: 'var(--glass-card)',
            border: '1px solid var(--border-1)',
          }}>
            <div className="section-label mb-4" style={{ fontSize: 10 }}>x402 PROTOCOL FLOW</div>
            {[
              ['1', '📡', 'Proof submitted', 'Contractor uploads milestone evidence'],
              ['2', '🛑', 'HTTP 402 received', 'Oracle requests 0.05 USDC compute fee'],
              ['3', '💸', 'Auto-payment', 'Escrow wallet signs x402 micro-transaction'],
              ['4', '🧠', 'AI analysis', 'Neural model inspects structural integrity'],
              ['5', '🔓', 'Smart contract', 'Releases or holds escrow autonomously'],
            ].map(([num, icon, title, desc]) => (
              <div key={num} style={{ display: 'flex', gap: 10, marginBottom: 10, alignItems: 'flex-start' }}>
                <div style={{
                  width: 22, height: 22, borderRadius: '50%', background: 'var(--cyan-dim)',
                  border: '1px solid var(--border-accent)', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontSize: 10, fontWeight: 700, color: 'var(--cyan)',
                  flexShrink: 0, marginTop: 1,
                }}>
                  {num}
                </div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)' }}>{icon} {title}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
