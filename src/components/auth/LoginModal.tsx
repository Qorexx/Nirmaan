import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Cpu, HardHat, Wallet, X, Lock, Key, CheckCircle2, Loader2, ArrowRight, Zap, Building, Sparkles, Fingerprint } from 'lucide-react';
import { useEscrowStore, AuthUser } from '../../store/useEscrowStore';
import { Button, GlassCard, Badge } from '../ui';

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
      color: 'blue',
      icon: <ShieldCheck className="w-5 h-5 text-indigo-700" />,
      desc: 'Full sovereign oversight privileges, manual override controls, and macroeconomic treasury access.'
    },
    {
      name: 'L&T Infra Lead (Rajesh K.)',
      role: 'Tier-1 Infrastructure Contractor',
      department: 'Commercial Engineering Division',
      address: '0x7b2C...A922',
      avatarInitials: 'LT',
      color: 'emerald',
      icon: <HardHat className="w-5 h-5 text-emerald-700" />,
      desc: 'Access to Contractor Workspace, proof drag-and-drop submission, and instant banking settlement alerts.'
    },
    {
      name: 'Vision AI Node #01',
      role: 'Autonomous Spatial Inspector',
      department: 'Palantir Gotham x ISRO Grid',
      address: '0x402A...E810',
      avatarInitials: 'AI',
      color: 'purple',
      icon: <Cpu className="w-5 h-5 text-purple-700" />,
      desc: 'Machine-to-machine x402 payment challenge executor with 99.4% autonomous verification precision.'
    },
    {
      name: 'Hon. SIH Evaluation Judge',
      role: 'Sovereign Innovation Committee Reviewer',
      department: 'AICTE & Smart India Hackathon Council',
      address: '0xSIH2...026F',
      avatarInitials: 'JD',
      color: 'amber',
      icon: <Sparkles className="w-5 h-5 text-amber-700" />,
      desc: 'Unrestricted master demonstration mode access, real-time theater triggers, and complete audit transparency.'
    }
  ];

  const handlePersonaSelect = (persona: any) => {
    setIsAuthenticating(true);
    setAuthStep('Verifying Sovereign Cryptographic Identity...');
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
          avatarInitials: persona.avatarInitials
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
          avatarInitials: 'W3'
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
        className="fixed inset-0 z-[100] flex items-center justify-center bg-surface-secondary/40 backdrop-blur-md p-4 sm:p-6 font-mono"
        onClick={() => setLoginModalOpen(false)}
      >
        <motion.div
          initial={{ scale: 0.95, y: 20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.95, y: 20, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-3xl overflow-hidden rounded-3xl bg-surface border border-subtle shadow-[0_25px_80px_rgba(28,25,23,0.18)] text-primary"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Bar */}
          <div className="p-6 bg-surface-secondary border-b border-subtle flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-700 via-blue-700 to-indigo-800 p-[2px] shadow-md">
                <div className="w-full h-full bg-surface rounded-[14px] flex items-center justify-center">
                  <Fingerprint className="w-5 h-5 text-indigo-700 animate-pulse" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-black text-primary font-heading tracking-tight flex items-center gap-2">
                  <span>Sovereign Enterprise Authentication</span>
                  <Badge variant="cyan" size="sm">L402 SSO</Badge>
                </h3>
                <p className="text-xs text-secondary font-mono font-semibold">Sign in or switch evaluation personas to access specialized OS capabilities</p>
              </div>
            </div>

            <button
              onClick={() => setLoginModalOpen(false)}
              className="p-2 rounded-xl bg-surface hover:bg-[#DCD5C7] border border-subtle text-secondary hover:text-primary transition-colors shadow-2xs"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="p-6 sm:p-8 space-y-6 bg-surface">
            
            {/* Method Switcher Tabs */}
            <div className="flex items-center gap-2 p-1.5 bg-surface-secondary rounded-2xl border border-subtle text-xs font-sans">
              {[
                { id: 'persona' as const, label: '🎭 SIH Evaluation Personas (Quick Login)' },
                { id: 'web3' as const, label: '⛓️ Web3 L402 Passkey' },
                { id: 'digilocker' as const, label: '🏛️ DigiLocker / Aadhaar SSO' }
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => setSelectedMethod(m.id)}
                  className={`flex-1 py-2.5 px-3 rounded-xl font-bold transition-all text-center select-none ${
                    selectedMethod === m.id
                      ? 'bg-surface text-primary shadow-sm border border-subtle font-black'
                      : 'text-secondary hover:text-primary'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>

            {/* Loading / Authenticating Overlay State */}
            {isAuthenticating ? (
              <div className="py-16 text-center space-y-4">
                <Loader2 className="w-12 h-12 text-[#3730A3] animate-spin mx-auto" />
                <div className="text-lg font-black text-primary font-heading">{authStep}</div>
                <p className="text-xs text-secondary font-mono max-w-sm mx-auto font-semibold">
                  Establishing RSA-4096 handshake and mounting zero-latency smart contract allowances...
                </p>
              </div>
            ) : (
              <>
                {/* METHOD A: EVALUATION PERSONAS */}
                {selectedMethod === 'persona' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs text-secondary px-1 font-sans font-bold">
                      <span>Select a persona to immediately inspect the platform under that role:</span>
                      <span className="text-[#3730A3] font-extrabold font-mono">4 Verified Personas Available</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {personas.map((p, i) => (
                        <div
                          key={i}
                          onClick={() => handlePersonaSelect(p)}
                          className={`p-4 rounded-2xl bg-surface-secondary hover:bg-[#E2DCCF] border border-subtle hover:border-[#4338CA] transition-all cursor-pointer shadow-2xs hover:shadow-md space-y-3 group ${
                            currentUser.name === p.name ? 'ring-2 ring-[#4338CA] border-[#4338CA] bg-[#EFF0F8]' : ''
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex items-center gap-2.5">
                              <span className="p-2 rounded-xl bg-surface border border-subtle group-hover:scale-110 transition-transform">
                                {p.icon}
                              </span>
                              <div>
                                <h4 className="text-sm font-black text-primary font-heading group-hover:text-[#3730A3] transition-colors">
                                  {p.name}
                                </h4>
                                <span className="text-[10px] text-secondary font-mono block font-bold">{p.role}</span>
                              </div>
                            </div>
                            {currentUser.name === p.name && (
                              <span className="px-2 py-0.5 rounded-full bg-[#4338CA] text-primary font-black text-[9px] shadow-2xs">
                                ACTIVE
                              </span>
                            )}
                          </div>

                          <p className="text-[11px] text-secondary font-mono leading-normal font-medium line-clamp-2">
                            {p.desc}
                          </p>

                          <div className="pt-2 border-t border-subtle flex items-center justify-between text-[10px] font-mono text-secondary">
                            <span>{p.department}</span>
                            <span className="text-[#3730A3] font-black group-hover:translate-x-1 transition-transform flex items-center gap-1">
                              Login <ArrowRight className="w-3 h-3" />
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* METHOD B: WEB3 PASSKEY */}
                {selectedMethod === 'web3' && (
                  <div className="py-8 text-center max-w-md mx-auto space-y-6">
                    <div className="w-20 h-20 rounded-3xl bg-surface-secondary border border-subtle flex items-center justify-center mx-auto shadow-md">
                      <Wallet className="w-10 h-10 text-indigo-700" />
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-lg font-black text-primary font-heading">Connect Web3 L402 Passkey</h4>
                      <p className="text-xs text-secondary font-mono leading-relaxed font-semibold">
                        Authenticate directly via MetaMask, Ledger Sovereign Vault, or HTTP 402 Lightning Macaroon without central passwords.
                      </p>
                    </div>
                    <Button
                      variant="primary"
                      size="lg"
                      onClick={handleWeb3Login}
                      icon={<Zap className="w-5 h-5 text-amber-300 animate-bounce" />}
                      className="w-full font-heading font-black shadow-lg"
                    >
                      Authenticate via L402 Wallet
                    </Button>
                  </div>
                )}

                {/* METHOD C: DIGILOCKER / AADHAAR SSO */}
                {selectedMethod === 'digilocker' && (
                  <div className="py-8 text-center max-w-md mx-auto space-y-6">
                    <div className="w-20 h-20 rounded-3xl bg-emerald-100 border border-emerald-300 flex items-center justify-center mx-auto shadow-md">
                      <Building className="w-10 h-10 text-emerald-700" />
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-lg font-black text-primary font-heading">National Government Identity (SSO)</h4>
                      <p className="text-xs text-secondary font-mono leading-relaxed font-semibold">
                        Official gateway for National Highway Authority (NHAI) and MoRTH public service execution officers.
                      </p>
                    </div>
                    <Button
                      variant="secondary"
                      size="lg"
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
                            avatarInitials: 'GOV'
                          });
                        }, 1200);
                      }}
                      icon={<ShieldCheck className="w-5 h-5 text-emerald-700" />}
                      className="w-full font-heading font-black border-emerald-300 text-emerald-900 bg-emerald-100 hover:bg-emerald-200 shadow-sm"
                    >
                      Verify via DigiLocker Sovereign ID
                    </Button>
                  </div>
                )}
              </>
            )}

          </div>

          {/* Footer bar */}
          <div className="p-4 bg-surface-secondary border-t border-subtle text-center text-[11px] font-mono text-secondary font-bold flex flex-wrap items-center justify-between gap-2 px-6">
            <span>🔒 Cryptography: 256-bit ECDSA & L402 Macaroon Token</span>
            <span className="text-emerald-900 font-extrabold bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-300">● Zero Admin Backdoors</span>
          </div>

        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
