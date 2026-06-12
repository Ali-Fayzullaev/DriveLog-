import React from 'react';
import { View, StyleSheet, ViewStyle, Platform } from 'react-native';
import { BlurView } from 'expo-blur';
import { colors, radius } from '../theme';

interface Props {
  children: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
  intensity?: number;
  noPadding?: boolean;
}

/**
 * Glassmorphism card: blurred translucent surface with hairline border.
 * Falls back to a translucent View where blur is unavailable.
 */
export default function GlassCard({ children, style, intensity = 24, noPadding }: Props) {
  const inner = <View style={[!noPadding && styles.pad]}>{children}</View>;

  if (Platform.OS === 'web') {
    return <View style={[styles.base, styles.fallback, style]}>{inner}</View>;
  }

  return (
    <View style={[styles.base, style]}>
      <BlurView intensity={intensity} tint="dark" style={StyleSheet.absoluteFill} />
      <View style={[StyleSheet.absoluteFill, styles.tint]} />
      {inner}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.glassBrd,
    overflow: 'hidden',
  },
  tint: { backgroundColor: colors.glass },
  fallback: { backgroundColor: colors.glass },
  pad: { padding: 18 },
});
