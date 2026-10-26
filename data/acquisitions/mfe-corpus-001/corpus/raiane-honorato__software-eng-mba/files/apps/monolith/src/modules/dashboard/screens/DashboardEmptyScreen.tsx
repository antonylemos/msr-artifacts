import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { PersonSimpleRunIcon } from "phosphor-react-native";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button } from "../../../components/Button";
import { AppText } from "../../../components/Text";
import { TopAppBar } from "../../../components/TopAppBar";
import { RootTabParamList } from "../../../navigation/RootNavigator";
import { useCheckInStore } from "../../../store/checkInStore";
import { colors } from "../../../theme";
import { formatRelativeDate } from "../../../utils/datetime";
import { resolveFirstActivityName } from "../../../utils/gym";

export function DashboardEmptyScreen() {
  const navigation = useNavigation<BottomTabNavigationProp<RootTabParamList>>();
  const history = useCheckInStore((s) => s.history);
  const recent = history.slice(0, 3);

  return (
    <View style={styles.screen}>
      <TopAppBar />
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.hero}>
          <AppText variant="display" style={styles.headline}>
            Pronto para o{"\n"}próximo treino?
          </AppText>
          <AppText variant="body" style={styles.description}>
            Nenhum check-in ativo no momento. Encontre o espaço ideal para
            liberar sua energia hoje.
          </AppText>
          <Button
            label="Encontrar Academia"
            onPress={() => navigation.navigate("FindGyms")}
            style={styles.cta}
          />
        </View>

        <View style={styles.recentSection}>
          <View style={styles.recentHeader}>
            <AppText variant="headline" style={styles.recentTitle}>
              Atividade Recente
            </AppText>
            <PersonSimpleRunIcon size={22} color={colors.primary} />
          </View>

          {recent.length === 0 ? (
            <AppText variant="body" color={colors.onSurfaceVariant}>
              Nenhuma atividade ainda. Faça seu primeiro check-in!
            </AppText>
          ) : (
            recent.map((checkIn) => (
              <View key={checkIn.id} style={styles.recentItem}>
                <View style={styles.recentItemLeft}>
                  <AppText variant="body" style={styles.recentActivity}>
                    {resolveFirstActivityName(checkIn)}
                  </AppText>
                  <AppText variant="caption" color={colors.onSurfaceVariant}>
                    {checkIn.gymName}
                  </AppText>
                </View>
                <AppText variant="caption" color={colors.onSurfaceVariant}>
                  {formatRelativeDate(checkIn.endTime)}
                </AppText>
              </View>
            ))
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
    paddingBottom: 32,
  },
  hero: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 32,
    gap: 16,
  },
  headline: {
    fontSize: 48,
    lineHeight: 52,
    color: colors.onSurface,
  },
  subheadline: {
    color: colors.primary,
    fontSize: 28,
    lineHeight: 34,
  },
  description: {
    color: colors.onSurfaceVariant,
  },
  cta: {
    marginTop: 8,
    alignSelf: "flex-start",
  },
  recentSection: {
    marginHorizontal: 24,
    padding: 20,
    borderRadius: 20,
    backgroundColor: colors.surfaceContainerLow,
    gap: 16,
    shadowColor: colors.onSurface,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  recentHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  recentTitle: {
    fontSize: 18,
  },
  recentItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  recentItemLeft: {
    gap: 2,
  },
  recentActivity: {
    fontFamily: "Inter_600SemiBold",
  },
});
