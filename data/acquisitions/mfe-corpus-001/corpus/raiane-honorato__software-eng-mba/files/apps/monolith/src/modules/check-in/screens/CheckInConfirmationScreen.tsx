import React, { useEffect, useState } from 'react'
import {
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import { BlurView } from 'expo-blur'
import { ArrowLeftIcon, MapPinIcon } from 'phosphor-react-native'
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { LinearGradient } from 'expo-linear-gradient'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { AppText } from '../../../components/Text'
import { Button } from '../../../components/Button'
import { gyms } from '../../../data/gyms'
import { useCheckInStore } from '../../../store/checkInStore'
import { activityIcon } from '../../../utils/gym'
import { colors } from '../../../theme'
import { RootTabParamList } from '../../../navigation/RootNavigator'
import { CheckInStackParamList } from '../../../navigation/CheckInStack'

type Route = RouteProp<CheckInStackParamList, 'CheckInConfirmation'>
type Nav = NativeStackNavigationProp<CheckInStackParamList, 'CheckInConfirmation'>

export function CheckInConfirmationScreen() {
  const navigation = useNavigation<Nav>()
  const route = useRoute<Route>()
  const insets = useSafeAreaInsets()

  const gym = gyms.find((g) => g.id === route.params.gymId)!
  const canCheckIn = useCheckInStore((s) => s.canCheckInToday())
  const startCheckIn = useCheckInStore((s) => s.startCheckIn)

  useEffect(() => {
    if (!canCheckIn) navigation.goBack()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canCheckIn])

  const [selectedIds, setSelectedIds] = useState<string[]>([])

  function toggle(id: string) {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }

  function handleConfirm() {
    startCheckIn(gym.id, gym.name, selectedIds.length > 0 ? selectedIds : undefined)
    navigation
      .getParent<BottomTabNavigationProp<RootTabParamList>>()
      ?.navigate('Home')
  }

  return (
    <View style={styles.screen}>
      <View style={styles.hero}>
        <Image source={{ uri: gym.photo }} style={styles.heroImage} />
        <LinearGradient
          colors={['transparent', 'rgba(31,27,19,0.55)']}
          style={styles.heroGradient}
        />
        <BlurView
          intensity={28}
          tint="light"
          style={[styles.backBtn, { top: insets.top + 12 }]}
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            activeOpacity={0.8}
            style={styles.backBtnInner}
          >
            <ArrowLeftIcon size={20} color={colors.onSurface} />
          </TouchableOpacity>
        </BlurView>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.content,
          { paddingBottom: 104 + insets.bottom },
        ]}
      >
        <View style={styles.gymInfo}>
          <AppText variant="display" style={styles.gymName}>
            {gym.name.toUpperCase()}
          </AppText>
          <View style={styles.addressRow}>
            <MapPinIcon size={14} color={colors.onSurfaceVariant} />
            <AppText variant="caption" color={colors.onSurfaceVariant}>
              {gym.address}
            </AppText>
          </View>
        </View>

        <View style={styles.activitiesSection}>
          <View style={styles.activitiesHeader}>
            <AppText variant="headline" style={styles.activitiesTitle}>
              Selecione a Atividade
            </AppText>
            <AppText variant="caption" color={colors.onSurfaceVariant}>
              OPCIONAL
            </AppText>
          </View>

          {!canCheckIn && (
            <View style={styles.blockedBanner}>
              <AppText variant="caption" color={colors.primary}>
                Você já fez check-in hoje. Volte amanhã!
              </AppText>
            </View>
          )}

          <View style={styles.grid}>
            {gym.activities.map((activity) => {
              const selected = selectedIds.includes(activity.id)
              const Icon = activityIcon(activity.id)
              return (
                <TouchableOpacity
                  key={activity.id}
                  style={[styles.tile, selected && styles.tileSelected]}
                  onPress={() => toggle(activity.id)}
                  activeOpacity={0.8}
                >
                  <Icon
                    size={22}
                    color={colors.onSurface}
                    weight={selected ? 'fill' : 'regular'}
                  />
                  <AppText variant="body" style={styles.tileName}>
                    {activity.name}
                  </AppText>
                </TouchableOpacity>
              )
            })}
          </View>
        </View>
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 20 }]}>
        <Button
          label="Confirmar Check-in"
          onPress={handleConfirm}
          disabled={!canCheckIn}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  hero: {
    height: 280,
  },
  heroImage: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.surfaceContainerHighest,
  },
  heroGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
  },
  backBtn: {
    position: 'absolute',
    left: 16,
    width: 36,
    height: 36,
    borderRadius: 999,
    overflow: 'hidden',
  },
  backBtnInner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    paddingTop: 24,
    paddingHorizontal: 24,
    gap: 28,
  },
  gymInfo: {
    gap: 8,
  },
  gymName: {
    fontSize: 32,
    lineHeight: 36,
    color: colors.onSurface,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  activitiesSection: {
    gap: 16,
  },
  activitiesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  activitiesTitle: {
    fontSize: 20,
  },
  blockedBanner: {
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: 12,
    padding: 12,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  tile: {
    width: '47%',
    aspectRatio: 1.6,
    borderRadius: 16,
    backgroundColor: colors.surfaceContainerLow,
    padding: 14,
    gap: 8,
    justifyContent: 'flex-end',
    shadowColor: colors.onSurface,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  tileSelected: {
    backgroundColor: colors.tertiaryFixed,
    shadowColor: colors.tertiaryFixed,
    shadowOpacity: 0.45,
    shadowRadius: 8,
    elevation: 4,
  },
  tileName: {
    color: colors.onSurface,
    fontFamily: 'Inter_600SemiBold',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 24,
    paddingTop: 12,
    backgroundColor: colors.surface,
  },
})
