'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Cpu, HardHat, Wallet, X, Zap, Building, Sparkles, Fingerprint, Loader2, ArrowRight } from 'lucide-react';
import { useEscrowStore, AuthUser } from '@/lib/store';
import { Badge } from '@/components/ui/Badge';

export const LoginModal: React.FC = () => {
  const { isLoginModalOpen, setLoginModalOpen, loginUser, currentUser } = useEscrowStore();
  const [selectedMethod, setSelectedMethod] = useState<'persona' | 'web3' | 'digilocker'>('persona');
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authStep, setAuthStep] = useState('');

  const personas = [
    {
      name: 'Dr. Aravind V.',
      role: 'Gov Chief Arbiter & Ministry Auditor',
      department: 'Ministry of Road Transport & Highways (MoRTH)',
      address: '0x9a4F...3B9c',
      avatarInitials: 'GV',
      icon: <ShieldCheck className="w-5 h-5 text-[var(--color-accent-indigo)]" />,
      desc: 'Full sovereign oversight privileges, manual override controls, and treasury access.',
    },
    {
      name: 'L&T Infra Lead (Rajesh K.)',
      role: 'Tier-1 Infrastructure Contractor',
      department: 'Commercial Engineering Division',
      address: '0x7b2C...A922',
      avatarInitials: 'LT',
      icon: <HardHat className="w-5 h-5 text-[var(--color-accent-emerald)]" />,
      desc: 'Access to Contractor Workspace, proof submission, and instant settlement alerts.',
    },
    {
      name: 'Vision AI Node #01',
      role: 'Autonomous Spatial Inspector',
      department: 'Spatial AI & Satellite Grid',
      address: '0x402A...E810',
      avatarInitials: 'AI',
      icon: <Cpu className="w-5 h-5 text-purple-500" />,
      desc: 'Machine-to-machine x402 payment executor with 99.4% autonomous verification precision.',
    },
    {
      name: 'External Auditor',
      role: 'Sovereign Compliance Reviewer',
      department: 'National Infrastructure Audit Council',
      address: '0xAUD1...026F',
      avatarInitials: 'AU',
      icon: <Sparkles className="w-5 h-5 text-amber-500" />,
      desc: 'Full demonstration mode access, real-time triggers, and complete audit transparency.',
    },
  ];

  const handlePersonaSelect = (persona: any) => {
    setIsAuthenticating(true);
    setAuthStep('Verifying Cryptographic Identity...');
    setTimeout(() => {
      setAuthStep('Stamping Macaroon Session Key...');
      setTimeout(() => {
        setIsAuthenticating(false);
        setAuthStep('');
        loginUser({
          name: persona.name,
          role: persona.role,
          department: persona.department,
          address: persona.address,
          avatarInitials: persona.avatarInitials,
        });
      }, 700);
    }, 600);
  };

  const handleWeb3Login = () => {
    setIsAuthenticating(true);
    setAuthStep('Requesting Web3 Wallet Signature...');
    setTimeout(() => {
      setAuthStep('Validating L402 Macaroon Gas Tokens...');
      setTimeout(() => {
        setIsAuthenticating(false);
        setAuthStep('');
        loginUser({
          name: 'Sovereign Web3 Identity',
          role: 'Decentralized Validator Node',
          department: 'On-Chain Consensus Layer',
          address: '0x4029...F881',
          avatarInitials: 'W3',
        });
      }, 900);
    }, 800);
  };

  if (!isLoginModalOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/30 backdrop-blur-md p-4 sm:p-6 font-mono"
        onClick={() => setLoginModalOpen(false)}
      >
        <motion.div
          initial={{ scale: 0.95, y: 20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.95, y: 20, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-3xl overflow-hidden rounded-3xl bg-[var(--color-bg-surface)] border border-[var(--color-border-subtle)] shadow-2xl text-[var(--color-text-primary)]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-6 bg-[var(--color-bg-surface-secondary)] border-b border-[var(--color-border-subtle)] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[var(--color-accent-indigo)] to-indigo-800 p-[2px] shadow-md">
                <div className="w-full h-full bg-[var(--color-bg-surface)] rounded-[14px] flex items-center justify-center">
                  <Fingerprint className="w-5 h-5 text-[var(--color-accent-indigo)] animate-pulse" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-[var(--color-text-primary)] font-heading tracking-tight flex items-center gap-2">
                  <span>Enterprise Authentication</span>
                  <Badge variant="cyan" size="sm">L402 SSO</Badge>
                </h3>
                <p className="text-xs text-[var(--color-text-secondary)] font-mono">Sign in or switch personas to access platform capabilities</p>
              </div>
            </div>
            <button
              onClick={() => setLoginModalOpen(false)}
              className="p-2 rounded-xl bg-[var(--color-bg-surface)] hover:bg-[var(--color-bg-surface-secondary)] border border-[var(--color-border-subtle)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 sm:p-8 space-y-6 bg-[var(--color-bg-surface)]">
            {/* Method Tabs */}
            <div className="flex items-center gap-2 p-1.5 bg-[var(--color-bg-surface-secondary)] rounded-2xl border border-[var(--color-border-subtle)] text-xs font-sans">
              {[
                { id: 'persona' as const, label: '🎭 Quick-Access Personas' },
                { id: 'web3' as const, label: '⛓️ Web3 L402 Passkey' },
                { id: 'digilocker' as const, label: '🏛️ DigiLocker / Aadhaar SSO' },
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => setSelectedMethod(m.id)}
                  className={`flex-1 py-2.5 px-3 rounded-xl font-bold transition-all text-center select-none ${
                    selectedMethod === m.id
                      ? 'bg-[var(--color-bg-surface)] text-[var(--color-text-primary)] shadow-sm border border-[var(--color-border-subtle)]'
                      : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>

            {isAuthenticating ? (
              <div className="py-16 text-center space-y-4">
                <Loader2 className="w-12 h-12 text-[var(--color-accent-indigo)] animate-spin mx-auto" />
                <div className="text-lg font-bold text-[var(--color-text-primary)] font-heading">{authStep}</div>
                <p className="text-xs text-[var(--color-text-secondary)] font-mono max-w-sm mx-auto">
                  Establishing RSA-4096 handshake and mounting zero-latency smart contract allowances...
                </p>
              </div>
            ) : (
              <>
                {selectedMethod === 'persona' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs text-[var(--color-text-secondary)] px-1 font-sans">
                      <span>Select a persona to inspect the platform under that role:</span>
                      <span className="text-[var(--color-accent-indigo)] font-bold font-mono">4 Verified Personas</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {personas.map((p, i) => (
                        <div
                          key={i}
                          onClick={() => handlePersonaSelect(p)}
                          className={`p-4 rounded-2xl bg-[var(--color-bg-surface-secondary)] hover:bg-[var(--color-bg-surface-secondary)] border border-[var(--color-border-subtle)] hover:border-[var(--color-accent-indigo)] transition-all cursor-pointer shadow-sm hover:shadow-md space-y-3 group ${
                            currentUser.name === p.name ? 'ring-2 ring-[var(--color-accent-indigo)] border-[var(--color-accent-indigo)]' : ''
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex items-center gap-2.5">
                              <span className="p-2 rounded-xl bg-[var(--color-bg-surface)] border border-[var(--color-border-subtle)] group-hover:scale-110 transition-transform">
                                {p.icon}
                              </span>
                              <div>
                                <h4 className="text-sm font-bold text-[var(--color-text-primary)] font-heading group-hover:text-[var(--color-accent-indigo)] transition-colors">
                                  {p.name}
                                </h4>
                                <span className="text-[10px] text-[var(--color-text-secondary)] font-mono block">{p.role}</span>
                              </div>
                            </div>
                            {currentUser.name === p.name && (
                              <span className="px-2 py-0.5 rounded-full bg-[var(--color-accent-indigo)] text-white font-bold text-[9px]">ACTIVE</span>
                            )}
                          </div>
                          <p className="text-[11px] text-[var(--color-text-secondary)] font-mono leading-normal line-clamp-2">{p.desc}</p>
                          <div className="pt-2 border-t border-[var(--color-border-subtle)] flex items-center justify-between text-[10px] font-mono text-[var(--color-text-secondary)]">
                            <span>{p.department}</span>
                            <span className="text-[var(--color-accent-indigo)] font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                              Login <ArrowRight className="w-3 h-3" />
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selectedMethod === 'web3' && (
                  <div className="py-8 text-center max-w-md mx-auto space-y-6">
                    <div className="w-20 h-20 rounded-3xl bg-[var(--color-bg-surface-secondary)] border border-[var(--color-border-subtle)] flex items-center justify-center mx-auto shadow-md">
                      <Wallet className="w-10 h-10 text-[var(--color-accent-indigo)]" />
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-lg font-bold text-[var(--color-text-primary)] font-heading">Connect Web3 L402 Passkey</h4>
                      <p className="text-xs text-[var(--color-text-secondary)] font-mono leading-relaxed">
                        Authenticate directly via MetaMask, Ledger, or HTTP 402 Lightning Macaroon without central passwords.
                      </p>
                    </div>
                    <button
                      onClick={handleWeb3Login}
                      className="w-full px-6 py-3 rounded-xl bg-[var(--color-accent-indigo)] text-white font-bold font-heading flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-md"
                    >
                      <Zap className="w-5 h-5 text-amber-300" />
                      Authenticate via L402 Wallet
                    </button>
                  </div>
                )}

                {selectedMethod === 'digilocker' && (
                  <div className="py-8 text-center max-w-md mx-auto space-y-6">
                    <div className="w-20 h-20 rounded-3xl bg-[var(--color-accent-emerald)]/10 border border-[var(--color-accent-emerald)]/20 flex items-center justify-center mx-auto shadow-md">
                      <Building className="w-10 h-10 text-[var(--color-accent-emerald)]" />
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-lg font-bold text-[var(--color-text-primary)] font-heading">National Government Identity (SSO)</h4>
                      <p className="text-xs text-[var(--color-text-secondary)] font-mono leading-relaxed">
                        Official gateway for National Highway Authority (NHAI) and MoRTH public service execution officers.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setIsAuthenticating(true);
                        setAuthStep('Connecting to National DigiLocker Gateway...');
                        setTimeout(() => {
                          setIsAuthenticating(false);
                          loginUser({
                            name: 'Shri K. S. Sharan (IAS)',
                            role: 'National Highway Secretary',
                            department: 'Government of India',
                            address: '0xGOV1...2026',
                            avatarInitials: 'GOV',
                          });
                        }, 1200);
                      }}
                      className="w-full px-6 py-3 rounded-xl bg-[var(--color-accent-emerald)]/10 text-[var(--color-accent-emerald)] border border-[var(--color-accent-emerald)]/30 font-bold font-heading flex items-center justify-center gap-2 hover:bg-[var(--color-accent-emerald)]/20 transition-all"
                    >
                      <ShieldCheck className="w-5 h-5" />
                      Verify via DigiLocker Sovereign ID
                    </button>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 bg-[var(--color-bg-surface-secondary)] border-t border-[var(--color-border-subtle)] text-center text-[11px] font-mono text-[var(--color-text-secondary)] flex flex-wrap items-center justify-between gap-2 px-6">
            <span>🔒 Cryptography: 256-bit ECDSA & L402 Macaroon Token</span>
            <span className="text-[var(--color-accent-emerald)] font-bold bg-[var(--color-accent-emerald)]/10 px-2 py-0.5 rounded-full border border-[var(--color-accent-emerald)]/20">● Zero Admin Backdoors</span>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
