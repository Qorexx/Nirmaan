/**
 * @file services/simulator/AnomalyInjector.ts
 * @description Pure stateless service for injecting deterministic corruption and fraud scenarios into truck telemetry.
 */

import {
  INFLATED_MILEAGE_SPEED_KMH,
  MIN_TRUCK_PAYLOAD_KG,
  ROUTE_DIVERSION_OFFSET_DEGREES,
} from '../../constants/simulator/defaults';
import { CONSTRUCTION_SITE_WAYPOINT } from '../../constants/simulator/routes';
import { AnomalyType, Truck } from '../../types/truck';

/**
 * Pure domain service mutating vehicle telemetry attributes to simulate corruption vectors for AI verification testing.
 */
export class AnomalyInjector {
  /**
   * Applies a targeted anomaly scenario to a vehicle state without mutating the original input instance.
   * @param truck Input vehicle state (immutable).
   * @param targetAnomaly Optional targeted anomaly scenario (defaults to truck.activeAnomaly or AnomalyType.NONE).
   * @returns A new updated Truck instance with corrupted properties applied.
   */
  public static applyAnomaly(
    truck: Truck,
    targetAnomaly?: AnomalyType
  ): Truck {
    const activeAnomaly = targetAnomaly ?? truck.activeAnomaly ?? AnomalyType.NONE;

    if (activeAnomaly === AnomalyType.NONE) {
      return {
        ...truck,
        activeAnomaly: AnomalyType.NONE,
      };
    }

    const updatedTruck: Truck = {
      ...truck,
      activeAnomaly,
    };

    switch (activeAnomaly) {
      case AnomalyType.GPS_SPOOFING:
        // Spoofs GPS coordinates to predefined construction site waypoint location
        updatedTruck.location = {
          ...truck.location,
          latitude: CONSTRUCTION_SITE_WAYPOINT.latitude,
          longitude: CONSTRUCTION_SITE_WAYPOINT.longitude,
        };
        break;

      case AnomalyType.WEIGHT_TAMPERING:
        // Spoofs payload weight to maximum capacity regardless of actual cargo level
        updatedTruck.payloadWeightKg = truck.maximumCapacityKg;
        break;

      case AnomalyType.ROUTE_DIVERSION:
        // Diverts vehicle location off designated supply corridor by configured offset degrees
        updatedTruck.location = {
          ...truck.location,
          latitude: Number((truck.location.latitude + ROUTE_DIVERSION_OFFSET_DEGREES).toFixed(6)),
          longitude: Number((truck.location.longitude + ROUTE_DIVERSION_OFFSET_DEGREES).toFixed(6)),
        };
        break;

      case AnomalyType.GHOST_DELIVERY:
        // Simulates phantom material delivery: payload weight drops to MIN_TRUCK_PAYLOAD_KG while vehicle stays at origin
        updatedTruck.payloadWeightKg = MIN_TRUCK_PAYLOAD_KG;
        break;

      case AnomalyType.MILEAGE_INFLATION:
        // Inflates transit speed to unrealistic rate (INFLATED_MILEAGE_SPEED_KMH) to simulate odometer fraud
        updatedTruck.speedKmH = INFLATED_MILEAGE_SPEED_KMH;
        break;

      default:
        break;
    }

    return updatedTruck;
  }
}
