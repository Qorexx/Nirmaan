import { NextResponse } from 'next/server';

/**
 * Simulates the AI Core of the Nirmaan Protocol.
 * Adheres to the Chapter 4 Interface Contract.
 */
export async function POST(req) {
  try {
    const body = await req.json();
    const { projectId, milestoneId, proofType, proofPayload } = body;

    // Validate request inputs according to the contract
    if (!projectId || milestoneId === undefined || !proofType || !proofPayload) {
      return NextResponse.json(
        {
          error: 'Bad Request',
          message: 'Missing required parameters: projectId, milestoneId, proofType, and proofPayload must be provided.',
        },
        { status: 400 }
      );
    }

    // 1. Simulated Processing Delay (Realistic "AI is thinking..." visual state)
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // 2. Process Verification Logic
    const result = await runAIVerification(proofType, proofPayload);

    // 3. Return JSON response strictly matching the expected contract
    return NextResponse.json({
      verified: result.verified,
      confidenceScore: result.confidenceScore,
      message: result.message,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error in verify-milestone API:', error);
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
 * Core AI Verification Logic.
 * FUTURE-PROOFING: To plug in a real LLM (Gemini/OpenAI), only replace this function.
 * 
 * @param {string} proofType - The type of proof (e.g., 'image', 'sensor', 'document')
 * @param {string} proofPayload - The payload URL, text, or data string
 * @returns {Promise<{verified: boolean, confidenceScore: number, message: string}>}
 */
async function runAIVerification(proofType, proofPayload) {
  const payloadLower = String(proofPayload || '').toLowerCase();
  
  // Custom fail conditions for rich simulation testing
  const failureKeywords = ['pothole', 'crack', 'defect', 'substandard', 'bribe', 'fail', 'damage'];
  const foundKeyword = failureKeywords.find(keyword => payloadLower.includes(keyword));
  
  if (foundKeyword) {
    // Generate a confidence score between 0.88 and 0.98
    const confidenceScore = parseFloat((Math.random() * (0.98 - 0.88) + 0.88).toFixed(2));
    return {
      verified: false,
      confidenceScore,
      message: `AI analysis completed. Structural defect identified: '${foundKeyword}' detected in the submitted proof payload. Rejecting milestone.`,
    };
  }
  
  // Successful verification path
  // Generate a confidence score between 0.95 * 0.99
  const confidenceScore = parseFloat((Math.random() * (0.99 - 0.95) + 0.95).toFixed(2));
  return {
    verified: true,
    confidenceScore,
    message: 'AI visual analysis complete. Structural integrity verified. No defects or anomalies detected.',
  };
}
