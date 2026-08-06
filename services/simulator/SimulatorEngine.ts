/**
 * @file services/simulator/SimulatorEngine.ts
 * @description Central orchestrator driving the simulation clock loop and delegating truck updates to specialized services.
 */

import { DEFAULT_TICK_INTERVAL_MS } from '../../constants/simulator/defaults';
import { PRIMARY_SUPPLY_ROUTE } from '../../constants/simulator/routes';
import { SimulationState, Truck } from '../../types/truck';
import { AnomalyInjector } from './AnomalyInjector';
import { FleetStateStore } from './FleetStateStore';
import { RouteInterpolator } from './RouteInterpolator';
import { SensorPhysicsEngine } from './SensorPhysicsEngine';

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
   * Follows strict pipeline: Retrieve -> Interpolate Route -> Compute Physics -> Inject Anomaly -> Store Update.
   */
  public tick(): void {
    if (this.state === SimulationState.STOPPED) {
      return;
    }

    this.tickCount += 1;
    const store = FleetStateStore.getInstance();
    const trucks = store.getAllTrucks();
    const deltaTimeSeconds = this.tickIntervalMs / 1000;

    for (const truck of trucks) {
      // 1. Compute next GPS position using RouteInterpolator
      const nextLocation = RouteInterpolator.interpolatePosition(
        truck,
        PRIMARY_SUPPLY_ROUTE,
        deltaTimeSeconds
      );
      const truckWithLocation: Truck = {
        ...truck,
        location: nextLocation,
      };

      // 2. Update physical sensor values using SensorPhysicsEngine
      const physicsTruck = SensorPhysicsEngine.updateSensors(
        truckWithLocation,
        deltaTimeSeconds
      );

      // 3. Apply active anomaly using AnomalyInjector
      const finalTruckState = AnomalyInjector.applyAnomaly(physicsTruck);

      // 4. Save updated truck back into FleetStateStore
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
}
