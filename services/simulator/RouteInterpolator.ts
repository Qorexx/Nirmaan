/**
 * @file services/simulator/RouteInterpolator.ts
 * @description Pure stateless service performing linear GPS position interpolation along predefined route waypoints.
 */

import { Route, Waypoint } from '../../constants/simulator/routes';
import { GPSLocation, Truck } from '../../types/truck';

/**
 * Pure domain service computing incremental geospatial trajectory steps between route waypoints.
 */
export class RouteInterpolator {
  /**
   * Computes the next interpolated GPS position for a vehicle along a specified route.
   * @param truck Current vehicle state (immutable input).
   * @param route Active route definition containing ordered waypoints.
   * @param deltaTimeSeconds Elapsed simulation time step in seconds (defaults to 2 seconds).
   * @returns Updated GPSLocation object representing new vehicle position.
   */
  public static interpolatePosition(
    truck: Truck,
    route: Route,
    deltaTimeSeconds: number = 2
  ): GPSLocation {
    if (!route || !route.waypoints || route.waypoints.length === 0) {
      return truck.location;
    }

    // Vehicle stationary if speed is zero or negative
    if (truck.speedKmH <= 0) {
      return { ...truck.location };
    }

    const waypoints = route.waypoints;
    const currentLoc = truck.location;

    // 1. Determine next target waypoint index along route progression
    let targetIndex = RouteInterpolator.findTargetWaypointIndex(currentLoc, waypoints);
    let targetWaypoint = waypoints[targetIndex];

    const dLat = targetWaypoint.latitude - currentLoc.latitude;
    const dLng = targetWaypoint.longitude - currentLoc.longitude;
    const distanceToTarget = Math.sqrt(dLat * dLat + dLng * dLng);

    // 2. Convert speed (km/h) and delta time to approximate coordinate step size
    // Approximation: 1 degree latitude/longitude ~ 111 km -> 1 km ~ 0.009 degrees
    const speedKmPerSecond = truck.speedKmH / 3600;
    const stepDistanceKm = speedKmPerSecond * deltaTimeSeconds;
    const stepDegrees = stepDistanceKm * 0.009;

    // 3. Advance to subsequent waypoint (with automatic route looping) if target reached
    if (distanceToTarget <= stepDegrees || distanceToTarget < 0.0001) {
      targetIndex = (targetIndex + 1) % waypoints.length;
      targetWaypoint = waypoints[targetIndex];
    }

    // 4. Calculate linear interpolation vector toward active target waypoint
    const vectorLat = targetWaypoint.latitude - currentLoc.latitude;
    const vectorLng = targetWaypoint.longitude - currentLoc.longitude;
    const stepDistance = Math.sqrt(vectorLat * vectorLat + vectorLng * vectorLng);

    if (stepDistance === 0) {
      return {
        latitude: targetWaypoint.latitude,
        longitude: targetWaypoint.longitude,
        altitudeMeters: targetWaypoint.altitudeMeters,
        headingDegrees: currentLoc.headingDegrees ?? 0,
      };
    }

    // Interpolation factor t clamped between 0.0 and 1.0
    const t = Math.min(1.0, stepDegrees / stepDistance);
    const interpolatedLat = currentLoc.latitude + vectorLat * t;
    const interpolatedLng = currentLoc.longitude + vectorLng * t;

    // Calculate heading angle in degrees (0° = North, 90° = East, 180° = South, 270° = West)
    const headingRad = Math.atan2(vectorLng, vectorLat);
    const headingDegrees = (headingRad * (180 / Math.PI) + 360) % 360;

    return {
      latitude: Number(interpolatedLat.toFixed(6)),
      longitude: Number(interpolatedLng.toFixed(6)),
      altitudeMeters: targetWaypoint.altitudeMeters ?? currentLoc.altitudeMeters,
      headingDegrees: Number(headingDegrees.toFixed(1)),
    };
  }

  /**
   * Helper finding closest target waypoint index along sequence.
   */
  private static findTargetWaypointIndex(
    currentLoc: GPSLocation,
    waypoints: Waypoint[]
  ): number {
    if (waypoints.length <= 1) return 0;

    let closestIndex = 0;
    let minDistance = Infinity;

    for (let i = 0; i < waypoints.length; i++) {
      const wp = waypoints[i];
      const dLat = wp.latitude - currentLoc.latitude;
      const dLng = wp.longitude - currentLoc.longitude;
      const dist = Math.sqrt(dLat * dLat + dLng * dLng);

      if (dist < minDistance) {
        minDistance = dist;
        closestIndex = i;
      }
    }

    // Advance to next waypoint if already at target waypoint boundary
    if (minDistance < 0.0002) {
      return (closestIndex + 1) % waypoints.length;
    }

    return closestIndex;
  }
}
