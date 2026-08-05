'use client';

import { useState } from 'react';

const PRESETS = [
  {
    name: '✅ Perfect Asphalt Layer',
    description: 'Road section with smooth pavement',
    projectId: 'NXM-201',
    milestoneId: 1,
    proofType: 'image',
    proofPayload: 'https://nirmaan.org/proofs/asphalt-laying-complete-highres.jpg',
  },
  {
    name: '❌ Defect: Road Pothole',
    description: 'Detects pothole keyword, rejects milestone',
    projectId: 'NXM-201',
    milestoneId: 2,
    proofType: 'image',
    proofPayload: 'https://nirmaan.org/proofs/road-pavement-pothole-segment-b.jpg',
  },
  {
    name: '❌ Substandard Material',
    description: 'Detects substandard keyword, rejects milestone',
    projectId: 'NXM-305',
    milestoneId: 1,
    proofType: 'document',
    proofPayload: 'https://nirmaan.org/proofs/substandard-curing-report-v3.pdf',
  },
  {
    name: '❌ Defective Drainage Slope',
    description: 'Detects defect keyword, rejects milestone',
    projectId: 'NXM-404',
    milestoneId: 3,
    proofType: 'image',
    proofPayload: 'https://nirmaan.org/proofs/drainage-slope-defect-analysis.jpg',
  },
];

export default function Home() {
  const [projectId, setProjectId] = useState('12345');
  const [milestoneId, setMilestoneId] = useState(1);
  const [proofType, setProofType] = useState('image');
  const [proofPayload, setProofPayload] = useState('https://example.com/uploaded-road-image.jpg');
  
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [activePreset, setActivePreset] = useState(null);

  const applyPreset = (preset, index) => {
    setProjectId(preset.projectId);
    setMilestoneId(preset.milestoneId);
    setProofType(preset.proofType);
    setProofPayload(preset.proofPayload);
    setActivePreset(index);
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setResponse(null);
    setError(null);

    try {
      const res = await fetch('/api/verify-milestone', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          projectId,
          milestoneId: Number(milestoneId),
          proofType,
          proofPayload,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Verification endpoint returned an error.');
      }
      setResponse(data);
    } catch (err) {
      setError(err.message || 'Failed to communicate with the verification server.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <header>
        <h1 className="title-gradient">Nirmaan Oracle Simulator</h1>
        <p className="subtitle">
          Chapter 4: Interactive Developer Interface for testing autonomous AI Verification endpoints behind x402 payment layers.
        </p>
      </header>

      <div className="layout-grid">
        {/* Left column: Tester Controls */}
        <section className={`glass-card ${isLoading ? 'loading' : ''}`}>
          <div className="scanner-overlay"></div>
          
          <h2 style={{ marginBottom: '1.5rem', fontSize: '1.25rem', fontWeight: 600 }}>
            AI Verification Simulator
          </h2>

          <div style={{ marginBottom: '1.5rem' }}>
            <span className="form-label" style={{ marginBottom: '0.75rem' }}>Simulation Presets</span>
            <div className="presets-grid">
              {PRESETS.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`preset-btn ${activePreset === idx ? 'active' : ''}`}
                  onClick={() => applyPreset(preset, idx)}
                >
                  <strong style={{ fontSize: '0.85rem' }}>{preset.name}</strong>
                  <span style={{ fontSize: '0.7rem', opacity: 0.8 }}>{preset.description}</span>
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleVerify} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Project ID</label>
                <input
                  type="text"
                  className="form-input"
                  value={projectId}
                  onChange={(e) => {
                    setProjectId(e.target.value);
                    setActivePreset(null);
                  }}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Milestone ID</label>
                <input
                  type="number"
                  className="form-input"
                  value={milestoneId}
                  onChange={(e) => {
                    setMilestoneId(e.target.value);
                    setActivePreset(null);
                  }}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Proof Type</label>
              <select
                className="form-select"
                value={proofType}
                onChange={(e) => {
                  setProofType(e.target.value);
                  setActivePreset(null);
                }}
              >
                <option value="image">Image (Drone/Photo)</option>
                <option value="sensor">Sensor Data (IoT)</option>
                <option value="document">Contract / Report (PDF/Doc)</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Proof Payload (URL / Verification string)</label>
              <input
                type="text"
                className="form-input"
                value={proofPayload}
                onChange={(e) => {
                  setProofPayload(e.target.value);
                  setActivePreset(null);
                }}
                placeholder="Enter proof text or image URL..."
                required
              />
            </div>

            <button type="submit" className="submit-btn" disabled={isLoading}>
              {isLoading ? (
                <>
                  <div className="spinner"></div>
                  <span>AI Analyzing proof (3s delay)...</span>
                </>
              ) : (
                <>
                  <span>Verify Milestone</span>
                </>
              )}
            </button>
          </form>
        </section>

        {/* Right column: Results & Status */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Result Card */}
          <section className="glass-card" style={{ flexGrow: 1 }}>
            <h2 style={{ marginBottom: '1.25rem', fontSize: '1.25rem', fontWeight: 600 }}>
              Inspection Results
            </h2>

            {!response && !error && !isLoading && (
              <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-muted)' }}>
                <p>Submit a verification request to see analysis output.</p>
              </div>
            )}

            {isLoading && (
              <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                <p style={{ animation: 'pulse 1.5s infinite', color: 'var(--primary)' }}>
                  Scanning proof payload for structural defects...
                </p>
              </div>
            )}

            {error && (
              <div>
                <div className="result-status failed">
                  <span>❌ Error Occurred</span>
                </div>
                <pre className="json-output error">{error}</pre>
              </div>
            )}

            {response && (
              <div>
                <div className={`result-status ${response.verified ? 'verified' : 'failed'}`}>
                  <span>{response.verified ? '✅ Milestone Verified' : '❌ Verification Rejected'}</span>
                </div>
                <div style={{ marginBottom: '1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span className="form-label" style={{ margin: 0 }}>Confidence Score</span>
                    <span style={{ fontWeight: 'bold', color: response.verified ? 'var(--success)' : 'var(--error)' }}>
                      {(response.confidenceScore * 100).toFixed(0)}%
                    </span>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '9999px', height: '8px', overflow: 'hidden' }}>
                    <div
                      style={{
                        background: response.verified ? 'var(--success)' : 'var(--error)',
                        width: `${response.confidenceScore * 100}%`,
                        height: '100%',
                        transition: 'width 0.5s ease-out',
                      }}
                    ></div>
                  </div>
                </div>
                
                <p style={{ fontSize: '0.95rem', marginBottom: '1.5rem', lineHeight: '1.5', color: '#E5E7EB' }}>
                  {response.message}
                </p>

                <span className="form-label" style={{ marginBottom: '0.5rem' }}>Raw Contract Output</span>
                <pre className="json-output">{JSON.stringify(response, null, 2)}</pre>
              </div>
            )}
          </section>

          {/* Infrastructure Info Card */}
          <section className="glass-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 600 }}>Oracle Endpoint Status</h2>
              <span className="status-pill active">Online</span>
            </div>
            
            <div className="info-list">
              <div className="info-item">
                <span className="label">Endpoint URI</span>
                <span className="value" style={{ fontFamily: 'monospace' }}>/api/verify-milestone</span>
              </div>
              <div className="info-item">
                <span className="label">Method</span>
                <span className="value" style={{ color: 'var(--primary)', fontWeight: 'bold' }}>POST</span>
              </div>
              <div className="info-item">
                <span className="label">Authentication</span>
                <span className="value">None (x402 Sandbox Mode)</span>
              </div>
              <div className="info-item">
                <span className="label">Escrow Integration</span>
                <span className="value" style={{ color: 'var(--success)' }}>V2 Multisig Compatible</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
