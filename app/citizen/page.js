'use client';

import React, { useState } from 'react';
import { useNirmaan } from '@/lib/NirmaanContext';

export default function CitizenPortal() {
  const { projects, stakeCitizenDispute } = useNirmaan();
  
  const [selectedProject, setSelectedProject] = useState('');
  const [photo, setPhoto] = useState(null);
  const [step, setStep] = useState(1); // 1: Scan, 2: Upload, 3: UPI Stake, 4: Success
  const [ipfsHash, setIpfsHash] = useState('');

  // Find projects that are currently TIME_LOCKED (vulnerable to disputes)
  const timeLockedProjects = projects.filter(p => p.status === 'TIME_LOCKED');

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => setPhoto(event.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleScanQR = () => {
    if (!selectedProject) return alert("Select a project first (Simulating QR scan)");
    setStep(2);
  };

  const handleSubmitEvidence = () => {
    if (!photo) return alert("Please upload evidence of the defect.");
    setStep(3); // Move to UPI staking
  };

  const handleUPIPayment = async () => {
    // Simulate UPI delay
    setStep('processing');
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Execute state change
    const cid = stakeCitizenDispute(selectedProject, photo);
    setIpfsHash(cid);
    setStep(4);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center">
      
      {/* Mobile Phone Mockup Container */}
      <div className="pt-24 px-4 w-full max-w-md mx-auto">
        <div className="bg-slate-800/80 border border-slate-700 rounded-[2.5rem] shadow-2xl overflow-hidden min-h-[700px] flex flex-col relative">
          
          {/* Mock Phone Header */}
          <div className="bg-slate-900 px-6 py-4 border-b border-slate-700 flex justify-between items-center">
            <span className="font-bold text-lg tracking-tight text-white">Nirmaan <span className="text-blue-400">Citizen</span></span>
            <div className="flex space-x-2">
              <div className="w-4 h-4 rounded-full bg-slate-700"></div>
              <div className="w-4 h-4 rounded-full bg-slate-700"></div>
            </div>
          </div>

          <div className="p-6 flex-1 flex flex-col">
            {step === 1 && (
              <div className="flex-1 flex flex-col justify-center animate-fade-in">
                <div className="text-center mb-8">
                  <div className="w-32 h-32 mx-auto bg-slate-700 rounded-2xl flex items-center justify-center border-4 border-dashed border-slate-500 mb-6">
                    <span className="text-4xl">📱</span>
                  </div>
                  <h2 className="text-2xl font-bold mb-2">Scan Site QR</h2>
                  <p className="text-slate-400 text-sm">Scan the Nirmaan board at the construction site to view project status or report fraud.</p>
                </div>
                
                <div className="mb-6">
                  <select 
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 focus:outline-none"
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
                
                <button onClick={handleScanQR} disabled={!selectedProject} className="w-full bg-blue-600 disabled:opacity-50 hover:bg-blue-500 text-white font-bold py-4 rounded-xl transition">
                  Proceed
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="flex-1 flex flex-col animate-fade-in">
                <h2 className="text-xl font-bold mb-1">Report Discrepancy</h2>
                <p className="text-slate-400 text-sm mb-6">Project: {projects.find(p => p.id === selectedProject)?.name}</p>
                
                <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 mb-6">
                  <p className="text-amber-400 text-xs font-bold uppercase mb-2">System Status</p>
                  <p className="text-sm">The AI claims this milestone is 100% complete and flawless. Funds are currently in a 7-Day Optimistic Time-Lock.</p>
                </div>

                <div className="flex-1 flex flex-col justify-center">
                  <label className="block text-center border-2 border-dashed border-slate-600 rounded-xl p-8 cursor-pointer hover:bg-slate-700/30 transition">
                    <span className="text-4xl mb-4 block">📸</span>
                    <span className="block text-sm font-medium text-slate-300">Upload Geotagged Evidence</span>
                    <span className="block text-xs text-slate-500 mt-2">Take a photo of the defect (crack, pothole, missing material).</span>
                    <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                  </label>
                  
                  {photo && <div className="mt-4 text-center text-emerald-400 text-sm font-bold">✓ Evidence Attached</div>}
                </div>

                <button onClick={handleSubmitEvidence} className="w-full bg-amber-600 hover:bg-amber-500 text-white font-bold py-4 rounded-xl mt-6 transition shadow-lg shadow-amber-900/50">
                  Submit Evidence
                </button>
              </div>
            )}

            {step === 3 && (
              <div className="flex-1 flex flex-col justify-center text-center animate-fade-in">
                <div className="text-5xl mb-6">🔒</div>
                <h2 className="text-2xl font-bold mb-4">Anti-Spam Staking</h2>
                <p className="text-slate-300 text-sm mb-8">
                  To freeze the smart contract and initiate a human audit, you must stake <span className="font-bold text-white">₹500</span>. 
                  If your report is valid, you get this back + a Whistleblower Bounty. If it's spam, it is burned.
                </p>
                
                <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 mb-8 text-left">
                  <div className="flex justify-between mb-2">
                    <span className="text-slate-400">Stake Amount:</span>
                    <span className="text-white font-bold">₹500.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Payment Method:</span>
                    <span className="text-blue-400 font-bold">UPI</span>
                  </div>
                </div>

                <button onClick={handleUPIPayment} className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 rounded-xl transition shadow-lg shadow-emerald-900/50">
                  Pay ₹500 via UPI
                </button>
                <button onClick={() => setStep(2)} className="w-full text-slate-400 mt-4 text-sm hover:text-white">Cancel</button>
              </div>
            )}

            {step === 'processing' && (
              <div className="flex-1 flex flex-col items-center justify-center">
                <svg className="animate-spin h-10 w-10 text-blue-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p className="text-slate-300 font-bold animate-pulse">Processing UPI & Committing to IPFS...</p>
              </div>
            )}

            {step === 4 && (
              <div className="flex-1 flex flex-col justify-center text-center animate-fade-in">
                <div className="w-20 h-20 bg-emerald-900/50 border border-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl text-emerald-400">✓</span>
                </div>
                <h2 className="text-2xl font-bold mb-2 text-emerald-400">Time-Lock Frozen</h2>
                <p className="text-slate-300 text-sm mb-6">
                  The contractor's payout has been halted. A human tribunal has been summoned.
                </p>
                
                <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 text-left">
                  <p className="text-xs text-slate-400 mb-1">Your Immutable Evidence CID:</p>
                  <p className="text-xs font-mono text-blue-400 break-all">{ipfsHash}</p>
                </div>
                
                <p className="text-xs text-slate-500 mt-6 mt-auto">
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
