import React, { useState } from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { StarIcon } from 'phosphor-react-native'
import { colors } from '../theme'

const STARS = [1, 2, 3, 4, 5]

interface StarRatingProps {
  value?: number
  onChange?: (value: number) => void
}

export function StarRating({ value = 0, onChange }: StarRatingProps) {
  const [hovered, setHovered] = useState(0)
  const display = hovered || value

  return (
    <View style={styles.row}>
      {STARS.map((star) => (
        <TouchableOpacity
          key={star}
          onPress={() => onChange?.(star)}
          onPressIn={() => setHovered(star)}
          onPressOut={() => setHovered(0)}
          activeOpacity={0.8}
        >
          <StarIcon
            size={36}
            weight={star <= display ? 'fill' : 'regular'}
            color={star <= display ? colors.tertiaryFixed : colors.surfaceContainerHighest}
          />
        </TouchableOpacity>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 4,
  },
})
