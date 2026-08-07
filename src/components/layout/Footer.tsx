import React from 'react';
import { Globe2, ShieldCheck, Zap, Terminal, Heart, ArrowUpRight } from 'lucide-react';
import { useEscrowStore } from '../../store/useEscrowStore';

export const Footer: React.FC = () => {
  const { setCurrentPage } = useEscrowStore();

  return (
    <footer className="w-full bg-surface-secondary border-t border-subtle text-secondary font-mono text-xs py-12 px-6 mt-20">
      <div className="max-w-[1700px] mx-auto space-y-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Col 1: OS Branding & Specs */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-700 to-blue-700 p-[2px] shadow-sm">
                <div className="w-full h-full bg-surface rounded-[6px] flex items-center justify-center">
                  <Globe2 className="w-4 h-4 text-indigo-700" />
                </div>
              </div>
              <span className="font-black text-primary text-sm tracking-wide font-heading">AI ESCROW ORCHESTRATOR</span>
            </div>
            <p className="text-xs text-secondary leading-relaxed font-mono font-medium">
              Autonomous Infrastructure Operating System v2.4. Engineered to decouple bureaucratic human custody from multi-million dollar public engineering releases using Vision AI and x402 micropayments.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
              <span className="text-emerald-800 font-extrabold bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300">SOVEREIGN-402 LEDGER: ONLINE (4ms)</span>
            </div>
          </div>

          {/* Col 2: Navigation Portals */}
          <div className="space-y-3">
            <h4 className="text-primary font-black text-xs uppercase tracking-widest font-heading">Sovereign Portals</h4>
            <ul className="space-y-2 font-mono text-secondary font-semibold">
              <li><button onClick={() => setCurrentPage('landing')} className="hover:text-indigo-700 transition-colors">▶ Overview Engine (Home)</button></li>
              <li><button onClick={() => setCurrentPage('architecture')} className="hover:text-indigo-700 font-extrabold text-indigo-700 transition-colors">◉ 4-Tab Architecture Showcase</button></li>
              <li><button onClick={() => setCurrentPage('command-center')} className="hover:text-indigo-700 transition-colors">🏛 Government Command Suite</button></li>
              <li><button onClick={() => setCurrentPage('projects')} className="hover:text-indigo-700 transition-colors">📁 Project Infrastructure Hub</button></li>
              <li><button onClick={() => setCurrentPage('mission-control')} className="hover:text-indigo-700 transition-colors">⚡ Live Mission Control</button></li>
            </ul>
          </div>

          {/* Col 3: Technology Stack & Hackathon Specs */}
          <div className="space-y-3">
            <h4 className="text-primary font-black text-xs uppercase tracking-widest font-heading">Hackathon Technologies</h4>
            <ul className="space-y-2 font-mono text-secondary font-semibold">
              <li className="flex items-center gap-2"><span>• HTTP 402 / L402 Macaroon Wallets</span> <span className="text-[10px] text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded font-black border border-amber-300">84ms</span></li>
              <li className="flex items-center gap-2"><span>• Computer Vision Feature Extraction</span> <span className="text-[10px] text-purple-800 bg-purple-100 px-1.5 py-0.5 rounded font-black border border-purple-300">1.3s</span></li>
              <li className="flex items-center gap-2"><span>• Satellite GIS Boundary Cross-Sync</span> <span className="text-[10px] text-indigo-800 bg-indigo-100 px-1.5 py-0.5 rounded font-black border border-indigo-300">&gt;95%</span></li>
              <li className="flex items-center gap-2"><span>• Deterministic Smart Contract Escrow</span> <span className="text-[10px] text-emerald-800 bg-emerald-100 px-1.5 py-0.5 rounded font-black border border-emerald-300">0 Hold</span></li>
            </ul>
          </div>

          {/* Col 4: Live Telemetry Verification Box */}
          <div className="bg-surface p-5 rounded-2xl border border-subtle space-y-3 flex flex-col justify-between shadow-xs">
            <div>
              <span className="text-[10px] font-extrabold uppercase text-secondary block font-heading">Sovereign Treasury Vault Status:</span>
              <div className="text-2xl font-black text-primary font-heading mt-1">₹52,400,000</div>
              <span className="text-emerald-800 text-xs font-mono font-extrabold block">100% Fully Collateralized & Protected</span>
            </div>
            <div className="pt-3 border-t border-subtle flex items-center justify-between text-[10px] text-secondary font-bold">
              <span>SIH Enterprise Pitch Deck</span>
              <span className="text-indigo-700 font-extrabold">v2.4 LTS</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-subtle flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-secondary font-semibold">
          <p>© 2026 AI Escrow Orchestrator // Built for Smart India Hackathon Enterprise Excellence.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-primary cursor-pointer transition-colors">Privacy & Security Audit</span>
            <span className="hover:text-primary cursor-pointer transition-colors">Regulatory Documentation</span>
            <span className="hover:text-primary cursor-pointer transition-colors">API Endpoint Reference</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
