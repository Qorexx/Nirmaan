'use client';

import React, { useState } from 'react';
import { useNirmaan } from '@/lib/NirmaanContext';

export default function GovernmentPortal() {
  const { projects, settleViaPFMS } = useNirmaan();
  
  const [pfmsAnimation, setPfmsAnimation] = useState({ active: false, projectId: null, step: 0 });

  const activeProjects = projects.filter(p => p.status === 'ACTIVE');
  const timeLockedProjects = projects.filter(p => p.status === 'TIME_LOCKED');
  const disputedProjects = projects.filter(p => p.status === 'DISPUTED');
  const settledProjects = projects.filter(p => p.status === 'PFMS_SETTLED');

  const handlePFMSRelease = async (projectId) => {
    setPfmsAnimation({ active: true, projectId, step: 1 }); // 1: Blockchain state change
    await new Promise(r => setTimeout(r, 1500));
    
    setPfmsAnimation({ active: true, projectId, step: 2 }); // 2: PFMS Webhook
    await new Promise(r => setTimeout(r, 1500));
    
    setPfmsAnimation({ active: true, projectId, step: 3 }); // 3: NEFT Receipt
    await new Promise(r => setTimeout(r, 2000));
    
    settleViaPFMS(projectId);
    setPfmsAnimation({ active: false, projectId: null, step: 0 });
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      
      <div className="pt-24 px-6 max-w-7xl mx-auto pb-12">
        <header className="mb-10">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-400 mb-2">
            Government Overseer Dashboard
          </h1>
          <p className="text-slate-400">Monitor autonomous escrow contracts, handle whistleblower disputes, and manage Twin-Ledger fiat payouts.</p>
        </header>

        {/* PFMS Twin-Ledger Mock Animation Modal */}
        {pfmsAnimation.active && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/90 backdrop-blur-sm px-4">
            <div className="bg-slate-800 border border-slate-700 p-8 rounded-2xl shadow-2xl max-w-lg w-full text-center">
              <h3 className="text-2xl font-bold text-white mb-6">Twin-Ledger Settlement</h3>
              
              <div className="space-y-4 font-mono text-sm text-left">
                <div className={`p-3 rounded border transition-all ${pfmsAnimation.step >= 1 ? 'border-emerald-500/50 bg-emerald-900/20 text-emerald-300' : 'border-slate-700 text-slate-500'}`}>
                  {pfmsAnimation.step >= 1 ? '✅ Smart Contract Veto Expired. State: APPROVED' : '⏳ Waiting for blockchain consensus...'}
                </div>
                
                <div className={`p-3 rounded border transition-all ${pfmsAnimation.step >= 2 ? 'border-blue-500/50 bg-blue-900/20 text-blue-300' : 'border-slate-700 text-slate-500'}`}>
                  {pfmsAnimation.step >= 2 ? '✅ Firing Secure Webhook to RBI/PFMS API Gateway...' : '⏳ Waiting for PFMS webhook...'}
                </div>
                
                <div className={`p-3 rounded border transition-all ${pfmsAnimation.step >= 3 ? 'border-amber-500/50 bg-amber-900/20 text-amber-300' : 'border-slate-700 text-slate-500'}`}>
                  {pfmsAnimation.step >= 3 ? '✅ NEFT Transfer Initiated. INR settled to Contractor Bank A/C.' : '⏳ Awaiting NEFT generation...'}
                </div>
              </div>

              {pfmsAnimation.step >= 3 && (
                <div className="mt-6 p-4 border border-slate-600 bg-slate-900 rounded-lg text-xs text-slate-400">
                  <p>Transaction ID: NIRM-{Math.floor(Math.random() * 10000000)}</p>
                  <p>Settlement: ₹400,000.00 INR</p>
                  <p>Note: No crypto assets transferred.</p>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* COLUMN 1: DISPUTED (High Priority) */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-red-400 flex items-center border-b border-slate-700 pb-2">
              <span className="w-3 h-3 rounded-full bg-red-500 animate-pulse mr-2"></span>
              Human Audits Required
            </h2>
            {disputedProjects.length === 0 ? (
              <p className="text-slate-500 text-sm">No active whistleblower disputes.</p>
            ) : (
              disputedProjects.map(p => {
                const disputedMilestone = p.milestones.find(m => m.status === 'DISPUTED');
                return (
                  <div key={p.id} className="bg-red-950/20 border border-red-900/50 rounded-xl p-5 shadow-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-white text-lg">{p.name}</h3>
                      <span className="bg-red-900/50 text-red-300 text-xs px-2 py-1 rounded font-bold">FROZEN</span>
                    </div>
                    <p className="text-sm text-slate-300 mb-4">{disputedMilestone?.title}</p>
                    
                    <div className="bg-black/40 border border-red-900/30 rounded-lg p-3 mb-4 text-xs font-mono break-all">
                      <p className="text-red-400 font-bold mb-1">CITIZEN EVIDENCE (IPFS):</p>
                      <p className="text-slate-400">{disputedMilestone?.ipfsCID}</p>
                    </div>

                    <div className="bg-amber-900/20 border border-amber-900/50 rounded-lg p-3 text-xs text-amber-200 mb-4">
                      <strong>⚠️ Cryptographic Career Suicide Warning:</strong> If you override this dispute and force a payout, your cryptographic signature will be permanently tied to the public IPFS evidence above.
                    </div>
                    
                    <div className="flex space-x-2">
                      <button className="flex-1 bg-red-600 hover:bg-red-500 text-white font-bold py-2 rounded-lg text-sm transition">
                        Slash Contractor
                      </button>
                      <button onClick={() => handlePFMSRelease(p.id)} className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-bold py-2 rounded-lg text-sm transition">
                        Force Payout
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* COLUMN 2: TIME_LOCKED (Waiting) */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-amber-400 flex items-center border-b border-slate-700 pb-2">
              <span className="w-3 h-3 rounded-full bg-amber-500 mr-2"></span>
              Time-Locked Escrows
            </h2>
            {timeLockedProjects.length === 0 ? (
              <p className="text-slate-500 text-sm">No funds currently locked.</p>
            ) : (
              timeLockedProjects.map(p => {
                const lockedMilestone = p.milestones.find(m => m.status === 'TIME_LOCKED');
                return (
                  <div key={p.id} className="bg-slate-800/50 border border-slate-700 rounded-xl p-5 shadow-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-white text-lg">{p.name}</h3>
                      <span className="bg-amber-900/50 text-amber-300 text-xs px-2 py-1 rounded font-bold">LOCKED</span>
                    </div>
                    <p className="text-sm text-slate-300 mb-2">{lockedMilestone?.title}</p>
                    <p className="text-xs text-slate-400 mb-4 font-mono">
                      Unlocks: {new Date(lockedMilestone?.timeLockExpiry).toLocaleString()}
                    </p>
                    
                    <button onClick={() => handlePFMSRelease(p.id)} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 rounded-lg text-sm transition">
                      Simulate 7-Day Expiry Payout
                    </button>
                  </div>
                );
              })
            )}
          </div>

          {/* COLUMN 3: ACTIVE & SETTLED */}
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-emerald-400 flex items-center border-b border-slate-700 pb-2 mb-4">
                PFMS Settled
              </h2>
              <div className="space-y-3">
                {settledProjects.length === 0 ? (
                  <p className="text-slate-500 text-sm">No settlements yet.</p>
                ) : (
                  settledProjects.map(p => (
                    <div key={p.id} className="bg-emerald-950/20 border border-emerald-900/50 rounded-xl p-4">
                      <h3 className="font-bold text-white">{p.name}</h3>
                      <p className="text-xs text-emerald-400 mt-1">✓ Funds transferred via NEFT</p>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-blue-400 flex items-center border-b border-slate-700 pb-2 mb-4">
                Active Projects
              </h2>
              <div className="space-y-3">
                {activeProjects.map(p => (
                  <div key={p.id} className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-4">
                    <h3 className="font-bold text-white">{p.name}</h3>
                    <div className="w-full bg-slate-900 h-2 rounded-full mt-2 overflow-hidden">
                      <div className="bg-blue-500 h-full" style={{ width: `${p.progress}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
