import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "../theme";
import { AppText } from "./Text";

export function TopAppBar() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top + 8 }]}>
      <View style={styles.left}>
        <Image
          // eslint-disable-next-line @typescript-eslint/no-require-imports
          source={require("../../assets/logo.png")}
          style={styles.avatar}
          resizeMode="contain"
        />
        <AppText variant="headline" style={styles.logo}>
          MyGym
        </AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 12,
    backgroundColor: colors.surface,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    padding: 4,
    borderRadius: 999,
    borderColor: colors.primary,
    backgroundColor: colors.surfaceContainerHighest,
    overflow: "hidden",
  },
  logo: {
    color: colors.primary,
    fontSize: 16,
  },
});
