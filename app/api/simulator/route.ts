/**
 * @file app/api/simulator/route.ts
 * @description Next.js REST API Controller for the Nirmaan IoT Construction Telemetry Simulator.
 * Thin HTTP delegation controller for dashboard control and fleet status queries.
 */

import { NextResponse } from 'next/server';
import { FleetStateStore } from '../../../services/simulator/FleetStateStore';
import { SimulatorEngine } from '../../../services/simulator/SimulatorEngine';

/**
 * GET /api/simulator
 * Returns current simulation state, engine status, tick count, fleet size, and active trucks.
 */
export async function GET() {
  try {
    const engine = SimulatorEngine.getInstance();
    const store = FleetStateStore.getInstance();

    return NextResponse.json({
      state: engine.getSimulationState(),
      isRunning: engine.isRunning(),
      tickCount: engine.getTickCount(),
      fleetSize: store.getFleetSize(),
      trucks: store.getAllTrucks(),
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Failed to retrieve simulator status',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/simulator
 * Accepts control actions: START, STOP, PAUSE, RESUME.
 * Body payload: { "action": "START" | "STOP" | "PAUSE" | "RESUME" }
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const action = body?.action?.toString().toUpperCase();

    if (!action) {
      return NextResponse.json(
        { error: 'Missing required field "action" in request body' },
        { status: 400 }
      );
    }

    const engine = SimulatorEngine.getInstance();
    const store = FleetStateStore.getInstance();

    switch (action) {
      case 'START':
        engine.start(body?.intervalMs);
        break;

      case 'STOP':
        engine.stop();
        break;

      case 'PAUSE':
        engine.pause();
        break;

      case 'RESUME':
        engine.resume();
        break;

      default:
        return NextResponse.json(
          {
            error: `Unsupported action "${action}". Valid actions: START, STOP, PAUSE, RESUME`,
          },
          { status: 400 }
        );
    }

    return NextResponse.json({
      success: true,
      actionExecuted: action,
      state: engine.getSimulationState(),
      isRunning: engine.isRunning(),
      tickCount: engine.getTickCount(),
      fleetSize: store.getFleetSize(),
      trucks: store.getAllTrucks(),
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Failed to process simulator control action',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
