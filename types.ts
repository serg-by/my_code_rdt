export type EventType = "Alliance Duel" | "Turtle";

export type TroopTier = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export interface BaseInputs {
  trainingTimeRaw: string; // raw digits, stored without colons
  speedupDays: number;
  speedupHours: number;
  speedupMinutes: number;
  trainingSpeedBonus: number;
}

export interface SettingsInputs {
  eventType: EventType;
  troopTier: TroopTier;
}

export interface ResourceCost {
  food: number;
  wood: number;
  metal: number;
  fuel: number;
}

export interface GarrisonInputs {
  currentTroops: number;
  maxGarrisonCapacity: number;
}

export interface FormState {
  base: BaseInputs;
  settings: SettingsInputs;
  resources: ResourceCost;
  garrison: GarrisonInputs;
}

export interface CalculationResult {
  troopsTrained: number;
  speedupsUsedSeconds: number;
  speedupsRemainingSeconds: number;
  eventPoints: number;
  speedupPoints: number;
  totalPoints: number;
  resourcesRequired: ResourceCost;
  totalTroopsAfterTraining: number;
}
