import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    success: true,
    message: "Verify Milestone API Ready (GET)",
  });
}

export async function POST() {
  return NextResponse.json({
    success: true,
    message: "Verify Milestone API Ready (POST)",
  });
}