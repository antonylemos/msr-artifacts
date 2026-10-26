import { gyms } from "@mygym/data";
import { CheckInStackParamList } from "@mygym/navigation";
import { useCheckInStore } from "@mygym/store";
import { colors, typography } from "@mygym/theme";
import { AppText, GymCard, TopAppBar } from "@mygym/ui";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ScrollView, StyleSheet, View } from "react-native";

type GymListNavProp = NativeStackNavigationProp<
  CheckInStackParamList,
  "GymList"
>;

export function GymListScreen() {
  const navigation = useNavigation<GymListNavProp>();
  const canCheckIn = useCheckInStore((s) => s.canCheckInToday());

  return (
    <View style={styles.screen}>
      <TopAppBar />
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.hero}>
          <AppText variant="display" style={styles.headline}>
            Encontre seu próximo{"\n"}treino
          </AppText>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <AppText variant="label" style={styles.sectionTitle}>
              Academias em Destaque
            </AppText>
          </View>

          {gyms.length === 0 ? (
            <AppText
              variant="body"
              color={colors.onSurfaceVariant}
              style={styles.emptyText}
            >
              Nenhuma academia encontrada.
            </AppText>
          ) : (
            <View style={styles.gymList}>
              {gyms.map((gym) => (
                <GymCard
                  key={gym.id}
                  gym={gym}
                  canCheckIn={canCheckIn}
                  onCheckIn={() =>
                    navigation.navigate("CheckInConfirmation", {
                      gymId: gym.id,
                    })
                  }
                />
              ))}
            </View>
          )}
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
    paddingBottom: 40,
  },
  hero: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
    gap: 16,
  },
  headline: {
    fontSize: 36,
    lineHeight: 42,
    color: colors.onSurface,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchInput: {
    flex: 1,
    ...typography.body,
    color: colors.onSurface,
    padding: 0,
  },
  section: {
    paddingHorizontal: 24,
    gap: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTitle: {
    color: colors.onSurface,
    fontSize: 13,
  },
  gymList: {
    gap: 16,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 32,
  },
});
