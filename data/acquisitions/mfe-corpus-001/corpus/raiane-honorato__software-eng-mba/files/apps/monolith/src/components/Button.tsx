import React from 'react'
import { TouchableOpacity, StyleSheet, ViewStyle } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { AppText } from './Text'
import { colors } from '../theme'

type ButtonVariant = 'primary' | 'secondary' | 'outline'

interface ButtonProps {
  label: string
  onPress: () => void
  variant?: ButtonVariant
  style?: ViewStyle
  disabled?: boolean
}

export function Button({ label, onPress, variant = 'primary', style, disabled }: ButtonProps) {
  if (variant === 'primary') {
    return (
      <TouchableOpacity onPress={onPress} disabled={disabled} activeOpacity={0.85} style={style}>
        <LinearGradient
          colors={[colors.primary, colors.primaryContainer]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.base, styles.primaryShadow]}
        >
          <AppText variant="label" style={styles.primaryLabel}>{label}</AppText>
        </LinearGradient>
      </TouchableOpacity>
    )
  }

  if (variant === 'outline') {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled}
        activeOpacity={0.85}
        style={[styles.base, styles.outline, style]}
      >
        <AppText variant="label" style={styles.outlineLabel}>{label}</AppText>
      </TouchableOpacity>
    )
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.85}
      style={[styles.base, styles.secondary, style]}
    >
      <AppText variant="label" style={styles.secondaryLabel}>{label}</AppText>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  base: {
    borderRadius: 999,
    paddingVertical: 16,
    paddingHorizontal: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryShadow: {
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 8,
  },
  primaryLabel: {
    color: colors.white,
    textTransform: 'uppercase',
  },
  secondary: {
    backgroundColor: colors.surfaceContainerLow,
  },
  secondaryLabel: {
    color: colors.onSurface,
  },
  outline: {
    borderWidth: 2,
    borderColor: colors.primary,
    backgroundColor: 'transparent',
  },
  outlineLabel: {
    color: colors.primary,
  },
})
