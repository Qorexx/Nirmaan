/**
 * Nirmaan Protocol State & x402 Autonomous Escrow Manager Engine
 * Compatibility layer for Chapter 1 (UI), Chapter 2 (ZK Escrow), Chapter 3 (x402), Chapter 4 (AI Oracle)
 */

export const INITIAL_PROJECTS = [
  {
    id: 'proj-nh48',
    name: 'NH-48 Highway Expansion (Sector 4)',
    lat: 28.5355,
    lng: 77.3910,
    contractor: '0x8920...F4B1',
    zkBidHash: '0x7a3f9108c909e4d1b827e85c2901c89012a4b8cd',
    totalBudget: 1250000,
    escrowLocked: 750000,
    escrowReleased: 500000,
    status: 'ACTIVE', // ACTIVE, TIME_LOCKED, DISPUTED, PFMS_SETTLED
    progress: 40,
    // The official Government baseline for fraud detection
    boq: {
      requiredEngineHours: 32, // Minimum JCB hours required
      requiredMaterialTons: 500, // Minimum Cement tons required
      requiredSteelGrade: 'Fe550D',
    },
    milestones: [
      { id: 1, title: 'Milestone 1: Earthwork & Grading', payout: 500000, status: 'VERIFIED', proof: 'https://nirmaan.gov/proofs/earthwork-complete.jpg', score: 0.98 },
      { 
        id: 2, 
        title: 'Milestone 2: Sub-Base & Asphalt Paving', 
        payout: 400000, 
        status: 'PENDING', 
        proof: '', 
        score: null,
        // New Defense Fields
        iotTelemetry: null,
        eWayBillHash: null,
        exifPayload: null,
        ganStatus: null,
        consensusStatus: null,
        timeLockExpiry: null,
        ipfsCID: null,
        stakedAmount: 0
      },
      { id: 3, title: 'Milestone 3: Drainage & Signage', payout: 350000, status: 'LOCKED', proof: '', score: null },
    ],
  },
  {
    id: 'proj-brg02',
    name: 'Brahmaputra Bridge Phase 2 (Pillars 12-18)',
    lat: 26.1420,
    lng: 91.7314,
    contractor: '0x3F88...C2E0',
    zkBidHash: '0x9918b2c7e00a129ef3884102947c6102abf98421',
    totalBudget: 2800000,
    escrowLocked: 2100000,
    escrowReleased: 700000,
    status: 'ACTIVE',
    progress: 25,
    boq: { requiredEngineHours: 120, requiredMaterialTons: 2000, requiredSteelGrade: 'Fe550D' },
    milestones: [
      { id: 1, title: 'Milestone 1: Foundation Piling', payout: 700000, status: 'VERIFIED', proof: 'https://nirmaan.gov/proofs/foundation-piling.jpg', score: 0.96 },
      { id: 2, title: 'Milestone 2: Concrete Pier Cap Construction', payout: 1000000, status: 'PENDING', proof: '', score: null },
      { id: 3, title: 'Milestone 3: Steel Girder Placement', payout: 1100000, status: 'LOCKED', proof: '', score: null },
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
];

/**
 * Executes the complex autonomous pipeline.
 */
export async function executeX402VerificationWorkflow({
  projectId,
  milestoneId,
  proofPayload,
  iotPayload,
  eWayBillHash,
  exifPayload,
  onStepChange,
  onLogMessage,
  fetchClient = fetch,
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
    // --- STEP 1: CAPTURE & PING ---
    setStep(1);
    log(1, `[PING] Escrow Manager detected Nirmaan Secure SDK submission for Project: ${projectId}`);
    log(1, `[DATA] EXIF/GPS: ${exifPayload ? 'Valid Signature' : 'MISSING'}`);
    await sleep(800);

    // --- STEP 2: PRE-PROCESSING GAN DISCRIMINATOR ---
    setStep(2);
    log(2, `[GAN CHECK] Passing visual data through Deepfake Discriminator...`);
    await sleep(1000);
    // Mock GAN check logic
    if (proofPayload.includes('ai-generated') || proofPayload.includes('stock')) {
      log(2, `[GAN FAILED ❌] Unnatural pixel noise detected. AI-generated image suspected.`, 'error');
      return { success: false, error: 'GAN Detection Failed. Forgery suspected.' };
    }
    log(2, `[GAN PASSED ✅] Physical camera lens noise confirmed.`, 'success');

    // --- STEP 3: HTTP 402 & WALLET SIGN ---
    setStep(3);
    log(3, `[QUERY] Escrow Manager querying Oracle Endpoints. HTTP 402 Payment Required.`, 'warning');
    await sleep(600);
    const txHash = '0x402' + Array.from({ length: 32 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    log(3, `[WALLETSIGN] Programmatic Wallet signing x402 micro-transaction: ${txHash}...`, 'payment');
    await sleep(800);

    // --- STEP 4: AI & IOT MATH PIPELINE (API CALL) ---
    setStep(4);
    log(4, `[ORACLE PIPELINE] Initiating BoQ vs IoT Math Check and Multi-Model AI Consensus...`, 'oracle');

    let apiData;
    try {
      const response = await fetchClient('/api/verify-milestone', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Payment': txHash },
        body: JSON.stringify({
          projectId,
          milestoneId: Number(milestoneId),
          proofType: 'image/jpeg',
          proofPayload,
          iotPayload,
          eWayBillHash
        }),
      });
      apiData = await response.json();
    } catch (err) {
      console.warn('Fallback API call:', err);
      apiData = {
        verified: false,
        message: 'Network error connecting to API',
        checks: {}
      };
    }
    await sleep(1000);

    // --- STEP 5: SMART CONTRACT EXECUTION ---
    setStep(5);
    if (apiData.verified) {
      log(5, `[CONSENSUS REACHED ✅] Gemini, Claude, and GPT-4o agreed.`, 'success');
      
      // Cryptographic Randomizer (5% IRS Effect)
      const auditRoll = Math.floor(Math.random() * 100);
      log(5, `[SMART CONTRACT] Rolling cryptographic audit seed: ${auditRoll} / 100...`);
      await sleep(1000);
      
      if (auditRoll <= 5) {
        log(5, `[AUDIT TRIGGERED] Project selected for mandatory 5% physical inspection.`, 'warning');
        return { success: true, apiData, status: 'DISPUTED' };
      }

      log(5, `[TIME-LOCK 🔒] Audit bypassed. Funds placed in 7-Day Optimistic Time-Lock. Audit Hash: ${apiData.auditHash || '0x402a...'}`, 'success', apiData);
      return { success: true, apiData, txHash, status: 'TIME_LOCKED' };
      
    } else {
      log(5, `[REJECTED ❌] Oracle Verification Failed: ${apiData.message}`, 'error', apiData);
      return { success: false, error: apiData.message, apiData };
    }
  } catch (error) {
    log(5, `[ERROR ❌] Workflow execution failed: ${error.message}`, 'error');
    return { success: false, error: error.message };
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
