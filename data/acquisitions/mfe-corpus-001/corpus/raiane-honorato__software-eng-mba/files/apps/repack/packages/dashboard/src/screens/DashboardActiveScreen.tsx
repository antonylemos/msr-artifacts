import { gyms, resolveActivityNames } from "@mygym/data";
import { DashboardStackParamList } from "@mygym/navigation";
import { useCheckInStore } from "@mygym/store";
import { colors } from "@mygym/theme";
import {
  ActivityBadge,
  AppText,
  StatCard,
  TimerDisplay,
  TopAppBar,
} from "@mygym/ui";
import { estimateCalories } from "@mygym/utils";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FireIcon, HeartIcon, MapPinIcon } from "phosphor-react-native";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";

type Nav = NativeStackNavigationProp<DashboardStackParamList, "DashboardHome">;

const MOCK_BPM = 128;

export function DashboardActiveScreen() {
  const navigation = useNavigation<Nav>();
  const activeGymId = useCheckInStore((s) => s.activeGymId);
  const activeGymName = useCheckInStore((s) => s.activeGymName);
  const activeActivityIds = useCheckInStore((s) => s.activeActivityIds);
  const startTime = useCheckInStore((s) => s.startTime);

  const [calories, setCalories] = useState(() =>
    estimateCalories(
      activeActivityIds,
      startTime ? Date.now() - new Date(startTime).getTime() : 0,
    ),
  );

  useEffect(() => {
    if (!startTime) return;
    const interval = setInterval(
      () => {
        setCalories(
          estimateCalories(
            activeActivityIds,
            Date.now() - new Date(startTime).getTime(),
          ),
        );
      },
      2 * 60 * 1000,
    );
    return () => clearInterval(interval);
  }, [startTime, activeActivityIds]);

  const gym = gyms.find((g) => g.id === activeGymId);
  const activityNames =
    activeGymId && activeActivityIds.length > 0
      ? resolveActivityNames({
          gymId: activeGymId,
          activityIds: activeActivityIds,
        })
      : [];

  return (
    <View style={styles.screen}>
      <TopAppBar />
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <AppText variant="display" style={styles.headline}>
            Vamos treinar.
          </AppText>
          <AppText variant="body" color={colors.onSurfaceVariant}>
            Sua sessão ativa.
          </AppText>
        </View>

        <View style={styles.sessionCard}>
          <View style={styles.cardTop}>
            <View style={styles.activeChip}>
              <View style={styles.activeDot} />
              <AppText variant="label" style={styles.activeChipLabel}>
                CHECK-IN ATIVO
              </AppText>
            </View>
          </View>

          <AppText variant="headline" style={styles.gymName}>
            {activeGymName ?? ""}
          </AppText>

          {gym && (
            <View style={styles.addressRow}>
              <MapPinIcon size={13} color={colors.onSurfaceVariant} />
              <AppText variant="caption" color={colors.onSurfaceVariant}>
                {gym.address}
              </AppText>
            </View>
          )}

          {activityNames.length > 0 && (
            <View style={styles.badges}>
              {activityNames.map((name) => (
                <ActivityBadge key={name} name={name} />
              ))}
            </View>
          )}

          {startTime && (
            <View style={styles.timerSection}>
              <TimerDisplay startTime={startTime} />
              <AppText variant="caption" color={colors.onSurfaceVariant}>
                Tempo desde o check-in
              </AppText>
            </View>
          )}

          <TouchableOpacity
            style={styles.endButton}
            onPress={() => navigation.navigate("WorkoutFinish")}
            activeOpacity={0.85}
          >
            <View style={styles.endDot} />
            <AppText variant="label" style={styles.endButtonLabel}>
              Encerrar Atividade
            </AppText>
          </TouchableOpacity>
        </View>

        <View style={styles.stats}>
          <StatCard
            icon={<FireIcon size={22} color={colors.onSurface} />}
            value={`${calories} kcal`}
            label="CALORIAS QUEIMADAS"
            style={styles.statCard}
          />
          <StatCard
            icon={<HeartIcon size={22} color={colors.onSurface} />}
            value={`${MOCK_BPM} bpm`}
            label="BPM MÉDIO"
            highlighted
            style={styles.statCard}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  content: {
    paddingBottom: 32,
    gap: 20,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 8,
    gap: 4,
  },
  headline: {
    fontSize: 40,
    lineHeight: 44,
    color: colors.onSurface,
  },
  sessionCard: {
    marginHorizontal: 24,
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: 24,
    padding: 20,
    gap: 14,
    shadowColor: colors.onSurface,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  cardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  activeChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: colors.tertiaryFixed,
    borderRadius: 999,
    paddingVertical: 5,
    paddingHorizontal: 12,
    alignSelf: "flex-start",
  },
  activeDot: {
    width: 7,
    height: 7,
    borderRadius: 999,
    backgroundColor: colors.onSurface,
  },
  activeChipLabel: {
    color: colors.onSurface,
    fontSize: 10,
  },
  gymName: {
    fontSize: 22,
    color: colors.onSurface,
  },
  addressRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  badges: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  timerSection: {
    gap: 4,
  },
  endButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: colors.primary,
    paddingVertical: 14,
    marginTop: 4,
  },
  endDot: {
    width: 10,
    height: 10,
    borderRadius: 999,
    backgroundColor: colors.primary,
  },
  endButtonLabel: {
    color: colors.primary,
  },
  stats: {
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 24,
  },
  statCard: {
    flex: 1,
  },
});
