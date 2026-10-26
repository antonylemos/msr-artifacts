import { gyms } from "./gyms";

export function resolveFirstActivityName({
  activityIds,
  gymId,
}: {
  gymId: string;
  activityIds?: string[];
}): string {
  if (!activityIds || activityIds.length === 0) return "Treino";
  const gym = gyms.find((g) => g.id === gymId);
  if (!gym) return activityIds[0];
  const activity = gym.activities.find((a) => a.id === activityIds![0]);
  return activity?.name ?? activityIds[0];
}

export function resolveActivityNames({
  activityIds,
  gymId,
}: {
  gymId: string;
  activityIds: string[];
}): string[] {
  const gym = gyms.find((g) => g.id === gymId);
  if (!gym) return activityIds;
  return activityIds.map((id) => {
    const activity = gym.activities.find((a) => a.id === id);
    return activity?.name ?? id;
  });
}
