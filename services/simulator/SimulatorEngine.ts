/**
 * @file services/simulator/SimulatorEngine.ts
 * @description Central orchestrator driving simulation clock lifecycle, fleet initialization, and tick delegation.
 */

import {
  DEFAULT_FLEET_SIZE,
  DEFAULT_TICK_INTERVAL_MS,
  MAX_TRUCK_PAYLOAD_KG,
} from '../../constants/simulator/defaults';
import { PRIMARY_SUPPLY_ROUTE } from '../../constants/simulator/routes';
import {
  AnomalyType,
  MaterialType,
  SimulationState,
  Truck,
  TruckStatus,
} from '../../types/truck';
import { AnomalyInjector } from './AnomalyInjector';
import { FleetStateStore } from './FleetStateStore';
import { RouteInterpolator } from './RouteInterpolator';
import { SensorPhysicsEngine } from './SensorPhysicsEngine';

/**
 * Singleton simulation engine orchestrating tick execution, timer lifecycle, fleet initialization, and service coordination.
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
   * Starts the simulation clock loop and initializes the fleet if empty.
   * @param intervalMs Optional custom tick interval in milliseconds.
   */
  public start(intervalMs?: number): void {
    if (this.state === SimulationState.RUNNING) {
      return;
    }

    if (intervalMs && intervalMs > 0) {
      this.tickIntervalMs = intervalMs;
    }

    // Auto-initialize fleet if no trucks exist in store
    this.initializeFleet();

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

  /**
   * Private helper populating FleetStateStore with default trucks if currently empty.
   */
  private initializeFleet(): void {
    const store = FleetStateStore.getInstance();

    if (store.getFleetSize() > 0) {
      return;
    }

    const originLocation = PRIMARY_SUPPLY_ROUTE.waypoints[0];
    const materialList = [
      MaterialType.ASPHALT,
      MaterialType.READY_MIX_CONCRETE,
      MaterialType.GRAVEL,
      MaterialType.SAND,
      MaterialType.CRUSHED_STONE,
    ];

    for (let i = 1; i <= DEFAULT_FLEET_SIZE; i++) {
      const truckId = `TRK-10${i}`;
      const material = materialList[(i - 1) % materialList.length];
      const initialTemp =
        material === MaterialType.ASPHALT
          ? 150
          : material === MaterialType.READY_MIX_CONCRETE
          ? 25
          : null;

      const initialTruck: Truck = {
        truckId,
        registrationNumber: `UP32 AB ${4580 + i}`,
        driverName: `Driver ${i}`,
        material,
        payloadWeightKg: MAX_TRUCK_PAYLOAD_KG,
        maximumCapacityKg: MAX_TRUCK_PAYLOAD_KG,
        materialTemperatureCelsius: initialTemp,
        fuelLevelPercent: 100,
        speedKmH: 45,
        location: {
          latitude: originLocation.latitude,
          longitude: originLocation.longitude,
          altitudeMeters: originLocation.altitudeMeters,
          headingDegrees: 90,
        },
        status: TruckStatus.IN_TRANSIT,
        lastUpdated: new Date(),
        activeAnomaly: AnomalyType.NONE,
      };

      store.addTruck(initialTruck);
    }
  }
}
