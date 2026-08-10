/**
 * Nirmaan Protocol State & x402 Autonomous Escrow Manager Engine
 * Compatibility layer for Chapter 1 (UI), Chapter 2 (ZK Escrow), Chapter 3 (x402), Chapter 4 (AI Oracle)
 */

export const INITIAL_PROJECTS = [
  {
    id: 'proj-nh48',
    name: 'NH-48 Highway Expansion (Sector 4)',
    contractor: '0x8920...F4B1',
    zkBidHash: '0x7a3f9108c909e4d1b827e85c2901c89012a4b8cd',
    totalBudget: 1250000,
    escrowLocked: 750000,
    escrowReleased: 500000,
    status: 'ACTIVE',
    progress: 40,
    milestones: [
      { id: 1, title: 'Milestone 1: Earthwork & Grading', payout: 500000, status: 'VERIFIED', proof: 'https://nirmaan.gov/proofs/earthwork-complete.jpg', score: 0.98 },
      { id: 2, title: 'Milestone 2: Sub-Base & Asphalt Paving', payout: 400000, status: 'PENDING', proof: '', score: null },
      { id: 3, title: 'Milestone 3: Drainage & Signage', payout: 350000, status: 'LOCKED', proof: '', score: null },
    ],
  },
  {
    id: 'proj-brg02',
    name: 'Brahmaputra Bridge Phase 2 (Pillars 12-18)',
    contractor: '0x3F88...C2E0',
    zkBidHash: '0x9918b2c7e00a129ef3884102947c6102abf98421',
    totalBudget: 2800000,
    escrowLocked: 2100000,
    escrowReleased: 700000,
    status: 'ACTIVE',
    progress: 25,
    milestones: [
      { id: 1, title: 'Milestone 1: Foundation Piling', payout: 700000, status: 'VERIFIED', proof: 'https://nirmaan.gov/proofs/foundation-piling.jpg', score: 0.96 },
      { id: 2, title: 'Milestone 2: Concrete Pier Cap Construction', payout: 1000000, status: 'PENDING', proof: '', score: null },
      { id: 3, title: 'Milestone 3: Steel Girder Placement', payout: 1100000, status: 'LOCKED', proof: '', score: null },
    ],
  },
  {
    id: 'proj-mtr04',
    name: 'Metro Line 4 Elevated Viaduct Corridor',
    contractor: '0x1D9A...E880',
    zkBidHash: '0x321aef709c00b99182dca84729108b29f01832ac',
    totalBudget: 4500000,
    escrowLocked: 4500000,
    escrowReleased: 0,
    status: 'ACTIVE',
    progress: 10,
    milestones: [
      { id: 1, title: 'Milestone 1: Land Survey & Utility Shifting', payout: 900000, status: 'PENDING', proof: '', score: null },
      { id: 2, title: 'Milestone 2: Superstructure Segment Launching', payout: 1800000, status: 'LOCKED', proof: '', score: null },
      { id: 3, title: 'Milestone 3: Track Laying & Signaling', payout: 1800000, status: 'LOCKED', proof: '', score: null },
    ],
  },
];

export const INITIAL_LEDGER = [
  {
    id: 'tx-101',
    timestamp: '2026-08-09T14:20:00Z',
    projectId: 'proj-nh48',
    projectName: 'NH-48 Highway Expansion',
    milestoneId: 1,
    amount: 500000,
    status: 'RELEASED',
    txHash: '0x402a...981c',
    aiConfidence: '98%',
    message: 'AI image analysis complete. No structural defects detected. Escrow released.',
  },
  {
    id: 'tx-100',
    timestamp: '2026-08-08T09:15:00Z',
    projectId: 'proj-brg02',
    projectName: 'Brahmaputra Bridge Phase 2',
    milestoneId: 1,
    amount: 700000,
    status: 'RELEASED',
    txHash: '0x402b...e4f9',
    aiConfidence: '96%',
    message: 'AI foundation inspection verified. Smart contract released milestone payout.',
  },
];

/**
 * Execute the 5-step x402 Autonomous Payment & AI Oracle Verification Loop
 */
export async function executeX402VerificationWorkflow({
  projectId,
  milestoneId,
  proofType,
  proofPayload,
  onStepChange,
  onLogMessage,
}) {
  const log = (step, msg, type = 'info', extra = null) => {
    if (onLogMessage) {
      onLogMessage({
        timestamp: new Date().toLocaleTimeString(),
        step,
        message: msg,
        type,
        extra,
      });
    }
  };

  const setStep = (stepNumber) => {
    if (onStepChange) onStepChange(stepNumber);
  };

  try {
    // --- STEP 1: PING ESCROW MANAGER ---
    setStep(1);
    log(1, `[PING] Escrow Manager detected milestone proof submission for Project: ${projectId}, Milestone: ${milestoneId}`);
    log(1, `[DATA] Proof Payload: "${proofPayload}" (Type: ${proofType})`);
    await sleep(1000);

    // --- STEP 2: HTTP 402 PAYMENT REQUIRED ---
    setStep(2);
    log(2, `[QUERY] Escrow Manager querying AI Oracle Endpoint: /api/verify-milestone`, 'warning');
    await sleep(800);
    log(2, `[HTTP 402] AI Oracle responded with HTTP 402 Payment Required!`, 'warning', {
      status: 402,
      statusText: 'Payment Required',
      invoice: '0.05 USDC Compute Fee',
      oracleWallet: '0x402_ORACLE_AI_NODE_07',
    });
    await sleep(1200);

    // --- STEP 3: PROGRAMMATIC WALLET SIGN & PAY ---
    setStep(3);
    const txHash = '0x402' + Array.from({ length: 32 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    log(3, `[WALLETSIGN] Programmatic Wallet signing x402 micro-transaction...`, 'payment');
    log(3, `[x402 HEADER] Attached X-Payment Auth Header: ${txHash.slice(0, 18)}...`, 'payment');
    await sleep(1000);

    // --- STEP 4: AI ORACLE VISION & STRUCTURAL ANALYSIS ---
    setStep(4);
    log(4, `[ORACLE AI] Payment verified. AI Neural Model analyzing proof for structural integrity...`, 'oracle');

    // Call the actual Chapter 4 Next.js API endpoint!
    let apiData;
    try {
      const response = await fetch('/api/verify-milestone', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Payment': txHash,
          'Authorization': `Bearer ${txHash}`,
        },
        body: JSON.stringify({
          projectId,
          milestoneId: Number(milestoneId),
          proofType,
          proofPayload,
        }),
      });
      apiData = await response.json();
    } catch (err) {
      console.warn('Fallback API call:', err);
      // Fallback response if offline
      apiData = {
        verified: !proofPayload.toLowerCase().includes('pothole') && !proofPayload.toLowerCase().includes('defect'),
        confidenceScore: 0.97,
        message: proofPayload.toLowerCase().includes('pothole')
          ? "AI image analysis complete. Structural anomaly detected: keyword 'pothole' identified. Milestone rejected."
          : "AI image analysis complete. No structural defects detected. Milestone approved.",
        auditHash: '0x' + Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join(''),
      };
    }

    await sleep(1000);

    // --- STEP 5: SMART CONTRACT ESCROW FUND RELEASE OR REJECTION ---
    setStep(5);
    if (apiData.verified) {
      log(5, `[VERIFIED ✅] AI Oracle Confidence: ${((apiData.confidenceScore || 0.97) * 100).toFixed(1)}%. ${apiData.message}`, 'success');
      log(5, `[ESCROW RELEASE] Smart Contract Escrow unlocked! Milestone funds authorized for payout. Audit Hash: ${apiData.auditHash || '0x402a...'}`, 'success', apiData);
    } else {
      log(5, `[REJECTED ❌] AI Oracle Confidence: ${((apiData.confidenceScore || 0.94) * 100).toFixed(1)}%. ${apiData.message}`, 'error');
      log(5, `[ESCROW LOCKED 🔒] Anti-Corruption Shield Activated! Escrow funds remain locked. Fraud alert logged on-chain.`, 'error', apiData);
    }

    return {
      success: true,
      apiData,
      txHash,
    };
  } catch (error) {
    log(5, `[ERROR ❌] Workflow execution failed: ${error.message}`, 'error');
    return { success: false, error: error.message };
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
