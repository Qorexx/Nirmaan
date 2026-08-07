import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import gsap from 'gsap';
import { 
  UploadCloud, 
  CheckCircle2, 
  AlertTriangle, 
  X, 
  Eye, 
  FileText, 
  Video as VideoIcon, 
  Image as ImageIcon, 
  RefreshCw, 
  Send, 
  MapPin, 
  Calendar, 
  Ruler, 
  Layers, 
  CloudSun, 
  Building2, 
  Clock, 
  ShieldCheck, 
  Sparkles, 
  Zap, 
  HardHat, 
  ArrowUpRight, 
  FileCheck2, 
  AlertCircle,
  Play,
  Maximize2,
  Trash2,
  Check,
  ExternalLink
} from 'lucide-react';
import { useEscrowStore } from '../store/useEscrowStore';
import { 
  Button, 
  Card, 
  GlassCard, 
  KPICard, 
  Badge, 
  Input, 
  ProgressBar, 
  Timeline, 
  Modal, 
  NotificationCard, 
  StatCard, 
  AnimatedBorder
} from '../components/ui';

// ============================================================================
// ZOD METADATA VALIDATION SCHEMA
// ============================================================================
const metadataSchema = z.object({
  gpsCoordinates: z.string().min(6, "GPS coordinates are required (e.g. 18.5204° N, 73.8567° E)"),
  captureDate: z.string().min(1, "Capture date and time is required"),
  description: z.string().min(15, "Please provide at least 15 characters describing structural repair"),
  roadLength: z.string().min(1, "Road length or span area is required (e.g. 4.2 km)"),
  materialType: z.string().min(3, "Material grade specification required (e.g. M40 Concrete / Polymer Asphalt)"),
  weather: z.string().min(3, "Weather condition required for optical calibration (e.g. Clear / Dry 28°C)"),
  notes: z.string().optional()
});

type MetadataFormValues = z.infer<typeof metadataSchema>;

// ============================================================================
// INTERFACE DEFINITIONS FOR UPLOAD QUEUE & MEDIA
// ============================================================================
interface UploadFile {
  id: string;
  name: string;
  size: number;
  type: 'image' | 'video' | 'pdf';
  url: string;
  progress: number;
  status: 'pending' | 'uploading' | 'uploaded' | 'processing' | 'verified' | 'rejected' | 'error';
}

interface MediaItem {
  id: string;
  title: string;
  type: 'image' | 'video' | 'doc';
  url: string;
  timestamp: string;
  milestone: string;
  verified: boolean;
  score?: number;
}

const initialMediaGallery: MediaItem[] = [
  {
    id: 'm1',
    title: 'NH-44 Mile 32 High-Density Surface Scan.png',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1545459720-aacab5090472?auto=format&fit=crop&w=1200&q=80',
    timestamp: 'August 04, 2026 // 14:22 IST',
    milestone: 'Tranche 2 // Base Asphalt',
    verified: true,
    score: 98.4
  },
  {
    id: 'm2',
    title: 'Drone 4K LiDAR Flyover Sector 12.mp4',
    type: 'video',
    url: 'https://images.unsplash.com/photo-1578885136359-16c8bd4d3a8e?auto=format&fit=crop&w=1200&q=80',
    timestamp: 'August 03, 2026 // 10:15 IST',
    milestone: 'Tranche 2 // Structural Bounds',
    verified: true,
    score: 96.2
  },
  {
    id: 'm3',
    title: 'Material Lab Stress Test Certificate.pdf',
    type: 'doc',
    url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
    timestamp: 'July 28, 2026 // 16:40 IST',
    milestone: 'Tranche 1 // Initial Excavation',
    verified: true,
    score: 100
  },
  {
    id: 'm4',
    title: 'Bridge Expansion Joint Ultrasound Inspection.png',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    timestamp: 'July 21, 2026 // 09:12 IST',
    milestone: 'Tranche 1 // Pier Anchors',
    verified: true,
    score: 95.8
  }
];

export const ContractorWorkspacePage: React.FC = () => {
  const { runLiveSimulation, projects, setCurrentPage } = useEscrowStore();
  
  // Local states
  const [uploadedFiles, setUploadedFiles] = useState<UploadFile[]>([]);
  const [activeTab, setActiveTab] = useState<'upload' | 'gallery' | 'timeline' | 'notifications'>('upload');
  const [lightboxItem, setLightboxItem] = useState<MediaItem | null>(null);
  const [overallWorkflowState, setOverallWorkflowState] = useState<'idle' | 'uploading' | 'ai_processing' | 'approved'>('idle');
  
  // Interactive notification center items with matched severity typings
  const [notifications, setNotifications] = useState([
    { id: '1', title: '₹14,50,000 Milestone Unlocked', description: 'Tranche 2 verified via computer vision in 1.4s. $0.05 USDC fee settled via x402 protocol.', type: 'success' as const, time: '2h ago' },
    { id: '2', title: 'GPS EXIF Verification Passed', description: 'Coordinates 18.5204° N match NH-44 geo-boundary fencing with 100% precision.', type: 'normal' as const, time: '4h ago' },
    { id: '3', title: 'Rain Forecast Notice', description: 'Monsoon precipitation predicted in Pune corridor on Aug 10. Ensure protective asphalt coating before scan.', type: 'urgent' as const, time: '1d ago' },
  ]);

  const dashboardRef = useRef<HTMLDivElement | null>(null);

  // GSAP Entrance Choreography for Apple / Stripe aesthetic
  useEffect(() => {
    if (dashboardRef.current) {
      gsap.fromTo(
        dashboardRef.current.querySelectorAll('.gsap-reveal'),
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: 'power3.out' }
      );
    }
  }, []);

  // React Hook Form initial setup
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    reset
  } = useForm<MetadataFormValues>({
    resolver: zodResolver(metadataSchema),
    defaultValues: {
      gpsCoordinates: '18.5204° N, 73.8567° E (Locked)',
      captureDate: '2026-08-06T12:15:00',
      description: 'Completed 4.2km sub-grade paving and polymer compaction for NH-44 Sector 12 highway expansion.',
      roadLength: '4.20 km continuous span',
      materialType: 'M40 High-Density Polymer Asphalt + Bitumen Emulsion',
      weather: 'Clear / Dry • 28°C (Optimal visibility for Vision AI)',
      notes: 'No structural cracks or sub-surface moisture anomalies observed during vibration compaction.'
    },
    mode: 'onChange'
  });

  // Handle Drag & Drop events via react-dropzone
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles: UploadFile[] = acceptedFiles.map((file, idx) => {
      const ext = file.name.split('.').pop()?.toLowerCase() || '';
      let type: 'image' | 'video' | 'pdf' = 'image';
      if (['mp4', 'mov', 'avi'].includes(ext) || file.type.includes('video')) type = 'video';
      else if (['pdf', 'doc', 'docx'].includes(ext) || file.type.includes('pdf')) type = 'pdf';

      return {
        id: `f-${Date.now()}-${idx}`,
        name: file.name,
        size: file.size,
        type,
        url: URL.createObjectURL(file),
        progress: 0,
        status: 'uploading'
      };
    });

    setUploadedFiles(prev => [...newFiles, ...prev]);
    setOverallWorkflowState('uploading');

    // Simulate progress bar animations for each uploaded file
    newFiles.forEach(file => {
      let currentProgress = 0;
      const interval = setInterval(() => {
        currentProgress += Math.floor(Math.random() * 25) + 15;
        if (currentProgress >= 100) {
          currentProgress = 100;
          clearInterval(interval);
          setUploadedFiles(prev => prev.map(f => f.id === file.id ? { ...f, progress: 100, status: 'uploaded' } : f));
          
          // Automatically shift to AI processing animation after completion!
          setTimeout(() => {
            setUploadedFiles(prev => prev.map(f => f.id === file.id ? { ...f, status: 'processing' } : f));
            setOverallWorkflowState('ai_processing');
            
            // Finalize as verified!
            setTimeout(() => {
              setUploadedFiles(prev => prev.map(f => f.id === file.id ? { ...f, status: 'verified' } : f));
              setOverallWorkflowState('approved');
            }, 1800);
          }, 800);
        } else {
          setUploadedFiles(prev => prev.map(f => f.id === file.id ? { ...f, progress: currentProgress } : f));
        }
      }, 300);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp'],
      'video/*': ['.mp4', '.mov', '.webm'],
      'application/pdf': ['.pdf']
    },
    maxSize: 104857600 // 100MB max
  });

  const handleRemoveFile = (id: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== id));
  };

  const handleRetryUpload = (id: string) => {
    setUploadedFiles(prev => prev.map(f => f.id === id ? { ...f, progress: 0, status: 'uploading' } : f));
    // Simulate re-upload
    setTimeout(() => {
      setUploadedFiles(prev => prev.map(f => f.id === id ? { ...f, progress: 100, status: 'verified' } : f));
    }, 1200);
  };

  const onSubmitMetadata = (data: MetadataFormValues) => {
    if (uploadedFiles.length === 0) {
      alert('Please upload at least one proof file (Image, Video, or PDF) before executing smart contract submission.');
      return;
    }

    setOverallWorkflowState('approved');
    // Add a live success notification
    setNotifications(prev => [
      {
        id: Date.now().toString(),
        title: 'Proof Bundle Submitted & Verified',
        description: `Uploaded ${uploadedFiles.length} multi-modal proof files with GPS anchor ${data.gpsCoordinates}. Initiating autonomous x402 disbursement!`,
        type: 'success' as const,
        time: 'Just now'
      },
      ...prev
    ]);

    // Kick off Mission Control live presentation demo!
    const targetProj = projects[0] || undefined;
    setTimeout(() => {
      runLiveSimulation(targetProj);
    }, 1000);
  };

  // Helper type for timeline status
  type StatusType = 'completed' | 'pending' | 'active';

  // Timeline data mapping with explicit typing
  const timelineSteps = [
    { id: 't1', timestamp: '12:15 IST', title: '1. Upload Started & Encrypted', description: 'Client-side cryptographic hash SHA-256 generation complete. EXIF GPS payload extracted.', status: (uploadedFiles.length > 0 ? 'completed' : 'pending') as StatusType, meta: 'RSA-4096' },
    { id: 't2', timestamp: '12:16 IST', title: '2. Multi-Modal Upload Complete', description: 'High-res structural scans and LiDAR streams synced to Sovereign decentralized cloud storage.', status: (overallWorkflowState !== 'idle' && overallWorkflowState !== 'uploading' ? 'completed' : 'pending') as StatusType, meta: '100% SYNCED' },
    { id: 't3', timestamp: '12:17 IST', title: '3. Vision AI Verification Started', description: 'Gaussian filtering and crack detection algorithms evaluating road surface density.', status: (overallWorkflowState === 'ai_processing' ? 'active' : overallWorkflowState === 'approved' ? 'completed' : 'pending') as StatusType, meta: '98.4% CONFIDENCE' },
    { id: 't4', timestamp: '12:18 IST', title: '4. Satellite GIS Validation', description: 'Cross-referencing drone bounding box against Ministry of Road Transport GIS coordinates.', status: (overallWorkflowState === 'approved' ? 'completed' : 'pending') as StatusType, meta: 'EXIF MATCH' },
    { id: 't5', timestamp: '12:18 IST', title: '5. HTTP 402 Macaroon Challenge', description: 'Machine wallet presents L402 challenge token. $0.05 USDC verification fee authorized.', status: (overallWorkflowState === 'approved' ? 'completed' : 'pending') as StatusType, meta: 'x402 GAS' },
    { id: 't6', timestamp: '12:18 IST', title: '6. ₹14,50,000 Funds Released', description: 'Sovereign Escrow Smart Vault 0x7a8...E391 executes payout in 84ms directly to contractor bank wallet.', status: (overallWorkflowState === 'approved' ? 'completed' : 'pending') as StatusType, meta: 'LEDGER FINALITY' },
  ];

  return (
    <div ref={dashboardRef} className="space-y-10 font-mono pb-20 text-slate-100 selection:bg-cyan-500 selection:text-obsidian max-w-[1700px] mx-auto">

      {/* ========================================================================= */}
      {/* 1. STRIPE & ARC BROWSER INSPIRED WELCOME DASHBOARD HERO */}
      {/* ========================================================================= */}
      <GlassCard intensity="high" className="gsap-reveal relative overflow-hidden border-2 border-accent-indigo/40 shadow-xl bg-surface">
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2.5 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2.5">
              <Badge variant="pulse" icon={<HardHat className="w-3.5 h-3.5 text-accent-indigo" />}>
                🏗️ ENTERPRISE CONTRACTOR WORKSPACE
              </Badge>
              <span className="text-[11px] font-mono text-accent-emerald font-extrabold bg-accent-emerald/10 px-2.5 py-1 rounded-md border border-accent-emerald/30 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-accent-emerald animate-ping" />
                L&T INFRA SOLUTIONS // 0x402a...E819
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-primary font-sans tracking-tight leading-tight">
              Contractor Proof Suite & Auto-Settlement Hub
            </h1>

            <p className="text-xs sm:text-sm text-secondary font-mono leading-relaxed">
              Submit timestamped multi-modal field evidence (LiDAR drone video, high-res structural imagery, material certificates) to instantly clear HTTP 402 AI evaluation and trigger zero-human-hold milestone disbursements.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto shrink-0">
            <Button
              variant="primary"
              size="lg"
              onClick={() => runLiveSimulation()}
              icon={<Zap className="w-5 h-5 fill-current animate-bounce" />}
              className="w-full sm:w-auto shadow-2xl font-sans font-black"
            >
              ▶ View On Mission Control
            </Button>
          </div>
        </div>

        {/* Ambient aesthetic light gradients */}
        <div className="absolute right-0 bottom-0 w-96 h-96 bg-accent-indigo/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute left-1/4 top-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
      </GlassCard>

      {/* ========================================================================= */}
      {/* 2. DASHBOARD METRIC CARDS & WORKSPACE HEALTH DECK */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 gsap-reveal">
        <KPICard
          title="Assigned Mega-Projects"
          value="4 Corridors"
          change="NH-44 Active"
          isPositive={true}
          subValue="NHAI & Ministry of Road Transport"
          icon={<Layers className="w-5 h-5 text-cyan-400" />}
          glowColor="cyan"
        />
        <KPICard
          title="Active Milestone Tranches"
          value="Tranche 3 / 6"
          change="₹14.5L Locked"
          isPositive={true}
          subValue="Sub-grade compaction asphalt phase"
          icon={<Clock className="w-5 h-5 text-amber-400" />}
          glowColor="amber"
        />
        <KPICard
          title="Escrow Liquidity Status"
          value="₹28.4M Total"
          change="₹24.2M Settled"
          isPositive={true}
          subValue="85.2% Overall milestone clearance"
          icon={<ShieldCheck className="w-5 h-5 text-emerald-400" />}
          glowColor="emerald"
        />
        <KPICard
          title="AI Proof Success Rate"
          value="98.4%"
          change="1.4s AVG Latency"
          isPositive={true}
          subValue="0 rejections across previous tranches"
          icon={<Sparkles className="w-5 h-5 text-purple-400" />}
          glowColor="purple"
        />
      </div>

      {/* ========================================================================= */}
      {/* 3. INTERACTIVE NAVIGATION TABS */}
      {/* ========================================================================= */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-surface p-2.5 rounded-2xl border border-subtle gsap-reveal shadow-md">
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto no-scrollbar">
          {[
            { id: 'upload' as const, label: '📤 Multi-Modal Proof Submission & Metadata', badge: uploadedFiles.length || 'NEW' },
            { id: 'gallery' as const, label: '🖼️ Media Gallery & Digital Twins', badge: '4 Files' },
            { id: 'timeline' as const, label: '⏱️ Automated Settlement Timeline', badge: '6 Stages' },
            { id: 'notifications' as const, label: '🔔 Notification Center', badge: notifications.length },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono transition-all whitespace-nowrap select-none ${
                activeTab === tab.id
                  ? 'bg-accent-indigo/10 text-accent-indigo border-2 border-accent-indigo/50 font-extrabold shadow-sm scale-102'
                  : 'text-secondary hover:text-primary hover:bg-surface-secondary border border-transparent'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`px-2 py-0.5 rounded text-[10px] uppercase ${
                activeTab === tab.id ? 'bg-accent-indigo text-white font-black' : 'bg-surface-secondary text-primary font-bold'
              }`}>
                {tab.badge}
              </span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-secondary px-3 py-1 bg-surface-secondary rounded-xl border border-subtle">
          <span className="w-2 h-2 rounded-full bg-accent-emerald animate-pulse" />
          <span>x402 Micropyament Wallet: <strong className="text-accent-gold font-bold">READY (500 USDC)</strong></span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: PROOF SUBMISSION & METADATA FORM DECK */}
      {/* ========================================================================= */}
      <AnimatePresence mode="wait">
        {activeTab === 'upload' && (
          <motion.div
            key="tab-upload"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8 gsap-reveal"
          >

            {/* LEFT 2 COLS: DROPZONE & METADATA FORM */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Drag and Drop Zone */}
              <Card className="p-0 border border-subtle bg-surface shadow-xl overflow-hidden">
                <div className="p-6 bg-surface border-b border-subtle flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <UploadCloud className="w-5 h-5 text-accent-indigo animate-bounce" />
                    <span className="text-base font-extrabold text-primary font-sans uppercase tracking-wider">
                      Step 1: Upload Multi-Modal Field Proofs
                    </span>
                  </div>
                  <Badge variant="indigo" size="sm">DRAG & DROP HUB // UP TO 100MB</Badge>
                </div>

                <div className="p-6 sm:p-8 space-y-6 bg-surface">
                  {/* Master react-dropzone box */}
                  <div
                    {...getRootProps()}
                    className={`border-2 border-dashed rounded-3xl p-8 sm:p-12 text-center cursor-pointer transition-all duration-300 relative overflow-hidden ${
                      isDragActive 
                        ? 'border-accent-indigo bg-accent-indigo/5 scale-[1.01] shadow-md' 
                        : 'border-subtle hover:border-accent-indigo/50 hover:bg-surface-secondary bg-surface'
                    }`}
                  >
                    <input {...getInputProps()} />
                    <div className="max-w-md mx-auto space-y-4 pointer-events-none relative z-10">
                      <div className="w-16 h-16 rounded-3xl bg-accent-indigo/10 border border-accent-indigo/30 flex items-center justify-center mx-auto shadow-sm">
                        <UploadCloud className={`w-8 h-8 text-accent-indigo ${isDragActive ? 'animate-bounce' : ''}`} />
                      </div>

                      <div className="space-y-1">
                        <h4 className="text-lg font-black text-primary font-sans">
                          {isDragActive ? 'Drop files here to sync immediately...' : 'Drag & Drop field imagery, videos, or PDFs'}
                        </h4>
                        <p className="text-xs text-secondary font-mono">
                          Or click to browse from local computer storage or connected drone SD card.
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-[11px] font-mono text-secondary">
                        <span className="px-3 py-1 rounded-full bg-surface-secondary border border-subtle flex items-center gap-1">
                          <ImageIcon className="w-3.5 h-3.5 text-emerald-500" /> High-Res Images (PNG/JPEG)
                        </span>
                        <span className="px-3 py-1 rounded-full bg-surface-secondary border border-subtle flex items-center gap-1">
                          <VideoIcon className="w-3.5 h-3.5 text-purple-500" /> Drone 4K Videos (MP4/MOV)
                        </span>
                        <span className="px-3 py-1 rounded-full bg-surface-secondary border border-subtle flex items-center gap-1">
                          <FileText className="w-3.5 h-3.5 text-amber-500" /> Lab PDFs & Invoices
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Uploaded File Queue with Real-time Animations */}
                  {uploadedFiles.length > 0 && (
                    <div className="space-y-3 pt-4 border-t border-subtle">
                      <div className="flex items-center justify-between text-xs text-secondary font-bold">
                        <span>Active Proof Queue ({uploadedFiles.length} files)</span>
                        <span className="text-accent-indigo">Automated L402 Cryptographic Hashing Active</span>
                      </div>

                      <div className="space-y-3 max-h-72 overflow-y-auto pr-1 no-scrollbar">
                        {uploadedFiles.map((file) => (
                          <div
                            key={file.id}
                            className="p-4 rounded-2xl bg-surface border border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm hover:border-accent-indigo/30 transition-colors"
                          >
                            <div className="flex items-center gap-3.5 min-w-0 flex-1">
                              <div className="p-2.5 rounded-xl bg-surface-secondary text-secondary border border-subtle shrink-0">
                                {file.type === 'video' ? <VideoIcon className="w-5 h-5 text-purple-500" /> :
                                 file.type === 'pdf' ? <FileText className="w-5 h-5 text-amber-500" /> :
                                 <ImageIcon className="w-5 h-5 text-emerald-500" />}
                              </div>

                              <div className="min-w-0 flex-1 space-y-1">
                                <div className="flex items-center justify-between text-xs">
                                  <span className="font-bold text-primary truncate max-w-[200px] sm:max-w-xs">{file.name}</span>
                                  <span className="text-secondary text-[10px] font-mono">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                                </div>

                                <ProgressBar
                                  percentage={file.progress}
                                  color={file.status === 'verified' ? 'emerald' : file.status === 'processing' ? 'gradient' : 'cyan'}
                                  heightClass="h-1.5"
                                />

                                <div className="flex items-center justify-between text-[11px] font-mono">
                                  <span className="flex items-center gap-1.5">
                                    {file.status === 'uploading' && <span className="text-accent-indigo animate-pulse">⬆ Syncing with IPFS ({file.progress}%)...</span>}
                                    {file.status === 'uploaded' && <span className="text-blue-500">✔ Uploaded • Awaiting AI Engine</span>}
                                    {file.status === 'processing' && <span className="text-purple-500 animate-pulse">⚙ Vision AI Running Crack Density Analysis...</span>}
                                    {file.status === 'verified' && <span className="text-accent-emerald font-bold">✔ Verified by AI (98.4% Confidence)</span>}
                                    {file.status === 'rejected' && <span className="text-rose-500 font-bold">⛔ AI Detected Anomaly • Please Re-upload</span>}
                                  </span>
                                  <span className="text-[10px] text-secondary uppercase font-black">{file.status}</span>
                                </div>
                              </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                              <Button
                                variant="ghost"
                                size="sm"
                                icon={<Eye className="w-3.5 h-3.5 text-cyan-400" />}
                                onClick={() => setLightboxItem({
                                  id: file.id,
                                  title: file.name,
                                  type: file.type === 'pdf' ? 'doc' : file.type,
                                  url: file.url,
                                  timestamp: 'Live Upload // Just Now',
                                  milestone: 'Tranche 3 // Active Proof',
                                  verified: file.status === 'verified'
                                })}
                                title="Preview file in fullscreen lightbox"
                              >
                                Preview
                              </Button>
                              
                              {file.status === 'error' || file.status === 'rejected' ? (
                                <Button
                                  variant="secondary"
                                  size="sm"
                                  icon={<RefreshCw className="w-3.5 h-3.5 text-amber-400" />}
                                  onClick={() => handleRetryUpload(file.id)}
                                  title="Retry upload"
                                />
                              ) : (
                                <button
                                  onClick={() => handleRemoveFile(file.id)}
                                  className="p-2 rounded-xl text-secondary hover:text-rose-500 hover:bg-rose-500/10 transition-colors"
                                  title="Remove file from queue"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </Card>

              {/* Step 2: Metadata & GPS Certification Form (React Hook Form + Zod) */}
              <Card className="p-0 border border-subtle bg-surface shadow-xl overflow-hidden">
                <div className="p-6 bg-surface border-b border-subtle flex items-center justify-between flex-wrap gap-2">
                  <div>
                    <h3 className="text-base font-extrabold text-primary font-sans uppercase tracking-wider flex items-center gap-2">
                      <FileCheck2 className="w-5 h-5 text-emerald-400" />
                      <span>Step 2: EXIF GPS & Engineering Metadata Form</span>
                    </h3>
                    <p className="text-xs text-secondary font-mono mt-0.5">Validated against Smart India Hackathon engineering standards via Zod schema.</p>
                  </div>
                  <Badge variant="emerald">ZOD VALIDATED // SHADOW SIGNED</Badge>
                </div>

                <form onSubmit={handleSubmit(onSubmitMetadata)} className="p-6 sm:p-8 space-y-6 font-mono text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    
                    {/* GPS Coordinates */}
                    <div className="space-y-2">
                      <label className="flex items-center justify-between text-secondary font-bold uppercase text-[11px]">
                        <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-cyan-400" /> GPS EXIF Coordinates (Lat / Long)</span>
                        <span className="text-emerald-400 text-[10px]">✔ AUTO-LOCKED</span>
                      </label>
                      <Input
                        {...register('gpsCoordinates')}
                        placeholder="e.g. 18.5204° N, 73.8567° E"
                        leftIcon={<MapPin className="w-4 h-4 text-cyan-400" />}
                        error={errors.gpsCoordinates?.message}
                      />
                    </div>

                    {/* Capture Date & Time */}
                    <div className="space-y-2">
                      <label className="flex items-center justify-between text-secondary font-bold uppercase text-[11px]">
                        <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-amber-400" /> Timestamp & Proof Date</span>
                        <span className="text-cyan-400 text-[10px]">IST TIMEZONE</span>
                      </label>
                      <Input
                        type="datetime-local"
                        {...register('captureDate')}
                        error={errors.captureDate?.message}
                      />
                    </div>

                    {/* Road Length / Span Area */}
                    <div className="space-y-2">
                      <label className="block text-secondary font-bold uppercase text-[11px]">
                        <span className="flex items-center gap-1.5"><Ruler className="w-3.5 h-3.5 text-purple-400" /> Road Length / Target Span Area</span>
                      </label>
                      <Input
                        {...register('roadLength')}
                        placeholder="e.g. 4.2 km continuous lane"
                        error={errors.roadLength?.message}
                      />
                    </div>

                    {/* Material Grade Specification */}
                    <div className="space-y-2">
                      <label className="block text-secondary font-bold uppercase text-[11px]">
                        <span className="flex items-center gap-1.5"><Layers className="w-3.5 h-3.5 text-blue-400" /> Material Type & Density Grade</span>
                      </label>
                      <Input
                        {...register('materialType')}
                        placeholder="e.g. M40 Grade Concrete / Polymer Asphalt"
                        error={errors.materialType?.message}
                      />
                    </div>

                    {/* Weather & Lighting Conditions */}
                    <div className="space-y-2 sm:col-span-2">
                      <label className="flex items-center justify-between text-secondary font-bold uppercase text-[11px]">
                        <span className="flex items-center gap-1.5"><CloudSun className="w-3.5 h-3.5 text-yellow-400" /> Weather & Optical Visibility Conditions</span>
                        <span className="text-secondary/70 text-[10px]">REQUIRED FOR AI NOISE CALIBRATION</span>
                      </label>
                      <Input
                        {...register('weather')}
                        placeholder="e.g. Clear Sky, Dry Asphalt, 28°C Ambient Temperature"
                        error={errors.weather?.message}
                      />
                    </div>

                    {/* Technical Description */}
                    <div className="space-y-2 sm:col-span-2">
                      <label className="flex items-center justify-between text-secondary font-bold uppercase text-[11px]">
                        <span>Structural Work Description & Repair Evidence</span>
                        <span className="text-secondary/70 text-[10px]">MIN 15 CHARACTERS</span>
                      </label>
                      <textarea
                        {...register('description')}
                        rows={3}
                        placeholder="Provide detailed engineering narrative on asphalt leveling, pothole filling, or pier concrete casting..."
                        className="w-full px-4 py-3 bg-surface border border-subtle focus:border-cyan-500 rounded-xl text-primary placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-all resize-none text-xs font-mono"
                      />
                      {errors.description && <span className="text-rose-400 text-[11px] font-bold block">{errors.description.message}</span>}
                    </div>

                    {/* Optional Notes & Exceptions */}
                    <div className="space-y-2 sm:col-span-2">
                      <label className="block text-secondary font-bold uppercase text-[11px]">
                        Additional Field Engineering Notes (Optional)
                      </label>
                      <Input
                        {...register('notes')}
                        placeholder="e.g. Traffic diverted via temporary bypass lane during vibration compaction."
                      />
                    </div>

                  </div>

                  <div className="p-4 rounded-2xl bg-surface border border-accent-indigo/30 flex items-center justify-between flex-wrap gap-4 pt-4 mt-2">
                    <div className="flex items-center gap-2 text-xs text-secondary">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span>By submitting, you initiate an instantaneous HTTP 402 AI evaluation ($0.05 USDC verification fee) under Smart India Hackathon sovereign rules.</span>
                    </div>

                    <Button
                      type="submit"
                      variant="x402"
                      size="lg"
                      disabled={isSubmitting || uploadedFiles.length === 0}
                      icon={<Send className="w-5 h-5 fill-current animate-pulse" />}
                      className="w-full sm:w-auto font-sans font-black tracking-wider shadow-2xl px-8"
                    >
                      🚀 Submit Proof & Trigger Auto-Settlement
                    </Button>
                  </div>
                </form>
              </Card>
            </div>

            {/* RIGHT 1 COL: PROJECT SPEC INFORMATION DECK & STATUS BOX */}
            <div className="space-y-6">
              
              {/* Linear-Style Project Information Specification Card */}
              <Card className="p-6 bg-surface border border-subtle shadow-xl space-y-6">
                <div className="flex items-center justify-between border-b border-subtle pb-4">
                  <div>
                    <h3 className="text-base font-extrabold text-primary font-sans uppercase tracking-wider flex items-center gap-2">
                      <Building2 className="w-5 h-5 text-accent-indigo" />
                      <span>Project Specification Hub</span>
                    </h3>
                    <span className="text-xs text-secondary font-mono">Target Highway Infrastructure</span>
                  </div>
                  <Badge variant="pulse" size="sm">ACTIVE PORTAL</Badge>
                </div>

                <div className="space-y-4 font-mono text-xs">
                  <div className="space-y-1">
                    <span className="text-[10px] text-secondary uppercase font-bold block">Project Name:</span>
                    <span className="text-sm font-black text-primary font-sans block leading-tight">
                      NH-44 Expressway Re-surfacing & Bridge Augmentation
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2 border-t border-subtle">
                    <div>
                      <span className="text-[10px] text-secondary uppercase font-bold block">Road ID // Sector:</span>
                      <strong className="text-accent-indigo text-xs block">RD-2094 // SECTOR 12</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-secondary uppercase font-bold block">Target Location:</span>
                      <strong className="text-secondary font-black text-xs block truncate">Pune - Bangalore Highway</strong>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-subtle">
                    <span className="text-[10px] text-secondary uppercase font-bold block">Government Overseer Agency:</span>
                    <span className="text-primary font-bold block bg-surface-secondary p-2.5 rounded-xl border border-subtle mt-1 text-center">
                      🏛️ National Highways Authority of India (NHAI)
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2 border-t border-subtle">
                    <div className="bg-surface-secondary p-3 rounded-xl border border-subtle">
                      <span className="text-[10px] text-secondary uppercase font-bold block">Active Milestone:</span>
                      <span className="text-accent-gold font-black text-base font-sans block mt-0.5">Tranche 3 / 6</span>
                      <span className="text-[9px] text-secondary">Sub-grade paving</span>
                    </div>

                    <div className="bg-surface-secondary p-3 rounded-xl border border-subtle">
                      <span className="text-[10px] text-secondary uppercase font-bold block">Submission Deadline:</span>
                      <span className="text-primary font-black text-xs font-mono block mt-1">August 18, 2026</span>
                      <span className="text-[9px] text-accent-emerald">12 days remaining</span>
                    </div>
                  </div>

                  {/* PREMIUM THEME-AWARE ESCROW VAULT LOCK INDICATOR */}
                  <div className="p-5 rounded-2xl bg-surface-secondary border border-subtle text-center space-y-2 shadow-sm relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-accent-indigo/5 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="text-[11px] font-bold text-accent-indigo uppercase tracking-widest block relative z-10 flex items-center justify-center gap-1.5">
                      <Lock className="w-3.5 h-3.5" /> Escrow Amount Secured:
                    </span>
                    <div className="text-3xl font-black text-primary font-sans tracking-tight relative z-10">
                      ₹14,50,000 <span className="text-xs font-mono text-secondary">USDC</span>
                    </div>
                    <span className="text-[10px] font-mono text-secondary block border-t border-subtle/50 pt-2 mt-2 relative z-10">
                      Smart Vault: <strong className="text-accent-emerald select-all">0x7a89...E391</strong>
                    </span>
                  </div>

                  {/* Live Verification Status Badge */}
                  <div className="flex items-center justify-between p-3.5 rounded-xl bg-surface-secondary border border-subtle">
                    <span className="text-secondary font-bold">Verification Status:</span>
                    <Badge variant={overallWorkflowState === 'approved' ? 'emerald' : overallWorkflowState === 'ai_processing' ? 'indigo' : 'amber'}>
                      {overallWorkflowState === 'approved' ? '✔ SETTLED & PAID' : overallWorkflowState === 'ai_processing' ? '⚙ AI EVALUATING (1.4s)' : 'AWAITING PROOF BUNDLE'}
                    </Badge>
                  </div>
                </div>
              </Card>

              {/* Upload Status Live Stage Meter */}
              <Card className="p-5 bg-surface border border-subtle space-y-4">
                <h4 className="text-xs font-black text-primary uppercase tracking-wider flex items-center justify-between">
                  <span>Automated Verification Pipeline</span>
                  <span className="text-[10px] text-accent-indigo">LATENCY: 84ms</span>
                </h4>

                <div className="space-y-2 font-mono text-xs">
                  {[
                    { state: 'Pending', desc: 'Awaiting field engineer files', done: uploadedFiles.length > 0 },
                    { state: 'Uploading', desc: 'Syncing to decentralized vault', done: overallWorkflowState !== 'idle' },
                    { state: 'AI Processing', desc: 'Vision AI 98.4% precision scan', done: overallWorkflowState === 'ai_processing' || overallWorkflowState === 'approved' },
                    { state: 'Verified & Approved', desc: 'x402 Macaroon contract unlocked', done: overallWorkflowState === 'approved' },
                  ].map((step, idx) => (
                    <div key={idx} className={`p-2.5 rounded-xl border flex items-center justify-between ${
                      step.done ? 'bg-accent-emerald/10 border-accent-emerald/40 text-accent-emerald' : 'bg-surface-secondary border-subtle text-secondary'
                    }`}>
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${step.done ? 'bg-accent-emerald animate-pulse' : 'bg-subtle'}`} />
                        <span className="font-bold">{step.state}</span>
                      </div>
                      <span className="text-[10px] font-mono opacity-80">{step.desc}</span>
                    </div>
                  ))}
                </div>
              </Card>

            </div>

          </motion.div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: MEDIA GALLERY & FULLSCREEN LIGHTBOX THEATER */}
        {/* ========================================================================= */}
        {activeTab === 'gallery' && (
          <motion.div
            key="tab-gallery"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6 gsap-reveal"
          >
            <div className="flex items-center justify-between bg-surface p-5 rounded-2xl border border-subtle flex-wrap gap-4">
              <div>
                <h3 className="text-lg font-black text-primary font-sans uppercase tracking-tight flex items-center gap-2">
                  <ImageIcon className="w-5 h-5 text-accent-indigo" />
                  <span>Sovereign Proof Media Gallery & Digital Twins</span>
                </h3>
                <p className="text-xs text-secondary font-mono mt-0.5">Historical repository of timestamped drone video feeds, surface scans, and lab test certificates.</p>
              </div>
              <Badge variant="cyan">IMMUTABLE REPOSITORY // 4 FILES STORED</Badge>
            </div>

            {/* Grid of Media Items with Smooth Apple Hover Glows */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              {initialMediaGallery.map((media) => (
                <Card
                  key={media.id}
                  className="p-0 overflow-hidden group hover:border-accent-indigo transition-all duration-300 hover:shadow-sm flex flex-col justify-between bg-surface"
                >
                  <div className="relative h-52 w-full bg-surface-secondary overflow-hidden cursor-pointer" onClick={() => setLightboxItem(media)}>
                    <img
                      src={media.url}
                      alt={media.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-85 group-hover:opacity-100"
                    />
                    
                    {/* Media type icon floating tag */}
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-surface/90 border border-subtle text-[10px] font-mono font-bold text-primary flex items-center gap-1.5 backdrop-blur-md">
                      {media.type === 'video' ? <VideoIcon className="w-3 h-3 text-purple-400" /> :
                       media.type === 'doc' ? <FileText className="w-3 h-3 text-amber-400" /> :
                       <ImageIcon className="w-3 h-3 text-emerald-400" />}
                      <span className="uppercase">{media.type}</span>
                    </div>

                    <div className="absolute top-3 right-3">
                      <Badge variant="emerald" size="sm" icon={<Check className="w-3 h-3" />}>
                        {media.score}% AI
                      </Badge>
                    </div>

                    {/* Hover zoom trigger overlay */}
                    <div className="absolute inset-0 bg-cyan-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                      <span className="p-3 rounded-2xl bg-cyan-500/20 text-cyan-300 border border-cyan-400 shadow-xl font-bold text-xs flex items-center gap-2">
                        <Maximize2 className="w-4 h-4" /> Fullscreen Preview
                      </span>
                    </div>
                  </div>

                  <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                    <h4 className="text-sm font-extrabold text-primary font-sans truncate" title={media.title}>
                        {media.title}
                      </h4>
                      <div className="text-[11px] text-secondary font-mono flex items-center justify-between pt-1">
                        <span>{media.milestone}</span>
                        {media.score && <span className="text-purple-500 font-black">{media.score}% AI</span>}
                      </div>
                      <div className="text-[10px] text-secondary/70 font-mono">
                        Captured: {media.timestamp}
                      </div>

                    <div className="pt-3 border-t border-subtle flex items-center justify-between gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        icon={<Eye className="w-3 h-3" />}
                        onClick={() => setLightboxItem(media)}
                        className="w-full text-[11px]"
                      >
                        Inspect Digital Proof
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </motion.div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: TIMELINE & AUTOMATED SETTLEMENT TRAIL */}
        {/* ========================================================================= */}
        {activeTab === 'timeline' && (
          <motion.div
            key="tab-timeline"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="max-w-4xl mx-auto space-y-6 gsap-reveal"
          >
              <Card className="p-8 border border-subtle bg-surface shadow-xl space-y-8">
              <div className="flex items-center justify-between border-b border-subtle pb-5 flex-wrap gap-4">
                <div>
                  <h3 className="text-xl font-black text-primary font-sans uppercase tracking-tight flex items-center gap-2.5">
                    <Activity className="w-6 h-6 text-accent-indigo animate-pulse" />
                    <span>L402 Immutable Settlement Timeline</span>
                  </h3>
                  <p className="text-xs text-secondary font-mono mt-1">Chronological tracking from EXIF GPS upload to 84ms machine banking execution.</p>
                </div>
                <Badge variant="emerald">ZERO BUREAUCRACY // L402 MACAROON</Badge>
              </div>

              {/* Vertical Timeline Primitive */}
              <div className="px-2">
                <Timeline items={timelineSteps} />
              </div>

              <div className="p-5 rounded-2xl bg-surface border border-accent-indigo/30 flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-3 text-xs text-secondary">
                  <Clock className="w-5 h-5 text-accent-gold animate-spin-slow" />
                  <span>Next Tranche Scheduled: <strong className="text-primary">Tranche 4 (Polymer Emulsion Layer)</strong></span>
                </div>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => runLiveSimulation()}
                >
                  ▶ Test Payout Simulation
                </Button>
              </div>
            </Card>
          </motion.div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: ANIMATED NOTIFICATION CENTER */}
        {/* ========================================================================= */}
        {activeTab === 'notifications' && (
          <motion.div
            key="tab-notifications"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="max-w-3xl mx-auto space-y-5 gsap-reveal"
          >
            <div className="flex items-center justify-between p-2">
              <h3 className="text-base font-extrabold text-primary uppercase tracking-wider">
                Field Notifications & AI Alerts Hub
              </h3>
              <Button variant="ghost" size="sm" onClick={() => setNotifications([])}>
                Clear All Feed
              </Button>
            </div>

            {notifications.length === 0 ? (
              <div className="p-16 text-center text-secondary/70 bg-surface rounded-2xl border border-subtle font-mono text-xs">
                ✔ All notifications cleared. No pending warnings or action requests.
              </div>
            ) : (
              notifications.map((n) => (
                <NotificationCard
                  key={n.id}
                  title={n.title}
                  description={n.description}
                  severity={n.type}
                  timestamp={n.time}
                  actionText="Dismiss"
                  onAction={() => setNotifications(prev => prev.filter(item => item.id !== n.id))}
                />
              ))
            )}
          </motion.div>
        )}

      </AnimatePresence>

      {/* ========================================================================= */}
      {/* FULLSCREEN LIGHTBOX PREVIEW MODAL FOR MEDIA GALLERY & DROPZONE */}
      {/* ========================================================================= */}
      {lightboxItem && (
        <Modal
          isOpen={!!lightboxItem}
          onClose={() => setLightboxItem(null)}
          title={`Digital Proof Inspection // ${lightboxItem.title}`}
          subtitle={`Milestone: ${lightboxItem.milestone} • Timestamp: ${lightboxItem.timestamp}`}
          size="xl"
          headerBadge={lightboxItem.verified ? "AI VERIFIED PROOF" : "IN REVIEW"}
        >
          <div className="space-y-6 font-mono">
            {/* Media Rendering Box */}
            <div className="p-3 rounded-2xl bg-surface border border-accent-indigo/40 text-center flex items-center justify-center min-h-[400px] max-h-[600px] overflow-hidden">
              {lightboxItem.type === 'image' ? (
                <img src={lightboxItem.url} alt={lightboxItem.title} className="max-h-[550px] object-contain rounded-xl shadow-2xl" />
              ) : lightboxItem.type === 'video' ? (
                <div className="space-y-4">
                  <div className="w-24 h-24 mx-auto bg-purple-500/10 rounded-full flex items-center justify-center border border-purple-500/30">
                    <Play className="w-10 h-10 text-purple-500 ml-1" />
                  </div>
                  <h4 className="text-base font-black text-primary font-sans">4K Drone LiDAR Stream Active</h4>
                  <p className="text-xs text-secondary">Streamed from decentralized IPFS node with zero loss quality.</p>
                  <Button variant="outline" icon={<Play className="w-4 h-4 text-cyan-400" />} onClick={() => alert('Playing 4K stream...')}>
                    Launch Playback Buffer
                  </Button>
                </div>
              ) : (
                <div className="w-full space-y-4 text-center py-16">
                  <div className="w-24 h-24 mx-auto bg-amber-500/10 rounded-full flex items-center justify-center border border-amber-500/30">
                    <FileText className="w-10 h-10 text-amber-500" />
                  </div>
                  <h4 className="text-base font-black text-primary font-sans">Engineering Lab Stress Test PDF</h4>
                  <p className="text-xs text-secondary">Cryptographically stamped with RSA-4096 signature for Ministry audit.</p>
                  <Button variant="primary" icon={<ExternalLink className="w-4 h-4" />} onClick={() => window.open(lightboxItem.url, '_blank')}>
                    Open Document in Viewer
                  </Button>
                </div>
              )}
            </div>

            {/* Technical Verification Readout */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-surface border border-subtle space-y-1">
                <span className="text-secondary block text-[10px] font-bold uppercase">AI Structural Confidence:</span>
                <strong className="text-purple-500 font-sans text-xl">98.4%</strong>
                <span className="text-[9px] text-secondary/70 block">Threshold &gt; 90% passed</span>
              </div>
              <div className="p-4 rounded-xl bg-surface border border-subtle space-y-1">
                <span className="text-secondary block text-[10px] font-bold uppercase">EXIF GPS Anchor:</span>
                <strong className="text-cyan-500 font-sans text-xl">VALID</strong>
                <span className="text-[9px] text-secondary/70 block">Locked to NH-44 geo-fence</span>
              </div>
              <div className="p-4 rounded-xl bg-surface border border-subtle space-y-1">
                <span className="text-secondary block text-[10px] font-bold uppercase">Settlement Receipt:</span>
                <strong className="text-accent-emerald font-sans text-xl">84ms</strong>
                <span className="text-[9px] text-secondary/70 block">Zero human hold latency</span>
              </div>
            </div>

            <div className="pt-4 border-t border-subtle flex justify-end gap-3">
              <Button variant="primary" onClick={() => setLightboxItem(null)}>
                Close Lightbox Preview
              </Button>
            </div>
          </div>
        </Modal>
      )}

    </div>
  );
};
