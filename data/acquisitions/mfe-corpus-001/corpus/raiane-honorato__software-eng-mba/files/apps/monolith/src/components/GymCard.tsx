import React from 'react'
import { View, Image, StyleSheet, ViewStyle } from 'react-native'
import { StarIcon, MapPinIcon } from 'phosphor-react-native'
import { AppText } from './Text'
import { Chip } from './Chip'
import { Button } from './Button'
import { colors } from '../theme'
import type { Gym } from '../data/gyms'

interface GymCardProps {
  gym: Gym
  onCheckIn: () => void
  canCheckIn?: boolean
  style?: ViewStyle
}

export function GymCard({ gym, onCheckIn, canCheckIn = true, style }: GymCardProps) {
  return (
    <View style={[styles.card, style]}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: gym.photo }}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.ratingBadge}>
          <StarIcon size={12} weight="fill" color={colors.onSurface} />
          <AppText variant="caption" style={styles.ratingText}>{gym.rating}</AppText>
        </View>
      </View>

      <View style={styles.content}>
        <AppText variant="headline" style={styles.name}>{gym.name}</AppText>

        <View style={styles.address}>
          <MapPinIcon size={14} color={colors.onSurfaceVariant} />
          <AppText variant="caption" color={colors.onSurfaceVariant}>{gym.address}</AppText>
        </View>

        <View style={styles.chips}>
          {gym.tags.map((tag) => (
            <Chip key={tag} label={tag} />
          ))}
        </View>

        <Button
          label={canCheckIn ? 'Fazer Check-in' : 'Disponível amanhã'}
          onPress={onCheckIn}
          disabled={!canCheckIn}
          variant={canCheckIn ? 'primary' : 'secondary'}
          style={styles.button}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    backgroundColor: colors.surface,
    overflow: 'hidden',
    shadowColor: colors.onSurface,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 200,
    backgroundColor: colors.surfaceContainerHighest,
  },
  ratingBadge: {
    position: 'absolute',
    bottom: 10,
    left: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.tertiaryFixed,
    borderRadius: 999,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  ratingText: {
    color: colors.onSurface,
    fontFamily: 'Inter_600SemiBold',
  },
  content: {
    padding: 16,
    gap: 12,
  },
  name: {
    fontSize: 20,
  },
  address: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  button: {
    alignSelf: 'stretch',
  },
})
