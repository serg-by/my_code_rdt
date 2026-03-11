import type { EventType, TroopTier, FormState } from "./types";

/**
 * Points per 1 unit (not per 1000) by event type and tier.
 */
export const POINTS_TABLE: Record<EventType, Record<TroopTier, number>> = {
  "Alliance Duel": {
    1: 2,
    2: 4,
    3: 8,
    4: 15,
    5: 25,
    6: 40,
    7: 60,
    8: 85,
    9: 115,
    10: 150,
  },
  Turtle: {
    1: 1,
    2: 2,
    3: 3,
    4: 5,
    5: 8,
    6: 14,
    7: 22,
    8: 33,
    9: 45,
    10: 60,
  },
};

/**
 * Alliance Duel: 1 minute of speedup = 250 event points.
 */
export const SPEEDUP_POINTS_PER_MINUTE = 250;

export const TROOP_TIERS: TroopTier[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export const EVENT_TYPES: EventType[] = ["Alliance Duel", "Turtle"];

export const DEFAULT_FORM_STATE: FormState = {
  base: {
    trainingTimeRaw: "",
    speedupDays: 0,
    speedupHours: 0,
    speedupMinutes: 0,
    trainingSpeedBonus: 0,
  },
  settings: {
    eventType: "Alliance Duel",
    troopTier: 10,
  },
  resources: {
    food: 0,
    wood: 0,
    metal: 0,
    fuel: 0,
  },
  garrison: {
    currentTroops: 0,
    maxGarrisonCapacity: 0,
  },
};
