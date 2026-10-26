import React from 'react'
import { Text, TextStyle, StyleSheet } from 'react-native'
import { typography, colors } from '../theme'

type TextVariant = 'display' | 'headline' | 'bodyLg' | 'body' | 'label' | 'caption'

interface AppTextProps {
  variant?: TextVariant
  children: React.ReactNode
  style?: TextStyle
  color?: string
}

export function AppText({ variant = 'body', children, style, color }: AppTextProps) {
  return (
    <Text style={[typography[variant], styles.base, color ? { color } : undefined, style]}>
      {children}
    </Text>
  )
}

const styles = StyleSheet.create({
  base: {
    color: colors.onSurface,
  },
})
