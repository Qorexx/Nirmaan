/**
 * @file constants/simulator/defaults.ts
 * @description Operational constants and default parameters for the Nirmaan IoT Construction Telemetry Simulator.
 */

/**
 * Fleet size defaults.
 */
export const DEFAULT_FLEET_SIZE = 5;

/**
 * Frequency (in milliseconds) at which the simulation engine processes tick updates.
 */
export const DEFAULT_TICK_INTERVAL_MS = 2000;

/**
 * Frequency (in milliseconds) at which edge IoT devices transmit GPS position updates.
 */
export const DEFAULT_GPS_UPDATE_INTERVAL_MS = 2000;

/**
 * Vehicle payload limits (in kilograms).
 */
export const MIN_TRUCK_PAYLOAD_KG = 0;
export const MAX_TRUCK_PAYLOAD_KG = 25000;

/**
 * Vehicle loading & unloading transfer rates (in kg per tick).
 */
export const DEFAULT_DUMP_RATE_KG_PER_TICK = 5000;
export const DEFAULT_LOAD_RATE_KG_PER_TICK = 5000;

/**
 * Vehicle speed limits (in km/h).
 */
export const MIN_TRUCK_SPEED_KMH = 0;
export const MAX_TRUCK_SPEED_KMH = 80;
export const DEFAULT_CRUISING_SPEED_KMH = 45;

/**
 * Temperature safety and quality thresholds (in Celsius).
 * Asphalt must be laid hot (130°C - 160°C). Below 110°C indicates thermal degradation/fraud.
 */
export const ASPHALT_MIN_TEMP_CELSIUS = 130;
export const ASPHALT_MAX_TEMP_CELSIUS = 160;
export const CONCRETE_MIN_TEMP_CELSIUS = 10;
export const CONCRETE_MAX_TEMP_CELSIUS = 32;
export const AMBIENT_TEMPERATURE_CELSIUS = 25;
export const DEFAULT_MATERIAL_COOLING_RATE_CELSIUS_PER_TICK = 0.2;

/**
 * Fuel telemetry constants (in percentage 0-100%).
 */
export const INITIAL_FUEL_LEVEL_PERCENT = 100.0;
export const DEFAULT_FUEL_BURN_PER_TICK_PERCENT = 0.05;
export const MOTION_FUEL_BURN_MULTIPLIER = 1.5;

/**
 * Probability of an automatic corruption/anomaly event injection per tick cycle (0.0 to 1.0).
 */
export const DEFAULT_ANOMALY_PROBABILITY = 0.05;

/**
 * Anomaly simulation parameters.
 */
export const INFLATED_MILEAGE_SPEED_KMH = 150;
export const ROUTE_DIVERSION_OFFSET_DEGREES = 0.05;

/**
 * Telemetry log buffer retention limit in memory.
 */
export const MAX_TELEMETRY_LOG_BUFFER_SIZE = 500;
