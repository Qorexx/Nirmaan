'use client';

import React, { useState } from 'react';
import { useNirmaan } from '@/lib/NirmaanContext';
import GlassNavbar from '@/components/GlassNavbar';
import VerificationPipeline from '@/components/VerificationPipeline';

export default function ContractorPortal() {
  const { projects, processContractorSubmission } = useNirmaan();
  
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedMilestone, setSelectedMilestone] = useState('');
  
  // Data Upload States
  const [proofFile, setProofFile] = useState(null); // Image/Video
  const [exifData, setExifData] = useState(''); // Hardware Telemetry
  const [iotData, setIotData] = useState(''); // Heavy Machinery / JCB
  const [eWayBill, setEWayBill] = useState(''); // Supply Chain Hash
  
  // UI States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPipeline, setShowPipeline] = useState(false);
  const [verificationResult, setVerificationResult] = useState(null);
  const [pipelineLogs, setPipelineLogs] = useState([]);

  // Helper to handle image file to base64
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProofFile(event.target.result); // Base64 string
      };
      reader.readAsDataURL(file);
    }
  };

  // Pre-fill valid or invalid data for the demo script
  const autofillFraud = () => {
    setExifData(JSON.stringify({ device: "Unknown", gps: [0,0], signature: "INVALID" }, null, 2));
    setIotData(JSON.stringify({ jcbEngineHours: 12, cementWeighedTons: 200 }, null, 2));
    setEWayBill('');
  };

  const autofillHonest = () => {
    setExifData(JSON.stringify({ device: "Nirmaan Secure Drone SDK", gps: [28.5355, 77.3910], signature: "0x88f...1c", temporalHash: "0x99a...2b" }, null, 2));
    setIotData(JSON.stringify({ jcbEngineHours: 35, cementWeighedTons: 520 }, null, 2));
    setEWayBill('0x7a3f9108c909e4d1b827e85c2901c89012a4b8cd'); // Valid length hash
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedProject || !selectedMilestone || !proofFile) return alert("Missing required visual proof.");
    
    setPipelineLogs([]);
    setIsSubmitting(true);
    setShowPipeline(true); // Trigger the Step 4 UI
    
    // In a real scenario, the pipeline component handles the visuals while this runs
    const result = await processContractorSubmission(
      selectedProject,
      parseInt(selectedMilestone),
      proofFile,
      iotData,
      eWayBill,
      exifData,
      (log) => { 
        setPipelineLogs(prev => [...prev, log]);
      }
    );
    
    setVerificationResult(result);
    setIsSubmitting(false);
  };

  const currentProject = projects.find(p => p.id === selectedProject);

  if (showPipeline) {
    return (
      <div className="min-h-screen bg-slate-900 text-white">
        <GlassNavbar />
        <div className="pt-24 px-6 max-w-5xl mx-auto pb-12">
          <VerificationPipeline logs={pipelineLogs} isComplete={!isSubmitting} result={verificationResult} />
          
          {!isSubmitting && (
            <div className="mt-8 text-center">
              <button onClick={() => { setShowPipeline(false); setVerificationResult(null); setPipelineLogs([]); }} className="px-6 py-3 bg-slate-800 hover:bg-slate-700 rounded-lg font-semibold transition border border-slate-600">
                Return to Contractor Portal
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <GlassNavbar />
      
      <div className="pt-24 px-6 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400 mb-2">
          Nirmaan Secure SDK
        </h1>
        <p className="text-slate-400 mb-8">Contractor Data Capture Portal. Upload comprehensive milestone proof.</p>

        <form onSubmit={handleSubmit} className="space-y-6 bg-slate-800/40 p-8 rounded-2xl border border-slate-700/50 backdrop-blur-md shadow-xl">
          
          {/* Project & Milestone Selection */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Select Project</label>
              <select 
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:border-blue-500"
                value={selectedProject}
                onChange={e => setSelectedProject(e.target.value)}
                required
              >
                <option value="">-- Choose Project --</option>
                {projects.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Select Milestone</label>
              <select 
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:border-blue-500 disabled:opacity-50"
                value={selectedMilestone}
                onChange={e => setSelectedMilestone(e.target.value)}
                disabled={!selectedProject}
                required
              >
                <option value="">-- Choose Milestone --</option>
                {currentProject?.milestones.filter(m => m.status === 'PENDING').map(m => (
                  <option key={m.id} value={m.id}>{m.title} (Payout: ₹{m.payout.toLocaleString()})</option>
                ))}
              </select>
            </div>
          </div>

          <div className="border-t border-slate-700/50 pt-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-white">Cryptographic Data Inputs</h3>
              <div className="space-x-2">
                <button type="button" onClick={autofillFraud} className="text-xs bg-red-900/50 text-red-300 px-3 py-1 rounded border border-red-800 hover:bg-red-800/50 transition">Demo: Load Fraud Data</button>
                <button type="button" onClick={autofillHonest} className="text-xs bg-emerald-900/50 text-emerald-300 px-3 py-1 rounded border border-emerald-800 hover:bg-emerald-800/50 transition">Demo: Load Honest Data</button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 1. Visual Proof */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-300">1. Temporal/Spatial Video (or Image)</label>
                <input 
                  type="file" 
                  accept="image/*,video/*"
                  onChange={handleFileChange}
                  className="w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                  required
                />
                <p className="text-xs text-slate-500">Must pass GAN Pre-processing.</p>
              </div>

              {/* 2. Supply Chain Hash */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-300">2. Financial: e-Way Bill Hash</label>
                <input 
                  type="text" 
                  value={eWayBill}
                  onChange={e => setEWayBill(e.target.value)}
                  placeholder="e.g., 0x7a3f..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-slate-200 focus:outline-none focus:border-blue-500 font-mono text-sm"
                />
                <p className="text-xs text-slate-500">Tax API Supply Chain Verification.</p>
              </div>

              {/* 3. Hardware Telemetry */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-300">3. Hardware-Signed EXIF/GPS</label>
                <textarea 
                  value={exifData}
                  onChange={e => setExifData(e.target.value)}
                  placeholder='{"device": "Nirmaan SDK", "gps": [...] }'
                  className="w-full h-24 bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-slate-200 focus:outline-none focus:border-blue-500 font-mono text-xs"
                />
              </div>

              {/* 4. Heavy Machinery Telemetry */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-300">4. IoT Telemetry (JCB / Weighbridge)</label>
                <textarea 
                  value={iotData}
                  onChange={e => setIotData(e.target.value)}
                  placeholder='{"jcbEngineHours": 35, "cementWeighedTons": 520}'
                  className="w-full h-24 bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-slate-200 focus:outline-none focus:border-blue-500 font-mono text-xs"
                />
              </div>
            </div>
          </div>

          <div className="pt-4">
            <button 
              type="submit" 
              className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold py-4 rounded-xl shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all"
            >
              Submit Proof via x402 Protocol
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
