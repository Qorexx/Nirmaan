import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, Search, Filter, MapPin, ExternalLink, ShieldCheck, Zap, ArrowUpRight, Cpu } from 'lucide-react';
import { useEscrowStore } from '../store/useEscrowStore';
import { BeforeAfterSlider } from '../components/digital-twin/BeforeAfterSlider';
import { Button, GlassCard, Card, Badge, Input } from '../components/ui';

export const ProjectExplorerPage: React.FC = () => {
  const { projects, runLiveSimulation } = useEscrowStore();
  const [filterCategory, setFilterCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredProjects = projects.filter(p => {
    const matchesCat = filterCategory === 'ALL' || p.category.toLowerCase().includes(filterCategory.toLowerCase()) || filterCategory === 'Highway';
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.id.toLowerCase().includes(searchQuery.toLowerCase()) || p.contractor.toLowerCase().includes(searchQuery.toLowerCase());
    return (filterCategory === 'ALL' || matchesCat) && matchesSearch;
  });

  return (
    <div className="space-y-10 font-mono pb-24 text-slate-100 selection:bg-cyan-400 selection:text-slate-950 max-w-[1750px] mx-auto">

      {/* 1. HERO DIGITAL TWIN MATRIX */}
      <GlassCard intensity="high" className="relative overflow-hidden border-2 border-cyan-500/40 shadow-[0_0_80px_rgba(6,182,212,0.15)] bg-gradient-to-r from-[#07131F] via-[#0A1020] to-[#110D20]">
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-4xl">
            <div className="flex flex-wrap items-center gap-2.5">
              <Badge variant="cyan" icon={<Layers className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />}>
                🚧 NATIONAL DIGITAL TWIN MATRIX // SIH GOTHAM SURVEY
              </Badge>
              <span className="text-[11px] font-mono text-emerald-300 font-extrabold bg-emerald-500/10 px-3 py-1 rounded-md border border-emerald-500/30 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                LIVE BEFORE/AFTER LiDAR FEED
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-[#1C1917] font-sans tracking-tight leading-tight">
              Project Explorer & Digital Twin Archive
            </h1>

            <p className="text-xs sm:text-sm text-[#44403C] font-mono leading-relaxed">
              Interactive structural engineering verification matrix. Compare EXIF drone photography, analyze millimeter foundation changes, and trigger zero-latency x402 automated settlements.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto shrink-0">
            <div className="px-5 py-3 rounded-2xl bg-[#F7F5F0] border-2 border-cyan-500/40 text-center sm:text-right shadow-2xl w-full sm:w-auto">
              <span className="text-[10px] text-[#57534E] uppercase font-bold block">Monitored Vaults</span>
              <span className="text-3xl font-black text-cyan-400 font-sans tracking-tight">{projects.length} <span className="text-xs font-mono text-[#44403C]">Hubs</span></span>
            </div>
          </div>
        </div>

        {/* Ambient background glow */}
        <div className="absolute right-0 top-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      </GlassCard>

      {/* 2. COMMAND FILTER AND SEARCH STRIP */}
      <div className="p-4 rounded-2xl bg-[#F7F5F0] border border-[#D6D0C4] shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div className="w-full sm:w-80">
          <Input
            placeholder="Search project ID, contractor, or title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            leftIcon={<Search className="w-4 h-4 text-cyan-400" />}
            className="text-xs"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5 bg-[#EAE5DC] p-1 rounded-xl border border-[#D6D0C4] text-xs font-mono">
          {['ALL', 'Highway', 'Solar', 'Bridge', 'Coastal'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-4 py-1.5 rounded-lg font-extrabold transition-all ${
                filterCategory === cat
                  ? 'bg-cyan-400 text-slate-950 font-black shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                  : 'text-[#57534E] hover:text-[#1C1917] hover:bg-[#EAE5DC]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 3. DIGITAL TWIN PROJECT CARDS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <AnimatePresence>
          {filteredProjects.map((proj, index) => (
            <motion.div
              key={proj.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <Card className="p-6 bg-[#F7F5F0] border border-[#D6D0C4] group-hover:border-cyan-500/50 transition-all duration-300 shadow-2xl flex flex-col justify-between space-y-5 h-full">
                
                {/* Header Information */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2.5">
                      <span className="font-mono font-black text-xs bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 px-3 py-1 rounded-xl shadow-inner">
                        #{proj.id}
                      </span>
                      <span className="text-xs font-mono text-[#57534E] flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-red-400 shrink-0" /> {proj.location}
                      </span>
                    </div>
                    <Badge 
                      variant={proj.status === 'UNLOCKED' ? 'emerald' : 'amber'} 
                      size="sm"
                    >
                      {proj.status === 'UNLOCKED' ? '✔ UNLOCKED VAULT' : '🔒 LOCKED ESCROW'}
                    </Badge>
                  </div>

                  <h3 className="text-xl font-sans font-extrabold text-[#1C1917] group-hover:text-cyan-300 transition-colors tracking-tight">
                    {proj.name}
                  </h3>
                </div>

                {/* Digital Twin Interactive Before/After Slider */}
                <div className="w-full overflow-hidden rounded-2xl border border-[#D6D0C4] shadow-lg">
                  <BeforeAfterSlider
                    beforeImage={proj.beforeImageUrl}
                    afterImage={proj.afterImageUrl}
                    title={`Contractor: ${proj.contractor}`}
                    confidence={proj.aiScore || 98.4}
                    location={`GPS: [${proj.gpsCoords.lat}, ${proj.gpsCoords.lng}] | Pool: ₹${(proj.budget/100000).toFixed(1)} Lakhs`}
                  />
                </div>

                {/* Telemetry Footer & Trigger Action */}
                <div className="pt-3 border-t border-[#D6D0C4] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-[11px] text-[#57534E] font-mono block">Last AI Telemetry Sync: <strong className="text-[#44403C]">{proj.lastUpdated}</strong></span>
                    <span className="text-[10px] text-emerald-400 font-bold block flex items-center gap-1 mt-0.5">
                      <Cpu className="w-3 h-3" /> Autonomous Confidence: {(proj.aiScore || 98.4)}%
                    </span>
                  </div>

                  <Button
                    variant="x402"
                    size="sm"
                    onClick={() => runLiveSimulation(proj)}
                    icon={<Zap className="w-4 h-4 fill-current animate-bounce" />}
                    className="w-full sm:w-auto font-sans font-bold shadow-lg"
                  >
                    Simulate x402 Release
                  </Button>
                </div>

              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

    </div>
  );
};
