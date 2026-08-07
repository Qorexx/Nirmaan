import React, { useState } from 'react';
import { useEscrowStore } from '../store/useEscrowStore';
import { HorizontalStagePipeline } from '../components/workflow/HorizontalStagePipeline';
import { 
  Cpu, 
  Activity, 
  Terminal, 
  Database, 
  Play, 
  ShieldCheck, 
  CheckCircle2, 
  Zap, 
  Globe2, 
  FileCode, 
  Lock, 
  Hash, 
  Layers 
} from 'lucide-react';

export const ArchitectureShowcasePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'architecture' | 'workflow' | 'api' | 'explorer'>('workflow');
  const { runLiveSimulation, isSimulating, logs, stages, totalProtectedValue, aiAccuracyRate } = useEscrowStore();

  const mockApiLogs = [
    {
      id: 'REQ-101',
      method: 'POST',
      endpoint: '/api/v1/ai/verify-evidence',
      status: '402 Payment Required',
      time: '8ms',
      payload: '{"project_id": "PRJ-801", "scan_count": 12, "gps": [13.1938, 77.6321]}',
      response: '{"error": "L402 Invoice Unsettled", "invoice": "lnbc500u1p3x2...", "amount_usdc": "$0.05"}'
    },
    {
      id: 'REQ-102',
      method: 'POST',
      endpoint: '/api/v1/payment/x402-settle',
      status: '200 OK',
      time: '84ms',
      payload: '{"invoice": "lnbc500u1p3x2...", "wallet": "m2m-autonomous-escrow-0x9a"}',
      response: '{"status": "SETTLED", "preimage": "e4b8a1c97f2d01932...", "gas_used_usdc": 0.05}'
    },
    {
      id: 'REQ-103',
      method: 'POST',
      endpoint: '/api/v1/ai/verify-evidence',
      status: '200 OK',
      time: '1240ms',
      headers: 'Authorization: L402 0x7ab982d... preimage_proof',
      payload: '{"project_id": "PRJ-801", "scan_count": 12}',
      response: '{"confidence_score": 97.2, "material": "Grade-A Bitumen", "verdict": "VERIFIED_PASS"}'
    },
    {
      id: 'REQ-104',
      method: 'POST',
      endpoint: '/api/v1/settlement/unlock-vault',
      status: '200 OK',
      time: '412ms',
      payload: '{"vault_id": "V-NH44-IV", "ai_signature": "SIG_AI_97.2_PASS"}',
      response: '{"tx_hash": "0x7ab982d1c8f4e0...a91b", "block_number": 1948291, "state": "UNLOCKED"}'
    }
  ];

  const mockBlocks = [
    { height: 1948291, txHash: '0x7ab982d1c8f4e0c4a91b2e8d3f1a6c4e', status: 'CONFIRMED (12 dpt)', gas: '$0.05 USDC', time: 'Just now', vault: 'NH-44 Resurfacing Vault' },
    { height: 1948290, txHash: '0x3f1a6c4ea91b2e8d7ab982d1c8f4e0c4', status: 'CONFIRMED (64 dpt)', gas: '$0.05 USDC', time: '14 mins ago', vault: 'SunGrid Phase II Solar' },
    { height: 1948289, txHash: '0x8f2c7a91b4e0d3f2c5a718b2c4d8e9f1', status: 'CONFIRMED (128 dpt)', gas: '$0.05 USDC', time: '2 hours ago', vault: 'Hooghly Bridge Reinforcement' },
  ];

  return (
    <div className="min-h-screen py-10 px-4 sm:px-8 bg-surface text-slate-100">
      <div className="max-w-[1700px] mx-auto space-y-8">
        
        {/* Top Title Bar */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-subtle">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-xs font-bold uppercase tracking-wider">
              <Cpu className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '15s' }} />
              <span>Interactive Enterprise Architecture Portal</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-primary tracking-tight">
              AI Escrow Operating System Architecture
            </h1>
            <p className="text-sm sm:text-base text-primary font-mono max-w-4xl">
              Experience the 6-Stage Autonomous Infrastructure workflow in interactive simulation mode. Explore real-time API telemetries, x402 micropayments, and immutable on-chain settlements.
            </p>
          </div>

          {/* Action Trigger */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => runLiveSimulation()}
              disabled={isSimulating}
              className="px-6 py-4 rounded-2xl font-extrabold text-base bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 text-obsidian shadow-[0_0_30px_rgba(6,182,212,0.4)] hover:shadow-[0_0_45px_rgba(6,182,212,0.7)] hover:scale-105 active:scale-95 transition-all flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              <Play className="w-5 h-5 fill-current text-obsidian" />
              <span>{isSimulating ? 'SIMULATION RUNNING...' : '▶ RUN AUTONOMOUS DEMO'}</span>
            </button>
          </div>
        </div>

        {/* 4-TAB INTERACTIVE SWITCHER (Enterprise Showcase Polish) */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto no-scrollbar py-2">
          <div className="bg-surface-secondary p-2 rounded-2xl border border-subtle flex gap-2 shadow-2xl">
            
            <button
              onClick={() => setActiveTab('architecture')}
              className={`flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-mono text-sm sm:text-base font-extrabold transition-all whitespace-nowrap ${
                activeTab === 'architecture'
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-cyan-500/25 scale-[1.02]'
                  : 'text-secondary hover:text-primary hover:bg-surface-secondary'
              }`}
            >
              <Layers className="w-5 h-5 text-cyan-400" />
              <span>◉ Architecture</span>
            </button>

            <button
              onClick={() => setActiveTab('workflow')}
              className={`flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-mono text-sm sm:text-base font-extrabold transition-all whitespace-nowrap ${
                activeTab === 'workflow'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-500/25 scale-[1.02]'
                  : 'text-secondary hover:text-primary hover:bg-surface-secondary'
              }`}
            >
              <Activity className="w-5 h-5 text-emerald-400 animate-pulse" />
              <span>○ Live Workflow (Demo)</span>
            </button>

            <button
              onClick={() => setActiveTab('api')}
              className={`flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-mono text-sm sm:text-base font-extrabold transition-all whitespace-nowrap ${
                activeTab === 'api'
                  ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg shadow-amber-500/25 scale-[1.02]'
                  : 'text-secondary hover:text-primary hover:bg-surface-secondary'
              }`}
            >
              <Terminal className="w-5 h-5 text-amber-400" />
              <span>○ API Calls & x402</span>
            </button>

            <button
              onClick={() => setActiveTab('explorer')}
              className={`flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-mono text-sm sm:text-base font-extrabold transition-all whitespace-nowrap ${
                activeTab === 'explorer'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/25 scale-[1.02]'
                  : 'text-secondary hover:text-primary hover:bg-surface-secondary'
              }`}
            >
              <Database className="w-5 h-5 text-yellow-400" />
              <span>○ Blockchain Explorer</span>
            </button>

          </div>
        </div>

        {/* TAB CONTENT RENDERER */}
        <div className="transition-all duration-300">
          
          {/* TAB 1: ARCHITECTURE OVERVIEW & SPECIFICATIONS */}
          {activeTab === 'architecture' && (
            <div className="space-y-8 animate-fadeIn">
              <div className="bg-surface border border-cyan-500/30 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
                <h3 className="text-2xl font-extrabold text-primary mb-4 flex items-center gap-3">
                  <ShieldCheck className="w-8 h-8 text-cyan-400" />
                  <span>The Autonomous Infrastructure Operating System Topology</span>
                </h3>
                <p className="text-primary text-base font-mono max-w-4xl mb-8 leading-relaxed">
                  Our architecture decouples bureaucratic human intervention from financial escrow release by embedding sovereign artificial intelligence directly into smart contract verification pipelines. The system operates across 3 primary domains:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-surface-secondary p-6 rounded-2xl border border-blue-500/30 space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xl">🏛</div>
                    <h4 className="text-xl font-bold text-primary">Government Command Suite</h4>
                    <p className="text-sm font-mono text-primary">
                      Provides supervisory governance, budget deployment, and emergency freeze override controls without exposing vaults to manual tampering or delays.
                    </p>
                    <ul className="text-xs font-mono space-y-2 text-blue-300 pt-2 border-t border-blue-500/20">
                      <li>• Real-Time Treasury Liquidity Tracking</li>
                      <li>• Sovereign Tolerance Policy Setter (≥95%)</li>
                      <li>• Tamper-Proof Regulatory Audit Logs</li>
                    </ul>
                  </div>

                  <div className="bg-surface-secondary p-6 rounded-2xl border border-purple-500/30 space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-xl">🤖</div>
                    <h4 className="text-xl font-bold text-primary">AI Escrow Core & x402</h4>
                    <p className="text-sm font-mono text-primary">
                      Utilizes sophisticated Computer Vision feature extraction and satellite GIS cross-validation to analyze contractor field scans in real time (1.3s latency).
                    </p>
                    <ul className="text-xs font-mono space-y-2 text-purple-300 pt-2 border-t border-purple-500/20">
                      <li>• Neural Noise Filtering & Perspective Sync</li>
                      <li>• HTTP 402 Zero-Latency Machine Wallets</li>
                      <li>• Automated $0.05 USDC Gas Settlement</li>
                    </ul>
                  </div>

                  <div className="bg-surface-secondary p-6 rounded-2xl border border-emerald-500/30 space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xl">⛓</div>
                    <h4 className="text-xl font-bold text-primary">Blockchain Trust Layer</h4>
                    <p className="text-sm font-mono text-primary">
                      Executes deterministic smart contracts to release multi-million dollar funds immediately upon receiving verified cryptographic proof (&gt;95% score).
                    </p>
                    <ul className="text-xs font-mono space-y-2 text-emerald-300 pt-2 border-t border-emerald-500/20">
                      <li>• Immutable Transaction Receipt Generation</li>
                      <li>• Zero Manual Escrow Custody Holdover</li>
                      <li>• Settlement Velocity: 4.2 Seconds</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-blue-900/30 to-cyan-900/30 border border-cyan-400/30 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div>
                    <h5 className="font-extrabold text-primary text-lg">Want to see this architecture live in action?</h5>
                    <p className="text-xs sm:text-sm font-mono text-cyan-300">Switch to the "Live Workflow" tab or trigger the 15-second simulation loop.</p>
                  </div>
                  <button
                    onClick={() => setActiveTab('workflow')}
                    className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-obsidian font-extrabold font-mono text-sm transition-transform hover:scale-105 whitespace-nowrap"
                  >
                    View Live Workflow →
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: LIVE WORKFLOW (The Interactive Showstealer) */}
          {activeTab === 'workflow' && (
            <div className="space-y-6 animate-fadeIn">
              <HorizontalStagePipeline />
              
              {/* LIVE SIMULATION TELEMETRY TERMINAL DECK */}
              <div className="bg-surface border border-subtle rounded-3xl p-6 sm:p-8 shadow-2xl space-y-4">
                <div className="flex items-center justify-between pb-4 border-b border-subtle">
                  <span className="text-sm font-mono text-cyan-400 font-bold flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-emerald-400 animate-pulse" />
                    <span>REAL-TIME MISSION CONTROL TELEMETRY FEED</span>
                  </span>
                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    ● ACTIVE STREAM ({logs.length} LOGS REGISTERED)
                  </span>
                </div>
                
                <div className="font-mono text-xs text-primary space-y-2.5 max-h-72 overflow-y-auto pr-2">
                  {logs.slice().reverse().map((log, i) => (
                    <div key={log.id || i} className="flex items-start gap-3 p-2.5 rounded-lg bg-surface border border-subtle hover:border-cyan-500/30 transition-colors">
                      <span className="text-secondary font-bold shrink-0">[{log.timestamp}]</span>
                      <span className="text-cyan-400 font-bold uppercase shrink-0">[{log.stage}]</span>
                      <span className="text-primary flex-1">{log.message}</span>
                      {log.confidence && (
                        <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold shrink-0">
                          ✔ {log.confidence}%
                        </span>
                      )}
                      {log.txHash && (
                        <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold shrink-0 truncate max-w-[120px]">
                          Tx: {log.txHash}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: API CALLS & X402 MICROPAYMENT LOGS */}
          {activeTab === 'api' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-surface border border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-subtle">
                  <div>
                    <h3 className="text-xl font-extrabold text-primary flex items-center gap-2.5">
                      <Zap className="w-6 h-6 text-amber-400 fill-current" />
                      <span>x402 Micropayment & Autonomous API Challenge Logs</span>
                    </h3>
                    <p className="text-xs font-mono text-primary mt-1">
                      Demonstrates zero-latency machine-to-machine financial execution ($0.05 USDC verification fee settled in 84ms)
                    </p>
                  </div>
                  <div className="px-4 py-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-xs font-bold flex items-center gap-2">
                    <span>PROTOCOL: HTTP 402 / L402 MACAROON CHALLENGE</span>
                  </div>
                </div>

                {/* API Request/Response Cards */}
                <div className="space-y-4">
                  {mockApiLogs.map((req, index) => (
                    <div key={req.id} className="bg-surface-secondary border border-subtle rounded-2xl p-5 hover:border-amber-400/50 transition-all space-y-3 font-mono">
                      <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-subtle">
                        <div className="flex items-center gap-3">
                          <span className="px-2.5 py-1 rounded bg-blue-500/20 text-blue-300 font-bold text-xs">{req.method}</span>
                          <span className="text-amber-400 font-bold text-sm sm:text-base">{req.endpoint}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-secondary text-xs">Latency: <strong className="text-primary">{req.time}</strong></span>
                          <span className={`px-2.5 py-1 rounded text-xs font-extrabold ${
                            req.status.includes('402') ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                          }`}>
                            {req.status}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                        <div className="bg-surface-secondary p-3 rounded-xl border border-subtle space-y-1">
                          <span className="text-secondary uppercase font-semibold block text-[10px]">Request Payload / Headers:</span>
                          {req.headers && <p className="text-cyan-400 mb-1">{req.headers}</p>}
                          <p className="text-primary font-mono overflow-x-auto">{req.payload}</p>
                        </div>
                        <div className="bg-surface-secondary p-3 rounded-xl border border-subtle space-y-1">
                          <span className="text-secondary uppercase font-semibold block text-[10px]">Response Telemetry:</span>
                          <p className="text-emerald-300 font-mono overflow-x-auto">{req.response}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: BLOCKCHAIN EXPLORER (Immutable Trust Registry) */}
          {activeTab === 'explorer' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-surface border border-yellow-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-subtle">
                  <div>
                    <h3 className="text-xl font-extrabold text-primary flex items-center gap-2.5">
                      <Hash className="w-6 h-6 text-yellow-400" />
                      <span>Immutable On-Chain Settlement Ledger</span>
                    </h3>
                    <p className="text-xs font-mono text-primary mt-1">
                      Verifiable smart contract execution events that permanently change vault balances from LOCKED to UNLOCKED
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="px-4 py-2 rounded-xl bg-yellow-500/10 border border-yellow-500/30 text-yellow-300 font-mono text-xs font-bold">
                      CHAIN ID: SOVEREIGN-402 // CONFIRMATION DEPTH: 12 BLOCKS
                    </span>
                  </div>
                </div>

                {/* Ledger Blocks Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left font-mono text-sm">
                    <thead>
                      <tr className="border-b border-subtle text-secondary text-xs uppercase">
                        <th className="py-3 px-4">Block Height</th>
                        <th className="py-3 px-4">Transaction Receipt Hash</th>
                        <th className="py-3 px-4">Vault Account</th>
                        <th className="py-3 px-4">Gas Fee</th>
                        <th className="py-3 px-4">Confirmation State</th>
                        <th className="py-3 px-4">Timestamp</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#D6D0C4]">
                      {mockBlocks.map((blk) => (
                        <tr key={blk.height} className="hover:bg-surface-secondary transition-colors">
                          <td className="py-4 px-4 font-bold text-cyan-400">#{blk.height}</td>
                          <td className="py-4 px-4 font-extrabold text-yellow-400 tracking-wider font-mono truncate max-w-[200px]">{blk.txHash}</td>
                          <td className="py-4 px-4 text-primary font-semibold">{blk.vault}</td>
                          <td className="py-4 px-4 text-amber-400 font-bold">{blk.gas}</td>
                          <td className="py-4 px-4">
                            <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-xs font-extrabold">
                              ✔ {blk.status}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-secondary text-xs">{blk.time}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
