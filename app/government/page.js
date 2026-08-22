'use client';

import React, { useState } from 'react';
import { useNirmaan } from '@/lib/NirmaanContext';
import { Building2, AlertTriangle, ShieldCheck, Clock, CheckCircle2, Inbox } from 'lucide-react';

export default function GovernmentPortal() {
  const { projects, settleViaPFMS } = useNirmaan();
  
  const [pfmsAnimation, setPfmsAnimation] = useState({ active: false, projectId: null, step: 0 });

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

  return (
    <div className="min-h-screen bg-[#eaf0f6] text-[#1e293b] font-sans relative overflow-x-hidden">
      
      {/* Background Waves */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-80 fixed">
        <svg viewBox="0 0 1440 800" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute top-1/2 left-0 w-full h-[120%] -translate-y-1/2 object-cover">
          <path d="M-100,600 C200,400 400,300 700,500 C1000,700 1200,500 1500,400" stroke="#b0c4de" strokeWidth="1" opacity="0.6" />
          <path d="M-100,620 C200,420 400,320 700,520 C1000,720 1200,520 1500,420" stroke="#b0c4de" strokeWidth="1" opacity="0.5" />
          <path d="M-100,640 C200,440 400,340 700,540 C1000,740 1200,540 1500,440" stroke="#b0c4de" strokeWidth="1" opacity="0.4" />
          <path d="M-100,300 C300,500 600,600 800,400 C1100,100 1300,300 1500,500" stroke="#94a3b8" strokeWidth="1.5" opacity="0.4" />
          <path d="M-100,320 C300,520 600,620 800,420 C1100,120 1300,320 1500,520" stroke="#94a3b8" strokeWidth="1" opacity="0.3" />
        </svg>
      </div>

      {/* PFMS Twin-Ledger Mock Animation Modal */}
      {pfmsAnimation.active && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0f172a]/40 backdrop-blur-md px-4">
          <div className="bg-white/95 backdrop-blur-xl border border-white p-10 rounded-[2rem] shadow-2xl max-w-lg w-full text-center">
            <h3 className="text-[1.7rem] font-bold text-[#0f172a] mb-8 tracking-tight">Twin-Ledger Settlement</h3>
            <div className="space-y-4 font-mono text-[13px] text-left">
              <div className={`p-4 rounded-xl border transition-all duration-500 ${pfmsAnimation.step >= 1 ? 'border-emerald-200 bg-emerald-50 text-emerald-700 shadow-sm' : 'border-slate-200 bg-slate-50 text-slate-500'}`}>
                {pfmsAnimation.step >= 1 ? '✅ Smart Contract Veto Expired. State: APPROVED' : '⏳ Waiting for blockchain consensus...'}
              </div>
              <div className={`p-4 rounded-xl border transition-all duration-500 ${pfmsAnimation.step >= 2 ? 'border-blue-200 bg-blue-50 text-blue-700 shadow-sm' : 'border-slate-200 bg-slate-50 text-slate-500'}`}>
                {pfmsAnimation.step >= 2 ? '✅ Firing Secure Webhook to RBI/PFMS API Gateway...' : '⏳ Waiting for PFMS webhook...'}
              </div>
              <div className={`p-4 rounded-xl border transition-all duration-500 ${pfmsAnimation.step >= 3 ? 'border-indigo-200 bg-indigo-50 text-indigo-700 shadow-sm' : 'border-slate-200 bg-slate-50 text-slate-500'}`}>
                {pfmsAnimation.step >= 3 ? '✅ NEFT Transfer Initiated. INR settled to Contractor.' : '⏳ Awaiting NEFT generation...'}
              </div>
            </div>
            {pfmsAnimation.step >= 3 && (
              <div className="mt-8 p-5 border border-slate-200 bg-slate-50 rounded-xl text-xs text-slate-500 font-medium">
                <p className="mb-1">Transaction ID: NIRM-{Math.floor(Math.random() * 10000000)}</p>
                <p className="mb-1 text-indigo-600 font-bold">Settlement: ₹400,000.00 INR</p>
                <p>Note: No crypto assets transferred.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Main App Dashboard */}
      <div className="relative z-10 pt-16 px-6 max-w-[1600px] mx-auto pb-24">
        
        {/* Massive Premium App Header Banner */}
        <div className="bg-white/80 backdrop-blur-2xl border border-white rounded-[2rem] p-10 shadow-[0_8px_30px_rgb(0,0,0,0.06)] mb-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="flex h-20 w-20 items-center justify-center rounded-[1.5rem] bg-gradient-to-br from-blue-600 to-indigo-700 shadow-xl shadow-blue-600/20 shrink-0">
              <Building2 className="h-10 w-10 text-white" strokeWidth={2} />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#0f172a] mb-2">
                Government Dashboard
              </h1>
              <p className="text-lg text-[#475569] font-medium max-w-2xl">
                Global oversight of autonomous infrastructure escrow. Manage whistleblower reports and fiat settlements.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
             <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col items-center min-w-[120px]">
               <span className="text-3xl font-black text-blue-600">{projects.length}</span>
               <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">Total Projects</span>
             </div>
             <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col items-center min-w-[120px]">
               <span className="text-3xl font-black text-red-500">{disputedProjects.length}</span>
               <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">Disputes</span>
             </div>
          </div>
        </div>

        {/* 3-Column Kanban Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* COLUMN 1: DISPUTED */}
          <div className="bg-white/60 backdrop-blur-xl border border-white rounded-[2.5rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col min-h-[600px]">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-200/50">
              <h2 className="text-[1.35rem] font-bold text-[#0f172a] flex items-center tracking-tight">
                <AlertTriangle className="w-6 h-6 text-red-500 mr-3" strokeWidth={2.5} />
                Human Audits Required
              </h2>
              <span className="bg-red-100 text-red-700 text-xs px-3 py-1.5 rounded-full font-bold">{disputedProjects.length}</span>
            </div>
            
            <div className="flex-1 flex flex-col gap-5">
              {disputedProjects.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center bg-white/40 border-2 border-dashed border-slate-200 rounded-[1.5rem] p-10 text-center">
                  <div className="h-16 w-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                    <Inbox className="h-8 w-8 text-slate-300" strokeWidth={2} />
                  </div>
                  <p className="text-[#64748b] font-medium text-lg">No active disputes</p>
                  <p className="text-slate-400 text-sm mt-1">All projects are running autonomously.</p>
                </div>
              ) : (
                disputedProjects.map(p => {
                  const disputedMilestone = p.milestones.find(m => m.status === 'DISPUTED');
                  return (
                    <div key={p.id} className="bg-white border border-white rounded-[1.5rem] p-6 shadow-[0_4px_20px_rgb(0,0,0,0.06)] hover:shadow-xl transition-shadow">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="font-bold text-[#0f172a] text-[1.1rem] tracking-tight">{p.name}</h3>
                        <span className="bg-red-50 text-red-600 text-[10px] px-3 py-1 rounded-full font-black uppercase tracking-widest border border-red-100">Frozen</span>
                      </div>
                      <p className="text-[14px] text-[#475569] mb-4 font-medium leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">{disputedMilestone?.title}</p>
                      
                      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-4 text-[11px] font-mono break-all text-slate-500 shadow-inner">
                        <p className="text-red-500 font-bold mb-1 tracking-wider uppercase text-[10px]">Citizen IPFS Evidence:</p>
                        <p>{disputedMilestone?.ipfsCID}</p>
                      </div>

                      <div className="bg-red-50/50 border border-red-100 rounded-xl p-4 text-[12px] text-red-800 mb-6 font-medium leading-relaxed">
                        <strong className="block text-red-600 mb-1">⚠️ Override Warning:</strong> 
                        Forcing a payout ties your cryptographic signature to the public defect evidence.
                      </div>
                      
                      <div className="flex flex-col xl:flex-row gap-3">
                        <button className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-xl text-sm transition-colors shadow-sm">
                          Slash Contractor
                        </button>
                        <button onClick={() => handlePFMSRelease(p.id)} className="flex-1 bg-[#0f172a] hover:bg-slate-800 text-white font-bold py-3 px-4 rounded-xl text-sm transition-colors shadow-sm">
                          Force Payout
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* COLUMN 2: TIME_LOCKED */}
          <div className="bg-white/60 backdrop-blur-xl border border-white rounded-[2.5rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col min-h-[600px]">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-200/50">
              <h2 className="text-[1.35rem] font-bold text-[#0f172a] flex items-center tracking-tight">
                <Clock className="w-6 h-6 text-amber-500 mr-3" strokeWidth={2.5} />
                Time-Locked Escrows
              </h2>
              <span className="bg-amber-100 text-amber-700 text-xs px-3 py-1.5 rounded-full font-bold">{timeLockedProjects.length}</span>
            </div>
            
            <div className="flex-1 flex flex-col gap-5">
              {timeLockedProjects.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center bg-white/40 border-2 border-dashed border-slate-200 rounded-[1.5rem] p-10 text-center">
                  <div className="h-16 w-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                    <Inbox className="h-8 w-8 text-slate-300" strokeWidth={2} />
                  </div>
                  <p className="text-[#64748b] font-medium text-lg">No locked escrows</p>
                  <p className="text-slate-400 text-sm mt-1">Pending AI verification triggers.</p>
                </div>
              ) : (
                timeLockedProjects.map(p => {
                  const lockedMilestone = p.milestones.find(m => m.status === 'TIME_LOCKED');
                  return (
                    <div key={p.id} className="bg-white border border-white rounded-[1.5rem] p-6 shadow-[0_4px_20px_rgb(0,0,0,0.06)] hover:shadow-xl transition-shadow">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="font-bold text-[#0f172a] text-[1.1rem] tracking-tight">{p.name}</h3>
                        <span className="bg-amber-50 text-amber-600 text-[10px] px-3 py-1 rounded-full font-black uppercase tracking-widest border border-amber-100">Locked</span>
                      </div>
                      <p className="text-[14px] text-[#475569] mb-4 font-medium leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">{lockedMilestone?.title}</p>
                      
                      <div className="bg-amber-50/30 border border-amber-100 rounded-xl p-4 mb-6">
                        <p className="text-[10px] text-amber-600 font-bold uppercase tracking-wider mb-1">Unlocks Automatically At:</p>
                        <p className="text-[13px] text-amber-800 font-mono font-bold">
                          {new Date(lockedMilestone?.timeLockExpiry).toLocaleString()}
                        </p>
                      </div>
                      
                      <button onClick={() => handlePFMSRelease(p.id)} className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-3.5 px-4 rounded-xl text-sm transition-all shadow-[0_5px_15px_rgba(245,158,11,0.2)] hover:-translate-y-0.5">
                        Simulate 7-Day Expiry Payout
                      </button>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* COLUMN 3: SETTLED & ACTIVE (Split vertically) */}
          <div className="flex flex-col gap-8 min-h-[600px]">
            
            {/* Active Projects Block */}
            <div className="bg-white/60 backdrop-blur-xl border border-white rounded-[2.5rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col flex-1">
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-200/50">
                <h2 className="text-[1.35rem] font-bold text-[#0f172a] flex items-center tracking-tight">
                  <ShieldCheck className="w-6 h-6 text-blue-500 mr-3" strokeWidth={2.5} />
                  Active Projects
                </h2>
                <span className="bg-blue-100 text-blue-700 text-xs px-3 py-1.5 rounded-full font-bold">{activeProjects.length}</span>
              </div>
              
              <div className="flex-1 flex flex-col gap-4 overflow-y-auto pr-2">
                {activeProjects.map(p => (
                  <div key={p.id} className="bg-white border border-slate-100 rounded-[1.2rem] p-5 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex justify-between mb-3 items-center">
                      <h3 className="font-bold text-[#0f172a] text-[15px] tracking-tight truncate pr-4">{p.name}</h3>
                      <span className="text-[12px] font-black text-blue-600 bg-blue-50 px-2 py-1 rounded-md">{p.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden shadow-inner">
                      <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full rounded-full transition-all duration-1000" style={{ width: `${p.progress}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* PFMS Settled Block */}
            <div className="bg-white/60 backdrop-blur-xl border border-white rounded-[2.5rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col h-[280px]">
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-200/50">
                <h2 className="text-[1.35rem] font-bold text-[#0f172a] flex items-center tracking-tight">
                  <CheckCircle2 className="w-6 h-6 text-emerald-500 mr-3" strokeWidth={2.5} />
                  PFMS Settled
                </h2>
              </div>
              
              <div className="flex-1 flex flex-col gap-3 overflow-y-auto pr-2">
                {settledProjects.length === 0 ? (
                  <div className="flex-1 flex flex-col items-center justify-center bg-white/40 border-2 border-dashed border-slate-200 rounded-[1.5rem] text-center p-4">
                    <p className="text-[#64748b] font-medium text-sm">No settlements yet.</p>
                  </div>
                ) : (
                  settledProjects.map(p => (
                    <div key={p.id} className="bg-white border border-emerald-100 rounded-xl p-4 shadow-sm flex items-center justify-between">
                      <h3 className="font-bold text-[#0f172a] text-[13px] tracking-tight truncate pr-2">{p.name}</h3>
                      <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full border border-emerald-100 shrink-0">✓ Settled</span>
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
