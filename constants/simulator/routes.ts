/**
 * @file constants/simulator/routes.ts
 * @description Predefined geographic waypoints and transit routes for Nirmaan road construction projects.
 */

import { GPSLocation } from '../../types/truck';

/**
 * Named geographic waypoint representing a key supply chain facility or worksite node.
 */
export interface Waypoint extends GPSLocation {
  id: string;
  name: string;
  description?: string;
}

/**
 * Ordered sequence of waypoints forming a complete transit route.
 */
export interface Route {
  id: string;
  name: string;
  waypoints: Waypoint[];
}

/**
 * Waypoint 1: Raw Material Extraction Quarry (Badarpur Quarry)
 */
export const QUARRY_WAYPOINT: Waypoint = {
  id: 'WPT-QUARRY-01',
  name: 'Badarpur Stone Quarry',
  latitude: 28.4900,
  longitude: 77.3000,
  altitudeMeters: 220,
  description: 'Primary source of raw aggregate stone and crushed gravel.',
};

/**
 * Waypoint 2: Hot Mix Asphalt & Concrete Batching Plant (Okhla Industrial Plant)
 */
export const ASPHALT_PLANT_WAYPOINT: Waypoint = {
  id: 'ASPHALT-PLANT-01',
  name: 'Okhla Hot Mix Asphalt Plant',
  latitude: 28.5355,
  longitude: 77.2730,
  altitudeMeters: 215,
  description: 'Processing plant for asphalt mixing and ready-mix concrete batching.',
};

/**
 * Waypoint 3: Active Infrastructure Worksite (NH-48 Highway Expansion Site)
 */
export const CONSTRUCTION_SITE_WAYPOINT: Waypoint = {
  id: 'SITE-NH48-01',
  name: 'NH-48 Highway Infrastructure Site',
  latitude: 28.6139,
  longitude: 77.2090,
  altitudeMeters: 210,
  description: 'Target public infrastructure construction site requiring verified material unloads.',
};

/**
 * Route 1: Full Supply & Delivery Chain
 * Quarry (Raw Material) -> Asphalt Plant (Processing) -> Construction Site (Unloading)
 */
export const PRIMARY_SUPPLY_ROUTE: Route = {
  id: 'ROUTE-SUPPLY-FULL',
  name: 'Quarry -> Asphalt Plant -> Construction Site',
  waypoints: [
    QUARRY_WAYPOINT,
    ASPHALT_PLANT_WAYPOINT,
    CONSTRUCTION_SITE_WAYPOINT,
  ],
};

/**
 * Route 2: Return Transit Chain
 * Construction Site (Unloaded) -> Asphalt Plant -> Quarry
 */
export const RETURN_DISPATCH_ROUTE: Route = {
  id: 'ROUTE-RETURN-FULL',
  name: 'Construction Site -> Asphalt Plant -> Quarry',
  waypoints: [
    CONSTRUCTION_SITE_WAYPOINT,
    ASPHALT_PLANT_WAYPOINT,
    QUARRY_WAYPOINT,
  ],
};

/**
 * Route 3: Direct Plant Delivery Shuttle
 * Asphalt Plant (Hot Mix) -> Construction Site
 */
export const EXPRESS_PLANT_DELIVERY_ROUTE: Route = {
  id: 'ROUTE-PLANT-DIRECT',
  name: 'Asphalt Plant -> Construction Site',
  waypoints: [
    ASPHALT_PLANT_WAYPOINT,
    CONSTRUCTION_SITE_WAYPOINT,
  ],
};

/**
 * Registry of all available simulation routes.
 */
export const DEFAULT_SIMULATION_ROUTES: Route[] = [
  PRIMARY_SUPPLY_ROUTE,
  RETURN_DISPATCH_ROUTE,
  EXPRESS_PLANT_DELIVERY_ROUTE,
];
