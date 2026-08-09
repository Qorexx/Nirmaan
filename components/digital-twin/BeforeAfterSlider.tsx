'use client';
import React, { useState } from 'react';
import { Layers, CheckCircle2 } from 'lucide-react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  title?: string;
  confidence?: number;
  location?: string;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeImage,
  afterImage,
  title = "NH-44 Highway Asphalt Paving & Structural Reinforcement",
  confidence = 97.2,
  location = "Sector IV GPS: [13.1938° N, 77.6321° E]"
}) => {
  const [sliderPos, setSliderPos] = useState(50);
  const [viewMode, setViewMode] = useState<'twin' | 'satellite' | 'heatmap'>('twin');

  return (
    <div className="rounded-3xl border border-subtle bg-surface p-5 shadow-[0_10px_35px_rgba(28,25,23,0.07)] relative overflow-hidden group text-primary">
      
      {/* Top Bar / Metadata */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4 pb-4 border-b border-subtle">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-black bg-indigo-100 text-indigo-950 border border-indigo-300 uppercase tracking-widest">
              🛰️ Digital Twin WOW-Layer
            </span>
            <span className="text-xs font-mono text-emerald-950 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-300 flex items-center gap-1 font-extrabold">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" /> GPS Geo-Synced
            </span>
          </div>
          <h3 className="text-base sm:text-lg font-black font-heading text-primary mt-1.5">{title}</h3>
          <p className="text-xs font-mono text-secondary font-semibold">{location}</p>
        </div>

        {/* AI Confidence Badge & Mode Switcher */}
        <div className="flex items-center space-x-3">
          <div className="bg-surface-secondary px-4 py-2 rounded-xl border border-subtle text-right shadow-2xs">
            <div className="text-[10px] font-mono uppercase text-secondary font-extrabold">Vision AI Confidence</div>
            <div className="text-lg sm:text-xl font-black text-emerald-800 font-heading">{confidence}% MATCH</div>
          </div>
        </div>
      </div>

      {/* Mode Switches */}
      <div className="flex items-center justify-between mb-3 text-xs font-mono">
        <div className="flex bg-surface-secondary rounded-xl p-1 border border-subtle">
          <button 
            onClick={() => setViewMode('twin')}
            className={`px-3 py-1.5 rounded-lg transition-all font-bold ${viewMode === 'twin' ? 'bg-surface text-primary font-black shadow-sm border border-subtle' : 'text-secondary hover:text-primary'}`}
          >
            ⚖️ Before / After Slider
          </button>
          <button 
            onClick={() => setViewMode('satellite')}
            className={`px-3 py-1.5 rounded-lg transition-all font-bold ${viewMode === 'satellite' ? 'bg-indigo-700 text-white font-black shadow-sm' : 'text-secondary hover:text-primary'}`}
          >
            🌐 Satellite GIS View
          </button>
          <button 
            onClick={() => setViewMode('heatmap')}
            className={`px-3 py-1.5 rounded-lg transition-all font-bold ${viewMode === 'heatmap' ? 'bg-purple-700 text-white font-black shadow-sm' : 'text-secondary hover:text-primary'}`}
          >
            🟣 Material Quality Heatmap
          </button>
        </div>

        <span className="hidden sm:inline text-secondary italic font-semibold">💡 Drag slider across to inspect structural transformation</span>
      </div>

      {/* Slider View Box */}
      <div className="relative w-full h-[360px] sm:h-[420px] rounded-2xl overflow-hidden border border-subtle select-none shadow-inner bg-surface-secondary">
        
        {/* AFTER IMAGE (Background) */}
        <img
          src={afterImage}
          alt="After Construction Completed Road"
          className={`absolute inset-0 w-full h-full object-cover pointer-events-none transition-filter ${viewMode === 'heatmap' ? 'hue-rotate-90 saturate-200 contrast-125' : ''}`}
        />
        
        {/* Heatmap Overlay simulation */}
        {viewMode === 'heatmap' && (
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/30 via-transparent to-indigo-600/30 pointer-events-none mix-blend-overlay"></div>
        )}

        {/* AFTER LABEL */}
        <div className="absolute top-4 right-4 z-20 bg-emerald-700 text-white font-mono text-xs px-3 py-1.5 rounded-lg font-black tracking-wider uppercase shadow-lg border border-emerald-300 flex items-center gap-1.5">
          <span>✔ After: Completed Highway</span>
        </div>

        {/* BEFORE IMAGE (Clipped Foreground) */}
        <div 
          className="absolute inset-0 overflow-hidden pointer-events-none"
          style={{ width: `${sliderPos}%` }}
        >
          <img
            src={beforeImage}
            alt="Before Construction Raw Terrain"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none max-w-none"
            style={{ width: '100%', minWidth: '1000px' }}
          />
          
          {/* BEFORE LABEL */}
          <div className="absolute top-4 left-4 z-20 bg-amber-700 text-white font-mono text-xs px-3 py-1.5 rounded-lg font-black tracking-wider uppercase shadow-lg border border-amber-300 flex items-center gap-1.5">
            <span>🚧 Before: Raw Earth & Gravel</span>
          </div>
        </div>

        {/* Interactive Center Divide Line & Handle */}
        <div 
          className="absolute top-0 bottom-0 z-30 w-1 bg-gradient-to-b from-indigo-700 via-white to-indigo-700 shadow-md cursor-ew-resize transform -translate-x-1/2"
          style={{ left: `${sliderPos}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 left-1/2 w-10 h-10 rounded-full bg-indigo-700 text-white flex items-center justify-center font-bold shadow-xl border-2 border-[#F7F5F0] scale-105 transition-transform hover:scale-110">
            <Layers className="w-5 h-5 stroke-[2.5]" />
          </div>
        </div>

        {/* Invisible range slider Input for frictionless native user dragging */}
        <input
          type="range"
          min="1"
          max="99"
          value={sliderPos}
          onChange={(e) => setSliderPos(Number(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-40"
        />

        {/* Bottom AI Overlay Diagnostic Banner */}
        <div className="absolute bottom-4 left-4 right-4 z-20 bg-surface/95 backdrop-blur-md border border-subtle rounded-xl p-3 flex flex-wrap items-center justify-between gap-2 text-xs font-mono shadow-md text-primary">
          <div className="flex items-center space-x-4">
            <div><span className="text-secondary">Surface Density:</span> <span className="text-primary font-black">98.4 kN/m²</span></div>
            <div><span className="text-secondary">Perspective Alignment:</span> <span className="text-indigo-700 font-black">Normalized (0.02 err)</span></div>
            <div><span className="text-secondary">Material Quality:</span> <span className="text-emerald-800 font-black">Bitumen Grade-A</span></div>
          </div>
          <div className="text-amber-800 font-black flex items-center gap-1 bg-amber-100 px-2 py-0.5 rounded border border-amber-300">
            <span>⚡ x402 Micropayment Attested</span>
          </div>
        </div>
      </div>
    </div>
  );
};

