'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useNirmaan } from '@/lib/NirmaanContext';
import { Building2, AlertTriangle, ShieldCheck, Clock, CheckCircle2, Inbox, Plus, FileText, Upload, Check } from 'lucide-react';

export default function GovernmentPortal() {
  const { projects, settleViaPFMS, launchProject } = useNirmaan();
  
  const [pfmsAnimation, setPfmsAnimation] = useState({ active: false, projectId: null, step: 0 });
  const [showLaunchModal, setShowLaunchModal] = useState(false);
  const [newProjectForm, setNewProjectForm] = useState({ name: '', budget: '', location: '', document: null });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const activeProjects = projects.filter(p => p.status === 'ACTIVE');
  const timeLockedProjects = projects.filter(p => p.status === 'TIME_LOCKED');
  const disputedProjects = projects.filter(p => p.status === 'DISPUTED');
  const settledProjects = projects.filter(p => p.status === 'PFMS_SETTLED');

  const handlePFMSRelease = async (projectId) => {
    setPfmsAnimation({ active: true, projectId, step: 1 });
    await new Promise(r => setTimeout(r, 1500));
    setPfmsAnimation({ active: true, projectId, step: 2 });
    await new Promise(r => setTimeout(r, 1500));
    setPfmsAnimation({ active: true, projectId, step: 3 });
    await new Promise(r => setTimeout(r, 2000));
    settleViaPFMS(projectId);
    setPfmsAnimation({ active: false, projectId: null, step: 0 });
  };

  const handleLaunchProject = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate transaction delay
    await new Promise(r => setTimeout(r, 1500));
    
    launchProject({
      name: newProjectForm.name,
      milestones: [
        { id: 'm1', title: `Phase 1: ${newProjectForm.name} Foundation`, status: 'PENDING' },
        { id: 'm2', title: `Phase 2: Superstructure & Safety`, status: 'PENDING' }
      ]
    });
    
    setIsSubmitting(false);
    setShowLaunchModal(false);
    setNewProjectForm({ name: '', budget: '', location: '', document: null });
  };

  // ── Shared Styles ──
  const columnCard = {
    background: 'rgba(255,255,255,0.7)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255,255,255,0.9)',
    borderRadius: '1.5rem',
    padding: '28px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
    display: 'flex',
    flexDirection: 'column',
    minHeight: '500px',
  };

  const projectCard = {
    background: '#fff',
    border: '1px solid #f1f5f9',
    borderRadius: '1rem',
    padding: '20px',
    boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
    transition: 'box-shadow 0.2s',
  };

  const badge = (bg, color, border) => ({
    display: 'inline-block',
    fontSize: '10px',
    fontWeight: 800,
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    padding: '4px 10px',
    borderRadius: '999px',
    background: bg,
    color: color,
    border: `1px solid ${border}`,
    whiteSpace: 'nowrap',
  });

  const countBadge = (bg, color) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '28px',
    height: '28px',
    borderRadius: '999px',
    background: bg,
    color: color,
    fontSize: '13px',
    fontWeight: 800,
    flexShrink: 0,
  });

  const sectionHeader = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '20px',
    paddingBottom: '16px',
    borderBottom: '1px solid #f1f5f9',
  };

  const sectionTitle = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '16px',
    fontWeight: 700,
    color: '#0f172a',
    letterSpacing: '-0.01em',
  };

  const emptyState = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    border: '2px dashed #e2e8f0',
    borderRadius: '1rem',
    padding: '32px 20px',
  };

  const btnAction = (bg, hoverBg) => ({
    flex: 1,
    padding: '12px 16px',
    borderRadius: '12px',
    border: 'none',
    background: bg,
    color: '#fff',
    fontSize: '13px',
    fontWeight: 700,
    cursor: 'pointer',
    transition: 'background 0.2s',
  });

  const inputStyle = {
    width: '100%',
    padding: '14px 16px',
    borderRadius: '12px',
    border: '1px solid #e2e8f0',
    background: '#f8fafc',
    fontSize: '14px',
    color: '#0f172a',
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
  };

  const labelStyle = {
    display: 'block',
    fontSize: '13px',
    fontWeight: 700,
    color: '#475569',
    marginBottom: '8px',
  };

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

      {/* PFMS Twin-Ledger Animation Modal */}
      {pfmsAnimation.active && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(15,23,42,0.4)', backdropFilter: 'blur(12px)', padding: '16px' }}>
          <div style={{ background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(20px)', border: '1px solid #fff', padding: '40px', borderRadius: '2rem', boxShadow: '0 25px 60px rgba(0,0,0,0.15)', maxWidth: '480px', width: '100%', textAlign: 'center' }}>
            <h3 style={{ fontSize: '24px', fontWeight: 700, color: '#0f172a', marginBottom: '28px', letterSpacing: '-0.02em' }}>Twin-Ledger Settlement</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontFamily: 'ui-monospace, monospace', fontSize: '13px', textAlign: 'left' }}>
              {[
                { step: 1, done: '✅ Smart Contract Veto Expired. State: APPROVED', wait: '⏳ Waiting for blockchain consensus...', bg: '#ecfdf5', border: '#a7f3d0', color: '#065f46' },
                { step: 2, done: '✅ Firing Secure Webhook to RBI/PFMS Gateway...', wait: '⏳ Waiting for PFMS webhook...', bg: '#eff6ff', border: '#bfdbfe', color: '#1e40af' },
                { step: 3, done: '✅ NEFT Transfer Initiated. INR settled.', wait: '⏳ Awaiting NEFT generation...', bg: '#eef2ff', border: '#c7d2fe', color: '#3730a3' },
              ].map(s => (
                <div key={s.step} style={{ padding: '14px', borderRadius: '12px', border: `1px solid ${pfmsAnimation.step >= s.step ? s.border : '#e2e8f0'}`, background: pfmsAnimation.step >= s.step ? s.bg : '#fafbfc', color: pfmsAnimation.step >= s.step ? s.color : '#94a3b8', transition: 'all 0.5s' }}>
                  {pfmsAnimation.step >= s.step ? s.done : s.wait}
                </div>
              ))}
            </div>
            {pfmsAnimation.step >= 3 && (
              <div style={{ marginTop: '24px', padding: '16px', border: '1px solid #e2e8f0', background: '#fafbfc', borderRadius: '12px', fontSize: '12px', color: '#64748b' }}>
                <p>Transaction ID: NIRM-{Math.floor(Math.random() * 10000000)}</p>
                <p style={{ color: '#4f46e5', fontWeight: 700 }}>Settlement: ₹400,000.00 INR</p>
                <p>Note: No crypto assets transferred.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Launch Project Modal */}
      {showLaunchModal && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(15,23,42,0.4)', backdropFilter: 'blur(12px)', padding: '16px' }}>
          <div style={{ background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(20px)', border: '1px solid #fff', padding: '40px', borderRadius: '2rem', boxShadow: '0 25px 60px rgba(0,0,0,0.15)', maxWidth: '520px', width: '100%' }}>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
              <div style={{ height: '48px', width: '48px', borderRadius: '14px', background: '#eef2ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Plus style={{ height: '24px', width: '24px', color: '#4f46e5' }} strokeWidth={2.5} />
              </div>
              <div>
                <h3 style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a', margin: 0, letterSpacing: '-0.02em' }}>Launch Project</h3>
                <p style={{ fontSize: '14px', color: '#64748b', margin: '4px 0 0' }}>Upload BOQ & initialize escrow contract.</p>
              </div>
            </div>

            <form onSubmit={handleLaunchProject} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={labelStyle}>Project Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. NH-44 Highway Extension"
                  value={newProjectForm.name}
                  onChange={e => setNewProjectForm({...newProjectForm, name: e.target.value})}
                  style={inputStyle}
                  onFocus={e => { e.target.style.borderColor = '#3b82f6'; e.target.style.boxShadow = '0 0 0 4px rgba(59,130,246,0.1)'; }}
                  onBlur={e => { e.target.style.borderColor = '#e2e8f0'; e.target.style.boxShadow = 'none'; }}
                />
              </div>

              <div style={{ display: 'flex', gap: '16px' }}>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>Budget (INR)</label>
                  <input 
                    type="number" 
                    required
                    placeholder="₹4,000,000"
                    value={newProjectForm.budget}
                    onChange={e => setNewProjectForm({...newProjectForm, budget: e.target.value})}
                    style={inputStyle}
                    onFocus={e => { e.target.style.borderColor = '#3b82f6'; e.target.style.boxShadow = '0 0 0 4px rgba(59,130,246,0.1)'; }}
                    onBlur={e => { e.target.style.borderColor = '#e2e8f0'; e.target.style.boxShadow = 'none'; }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>Location</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Maharashtra"
                    value={newProjectForm.location}
                    onChange={e => setNewProjectForm({...newProjectForm, location: e.target.value})}
                    style={inputStyle}
                    onFocus={e => { e.target.style.borderColor = '#3b82f6'; e.target.style.boxShadow = '0 0 0 4px rgba(59,130,246,0.1)'; }}
                    onBlur={e => { e.target.style.borderColor = '#e2e8f0'; e.target.style.boxShadow = 'none'; }}
                  />
                </div>
              </div>

              <div>
                <label style={labelStyle}>Bill of Quantities (BOQ)</label>
                <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', width: '100%', padding: '24px', border: '2px dashed #cbd5e1', borderRadius: '12px', background: '#f8fafc', cursor: 'pointer', transition: 'all 0.2s' }} onMouseEnter={e => e.currentTarget.style.borderColor = '#3b82f6'} onMouseLeave={e => e.currentTarget.style.borderColor = '#cbd5e1'}>
                  <input 
                    type="file" 
                    style={{ display: 'none' }}
                    onChange={e => setNewProjectForm({...newProjectForm, document: e.target.files[0]})}
                    required
                  />
                  {newProjectForm.document ? (
                    <>
                      <FileText style={{ color: '#059669', width: '24px', height: '24px' }} />
                      <span style={{ fontSize: '14px', fontWeight: 600, color: '#059669' }}>{newProjectForm.document.name}</span>
                    </>
                  ) : (
                    <>
                      <Upload style={{ color: '#94a3b8', width: '24px', height: '24px' }} />
                      <span style={{ fontSize: '14px', fontWeight: 600, color: '#64748b' }}>Upload PDF or Excel</span>
                    </>
                  )}
                </label>
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                <button 
                  type="button" 
                  onClick={() => setShowLaunchModal(false)}
                  style={{ flex: 1, padding: '14px', borderRadius: '12px', border: '1px solid #e2e8f0', background: '#fff', color: '#475569', fontSize: '14px', fontWeight: 700, cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  style={{ flex: 2, padding: '14px', borderRadius: '12px', border: 'none', background: isSubmitting ? '#94a3b8' : '#0f172a', color: '#fff', fontSize: '14px', fontWeight: 700, cursor: isSubmitting ? 'wait' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                >
                  {isSubmitting ? (
                    'Deploying Smart Contract...'
                  ) : (
                    <>
                      <Plus size={18} strokeWidth={3} /> Launch Project
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Main Dashboard */}
      <div style={{ position: 'relative', zIndex: 10, maxWidth: '1200px', margin: '0 auto', padding: '64px 32px 96px' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '48px' }}>
          <div style={{ height: '72px', width: '72px', borderRadius: '1.25rem', background: '#fff', boxShadow: '0 8px 30px rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
            <Building2 style={{ height: '36px', width: '36px', color: '#2563eb' }} strokeWidth={2} />
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', margin: '0 0 12px' }}>
            Government Dashboard
          </h1>
          <p style={{ fontSize: '17px', color: '#475569', fontWeight: 500, maxWidth: '560px', lineHeight: 1.6, margin: '0 0 28px' }}>
            Global oversight of autonomous infrastructure escrow. Manage whistleblower reports and fiat settlements.
          </p>
          
          {/* Stats Row & Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '1rem', padding: '16px 28px', textAlign: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.03)' }}>
                <div style={{ fontSize: '28px', fontWeight: 800, color: '#2563eb' }}>{projects.length}</div>
                <div style={{ fontSize: '10px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '2px' }}>Total Projects</div>
              </div>
              <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '1rem', padding: '16px 28px', textAlign: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.03)' }}>
                <div style={{ fontSize: '28px', fontWeight: 800, color: '#dc2626' }}>{disputedProjects.length}</div>
                <div style={{ fontSize: '10px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '2px' }}>Disputes</div>
              </div>
              <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '1rem', padding: '16px 28px', textAlign: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.03)' }}>
                <div style={{ fontSize: '28px', fontWeight: 800, color: '#059669' }}>{settledProjects.length}</div>
                <div style={{ fontSize: '10px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '2px' }}>Settled</div>
              </div>
            </div>
            
            <div style={{ width: '1px', height: '60px', background: '#e2e8f0' }} />
            
            <button 
              onClick={() => setShowLaunchModal(true)}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '16px 24px', borderRadius: '1rem', border: 'none', background: '#0f172a', color: '#fff', fontSize: '15px', fontWeight: 700, cursor: 'pointer', boxShadow: '0 8px 20px rgba(15,23,42,0.15)', transition: 'transform 0.2s, box-shadow 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 25px rgba(15,23,42,0.2)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 20px rgba(15,23,42,0.15)'; }}
            >
              <Plus size={20} strokeWidth={2.5} />
              Launch Project
            </button>
          </div>
        </div>

        {/* 3 Column Kanban */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
          
          {/* COL 1: Disputed */}
          <div style={columnCard}>
            <div style={sectionHeader}>
              <div style={sectionTitle}>
                <AlertTriangle style={{ width: '20px', height: '20px', color: '#ef4444' }} strokeWidth={2.5} />
                Human Audits
              </div>
              <div style={countBadge('#fef2f2', '#dc2626')}>{disputedProjects.length}</div>
            </div>
            
            {disputedProjects.length === 0 ? (
              <div style={emptyState}>
                <Inbox style={{ width: '36px', height: '36px', color: '#cbd5e1', marginBottom: '12px' }} strokeWidth={1.5} />
                <p style={{ fontSize: '15px', fontWeight: 600, color: '#64748b', margin: '0 0 4px' }}>No active disputes</p>
                <p style={{ fontSize: '13px', color: '#94a3b8', margin: 0 }}>All projects running autonomously.</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {disputedProjects.map(p => {
                  const dm = p.milestones.find(m => m.status === 'DISPUTED');
                  return (
                    <div key={p.id} style={projectCard}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                        <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', margin: 0 }}>{p.name}</h3>
                        <span style={badge('#fef2f2', '#dc2626', '#fecaca')}>Frozen</span>
                      </div>
                      <p style={{ fontSize: '13px', color: '#475569', margin: '0 0 12px', lineHeight: 1.5, background: '#fafbfc', padding: '10px', borderRadius: '8px', border: '1px solid #f1f5f9' }}>{dm?.title}</p>
                      
                      <div style={{ background: '#fafbfc', border: '1px solid #f1f5f9', borderRadius: '8px', padding: '12px', marginBottom: '12px', fontSize: '11px', fontFamily: 'ui-monospace, monospace', wordBreak: 'break-all', color: '#64748b' }}>
                        <p style={{ color: '#ef4444', fontWeight: 700, marginBottom: '4px', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Citizen IPFS Evidence:</p>
                        <p style={{ margin: 0 }}>{dm?.ipfsCID}</p>
                      </div>

                      <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', padding: '12px', marginBottom: '16px', fontSize: '12px', color: '#991b1b', lineHeight: 1.5 }}>
                        <strong style={{ color: '#dc2626' }}>⚠️ Override Warning:</strong> Forcing a payout ties your signature to the public defect evidence.
                      </div>
                      
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <button style={btnAction('#dc2626')}>Slash Contractor</button>
                        <button onClick={() => handlePFMSRelease(p.id)} style={btnAction('#0f172a')}>Force Payout</button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* COL 2: Time-Locked */}
          <div style={columnCard}>
            <div style={sectionHeader}>
              <div style={sectionTitle}>
                <Clock style={{ width: '20px', height: '20px', color: '#f59e0b' }} strokeWidth={2.5} />
                Time-Locked Escrows
              </div>
              <div style={countBadge('#fffbeb', '#d97706')}>{timeLockedProjects.length}</div>
            </div>
            
            {timeLockedProjects.length === 0 ? (
              <div style={emptyState}>
                <Inbox style={{ width: '36px', height: '36px', color: '#cbd5e1', marginBottom: '12px' }} strokeWidth={1.5} />
                <p style={{ fontSize: '15px', fontWeight: 600, color: '#64748b', margin: '0 0 4px' }}>No locked escrows</p>
                <p style={{ fontSize: '13px', color: '#94a3b8', margin: 0 }}>Pending AI verification triggers.</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {timeLockedProjects.map(p => {
                  const lm = p.milestones.find(m => m.status === 'TIME_LOCKED');
                  return (
                    <div key={p.id} style={projectCard}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                        <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', margin: 0 }}>{p.name}</h3>
                        <span style={badge('#fffbeb', '#d97706', '#fde68a')}>Locked</span>
                      </div>
                      <p style={{ fontSize: '13px', color: '#475569', margin: '0 0 12px', lineHeight: 1.5, background: '#fafbfc', padding: '10px', borderRadius: '8px', border: '1px solid #f1f5f9' }}>{lm?.title}</p>
                      
                      <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '8px', padding: '12px', marginBottom: '16px' }}>
                        <p style={{ fontSize: '10px', color: '#d97706', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 4px' }}>Unlocks At:</p>
                        <p style={{ fontSize: '13px', color: '#92400e', fontFamily: 'ui-monospace, monospace', fontWeight: 600, margin: 0 }}>
                          {new Date(lm?.timeLockExpiry).toLocaleString()}
                        </p>
                      </div>
                      
                      <button 
                        onClick={() => handlePFMSRelease(p.id)} 
                        style={{ width: '100%', padding: '12px', borderRadius: '12px', border: 'none', background: '#f59e0b', color: '#fff', fontSize: '13px', fontWeight: 700, cursor: 'pointer', transition: 'background 0.2s' }}
                      >
                        Simulate 7-Day Expiry Payout
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* COL 3: Active + Settled */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', minHeight: '500px' }}>
            
            {/* Active Projects */}
            <div style={{ ...columnCard, minHeight: 0, flex: 1 }}>
              <div style={sectionHeader}>
                <div style={sectionTitle}>
                  <ShieldCheck style={{ width: '20px', height: '20px', color: '#2563eb' }} strokeWidth={2.5} />
                  Active Projects
                </div>
                <div style={countBadge('#eff6ff', '#2563eb')}>{activeProjects.length}</div>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {activeProjects.map(p => (
                  <div key={p.id} style={projectCard}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                      <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', paddingRight: '12px' }}>{p.name}</h3>
                      <span style={{ fontSize: '12px', fontWeight: 800, color: '#2563eb', background: '#eff6ff', padding: '2px 8px', borderRadius: '6px', flexShrink: 0 }}>{p.progress}%</span>
                    </div>
                    <div style={{ width: '100%', background: '#f1f5f9', height: '6px', borderRadius: '999px', overflow: 'hidden' }}>
                      <div style={{ width: `${p.progress}%`, height: '100%', borderRadius: '999px', background: 'linear-gradient(90deg, #3b82f6, #6366f1)', transition: 'width 1s' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Settled */}
            <div style={{ ...columnCard, minHeight: 0 }}>
              <div style={sectionHeader}>
                <div style={sectionTitle}>
                  <CheckCircle2 style={{ width: '20px', height: '20px', color: '#059669' }} strokeWidth={2.5} />
                  PFMS Settled
                </div>
              </div>
              
              {settledProjects.length === 0 ? (
                <div style={{ ...emptyState, padding: '20px' }}>
                  <p style={{ fontSize: '13px', color: '#94a3b8', margin: 0 }}>No settlements yet.</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {settledProjects.map(p => (
                    <div key={p.id} style={{ ...projectCard, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px' }}>
                      <h3 style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', paddingRight: '12px' }}>{p.name}</h3>
                      <span style={badge('#ecfdf5', '#059669', '#a7f3d0')}>✓ Settled</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
