'use client';

import React, { useState } from 'react';
import { useNirmaan } from '@/lib/NirmaanContext';

export default function CitizenPortal() {
  const { projects, disputeMilestone } = useNirmaan();
  
  const [step, setStep] = useState(1);
  const [selectedProject, setSelectedProject] = useState('');
  const [photo, setPhoto] = useState(null);
  const [ipfsHash, setIpfsHash] = useState('');
  
  const timeLockedProjects = projects.filter(p => p.status === 'TIME_LOCKED');

  const handleScanQR = () => {
    if (!selectedProject) return;
    setStep(2);
  };

  const handlePhotoUpload = (e) => {
    if (e.target.files[0]) {
      setPhoto(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmitEvidence = () => {
    if (!photo) return alert("Please upload photographic evidence of the defect.");
    setStep(3);
  };

  const handleUPIPayment = async () => {
    setStep('processing');
    await new Promise(r => setTimeout(r, 2000)); 
    const cid = await disputeMilestone(selectedProject);
    setIpfsHash(cid);
    setStep(4);
  };

  return (
    <div className="min-h-screen bg-[#eaf0f6] text-[#1e293b] font-sans relative overflow-hidden flex flex-col items-center">
      
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
      
      {/* Mobile Phone Mockup Container */}
      <div className="relative z-10 pt-20 px-4 w-full max-w-md mx-auto pb-20">
        <div className="bg-white/95 backdrop-blur-xl border-4 border-slate-100 rounded-[3rem] shadow-[0_30px_60px_rgba(0,0,0,0.15)] overflow-hidden min-h-[720px] flex flex-col relative ring-1 ring-slate-200">
          
          {/* Mock Phone Header */}
          <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex justify-between items-center shadow-sm">
            <span className="font-bold text-lg tracking-tight text-[#0f172a]">Nirmaan <span className="text-emerald-600">Citizen</span></span>
            <div className="flex space-x-2">
              <div className="w-4 h-4 rounded-full bg-slate-300"></div>
              <div className="w-4 h-4 rounded-full bg-slate-300"></div>
            </div>
          </div>

          <div className="p-8 flex-1 flex flex-col">
            {step === 1 && (
              <div className="flex-1 flex flex-col justify-center animate-fade-in">
                <div className="text-center mb-10">
                  <div className="w-32 h-32 mx-auto bg-slate-50 rounded-2xl flex items-center justify-center border-2 border-dashed border-slate-300 mb-6 shadow-inner">
                    <span className="text-5xl">📱</span>
                  </div>
                  <h2 className="text-3xl font-extrabold mb-3 text-[#0f172a] tracking-tight">Scan Site QR</h2>
                  <p className="text-[#64748b] text-[15px] font-medium leading-relaxed px-2">Scan the Nirmaan board at the construction site to view project status or report fraud.</p>
                </div>
                
                <div className="mb-8">
                  <select 
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 text-[#0f172a] font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/50 shadow-inner appearance-none"
                    value={selectedProject}
                    onChange={e => setSelectedProject(e.target.value)}
                  >
                    <option value="">-- Simulate QR Scan --</option>
                    {timeLockedProjects.length > 0 ? (
                      timeLockedProjects.map(p => <option key={p.id} value={p.id}>{p.name} (Time-Locked)</option>)
                    ) : (
                      <option disabled>No Time-Locked projects available to dispute.</option>
                    )}
                  </select>
                </div>
                
                <button onClick={handleScanQR} disabled={!selectedProject} className="w-full bg-blue-600 disabled:opacity-50 hover:bg-blue-700 text-white font-bold text-lg py-4 rounded-xl transition-all shadow-[0_10px_20px_rgba(37,99,235,0.2)] hover:-translate-y-1">
                  Proceed
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="flex-1 flex flex-col animate-fade-in">
                <h2 className="text-2xl font-bold mb-2 text-[#0f172a] tracking-tight">Report Discrepancy</h2>
                <p className="text-[#475569] font-medium text-sm mb-8">Project: {projects.find(p => p.id === selectedProject)?.name}</p>
                
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-8 shadow-sm">
                  <p className="text-amber-600 text-[11px] font-bold uppercase tracking-widest mb-2">System Status</p>
                  <p className="text-[13px] text-amber-800 font-medium leading-relaxed">The AI claims this milestone is 100% complete and flawless. Funds are currently in a 7-Day Optimistic Time-Lock.</p>
                </div>

                <div className="flex-1 flex flex-col justify-center">
                  <label className="block text-center border-2 border-dashed border-slate-300 rounded-2xl p-8 cursor-pointer hover:bg-slate-50 transition-colors">
                    <span className="text-5xl mb-4 block">📸</span>
                    <span className="block text-[15px] font-bold text-[#0f172a]">Upload Geotagged Evidence</span>
                    <span className="block text-[13px] text-[#64748b] font-medium mt-3 leading-relaxed">Take a photo of the defect (crack, pothole, missing material).</span>
                    <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                  </label>
                  
                  {photo && <div className="mt-6 text-center text-emerald-600 text-[15px] font-bold bg-emerald-50 py-3 rounded-xl border border-emerald-200">✓ Evidence Attached</div>}
                </div>

                <button onClick={handleSubmitEvidence} className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold text-lg py-4 rounded-xl mt-8 transition-all shadow-[0_10px_20px_rgba(245,158,11,0.2)] hover:-translate-y-1">
                  Submit Evidence
                </button>
              </div>
            )}

            {step === 3 && (
              <div className="flex-1 flex flex-col justify-center text-center animate-fade-in">
                <div className="text-6xl mb-8">🔒</div>
                <h2 className="text-2xl font-bold mb-4 text-[#0f172a] tracking-tight">Anti-Spam Staking</h2>
                <p className="text-[#475569] text-[15px] font-medium leading-relaxed mb-10">
                  To freeze the smart contract and initiate a human audit, you must stake <span className="font-bold text-[#0f172a]">₹500</span>. 
                  If your report is valid, you get this back + a Whistleblower Bounty. If it's spam, it is burned.
                </p>
                
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 mb-10 text-left shadow-sm">
                  <div className="flex justify-between mb-4 border-b border-slate-200 pb-4">
                    <span className="text-[#64748b] font-medium">Stake Amount:</span>
                    <span className="text-[#0f172a] font-bold text-lg">₹500.00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#64748b] font-medium">Payment Method:</span>
                    <span className="text-emerald-600 font-bold bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200">UPI</span>
                  </div>
                </div>

                <button onClick={handleUPIPayment} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-lg py-4 rounded-xl transition-all shadow-[0_10px_20px_rgba(5,150,105,0.2)] hover:-translate-y-1">
                  Pay ₹500 via UPI
                </button>
                <button onClick={() => setStep(2)} className="w-full text-[#64748b] mt-5 text-[15px] font-bold hover:text-[#0f172a] transition-colors">Cancel</button>
              </div>
            )}

            {step === 'processing' && (
              <div className="flex-1 flex flex-col items-center justify-center">
                <svg className="animate-spin h-12 w-12 text-blue-600 mb-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p className="text-[#0f172a] font-bold text-lg animate-pulse tracking-tight">Processing UPI & Committing to IPFS...</p>
              </div>
            )}

            {step === 4 && (
              <div className="flex-1 flex flex-col justify-center text-center animate-fade-in">
                <div className="w-24 h-24 bg-emerald-50 border-2 border-emerald-400 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                  <span className="text-5xl text-emerald-500">✓</span>
                </div>
                <h2 className="text-2xl font-bold mb-3 text-[#0f172a] tracking-tight">Time-Lock Frozen</h2>
                <p className="text-[#475569] text-[15px] font-medium leading-relaxed mb-8">
                  The contractor's payout has been halted. A human tribunal has been summoned.
                </p>
                
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-left shadow-sm">
                  <p className="text-[12px] font-bold uppercase tracking-wider text-[#64748b] mb-2">Your Immutable Evidence CID:</p>
                  <p className="text-[13px] font-mono text-blue-600 font-bold break-all">{ipfsHash}</p>
                </div>
                
                <p className="text-[13px] font-bold text-emerald-600 mt-8 mt-auto bg-emerald-50 py-3 rounded-xl border border-emerald-200">
                  Your identity remains cryptographically shielded.
                </p>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
