import { NextResponse } from 'next/server';

/**
 * Simulates the AI Core of the Nirmaan Protocol.
 * Adheres strictly to the Chapter 4 Interface Contract.
 *
 * Request:  POST /api/verify-milestone
 * Response: { verified, confidenceScore, message, timestamp }
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

    // --- Simulated AI Processing Delay (3 seconds) ---
    // Provides the "AI is thinking..." loading state for the frontend.
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // --- Run Core Verification Logic ---
    const result = await runAIVerification(proofType, proofPayload);

    // --- Respond with contract-compliant JSON ---
    return NextResponse.json(
      {
        verified: result.verified,
        confidenceScore: result.confidenceScore,
        message: result.message,
        timestamp: new Date().toISOString(),
      },
      {
        status: 200,
        headers: {
          // Allow the x402 team and frontend to call this from any origin
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
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
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Payment',
    },
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// CORE AI VERIFICATION ENGINE
// ─────────────────────────────────────────────────────────────────────────────
/**
 * The isolated AI verification brain.
 *
 * FUTURE-PROOFING: Swap out this entire function to plug in a real AI model.
 * Example replacement:
 *
 *   import { GoogleGenerativeAI } from '@google/generative-ai';
 *   const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
 *   const model = genAI.getGenerativeModel({ model: 'gemini-pro-vision' });
 *   const result = await model.generateContent([prompt, imagePart]);
 *
 * @param {string} proofType    - 'image' | 'sensor' | 'document'
 * @param {string} proofPayload - URL or string payload to analyze
 * @returns {Promise<{ verified: boolean, confidenceScore: number, message: string }>}
 */
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

/**
 * Helper: generate a random float between min and max, rounded to 2 decimal places.
 */
function randomInRange(min, max) {
  return parseFloat((Math.random() * (max - min) + min).toFixed(2));
}
