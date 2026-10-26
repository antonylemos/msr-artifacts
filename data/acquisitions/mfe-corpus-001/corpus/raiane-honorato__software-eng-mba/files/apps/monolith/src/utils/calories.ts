const CALORIES_PER_HOUR: Record<string, number> = {
  musculacao: 350,
  crossfit: 600,
  hiit: 550,
  yoga: 200,
  pilates: 250,
  boxe: 500,
  natacao: 400,
}

const DEFAULT_CALORIES_PER_HOUR = 300

export function estimateCalories(activityIds: string[], elapsedMs: number): number {
  const elapsedHours = elapsedMs / 3_600_000
  if (activityIds.length === 0) {
    return Math.round(DEFAULT_CALORIES_PER_HOUR * elapsedHours)
  }
  const rates = activityIds.map((id) => CALORIES_PER_HOUR[id] ?? DEFAULT_CALORIES_PER_HOUR)
  const avg = rates.reduce((sum, r) => sum + r, 0) / rates.length
  return Math.round(avg * elapsedHours)
}
