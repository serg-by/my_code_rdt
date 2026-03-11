import type {
  FormState,
  CalculationResult,
  ResourceCost,
} from "./types";
import { POINTS_TABLE, SPEEDUP_POINTS_PER_MINUTE } from "./constants";
import { parseTrainingTimeToSeconds } from "./formatters";

/**
 * Convert speedup fields (days, hours, minutes) to total seconds.
 */
export function speedupsToSeconds(
  days: number,
  hours: number,
  minutes: number
): number {
  const totalMinutes = days * 1440 + hours * 60 + minutes;
  return totalMinutes * 60;
}

/**
 * Apply training speed bonus to raw training time.
 * Returns effective time in seconds per 1000 troops.
 */
export function effectiveTrainingTime(
  baseTimeSeconds: number,
  bonusPercent: number
): number {
  return baseTimeSeconds * (1 - bonusPercent / 100);
}

/**
 * Calculate how many troops can be trained.
 * Always a multiple of 1000.
 */
export function calcTrainableTroops(
  totalSpeedupSeconds: number,
  effectiveTimePer1000: number
): number {
  if (effectiveTimePer1000 <= 0) return 0;
  const batches = Math.floor(totalSpeedupSeconds / effectiveTimePer1000);
  return batches * 1000;
}

/**
 * Calculate resource cost for a given number of troops,
 * based on cost per 1000 troops.
 */
export function calcResourceCost(
  troops: number,
  costPer1000: ResourceCost
): ResourceCost {
  const multiplier = troops / 1000;
  return {
    food: Math.ceil(costPer1000.food * multiplier),
    wood: Math.ceil(costPer1000.wood * multiplier),
    metal: Math.ceil(costPer1000.metal * multiplier),
    fuel: Math.ceil(costPer1000.fuel * multiplier),
  };
}

/**
 * Main calculation function — derives all results from form state.
 */
export function calculate(state: FormState): CalculationResult {
  const { base, settings, resources, garrison } = state;

  // 1. Parse training time
  const baseTimeSec = parseTrainingTimeToSeconds(base.trainingTimeRaw);

  // 2. Effective training time with bonus
  const effTime = effectiveTrainingTime(baseTimeSec, base.trainingSpeedBonus);

  // 3. Total speedups in seconds
  const totalSpeedSec = speedupsToSeconds(
    base.speedupDays,
    base.speedupHours,
    base.speedupMinutes
  );

  // 4. Trainable troops
  const troopsTrained = calcTrainableTroops(totalSpeedSec, effTime);

  // 5. Speedups used & remaining
  const batches = effTime > 0 ? Math.floor(totalSpeedSec / effTime) : 0;
  const speedupsUsedSeconds = batches * effTime;
  const speedupsRemainingSeconds = totalSpeedSec - speedupsUsedSeconds;

  // 6. Event points from troops
  const pointsPerUnit =
    POINTS_TABLE[settings.eventType]?.[settings.troopTier] ?? 0;
  const eventPoints = troopsTrained * pointsPerUnit;

  // 7. Speedup points (Alliance Duel only)
  const speedupMinutesUsed = speedupsUsedSeconds / 60;
  const speedupPoints =
    settings.eventType === "Alliance Duel"
      ? Math.floor(speedupMinutesUsed * SPEEDUP_POINTS_PER_MINUTE)
      : 0;

  // 8. Total points
  const totalPoints = eventPoints + speedupPoints;

  // 9. Resources required
  const resourcesRequired = calcResourceCost(troopsTrained, resources);

  // 10. Total troops after training
  const totalTroopsAfterTraining = garrison.currentTroops + troopsTrained;

  return {
    troopsTrained,
    speedupsUsedSeconds,
    speedupsRemainingSeconds,
    eventPoints,
    speedupPoints,
    totalPoints,
    resourcesRequired,
    totalTroopsAfterTraining,
  };
}
