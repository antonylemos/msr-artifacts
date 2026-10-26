import { colors, typography } from "@mygym/theme";
import React from "react";
import { StyleSheet, Text, TextStyle } from "react-native";

type TextVariant =
  | "display"
  | "headline"
  | "bodyLg"
  | "body"
  | "label"
  | "caption";

interface AppTextProps {
  variant?: TextVariant;
  children: React.ReactNode;
  style?: TextStyle;
  color?: string;
}

export function AppText({
  variant = "body",
  children,
  style,
  color,
}: AppTextProps) {
  return (
    <Text
      style={[
        typography[variant],
        styles.base,
        color ? { color } : undefined,
        style,
      ]}
    >
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  base: {
    color: colors.onSurface,
  },
});
