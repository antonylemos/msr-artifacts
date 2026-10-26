import { colors } from "@mygym/theme";
import { StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { AppText } from "./Text";

type ButtonVariant = "primary" | "secondary" | "outline";

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: ButtonVariant;
  style?: ViewStyle;
  disabled?: boolean;
}

export function Button({
  label,
  onPress,
  variant = "primary",
  style,
  disabled,
}: ButtonProps) {
  if (variant === "primary") {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled}
        activeOpacity={0.85}
        style={style}
      >
        <View style={[styles.base, styles.primaryShadow]}>
          {/* react-native-linear-gradient (bare) nao dimensiona pelo conteudo
              como o expo-linear-gradient fazia; entao a View define o tamanho
              (padding + texto) e o gradiente preenche por tras (absoluteFill). */}
          <LinearGradient
            colors={[colors.primary, colors.primaryContainer]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[StyleSheet.absoluteFill, styles.primaryGradient]}
          />
          <AppText variant="label" style={styles.primaryLabel}>
            {label}
          </AppText>
        </View>
      </TouchableOpacity>
    );
  }

  if (variant === "outline") {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled}
        activeOpacity={0.85}
        style={[styles.base, styles.outline, style]}
      >
        <AppText variant="label" style={styles.outlineLabel}>
          {label}
        </AppText>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.85}
      style={[styles.base, styles.secondary, style]}
    >
      <AppText variant="label" style={styles.secondaryLabel}>
        {label}
      </AppText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: 999,
    paddingVertical: 16,
    paddingHorizontal: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryShadow: {
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 8,
  },
  primaryGradient: {
    borderRadius: 999,
  },
  primaryLabel: {
    color: colors.white,
    textTransform: "uppercase",
  },
  secondary: {
    backgroundColor: colors.surfaceContainerLow,
  },
  secondaryLabel: {
    color: colors.onSurface,
  },
  outline: {
    borderWidth: 2,
    borderColor: colors.primary,
    backgroundColor: "transparent",
  },
  outlineLabel: {
    color: colors.primary,
  },
});
