/**
 * @file services/simulator/SimulatorEngine.ts
 * @description Central orchestrator driving the simulation clock loop and delegating truck updates to specialized services.
 */

import { DEFAULT_TICK_INTERVAL_MS } from '../../constants/simulator/defaults';
import { SimulationState, Truck } from '../../types/truck';
import { FleetStateStore } from './FleetStateStore';

/**
 * Singleton simulation engine orchestrating tick execution, timer lifecycle, and service coordination.
 */
export class SimulatorEngine {
  private static instance: SimulatorEngine | null = null;

  private state: SimulationState;
  private timerHandle: NodeJS.Timeout | null;
  private tickIntervalMs: number;
  private tickCount: number;

  /**
   * Private constructor enforcing Singleton pattern.
   */
  private constructor() {
    this.state = SimulationState.STOPPED;
    this.timerHandle = null;
    this.tickIntervalMs = DEFAULT_TICK_INTERVAL_MS;
    this.tickCount = 0;
  }

  /**
   * Access global SimulatorEngine singleton instance.
   */
  public static getInstance(): SimulatorEngine {
    if (!SimulatorEngine.instance) {
      SimulatorEngine.instance = new SimulatorEngine();
    }
    return SimulatorEngine.instance;
  }

  /**
   * Starts the simulation clock loop.
   * @param intervalMs Optional custom tick interval in milliseconds.
   */
  public start(intervalMs?: number): void {
    if (this.state === SimulationState.RUNNING) {
      return;
    }

    if (intervalMs && intervalMs > 0) {
      this.tickIntervalMs = intervalMs;
    }

    this.state = SimulationState.RUNNING;

    if (this.timerHandle) {
      clearInterval(this.timerHandle);
    }

    this.timerHandle = setInterval(() => {
      this.tick();
    }, this.tickIntervalMs);
  }

  /**
   * Stops the simulation clock, clears the timer, and resets tick counter.
   */
  public stop(): void {
    if (this.timerHandle) {
      clearInterval(this.timerHandle);
      this.timerHandle = null;
    }
    this.state = SimulationState.STOPPED;
    this.tickCount = 0;
  }

  /**
   * Pauses the simulation clock without resetting tick history.
   */
  public pause(): void {
    if (this.state !== SimulationState.RUNNING) {
      return;
    }

    if (this.timerHandle) {
      clearInterval(this.timerHandle);
      this.timerHandle = null;
    }
    this.state = SimulationState.PAUSED;
  }

  /**
   * Resumes a paused simulation loop.
   */
  public resume(): void {
    if (this.state !== SimulationState.PAUSED) {
      return;
    }
    this.start(this.tickIntervalMs);
  }

  /**
   * Executes a single simulation tick step, driving state updates for all trucks in the fleet.
   */
  public tick(): void {
    if (this.state === SimulationState.STOPPED) {
      return;
    }

    this.tickCount += 1;
    const store = FleetStateStore.getInstance();
    const trucks = store.getAllTrucks();

    for (const truck of trucks) {
      const updatedPositionTruck = this.applyRouteInterpolation(truck);
      const updatedPhysicsTruck = this.applyPhysicsEngine(updatedPositionTruck);
      const finalTruckState = this.applyAnomalyInjector(updatedPhysicsTruck);

      store.updateTruck(finalTruckState);
    }
  }

  /**
   * Returns whether the simulation loop is actively running.
   */
  public isRunning(): boolean {
    return this.state === SimulationState.RUNNING;
  }

  /**
   * Returns the current lifecycle state of the simulation engine.
   */
  public getSimulationState(): SimulationState {
    return this.state;
  }

  /**
   * Returns total ticks processed since engine start.
   */
  public getTickCount(): number {
    return this.tickCount;
  }

  /**
   * Placeholder hook for RouteInterpolator integration.
   * TODO: Integrate with RouteInterpolator.interpolatePosition(truck)
   */
  private applyRouteInterpolation(truck: Truck): Truck {
    // Pipeline Step 1: Calculate vehicle trajectory along active route segment.
    return truck;
  }

  /**
   * Placeholder hook for SensorPhysicsEngine integration.
   * TODO: Integrate with SensorPhysicsEngine.computeSensors(truck)
   */
  private applyPhysicsEngine(truck: Truck): Truck {
    // Pipeline Step 2: Calculate physics metrics (payload weight, fuel burn, engine RPM, material temperature).
    return truck;
  }

  /**
   * Placeholder hook for AnomalyInjector integration.
   * TODO: Integrate with AnomalyInjector.injectAnomalies(truck)
   */
  private applyAnomalyInjector(truck: Truck): Truck {
    // Pipeline Step 3: Mutate telemetry state if corruption/fraud scenario is active on truck.
    return truck;
  }
}
