/**
 * @file types/truck.ts
 * @description Domain model interfaces and enums representing IoT-enabled construction trucks in Nirmaan.
 */

/**
 * Geographic coordinates representing a vehicle's GPS position.
 */
export interface GPSLocation {
  latitude: number;
  longitude: number;
  altitudeMeters?: number;
  headingDegrees?: number;
}

/**
 * Operational state lifecycle of a construction truck.
 */
export enum TruckStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  IN_TRANSIT = 'IN_TRANSIT',
  DUMPING = 'DUMPING',
  RETURNING = 'RETURNING',
  MAINTENANCE = 'MAINTENANCE',
}

/**
 * Infrastructure construction materials transported by the fleet.
 */
export enum MaterialType {
  ASPHALT = 'ASPHALT',
  READY_MIX_CONCRETE = 'READY_MIX_CONCRETE',
  GRAVEL = 'GRAVEL',
  AGGREGATE_BASE = 'AGGREGATE_BASE',
  SAND = 'SAND',
  CRUSHED_STONE = 'CRUSHED_STONE',
  SOIL = 'SOIL',
}

/**
 * Global lifecycle state of the telemetry simulation engine.
 */
export enum SimulationState {
  RUNNING = 'RUNNING',
  PAUSED = 'PAUSED',
  STOPPED = 'STOPPED',
}

/**
 * Supported anomaly & corruption simulation scenarios for anti-fraud detection testing.
 */
export enum AnomalyType {
  NONE = 'NONE',
  GHOST_DELIVERY = 'GHOST_DELIVERY',
  WEIGHT_TAMPERING = 'WEIGHT_TAMPERING',
  ROUTE_DIVERSION = 'ROUTE_DIVERSION',
  GPS_SPOOFING = 'GPS_SPOOFING',
  MILEAGE_INFLATION = 'MILEAGE_INFLATION',
}

/**
 * Flexible sensor reading dictionary allowing future telemetry sensors to be added seamlessly.
 */
export type ExtensibleSensors = Record<string, number | string | boolean | null>;

/**
 * Represents a single IoT-enabled construction vehicle and its current operational state.
 */
export interface Truck {
  truckId: string;
  registrationNumber: string;
  driverName: string;
  material: MaterialType;
  payloadWeightKg: number;
  maximumCapacityKg: number;
  materialTemperatureCelsius: number | null;
  fuelLevelPercent: number;
  speedKmH: number;
  location: GPSLocation;
  status: TruckStatus;
  lastUpdated: Date;
  activeAnomaly?: AnomalyType;
  additionalSensors?: ExtensibleSensors;
}
