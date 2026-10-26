import {
  BarbellIcon,
  FlameIcon,
  HandFistIcon,
  Icon,
  LeafIcon,
  LightningIcon,
  PersonSimpleRunIcon,
  WavesIcon,
  WindIcon,
} from "phosphor-react-native";
import { gyms } from "../data/gyms";
import type { CompletedCheckIn } from "../store/checkInStore";

const ACTIVITY_ICONS: Record<string, Icon> = {
  musculacao: BarbellIcon,
  crossfit: LightningIcon,
  hiit: FlameIcon,
  yoga: LeafIcon,
  pilates: WindIcon,
  boxe: HandFistIcon,
  natacao: WavesIcon,
};

export function activityIcon(activityId: string): Icon {
  return ACTIVITY_ICONS[activityId] ?? PersonSimpleRunIcon;
}

export function resolveFirstActivityName(checkIn: CompletedCheckIn): string {
  if (!checkIn.activityIds || checkIn.activityIds.length === 0) return "Treino";
  const gym = gyms.find((g) => g.id === checkIn.gymId);
  if (!gym) return checkIn.activityIds[0];
  const activity = gym.activities.find((a) => a.id === checkIn.activityIds![0]);
  return activity?.name ?? checkIn.activityIds[0];
}

export function resolveActivityNames(
  gymId: string,
  activityIds: string[],
): string[] {
  const gym = gyms.find((g) => g.id === gymId);
  if (!gym) return activityIds;
  return activityIds.map((id) => {
    const activity = gym.activities.find((a) => a.id === id);
    return activity?.name ?? id;
  });
}
