/**
 * @file services/simulator/SensorPhysicsEngine.ts
 * @description Pure stateless domain service calculating physical sensor values for construction vehicles.
 */

import {
  AMBIENT_TEMPERATURE_CELSIUS,
  DEFAULT_CRUISING_SPEED_KMH,
  DEFAULT_DUMP_RATE_KG_PER_TICK,
  DEFAULT_FUEL_BURN_PER_TICK_PERCENT,
  DEFAULT_LOAD_RATE_KG_PER_TICK,
  DEFAULT_MATERIAL_COOLING_RATE_CELSIUS_PER_TICK,
  MAX_TRUCK_PAYLOAD_KG,
  MIN_TRUCK_PAYLOAD_KG,
  MIN_TRUCK_SPEED_KMH,
  MOTION_FUEL_BURN_MULTIPLIER,
} from '../../constants/simulator/defaults';
import { Truck, TruckStatus } from '../../types/truck';

/**
 * Pure domain service evaluating physical laws (fuel consumption, payload weight transfer, thermal cooling, velocity).
 * Does NOT alter or manage simulation lifecycle workflow or TruckStatus state transitions.
 */
export class SensorPhysicsEngine {
  /**
   * Computes physical sensor readings for a vehicle based on current status and elapsed time.
   * @param truck Current vehicle state (immutable input).
   * @param deltaTimeSeconds Elapsed simulation time step in seconds (defaults to 2 seconds).
   * @returns A new updated Truck instance containing calculated physical sensor values.
   */
  public static updateSensors(truck: Truck, deltaTimeSeconds: number = 2): Truck {
    const timeScale = deltaTimeSeconds / 2;

    // 1. Determine vehicle speed based on operational lifecycle status
    let speedKmH = MIN_TRUCK_SPEED_KMH;

    switch (truck.status) {
      case TruckStatus.IN_TRANSIT:
      case TruckStatus.RETURNING:
        speedKmH = DEFAULT_CRUISING_SPEED_KMH;
        break;
      case TruckStatus.IDLE:
      case TruckStatus.LOADING:
      case TruckStatus.DUMPING:
      case TruckStatus.MAINTENANCE:
        speedKmH = MIN_TRUCK_SPEED_KMH;
        break;
    }

    // 2. Calculate payload weight changes during unloading / loading (strictly numeric math)
    let payloadWeightKg = truck.payloadWeightKg;
    const dumpRateKg = DEFAULT_DUMP_RATE_KG_PER_TICK * timeScale;
    const loadRateKg = DEFAULT_LOAD_RATE_KG_PER_TICK * timeScale;

    if (truck.status === TruckStatus.DUMPING) {
      payloadWeightKg = Math.max(
        MIN_TRUCK_PAYLOAD_KG,
        payloadWeightKg - dumpRateKg
      );
    } else if (truck.status === TruckStatus.LOADING) {
      const targetCapacity = truck.maximumCapacityKg || MAX_TRUCK_PAYLOAD_KG;
      payloadWeightKg = Math.min(
        targetCapacity,
        payloadWeightKg + loadRateKg
      );
    }

    // 3. Compute fuel consumption (higher burn rate when moving)
    const fuelMultiplier = speedKmH > MIN_TRUCK_SPEED_KMH ? MOTION_FUEL_BURN_MULTIPLIER : 1.0;
    const fuelBurn = DEFAULT_FUEL_BURN_PER_TICK_PERCENT * fuelMultiplier * timeScale;
    const fuelLevelPercent = Math.max(0, Number((truck.fuelLevelPercent - fuelBurn).toFixed(2)));

    // 4. Compute material temperature cooling (ambient thermal decay)
    let materialTemperatureCelsius = truck.materialTemperatureCelsius;
    if (materialTemperatureCelsius !== null) {
      const coolingRateCelsius = DEFAULT_MATERIAL_COOLING_RATE_CELSIUS_PER_TICK * timeScale;
      materialTemperatureCelsius = Math.max(
        AMBIENT_TEMPERATURE_CELSIUS,
        Number((materialTemperatureCelsius - coolingRateCelsius).toFixed(1))
      );
    }

    // 5. Return fresh immutable Truck state copy (status remains unchanged)
    return {
      ...truck,
      speedKmH,
      payloadWeightKg,
      fuelLevelPercent,
      materialTemperatureCelsius,
      lastUpdated: new Date(),
    };
  }
}
