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
} from 'phosphor-react-native'

const ACTIVITY_ICONS: Record<string, Icon> = {
  musculacao: BarbellIcon,
  crossfit: LightningIcon,
  hiit: FlameIcon,
  yoga: LeafIcon,
  pilates: WindIcon,
  boxe: HandFistIcon,
  natacao: WavesIcon,
}

export function activityIcon(activityId: string): Icon {
  return ACTIVITY_ICONS[activityId] ?? PersonSimpleRunIcon
}
