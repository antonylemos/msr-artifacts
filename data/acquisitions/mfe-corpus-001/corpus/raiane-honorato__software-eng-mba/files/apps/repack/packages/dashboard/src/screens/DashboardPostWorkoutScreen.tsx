import { resolveFirstActivityName } from "@mygym/data";
import type { CompletedCheckIn } from "@mygym/store";
import { useCheckInStore } from "@mygym/store";
import { colors } from "@mygym/theme";
import { AppText, TopAppBar } from "@mygym/ui";
import { formatDuration, formatRelativeDate } from "@mygym/utils";
import { FireIcon, TimerIcon } from "phosphor-react-native";
import { ScrollView, StyleSheet, View } from "react-native";

export function DashboardPostWorkoutScreen() {
  const history = useCheckInStore((s) => s.history);
  const recent = history.slice(0, 3);
  const latest = recent[0];

  return (
    <View style={styles.screen}>
      <TopAppBar />
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.hero}>
          <AppText variant="display" style={styles.headline}>
            Missão Cumprida,{"\n"}Atleta!
          </AppText>
          <AppText variant="body" color={colors.onSurfaceVariant}>
            Ótimo trabalho hoje. Seu corpo agradece. Volte amanhã para um novo
            check-in!
          </AppText>

          <View style={styles.achievementChip}>
            <FireIcon size={14} color={colors.onSurface} weight="fill" />
            <AppText variant="label" style={styles.achievementLabel}>
              META DIÁRIA
            </AppText>
            <AppText variant="headline" style={styles.achievementValue}>
              100%
            </AppText>
          </View>
        </View>

        {latest && (
          <View style={styles.section}>
            <AppText variant="headline" style={styles.sectionTitle}>
              Resumo do Treino
            </AppText>

            <View style={styles.latestCard}>
              <View style={styles.latestHeader}>
                <AppText variant="headline" style={styles.latestActivity}>
                  {resolveFirstActivityName(latest)}
                </AppText>
                <AppText variant="caption" color={colors.onSurfaceVariant}>
                  {latest.gymName}
                </AppText>
              </View>

              <View style={styles.latestStats}>
                <View style={styles.latestStat}>
                  <TimerIcon size={16} color={colors.onSurfaceVariant} />
                  <AppText variant="caption" color={colors.onSurfaceVariant}>
                    DURAÇÃO
                  </AppText>
                  <AppText variant="headline" style={styles.latestStatValue}>
                    {formatDuration(latest.durationMs)}
                  </AppText>
                </View>
                {latest.caloriesBurned !== undefined && (
                  <View style={styles.latestStat}>
                    <FireIcon size={16} color={colors.onSurfaceVariant} />
                    <AppText variant="caption" color={colors.onSurfaceVariant}>
                      KCAL
                    </AppText>
                    <AppText variant="headline" style={styles.latestStatValue}>
                      {latest.caloriesBurned}
                    </AppText>
                  </View>
                )}
              </View>
            </View>
          </View>
        )}

        {recent.length > 1 && (
          <View style={styles.section}>
            <AppText variant="headline" style={styles.sectionTitle}>
              Histórico Recente
            </AppText>
            <View style={styles.historyList}>
              {recent.slice(1).map((checkIn) => (
                <HistoryItem key={checkIn.id} checkIn={checkIn} />
              ))}
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

function HistoryItem({ checkIn }: { checkIn: CompletedCheckIn }) {
  return (
    <View style={historyStyles.item}>
      <View style={historyStyles.left}>
        <AppText variant="body" style={historyStyles.activity}>
          {resolveFirstActivityName(checkIn)}
        </AppText>
        <AppText variant="caption" color={colors.onSurfaceVariant}>
          {checkIn.gymName}
        </AppText>
      </View>
      <View style={historyStyles.right}>
        <AppText variant="caption" color={colors.onSurfaceVariant}>
          {formatDuration(checkIn.durationMs)}
        </AppText>
        <AppText variant="caption" color={colors.onSurfaceVariant}>
          {formatRelativeDate(checkIn.endTime)}
        </AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  content: {
    paddingBottom: 40,
    gap: 32,
  },
  hero: {
    paddingHorizontal: 24,
    paddingTop: 16,
    gap: 16,
  },
  headline: {
    fontSize: 40,
    lineHeight: 46,
    color: colors.onSurface,
  },
  achievementChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: colors.tertiaryFixed,
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignSelf: "flex-start",
    shadowColor: colors.tertiaryFixed,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 4,
  },
  achievementLabel: {
    color: colors.onSurface,
    fontSize: 10,
  },
  achievementValue: {
    color: colors.primary,
    fontSize: 22,
  },
  section: {
    paddingHorizontal: 24,
    gap: 16,
  },
  sectionTitle: {
    fontSize: 20,
  },
  latestCard: {
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: 20,
    padding: 20,
    gap: 16,
    shadowColor: colors.onSurface,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  latestHeader: {
    gap: 4,
  },
  latestActivity: {
    fontSize: 20,
  },
  latestStats: {
    flexDirection: "row",
    gap: 16,
  },
  latestStat: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 14,
    padding: 14,
    gap: 4,
  },
  latestStatValue: {
    fontSize: 22,
    color: colors.onSurface,
  },
  historyList: {
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: 20,
    padding: 16,
    gap: 12,
  },
});

const historyStyles = StyleSheet.create({
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  left: {
    gap: 2,
  },
  activity: {
    fontFamily: "Inter-SemiBold",
  },
  right: {
    alignItems: "flex-end",
    gap: 2,
  },
});
