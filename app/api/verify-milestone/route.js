import { NextResponse } from 'next/server';
import { withX402, x402ResourceServer } from "@x402/next";
import { HTTPFacilitatorClient } from "@x402/core/server";
import { ExactEvmScheme } from "@x402/evm/exact/server";

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
async function verifyMilestoneHandler(req) {
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
import { GoogleGenAI } from "@google/genai";

// Initialize Gemini SDK
const ai = process.env.GEMINI_API_KEY 
  ? new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })
  : null;

/**
 * Executes the AI verification model against the provided proof
 */
async function runAIVerification(projectId, milestoneId, proofType, proofPayload) {
  // If Gemini isn't configured, fallback to the old keyword simulation
  if (!ai) {
    console.warn("⚠️ GEMINI_API_KEY is missing. Falling back to simulated verification.");
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const payloadLower = String(proofPayload).toLowerCase();
    const isImage = proofType === 'image';
    const hasAnomaly = isImage 
      ? (payloadLower.includes('pothole') || payloadLower.includes('crack') || payloadLower.includes('defect'))
      : false;
    
    return {
      verified: !hasAnomaly,
      confidenceScore: hasAnomaly ? 0.98 : 0.95,
      message: hasAnomaly 
        ? "AI simulation complete. Structural anomaly detected. Milestone rejected." 
        : "AI simulation complete. No defects detected. Milestone approved.",
      defects: hasAnomaly ? ["Simulated anomaly found based on keyword"] : []
    };
  }

  try {
    let contents;
    
    if (proofType === 'image' && String(proofPayload).startsWith('data:image')) {
      // It's a base64 image uploaded by the frontend
      // Strip the data:image/jpeg;base64, prefix
      const mimeType = String(proofPayload).match(/data:(.*?);base64,/)[1] || "image/jpeg";
      const base64Data = String(proofPayload).replace(/^data:image\/\w+;base64,/, "");
      
      contents = [
        {
          text: `You are an expert infrastructure quality inspector and civil engineer for a public works project.
          Analyze this construction image for defects, structural integrity, and compliance.
          Look closely for potholes, cracks, water damage, or poor materials.
          
          Respond ONLY with a raw JSON object containing these EXACT keys:
          {
            "verified": boolean (true if it looks like safe/completed construction, false if there are serious defects),
            "confidenceScore": number (between 0.00 and 1.00),
            "defects": array of strings (list any specific issues found, empty array if none),
            "message": string (a short 1-2 sentence explanation of your decision)
          }`
        },
        {
          inlineData: {
            mimeType: mimeType,
            data: base64Data
          }
        }
      ];
    } else {
      // It's a text-based proof or URL
      contents = [
        {
          text: `You are an expert infrastructure quality inspector.
          Analyze this text proof submitted by a contractor: "${proofPayload}" (Type: ${proofType}).
          
          Respond ONLY with a raw JSON object containing these EXACT keys:
          {
            "verified": boolean (true if the text seems to legitimately claim the milestone is complete),
            "confidenceScore": number (between 0.00 and 1.00),
            "defects": array of strings (list any issues found, empty array if none),
            "message": string (a short 1-2 sentence explanation of your decision)
          }`
        }
      ];
    }

    // Call Gemini 3.1 Pro for maximum reasoning capability
    const response = await ai.models.generateContent({
      model: 'gemini-3.1-pro',
      contents: contents,
      config: {
        responseMimeType: "application/json",
      }
    });

    const aiResult = JSON.parse(response.text);
    
    return {
      verified: aiResult.verified,
      confidenceScore: aiResult.confidenceScore || 0.9,
      message: aiResult.message || (aiResult.verified ? "AI Vision analysis complete. Approved." : "AI Vision analysis complete. Rejected."),
      defects: aiResult.defects || []
    };

  } catch (error) {
    console.error("Gemini AI Error:", error);
    // Fallback on error
    return {
      verified: false,
      confidenceScore: 0.0,
      message: "AI Vision analysis failed due to server error.",
      defects: [error.message]
    };
  }
}

function randomInRange(min, max) {
  return parseFloat((Math.random() * (max - min) + min).toFixed(2));
}

// ─────────────────────────────────────────────────────────────────────────────
// x402 PAYMENT LAYER CONFIGURATION
// ─────────────────────────────────────────────────────────────────────────────

// Initialize the facilitator (service that verifies payments on-chain)
const facilitatorClient = new HTTPFacilitatorClient({ 
  url: "https://facilitator.x402.org" 
});

// Setup the resource server for Base Sepolia testnet
const resourceServer = new x402ResourceServer(facilitatorClient)
  .register("eip155:84532", new ExactEvmScheme());

// Export the protected POST route
export const POST = withX402(
  verifyMilestoneHandler,
  {
    accepts: {
      scheme: "exact",
      price: "0.001", // Tiny fee for testnet demo
      network: "eip155:84532", // Base Sepolia
      payTo: process.env.NEXT_PUBLIC_X402_WALLET_ADDRESS || "0x1111111111111111111111111111111111111111",
    },
    description: "AI Oracle verification compute fee",
  },
  resourceServer
);
