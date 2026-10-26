import React, { useRef, useState } from 'react'
import {
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native'
import { XIcon, ChecksIcon, TimerIcon, FireIcon } from 'phosphor-react-native'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { AppText } from '../../../components/Text'
import { StarRating } from '../../../components/StarRating'
import { Button } from '../../../components/Button'
import { useCheckInStore } from '../../../store/checkInStore'
import { estimateCalories } from '../../../utils/calories'
import { resolveActivityNames } from '../../../utils/gym'
import { ActivityBadge } from '../../../components/ActivityBadge'
import { formatDuration } from '../../../utils/datetime'
import { colors, typography } from '../../../theme'
import { DashboardStackParamList } from '../../../navigation/DashboardStack'

type Nav = NativeStackNavigationProp<DashboardStackParamList, 'WorkoutFinish'>

export function WorkoutFinishScreen() {
  const navigation = useNavigation<Nav>()
  const insets = useSafeAreaInsets()
  const endCheckIn = useCheckInStore((s) => s.endCheckIn)
  const saveRating = useCheckInStore((s) => s.saveRating)

  // Capture active check-in data at mount, before endCheckIn clears it
  const gymId = useRef(useCheckInStore.getState().activeGymId ?? '').current
  const activityIds = useRef(useCheckInStore.getState().activeActivityIds).current
  const startTime = useRef(useCheckInStore.getState().startTime ?? '').current
  const durationMs = useRef(
    startTime ? Date.now() - new Date(startTime).getTime() : 0
  ).current
  const calories = estimateCalories(activityIds, durationMs)

  const activityNames = gymId && activityIds.length > 0
    ? resolveActivityNames(gymId, activityIds)
    : ['Treino']

  const [stars, setStars] = useState(0)
  const [note, setNote] = useState('')

  function handleSubmit() {
    endCheckIn(calories)
    const completedId = useCheckInStore.getState().history[0]?.id
    if (completedId && stars > 0) {
      saveRating(completedId, { stars, note: note.trim() || undefined })
    }
    navigation.popToTop()
  }

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={[styles.topBar, { paddingTop: insets.top + 8 }]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
          style={styles.closeBtn}
        >
          <XIcon size={20} color={colors.onSurface} />
        </TouchableOpacity>
        <AppText variant="label" style={styles.topBarTitle}>
          TREINO FINALIZADO
        </AppText>
        <View style={styles.closeBtn} />
      </View>

      <ScrollView
        contentContainerStyle={[styles.content, { paddingBottom: 24 + insets.bottom }]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.celebration}>
          <View style={styles.celebrationCircle}>
            <ChecksIcon size={36} color={colors.onSurface} weight="bold" />
          </View>
          <AppText variant="display" style={styles.celebrationTitle}>
            MUITO BEM!
          </AppText>
          <AppText variant="body" color={colors.onSurfaceVariant}>
            Mais um treino pra conta.
          </AppText>
        </View>

        <View style={styles.summaryCard}>
          <AppText variant="caption" color={colors.onSurfaceVariant}>
            ATIVIDADE
          </AppText>
          <View style={styles.badges}>
            {activityNames.map((name) => (
              <ActivityBadge key={name} name={name} />
            ))}
          </View>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <TimerIcon size={20} color={colors.onSurfaceVariant} />
            <AppText variant="caption" color={colors.onSurfaceVariant}>
              DURAÇÃO
            </AppText>
            <AppText variant="headline" style={styles.statValue}>
              {formatDuration(durationMs)}
            </AppText>
          </View>
          <View style={styles.statBox}>
            <FireIcon size={20} color={colors.onSurfaceVariant} />
            <AppText variant="caption" color={colors.onSurfaceVariant}>
              CALORIAS
            </AppText>
            <AppText variant="headline" style={styles.statValue}>
              {calories}{' '}
              <AppText variant="body" color={colors.onSurfaceVariant}>
                kcal
              </AppText>
            </AppText>
          </View>
        </View>

        <View style={styles.ratingSection}>
          <AppText variant="headline" style={styles.ratingTitle}>
            Como foi seu treino?
          </AppText>
          <StarRating value={stars} onChange={setStars} />
        </View>

        <View style={styles.feedbackSection}>
          <AppText variant="label" color={colors.onSurfaceVariant}>
            CONTE-NOS MAIS...
          </AppText>
          <TextInput
            value={note}
            onChangeText={setNote}
            placeholder="Sentiu alguma dor? O treino foi leve?"
            placeholderTextColor={colors.onSurfaceVariant}
            multiline
            style={[styles.feedbackInput, typography.body]}
          />
        </View>

        <Button
          label="Enviar e Voltar ao Início"
          onPress={handleSubmit}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 8,
  },
  closeBtn: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topBarTitle: {
    color: colors.primary,
    fontSize: 13,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 8,
    gap: 28,
  },
  celebration: {
    alignItems: 'center',
    gap: 12,
    paddingVertical: 8,
  },
  celebrationCircle: {
    width: 80,
    height: 80,
    borderRadius: 999,
    backgroundColor: colors.tertiaryFixed,
    alignItems: 'center',
    justifyContent: 'center',
  },
  celebrationTitle: {
    fontSize: 40,
    color: colors.onSurface,
  },
  summaryCard: {
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: 20,
    padding: 16,
    gap: 12,
  },
  badges: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  statBox: {
    flex: 1,
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: 20,
    padding: 16,
    gap: 6,
  },
  statValue: {
    fontSize: 22,
    color: colors.onSurface,
  },
  ratingSection: {
    gap: 16,
    alignItems: 'center',
  },
  ratingTitle: {
    fontSize: 20,
    textAlign: 'center',
  },
  feedbackSection: {
    gap: 10,
  },
  feedbackInput: {
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: 16,
    padding: 16,
    minHeight: 100,
    color: colors.onSurface,
    textAlignVertical: 'top',
  },
})
