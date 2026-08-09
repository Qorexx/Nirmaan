'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, Search, Filter, MapPin, ExternalLink, ShieldCheck, Zap, ArrowUpRight, Cpu } from 'lucide-react';
import { useEscrowStore } from '@/lib/store';
import { BeforeAfterSlider } from '@/components/digital-twin/BeforeAfterSlider';
import { Button, GlassCard, Card, Badge, Input, Skeleton } from '@/components/ui';

const ProjectExplorerPage: React.FC = () => {
  const { projects, runLiveSimulation } = useEscrowStore();
  const [filterCategory, setFilterCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const filteredProjects = projects.filter(p => {
    const matchesCat = filterCategory === 'ALL' || p.category.toLowerCase().includes(filterCategory.toLowerCase()) || filterCategory === 'Highway';
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.id.toLowerCase().includes(searchQuery.toLowerCase()) || p.contractor.toLowerCase().includes(searchQuery.toLowerCase());
    return (filterCategory === 'ALL' || matchesCat) && matchesSearch;
  });

  return (
    <div className="space-y-10 font-mono pb-24 text-primary max-w-[1750px] mx-auto">

      {/* 1. HERO DIGITAL TWIN MATRIX */}
      <GlassCard intensity="high" className="relative overflow-hidden border-2 border-cyan-500/40 shadow-[0_0_80px_rgba(6,182,212,0.15)] bg-surface-secondary">
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-4xl">
            <div className="flex flex-wrap items-center gap-2.5">
              <Badge variant="cyan" icon={<Layers className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />}>
                🚧 NATIONAL DIGITAL TWIN MATRIX // Gov GOTHAM SURVEY
              </Badge>
              <span className="text-[11px] font-mono text-accent-emerald font-extrabold bg-emerald-500/10 px-3 py-1 rounded-md border border-emerald-500/30 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                LIVE BEFORE/AFTER LiDAR FEED
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-primary font-heading tracking-tight leading-tight">
              Project Explorer & Digital Twin Archive
            </h1>

            <p className="text-xs sm:text-sm text-primary font-mono leading-relaxed">
              Interactive structural engineering verification matrix. Compare EXIF drone photography, analyze millimeter foundation changes, and trigger zero-latency x402 automated settlements.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto shrink-0">
            <div className="px-5 py-3 rounded-2xl bg-surface border-2 border-cyan-500/40 text-center sm:text-right shadow-2xl w-full sm:w-auto">
              <span className="text-[10px] text-secondary uppercase font-bold block">Monitored Vaults</span>
              <span className="text-3xl font-black text-cyan-400 font-heading tracking-tight">{projects.length} <span className="text-xs font-mono text-primary">Hubs</span></span>
            </div>
          </div>
        </div>

        {/* Ambient background glow */}
        <div className="absolute right-0 top-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      </GlassCard>

      {/* 2. COMMAND FILTER AND SEARCH STRIP */}
      <div className="p-4 rounded-2xl bg-surface border border-subtle shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div className="w-full sm:w-80">
          <Input
            placeholder="Search project ID, contractor, or title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            leftIcon={<Search className="w-4 h-4 text-cyan-400" />}
            className="text-xs"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5 bg-surface-secondary p-1 rounded-xl border border-subtle text-xs font-mono">
          {['ALL', 'Highway', 'Solar', 'Bridge', 'Coastal'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-4 py-1.5 rounded-lg font-extrabold transition-all ${
                filterCategory === cat
                  ? 'bg-cyan-400 text-slate-950 font-black shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                  : 'text-secondary hover:text-primary hover:bg-surface-secondary'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 3. DIGITAL TWIN PROJECT CARDS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {isLoading ? (
          <>
            {[1, 2, 3, 4].map(i => (
              <Card key={i} className="p-6 h-[400px] flex flex-col space-y-4">
                <div className="flex justify-between items-center">
                  <Skeleton className="w-24 h-6 rounded-lg" />
                  <Skeleton className="w-32 h-6 rounded-lg" />
                </div>
                <Skeleton className="w-64 h-8 rounded-xl" />
                <Skeleton className="flex-1 w-full rounded-2xl" />
                <div className="flex justify-between items-center pt-4">
                  <Skeleton className="w-32 h-8 rounded-lg" />
                  <Skeleton className="w-40 h-10 rounded-xl" />
                </div>
              </Card>
            ))}
          </>
        ) : (
          <AnimatePresence>
            {filteredProjects.map((proj, index) => (
              <motion.div
                key={proj.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <Card className="p-6 bg-surface border border-subtle group-hover:border-cyan-500/50 transition-all duration-300 shadow-2xl flex flex-col justify-between space-y-5 h-full">
                  
                  {/* Header Information */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2.5">
                        <span className="font-mono font-black text-xs bg-cyan-500/20 text-accent-cyan border border-cyan-500/40 px-3 py-1 rounded-xl shadow-inner">
                          #{proj.id}
                        </span>
                        <span className="text-xs font-mono text-secondary flex items-center gap-1">
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

                    <h3 className="text-xl font-heading font-extrabold text-primary group-hover:text-accent-cyan transition-colors tracking-tight">
                      {proj.name}
                    </h3>
                  </div>

                  {/* Digital Twin Interactive Before/After Slider */}
                  <div className="w-full overflow-hidden rounded-2xl border border-subtle shadow-lg">
                    <BeforeAfterSlider
                      beforeImage={proj.beforeImageUrl}
                      afterImage={proj.afterImageUrl}
                      title={`Contractor: ${proj.contractor}`}
                      confidence={proj.aiScore || 98.4}
                      location={`GPS: [${proj.gpsCoords.lat}, ${proj.gpsCoords.lng}] | Pool: ₹${(proj.budget/100000).toFixed(1)} Lakhs`}
                    />
                  </div>

                  {/* Telemetry Footer & Trigger Action */}
                  <div className="pt-3 border-t border-subtle flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div>
                      <span className="text-[11px] text-secondary font-mono block">Last AI Telemetry Sync: <strong className="text-primary">{proj.lastUpdated}</strong></span>
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
        )}
      </div>

    </div>
  );
};



export default ProjectExplorerPage;

