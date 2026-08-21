import { NextResponse } from 'next/server';
import { INITIAL_PROJECTS } from '@/lib/nirmaanState';

// Global memory for the Node.js server to act as our real-time datastore across 3 devices
if (!global.nirmaanProjects) {
  global.nirmaanProjects = INITIAL_PROJECTS;
}

// GET: Polled by all 3 devices every 1000ms to stay in sync
export async function GET() {
  return NextResponse.json(
    { projects: global.nirmaanProjects },
    {
      status: 200,
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      },
    }
  );
}

// POST: Called by any device when they mutate the state (e.g., Contractor submits, Citizen stakes)
export async function POST(req) {
  try {
    const body = await req.json();
    if (body.projects) {
      global.nirmaanProjects = body.projects;
    }
    return NextResponse.json({ success: true, projects: global.nirmaanProjects });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to sync state' }, { status: 500 });
  }
}
