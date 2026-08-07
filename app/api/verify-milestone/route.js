import { NextResponse } from 'next/server';

/**
 * Health check & API specification handler
 * GET /api/verify-milestone
 */
export async function GET() {
  return NextResponse.json(
    {
      status: 'online',
      service: 'Nirmaan Oracle AI Verification Engine',
      version: '1.0.0',
      description: 'Autonomous AI Verification endpoint for construction infrastructure milestones.',
      supportedProofTypes: ['image', 'sensor', 'document'],
      paymentLayer: 'x402 Sandbox Mode Compatible',
    },
    {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Payment',
      },
    }
  );
}

/**
 * Simulates the AI Core of the Nirmaan Protocol.
 * Adheres strictly to the Chapter 4 Interface Contract.
 *
 * Request:  POST /api/verify-milestone
 * Response: { verified, confidenceScore, message, auditHash, timestamp }
 */
export async function POST(req) {
  try {
    // --- Parse body safely ---
    let body;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { error: 'Bad Request', message: 'Request body must be valid JSON.' },
        { status: 400 }
      );
    }

    const { projectId, milestoneId, proofType, proofPayload } = body ?? {};

    // --- Input Validation ---
    if (
      !projectId ||
      milestoneId === undefined ||
      milestoneId === null ||
      !proofType ||
      !proofPayload
    ) {
      return NextResponse.json(
        {
          error: 'Bad Request',
          message:
            'Missing required parameters: projectId, milestoneId, proofType, and proofPayload must all be provided.',
        },
        { status: 400 }
      );
    }

    if (typeof milestoneId !== 'number' || !Number.isFinite(milestoneId)) {
      return NextResponse.json(
        {
          error: 'Bad Request',
          message: 'milestoneId must be a valid finite number.',
        },
        { status: 400 }
      );
    }

    if (!['image', 'sensor', 'document'].includes(proofType)) {
      return NextResponse.json(
        {
          error: 'Bad Request',
          message: "proofType must be one of: 'image', 'sensor', 'document'.",
        },
        { status: 400 }
      );
    }

    // --- Check Payment / Authorization Header (x402 Sandbox mode) ---
    const paymentHeader = req.headers.get('x-payment') || req.headers.get('authorization');
    const paymentVerified = Boolean(paymentHeader);

    // --- Simulated AI Processing Delay (2 seconds) ---
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // --- Run Core Verification Logic ---
    const result = await runAIVerification(proofType, proofPayload);

    // --- Generate deterministic proof audit hash ---
    const auditSeed = `${projectId}-${milestoneId}-${proofType}-${Date.now()}`;
    const auditHash = '0x' + Buffer.from(auditSeed).toString('hex').slice(0, 40);

    // --- Respond with contract-compliant JSON ---
    return NextResponse.json(
      {
        verified: result.verified,
        confidenceScore: result.confidenceScore,
        message: result.message,
        auditHash,
        paymentVerified,
        timestamp: new Date().toISOString(),
      },
      {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Payment',
        },
      }
    );
  } catch (error) {
    console.error('[verify-milestone] Unexpected error:', error);
    return NextResponse.json(
      {
        error: 'Internal Server Error',
        message: 'An unexpected error occurred during the simulated AI analysis.',
      },
      { status: 500 }
    );
  }
}

/**
 * Handle CORS preflight requests from the frontend or x402 gateway.
 */
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Payment',
    },
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// CORE AI VERIFICATION ENGINE
// ─────────────────────────────────────────────────────────────────────────────
async function runAIVerification(proofType, proofPayload) {
  const payloadLower = String(proofPayload).toLowerCase();

  // Failure detection keywords (easily extensible list)
  const FAILURE_KEYWORDS = [
    'pothole',
    'crack',
    'defect',
    'substandard',
    'bribe',
    'fail',
    'damage',
    'corrupt',
    'incomplete',
    'missing',
  ];

  const foundKeyword = FAILURE_KEYWORDS.find((kw) => payloadLower.includes(kw));

  if (foundKeyword) {
    return {
      verified: false,
      confidenceScore: randomInRange(0.88, 0.97),
      message: `AI ${proofType} analysis complete. Structural anomaly detected: keyword '${foundKeyword}' identified in proof payload. Milestone rejected. Smart contract escrow WILL NOT release funds.`,
    };
  }

  // Passed verification
  return {
    verified: true,
    confidenceScore: randomInRange(0.95, 0.99),
    message: `AI ${proofType} analysis complete. No structural defects or anomalies detected. Milestone approved. Smart contract escrow is authorized to release funds.`,
  };
}

function randomInRange(min, max) {
  return parseFloat((Math.random() * (max - min) + min).toFixed(2));
}

