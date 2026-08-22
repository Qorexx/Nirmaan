'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useNirmaan } from '@/lib/NirmaanContext';
import VerificationPipeline from '@/components/VerificationPipeline';
import { HardHat, Building2, Target, Database, UploadCloud, Truck, MapPin, Cpu, ShieldAlert, ShieldCheck } from 'lucide-react';

export default function ContractorPortal() {
  const { projects, processContractorSubmission } = useNirmaan();
  
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedMilestone, setSelectedMilestone] = useState('');
  const [proofFile, setProofFile] = useState(null); 
  const [exifData, setExifData] = useState(''); 
  const [iotData, setIotData] = useState(''); 
  const [eWayBill, setEWayBill] = useState(''); 
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPipeline, setShowPipeline] = useState(false);
  const [verificationResult, setVerificationResult] = useState(null);
  const [pipelineLogs, setPipelineLogs] = useState([]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => setProofFile(event.target.result);
      reader.readAsDataURL(file);
    }
  };

  const autofillFraud = () => {
    setExifData(JSON.stringify({ device: "Unknown", gps: [0,0], signature: "INVALID" }, null, 2));
    setIotData(JSON.stringify({ jcbEngineHours: 12, cementWeighedTons: 200 }, null, 2));
    setEWayBill('');
  };

  const autofillHonest = () => {
    setExifData(JSON.stringify({ device: "Nirmaan Secure Drone SDK", gps: [28.5355, 77.3910], signature: "0x88f...1c", temporalHash: "0x99a...2b" }, null, 2));
    setIotData(JSON.stringify({ jcbEngineHours: 35, cementWeighedTons: 520 }, null, 2));
    setEWayBill('0x7a3f9108c909e4d1b827e85c2901c89012a4b8cd'); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedProject || !selectedMilestone || !proofFile) return alert("Missing required visual proof.");
    setPipelineLogs([]);
    setIsSubmitting(true);
    setShowPipeline(true); 
    const result = await processContractorSubmission(
      selectedProject, selectedMilestone, proofFile, iotData, eWayBill, exifData,
      (log) => setPipelineLogs(prev => [...prev, log])
    );
    setVerificationResult(result);
    setIsSubmitting(false);
  };

  const currentProject = projects.find(p => p.id === selectedProject);

  // Shared styles
  const cardStyle = {
    background: 'rgba(255,255,255,0.85)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255,255,255,0.9)',
    borderRadius: '2rem',
    padding: '40px',
    boxShadow: '0 8px 30px rgba(0,0,0,0.06)',
    width: '100%',
  };

  const inputStyle = {
    width: '100%',
    padding: '16px 20px',
    borderRadius: '1rem',
    border: '1px solid #e2e8f0',
    background: '#fff',
    fontSize: '14px',
    fontFamily: 'ui-monospace, monospace',
    color: '#0f172a',
    outline: 'none',
    boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
    transition: 'border-color 0.2s, box-shadow 0.2s',
  };

  const selectStyle = {
    ...inputStyle,
    fontFamily: 'inherit',
    fontWeight: 600,
    cursor: 'pointer',
    appearance: 'none',
  };

  const btnPrimary = {
    width: '100%',
    padding: '22px 24px',
    borderRadius: '1.5rem',
    border: 'none',
    background: '#0f172a',
    color: '#fff',
    fontSize: '18px',
    fontWeight: 700,
    cursor: 'pointer',
    boxShadow: '0 15px 40px rgba(15,23,42,0.25)',
    letterSpacing: '0.02em',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    transition: 'transform 0.2s, box-shadow 0.2s',
  };

  const btnDemo = (color) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 18px',
    borderRadius: '12px',
    border: `1px solid ${color === 'red' ? '#fecaca' : '#a7f3d0'}`,
    background: color === 'red' ? '#fef2f2' : '#ecfdf5',
    color: color === 'red' ? '#b91c1c' : '#047857',
    fontSize: '11px',
    fontWeight: 800,
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    cursor: 'pointer',
    transition: 'background 0.2s, box-shadow 0.2s',
  });

  if (showPipeline) {
    return (
      <div style={{ minHeight: '100vh', background: '#f4f7f9', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '96px 24px 96px', width: '100%' }}>
          <VerificationPipeline logs={pipelineLogs} isComplete={!isSubmitting} result={verificationResult} />
          {!isSubmitting && (
            <div style={{ textAlign: 'center', marginTop: '40px' }}>
              <button 
                onClick={() => { setShowPipeline(false); setVerificationResult(null); setPipelineLogs([]); }} 
                style={{ ...btnPrimary, background: '#fff', color: '#0f172a', boxShadow: '0 8px 30px rgba(0,0,0,0.08)', maxWidth: '400px', margin: '0 auto' }}
              >
                Return to Dashboard
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f4f7f9', position: 'relative', overflowX: 'hidden' }}>
      
      {/* Nirmaan Branding Bar */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 40, padding: '16px 32px', background: 'rgba(244,247,249,0.85)', backdropFilter: 'blur(12px)' }}>
        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', textDecoration: 'none', cursor: 'pointer' }}>
          <div style={{ height: '36px', width: '36px', borderRadius: '10px', background: 'linear-gradient(135deg, #3b82f6, #4f46e5)', boxShadow: '0 4px 12px rgba(59,130,246,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Building2 style={{ height: '18px', width: '18px', color: '#fff' }} strokeWidth={2.5} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '18px', fontWeight: 900, color: '#0f172a', letterSpacing: '-0.02em', lineHeight: 1 }}>NIRMAAN</span>
            <span style={{ fontSize: '10px', fontWeight: 700, color: '#3b82f6', letterSpacing: '0.1em', marginTop: '2px' }}>x402 PROTOCOL</span>
          </div>
        </Link>
      </div>

      {/* Background Waves */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', opacity: 0.5 }}>
        <svg viewBox="0 0 1440 800" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', top: '50%', left: 0, width: '100%', height: '120%', transform: 'translateY(-50%)' }}>
          <path d="M-100,600 C200,400 400,300 700,500 C1000,700 1200,500 1500,400" stroke="#cbd5e1" strokeWidth="1" opacity="0.6" />
          <path d="M-100,620 C200,420 400,320 700,520 C1000,720 1200,520 1500,420" stroke="#cbd5e1" strokeWidth="1" opacity="0.5" />
          <path d="M-100,640 C200,440 400,340 700,540 C1000,740 1200,540 1500,440" stroke="#cbd5e1" strokeWidth="1" opacity="0.4" />
          <path d="M-100,300 C300,500 600,600 800,400 C1100,100 1300,300 1500,500" stroke="#94a3b8" strokeWidth="1.5" opacity="0.4" />
        </svg>
      </div>

      {/* Centered Content Container */}
      <div style={{ position: 'relative', zIndex: 10, maxWidth: '880px', margin: '0 auto', padding: '80px 24px 120px' }}>
        
        {/* Centered Header */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '48px' }}>
          <div style={{ height: '72px', width: '72px', borderRadius: '1.25rem', background: '#fff', boxShadow: '0 8px 30px rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
            <HardHat style={{ height: '36px', width: '36px', color: '#4f46e5' }} strokeWidth={2} />
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', margin: '0 0 12px' }}>
            Contractor Dashboard
          </h1>
          <p style={{ fontSize: '17px', color: '#475569', fontWeight: 500, maxWidth: '520px', lineHeight: 1.6 }}>
            Upload cryptographic proof of work to trigger autonomous time-locked escrow payouts.
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '32px', width: '100%' }}>
          
          {/* STEP 1 CARD */}
          <div style={cardStyle}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '28px', paddingBottom: '20px', borderBottom: '1px solid #f1f5f9' }}>
              <div style={{ background: '#f1f5f9', padding: '10px', borderRadius: '12px', marginRight: '16px', display: 'flex' }}>
                <Target style={{ width: '22px', height: '22px', color: '#334155' }} strokeWidth={2} />
              </div>
              <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#0f172a', letterSpacing: '-0.01em' }}>Step 1 — Select Escrow Target</h2>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, color: '#64748b', marginBottom: '10px' }}>Associated Project</label>
                <select style={selectStyle} value={selectedProject} onChange={e => setSelectedProject(e.target.value)} required>
                  <option value="">— Select Project —</option>
                  {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, color: '#64748b', marginBottom: '10px' }}>Target Milestone</label>
                <select style={{ ...selectStyle, opacity: selectedProject ? 1 : 0.5 }} value={selectedMilestone} onChange={e => setSelectedMilestone(e.target.value)} disabled={!selectedProject} required>
                  <option value="">— Select Milestone —</option>
                  {currentProject?.milestones.filter(m => m.status === 'PENDING').map(m => (
                  <option key={m.id} value={m.id}>{m.title} (₹{m.payout ? m.payout.toLocaleString() : '0'})</option>
                ))}
                </select>
              </div>
            </div>
          </div>

          {/* STEP 2 CARD */}
          <div style={cardStyle}>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px', paddingBottom: '20px', borderBottom: '1px solid #f1f5f9', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ background: '#f1f5f9', padding: '10px', borderRadius: '12px', marginRight: '16px', display: 'flex' }}>
                  <Database style={{ width: '22px', height: '22px', color: '#334155' }} strokeWidth={2} />
                </div>
                <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#0f172a', letterSpacing: '-0.01em' }}>Step 2 — Upload Telemetry</h2>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button type="button" onClick={autofillFraud} style={btnDemo('red')}>
                  <ShieldAlert style={{ width: '14px', height: '14px' }} /> Load Fraud
                </button>
                <button type="button" onClick={autofillHonest} style={btnDemo('green')}>
                  <ShieldCheck style={{ width: '14px', height: '14px' }} /> Load Honest
                </button>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              
              {/* Visual Proof */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <UploadCloud style={{ width: '18px', height: '18px', color: '#6366f1' }} />
                  <label style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>Visual Proof (Video / Image)</label>
                </div>
                <p style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 500, marginLeft: '26px' }}>Must pass AI GAN Pre-processing.</p>
                <div style={{ border: '2px dashed #e2e8f0', borderRadius: '1rem', padding: '16px', background: '#fafbfc', marginTop: '4px' }}>
                  <input 
                    type="file" accept="image/*,video/*" onChange={handleFileChange} required
                    style={{ width: '100%', fontSize: '14px', cursor: 'pointer' }}
                  />
                </div>
              </div>

              {/* e-Way Bill */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Truck style={{ width: '18px', height: '18px', color: '#6366f1' }} />
                  <label style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>Financial: e-Way Bill Hash</label>
                </div>
                <p style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 500, marginLeft: '26px' }}>Tax API Supply Chain Verification.</p>
                <input 
                  type="text" value={eWayBill} onChange={e => setEWayBill(e.target.value)}
                  placeholder="e.g., 0x7a3f9108c..."
                  style={{ ...inputStyle, marginTop: '4px' }}
                  onFocus={e => { e.target.style.borderColor = '#818cf8'; e.target.style.boxShadow = '0 0 0 4px rgba(99,102,241,0.1)'; }}
                  onBlur={e => { e.target.style.borderColor = '#e2e8f0'; e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.03)'; }}
                />
              </div>

              {/* EXIF / GPS */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <MapPin style={{ width: '18px', height: '18px', color: '#6366f1' }} />
                  <label style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>Hardware-Signed EXIF / GPS</label>
                </div>
                <p style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 500, marginLeft: '26px' }}>Injected securely by the drone/camera SDK.</p>
                <textarea 
                  value={exifData} onChange={e => setExifData(e.target.value)}
                  placeholder='{"device": "Nirmaan SDK", "gps": [...] }'
                  style={{ ...inputStyle, height: '130px', resize: 'none', fontSize: '13px', marginTop: '4px' }}
                  onFocus={e => { e.target.style.borderColor = '#818cf8'; e.target.style.boxShadow = '0 0 0 4px rgba(99,102,241,0.1)'; }}
                  onBlur={e => { e.target.style.borderColor = '#e2e8f0'; e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.03)'; }}
                />
              </div>

              {/* IoT Telemetry */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Cpu style={{ width: '18px', height: '18px', color: '#6366f1' }} />
                  <label style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>IoT Telemetry (JCB / Weighbridge)</label>
                </div>
                <p style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 500, marginLeft: '26px' }}>Cryptographic readout from heavy machinery.</p>
                <textarea 
                  value={iotData} onChange={e => setIotData(e.target.value)}
                  placeholder='{"jcbEngineHours": 35, "cementWeighedTons": 520}'
                  style={{ ...inputStyle, height: '130px', resize: 'none', fontSize: '13px', marginTop: '4px' }}
                  onFocus={e => { e.target.style.borderColor = '#818cf8'; e.target.style.boxShadow = '0 0 0 4px rgba(99,102,241,0.1)'; }}
                  onBlur={e => { e.target.style.borderColor = '#e2e8f0'; e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.03)'; }}
                />
              </div>
            </div>
          </div>

          {/* SUBMIT BUTTON */}
          <button 
            type="submit" 
            style={btnPrimary}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 20px 50px rgba(15,23,42,0.35)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 15px 40px rgba(15,23,42,0.25)'; }}
          >
            <HardHat style={{ width: '22px', height: '22px' }} />
            Execute Protocol Submission
          </button>
        </form>

      </div>
    </div>
  );
}
