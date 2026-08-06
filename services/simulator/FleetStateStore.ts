/**
 * @file services/simulator/FleetStateStore.ts
 * @description In-memory singleton state manager serving as the single source of truth for all active trucks.
 */

import { Truck } from '../../types/truck';

/**
 * In-memory repository managing active vehicle states in the simulation.
 */
export class FleetStateStore {
  private static instance: FleetStateStore | null = null;
  private readonly trucks: Map<string, Truck>;

  /**
   * Private constructor to enforce Singleton pattern.
   */
  private constructor() {
    this.trucks = new Map<string, Truck>();
  }

  /**
   * Access the global FleetStateStore singleton instance.
   */
  public static getInstance(): FleetStateStore {
    if (!FleetStateStore.instance) {
      FleetStateStore.instance = new FleetStateStore();
    }
    return FleetStateStore.instance;
  }

  /**
   * Adds a new truck to the fleet state store.
   * @param truck Vehicle instance to add.
   */
  public addTruck(truck: Truck): void {
    this.trucks.set(truck.truckId, { ...truck });
  }

  /**
   * Removes a truck from the fleet state store by its unique ID.
   * @param truckId Unique vehicle identifier.
   * @returns True if the vehicle was present and removed, false otherwise.
   */
  public removeTruck(truckId: string): boolean {
    return this.trucks.delete(truckId);
  }

  /**
   * Retrieves a truck instance by its unique ID.
   * @param truckId Unique vehicle identifier.
   * @returns Cloned truck instance if found, or undefined.
   */
  public getTruck(truckId: string): Truck | undefined {
    const truck = this.trucks.get(truckId);
    return truck ? { ...truck } : undefined;
  }

  /**
   * Retrieves array snapshot of all trucks currently in the fleet.
   * @returns Array of cloned Truck objects.
   */
  public getAllTrucks(): Truck[] {
    return Array.from(this.trucks.values()).map((truck) => ({ ...truck }));
  }

  /**
   * Updates an existing truck record in the store.
   * @param updatedTruck Truck object containing updated vehicle state.
   * @returns True if the truck existed and was updated, false otherwise.
   */
  public updateTruck(updatedTruck: Truck): boolean {
    if (!this.trucks.has(updatedTruck.truckId)) {
      return false;
    }
    this.trucks.set(updatedTruck.truckId, { ...updatedTruck });
    return true;
  }

  /**
   * Removes all trucks, resetting the fleet store.
   */
  public clearFleet(): void {
    this.trucks.clear();
  }

  /**
   * Gets total count of trucks currently registered in the store.
   * @returns Total number of trucks.
   */
  public getFleetSize(): number {
    return this.trucks.size;
  }
}
