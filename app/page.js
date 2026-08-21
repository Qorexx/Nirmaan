'use client';

import React, { useState, useEffect } from 'react';
import GlassNavbar from '@/components/GlassNavbar';
import HeroSection from '@/components/HeroSection';
import GovernmentDashboard from '@/components/GovernmentDashboard';
import ContractorPortal from '@/components/ContractorPortal';
import AutonomousActionLog from '@/components/AutonomousActionLog';
import AnalyticsSection from '@/components/AnalyticsSection';

import {
  INITIAL_PROJECTS,
  INITIAL_LEDGER,
  executeX402VerificationWorkflow,
} from '@/lib/nirmaanState';

export default function Home() {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'dashboard' | 'contractor' | 'autonomous' | 'analytics'
  const [projects, setProjects] = useState(INITIAL_PROJECTS);
  const [ledger, setLedger] = useState(INITIAL_LEDGER);
  const [theme, setTheme] = useState('dark');

  // Toggle theme handler
  const handleToggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'bright' : 'dark';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Workflow state
  const [currentStep, setCurrentStep] = useState(0);
  const [logs, setLogs] = useState([]);
  const [isExecuting, setIsExecuting] = useState(false);
  const [lastResult, setLastResult] = useState(null);

  // Toast state
  const [toasts, setToasts] = useState([]);

  const addToast = (msg, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, msg, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 5000);
  };

  const totalEscrowBalance = projects.reduce((acc, p) => acc + p.escrowLocked, 0);

  // Core proof submission handler — connects to Chapter 4 AI Oracle
  const handleProofSubmission = async ({ projectId, milestoneId, proofType, proofPayload }) => {
    setActiveTab('autonomous');
    setIsExecuting(true);
    setCurrentStep(1);
    setLogs([]);
    setLastResult(null);

    const result = await executeX402VerificationWorkflow({
      projectId,
      milestoneId,
      proofType,
      proofPayload,
      onStepChange: (step) => setCurrentStep(step),
      onLogMessage: (log) => setLogs((prev) => [...prev, log]),
    });

    setIsExecuting(false);

    if (!result?.apiData) return;
    setLastResult(result.apiData);

    const targetProj = projects.find((p) => p.id === projectId);

    if (result.apiData.verified) {
      setProjects((prev) =>
        prev.map((proj) => {
          if (proj.id !== projectId) return proj;
          const mPayout = proj.milestones.find((m) => m.id === milestoneId)?.payout || 350000;
          return {
            ...proj,
            escrowReleased: proj.escrowReleased + mPayout,
            escrowLocked: Math.max(0, proj.escrowLocked - mPayout),
            progress: Math.min(100, proj.progress + 30),
            milestones: proj.milestones.map((m) =>
              m.id === milestoneId
                ? { ...m, status: 'VERIFIED', proof: proofPayload, score: result.apiData.confidenceScore }
                : m
            ),
          };
        })
      );
      addToast(`✅ Milestone ${milestoneId} verified — escrow released`, 'success');
    } else {
      addToast(`❌ Submission rejected — structural defect detected`, 'error');
    }

    const mPayout = targetProj?.milestones.find((m) => m.id === milestoneId)?.payout || 400000;
    setLedger((prev) => [
      {
        id: `tx-${Date.now().toString().slice(-5)}`,
        timestamp: new Date().toISOString(),
        projectId,
        projectName: targetProj?.name || projectId,
        milestoneId,
        amount: result.apiData.verified ? mPayout : 0,
        status: result.apiData.verified ? 'RELEASED' : 'REJECTED',
        txHash: result.txHash?.slice(0, 14) + '…' || '0x402a…',
        aiConfidence: `${((result.apiData.confidenceScore || 0.95) * 100).toFixed(0)}%`,
        message: result.apiData.message,
      },
      ...prev,
    ]);
  };

  const handleRunPresentationDemo = () => {
    handleProofSubmission({
      projectId: 'proj-nh48',
      milestoneId: 2,
      proofType: 'image',
      proofPayload: 'https://nirmaan.gov/proofs/highway-grade-a-asphalt-complete.jpg',
    });
  };

  const handleGovernmentVerifyTrigger = (projectId, milestoneId) => {
    handleProofSubmission({
      projectId,
      milestoneId,
      proofType: 'image',
      proofPayload: 'https://nirmaan.gov/proofs/verified-infrastructure-milestone.jpg',
    });
  };

  return (
    <div className="page-root" data-theme={theme}>
      {/* Aurora Ambient Background */}
      <div className="aurora-bg" aria-hidden="true">
        <div className="aurora-orb-1" />
        <div className="aurora-orb-2" />
        <div className="aurora-grid" />
      </div>

      {/* Floating Glass Navbar */}
      <GlassNavbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        escrowBalance={totalEscrowBalance}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />

      {/* Main Page View */}
      <div className="page-content">
        {activeTab === 'overview' && (
          <HeroSection onGetStarted={() => setActiveTab('dashboard')} />
        )}

        {activeTab !== 'overview' && (
          <main className="main-container">
            {activeTab === 'dashboard' && (
              <GovernmentDashboard
                projects={projects}
                ledger={ledger}
                onVerifyClick={handleGovernmentVerifyTrigger}
              />
            )}

            {activeTab === 'contractor' && (
              <ContractorPortal
                projects={projects}
                onSubmitProof={handleProofSubmission}
              />
            )}

            {activeTab === 'autonomous' && (
              <AutonomousActionLog
                currentStep={currentStep}
                logs={logs}
                isExecuting={isExecuting}
                onRunDemo={handleRunPresentationDemo}
                onClearLogs={() => {
                  setLogs([]);
                  setLastResult(null);
                  setCurrentStep(0);
                }}
                lastResult={lastResult}
              />
            )}

            {activeTab === 'analytics' && <AnalyticsSection />}
          </main>
        )}
      </div>

      {/* Toast Notifications */}
      <div className="toast-container">
        {toasts.map((t) => (
          <div key={t.id} className={`toast ${t.type}`}>
            <span>{t.type === 'success' ? '✅' : '❌'}</span>
            <span>{t.msg}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
