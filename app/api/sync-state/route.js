import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { INITIAL_PROJECTS } from '@/lib/nirmaanState';

// Create a direct Supabase client for this API route
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('hackathon_state')
      .select('state_data')
      .eq('id', 1)
      .single();

    if (error || !data) {
      console.warn("Supabase fetch failed, sending initial state", error);
      return NextResponse.json({ projects: INITIAL_PROJECTS }, { status: 200, headers: { 'Cache-Control': 'no-store, max-age=0' } });
    }

    // If the database is completely empty (e.g., right after creation), send initial state
    if (Object.keys(data.state_data).length === 0) {
      return NextResponse.json({ projects: INITIAL_PROJECTS }, { status: 200, headers: { 'Cache-Control': 'no-store, max-age=0' } });
    }

    return NextResponse.json({ projects: data.state_data }, { status: 200, headers: { 'Cache-Control': 'no-store, max-age=0' } });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to sync state' }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    if (body.projects) {
      const { error } = await supabase
        .from('hackathon_state')
        .update({ state_data: body.projects })
        .eq('id', 1);

      if (error) {
        console.error("Supabase update failed:", error);
        return NextResponse.json({ error: 'Failed to update database' }, { status: 500 });
      }
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}
