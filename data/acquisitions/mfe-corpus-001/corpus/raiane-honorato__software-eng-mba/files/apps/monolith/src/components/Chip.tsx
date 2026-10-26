import React from 'react'
import { TouchableOpacity, StyleSheet, ViewStyle } from 'react-native'
import { AppText } from './Text'
import { colors } from '../theme'

interface ChipProps {
  label: string
  selected?: boolean
  onPress?: () => void
  style?: ViewStyle
}

export function Chip({ label, selected = false, onPress, style }: ChipProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[styles.base, selected ? styles.selected : styles.unselected, style]}
    >
      <AppText
        variant="label"
        style={selected ? styles.selectedLabel : styles.unselectedLabel}
      >
        {label}
      </AppText>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  base: {
    borderRadius: 999,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  selected: {
    backgroundColor: colors.tertiaryFixed,
    shadowColor: colors.tertiaryFixed,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.45,
    shadowRadius: 8,
    elevation: 5,
  },
  unselected: {
    backgroundColor: colors.surfaceContainerLow,
  },
  selectedLabel: {
    color: colors.onSurface,
    textTransform: 'uppercase',
  },
  unselectedLabel: {
    color: colors.onSurfaceVariant,
    textTransform: 'uppercase',
  },
})
