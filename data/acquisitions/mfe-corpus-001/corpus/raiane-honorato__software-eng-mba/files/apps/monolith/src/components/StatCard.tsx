import React from 'react'
import { View, StyleSheet, ViewStyle } from 'react-native'
import { AppText } from './Text'
import { colors } from '../theme'

interface StatCardProps {
  icon: React.ReactElement
  value: string
  label: string
  highlighted?: boolean
  style?: ViewStyle
}

export function StatCard({ icon, value, label, highlighted = false, style }: StatCardProps) {
  return (
    <View style={[styles.card, highlighted && styles.highlighted, style]}>
      {icon}
      <AppText variant="headline" style={highlighted ? styles.highlightedText : undefined}>
        {value}
      </AppText>
      <AppText variant="caption" style={highlighted ? styles.highlightedText : undefined}>
        {label}
      </AppText>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    padding: 16,
    backgroundColor: colors.surfaceContainerLow,
    gap: 4,
    shadowColor: colors.onSurface,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  highlighted: {
    backgroundColor: colors.tertiaryFixed,
  },
  highlightedText: {
    color: colors.onSurface,
  },
})
