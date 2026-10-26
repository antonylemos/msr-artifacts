import React from 'react'
import { ViewStyle } from 'react-native'
import { Chip } from './Chip'

interface ActivityBadgeProps {
  name: string
  style?: ViewStyle
}

export function ActivityBadge({ name, style }: ActivityBadgeProps) {
  return <Chip label={name} selected style={style} />
}
